"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowUp, Check, Pencil, RotateCcw } from "lucide-react";
import WaitlistSection from "@/components/WaitlistSection";
import { JOIN, NEFER_BY_ID, type NeferId, type VoiceLine } from "./data";
import { director } from "./director";
import { voice } from "./voice";

type Field = "name" | "reason" | "email";
type Stage = Field | "consent" | "submitting" | "done" | "error" | "locked";
type Message = { id: number; from: NeferId | "user"; text: string; field?: Field; kind?: "review" };

const ASKER: Record<Stage, NeferId | null> = {
  name: "pixel", reason: "loop", email: "byte", consent: "patch", submitting: "patch", error: "patch", locked: "patch", done: null,
};

const PLACEHOLDER: Record<Field, string> = {
  name: "Your name or team",
  reason: "A few words about your project",
  email: "you@company.com",
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

export default function NeferJoin({ isLocked = false }: { isLocked?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const nextId = useRef(0);
  const started = useRef(false);
  const inView = useInView(ref, { amount: 0.45 });
  const [classic, setClassic] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [stage, setStage] = useState<Stage>(isLocked ? "locked" : "name");
  const [typing, setTyping] = useState<NeferId | null>(null);
  const [draft, setDraft] = useState("");
  const [answers, setAnswers] = useState<Record<Field, string>>({ name: "", reason: "", email: "" });
  const busy = typing !== null || stage === "submitting";
  const firstName = answers.name.trim().split(/\s+/)[0] ?? "";

  useEffect(() => {
    director.joinSpeaker = ASKER[stage];
  }, [stage]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const push = (message: Omit<Message, "id">) => setMessages((list) => [...list, { ...message, id: nextId.current++ }]);

  // Her "Start over" yeni bir run açar; eski run'a ait bekleyen async adımlar sessizce durur.
  const run = useRef(0);
  const alive = (id: number) => id === run.current;

  // Nefer "yazıyor…" gösterir; önceki replik bitmeden yeni mesaj gelmez, sesler üst üste binmez.
  const speak = async (id: number, from: NeferId, text: string, voiceLine?: VoiceLine, extra?: Partial<Message>) => {
    setTyping(from);
    await Promise.all([voice.snapshot.enabled ? voice.idle() : null, wait(550 + Math.min(900, text.length * 12))]);
    if (!alive(id)) return false;
    setTyping(null);
    push({ from, text, ...extra });
    if (voiceLine) void voice.say(from, voiceLine);
    return true;
  };

  const focusInput = () => window.setTimeout(() => input.current?.focus({ preventScroll: true }), 50);

  const ask = async (id: number, field: Field, prefill = "") => {
    const asked =
      field === "name" ? await speak(id, "pixel", JOIN.nameAsk.text, JOIN.nameAsk, { field }) :
      field === "reason" ? await speak(id, "loop", JOIN.reasonAsk.text, JOIN.reasonAsk, { field }) :
      await speak(id, "byte", JOIN.emailAsk.text, JOIN.emailAsk, { field });
    if (!asked) return;
    setStage(field);
    setDraft(prefill);
    focusInput();
  };

  useEffect(() => {
    if (!inView || started.current || classic) return;
    started.current = true;
    let fired = false;
    const timer = window.setTimeout(() => {
      fired = true;
      if (isLocked) void speak(run.current, "patch", JOIN.full.text, JOIN.full);
      else void ask(run.current, "name");
    }, 250);
    return () => {
      if (fired) return;
      window.clearTimeout(timer);
      started.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, classic]);

  const submitAnswer = async (event?: FormEvent) => {
    event?.preventDefault();
    const value = draft.trim();
    if (!value || busy || (stage !== "name" && stage !== "reason" && stage !== "email")) return;
    const id = run.current;
    const field = stage;
    setDraft("");
    push({ from: "user", text: value, field });

    if (field === "email" && !EMAIL.test(value)) {
      voice.sfx("boing");
      if (!(await speak(id, "byte", JOIN.emailError.text, JOIN.emailError))) return;
      setDraft(value);
      focusInput();
      return;
    }

    const next = { ...answers, [field]: value };
    setAnswers(next);

    if (field === "name") {
      if (!(await speak(id, "pixel", `Nice to meet you, ${value.split(/\s+/)[0]}! ${JOIN.nameReact.text}`, JOIN.nameReact))) return;
      if (!next.reason) return ask(id, "reason");
    }
    if (field === "reason") {
      if (!(await speak(id, "loop", JOIN.reasonReact.text, JOIN.reasonReact))) return;
      if (!next.email) return ask(id, "email");
    }
    setStage("consent");
    await speak(id, "patch", JOIN.consentAsk.text, JOIN.consentAsk, { kind: "review" });
  };

  const approve = async () => {
    if (stage !== "consent" && stage !== "error") return;
    const id = run.current;
    push({ from: "user", text: "Approved. Count me in." });
    setStage("submitting");
    setTyping("patch");
    let ok = false;
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Request failed");
      ok = true;
    } catch {}
    if (!alive(id)) return;
    setTyping(null);
    if (ok) {
      setStage("done");
      director.cheer++;
      voice.sfx("pop");
      await speak(id, "pixel", `Welcome to the squad, ${firstName}! We sent a confirmation to ${answers.email}.`, JOIN.welcome);
    } else {
      setStage("error");
      voice.sfx("boing");
      await speak(id, "patch", JOIN.fail.text, JOIN.fail);
    }
  };

  // Kullanıcı eski bir cevabına tıklayınca o soruya geri döneriz; sonraki mesajlar silinir.
  const edit = (field: Field) => {
    if (busy || stage === "done") return;
    voice.sfx("pop");
    setMessages((list) => {
      const questionIndex = list.findIndex((message) => message.from !== "user" && message.field === field);
      return questionIndex >= 0 ? list.slice(0, questionIndex + 1) : list;
    });
    setStage(field);
    setDraft(answers[field]);
    setAnswers((current) => ({ ...current, [field]: "" }));
    focusInput();
  };

  // Her şeyi siler, sesi keser ve Pixel baştan sorar.
  const startOver = () => {
    const id = ++run.current;
    voice.hush();
    voice.sfx("pop");
    setTyping(null);
    setMessages([]);
    setAnswers({ name: "", reason: "", email: "" });
    setDraft("");
    setStage("name");
    void ask(id, "name");
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void submitAnswer();
    }
  };

  if (classic) {
    return (
      <div data-shot="end" className="pointer-events-auto relative z-20 bg-[#090a0c]">
        <WaitlistSection isLocked={isLocked} />
        <p className="pb-16 text-center">
          <button type="button" onClick={() => setClassic(false)} className="border-b border-white/40 pb-1 text-sm font-semibold text-[#e3e4e7] hover:border-white">
            Bring the Nefers back
          </button>
        </p>
      </div>
    );
  }

  const asking = (stage === "name" || stage === "reason" || stage === "email") && messages.length > 0;

  return (
    <section ref={ref} id="waitlist" data-shot="join" className="relative z-10 flex min-h-screen items-center py-28 max-[900px]:items-end max-[900px]:pb-6 max-[900px]:pt-[44vh]" aria-labelledby="nefer-join">
      <div className="mx-auto grid w-full max-w-[1380px] px-5 sm:px-8 min-[901px]:grid-cols-2 lg:px-12">
        <div className="pointer-events-auto w-full max-w-[560px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#b8bac1]">07 / Join the squad</p>
          <h2 id="nefer-join" className="mt-3 text-[clamp(2.4rem,4.6vw,4.4rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-[#f0f0f1]">
            Want them on <span className="nefer-rainbow">your team?</span>
          </h2>
          <p className="mt-4 max-w-[440px] text-[16px] leading-[1.6] text-[#b8bac1]">The squad has a few questions. Coffee for Byte not included.</p>

          <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#0d0e11]/85 shadow-[0_28px_75px_rgba(0,0,0,.4)] backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <span className="flex -space-x-1.5" aria-hidden="true">
                {(["pixel", "loop", "byte", "patch"] as NeferId[]).map((id) => (
                  <span key={id} className={`h-3 w-3 rounded-full border-2 border-[#0d0e11] transition-transform ${ASKER[stage] === id ? "scale-125" : ""}`} style={{ background: NEFER_BY_ID[id].accent }} />
                ))}
              </span>
              {messages.length > 1 && stage !== "submitting" && stage !== "done" && stage !== "locked" ? (
                <button type="button" onClick={startOver} className="inline-flex min-h-7 items-center gap-1.5 rounded-full px-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#9b9da5] transition-colors hover:bg-white/10 hover:text-white">
                  <RotateCcw className="h-3 w-3" /> Start over
                </button>
              ) : (
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#9b9da5]">#early-access</span>
              )}
            </div>

            <div ref={scroller} className="flex h-[clamp(260px,38vh,380px)] flex-col gap-3 overflow-y-auto px-4 py-5 sm:px-5" role="log" aria-live="polite">
              <AnimatePresence initial={false}>
                {messages.map((message) => {
                  if (message.from === "user") {
                    return (
                      <motion.div key={message.id} initial={{ opacity: 0, y: 10, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="group flex items-center justify-end gap-2">
                        {message.field && stage !== "done" && (
                          <button type="button" onClick={() => edit(message.field!)} disabled={busy} className="rounded-full p-1.5 text-[#72757d] opacity-0 transition-opacity hover:text-white focus-visible:opacity-100 group-hover:opacity-100 disabled:hidden" aria-label="Edit this answer">
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                        )}
                        <p className="max-w-[80%] whitespace-pre-wrap break-words rounded-2xl rounded-br-sm bg-[#e5e5e7] px-4 py-2.5 text-[15px] text-[#101114]">{message.text}</p>
                      </motion.div>
                    );
                  }
                  const nefer = NEFER_BY_ID[message.from];
                  return (
                    <motion.div key={message.id} initial={{ opacity: 0, y: 10, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 380, damping: 28 }} className="max-w-[88%]">
                      <p className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: nefer.accent }}>{nefer.name}</p>
                      <div className="rounded-2xl rounded-tl-sm border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[15px] leading-6 text-[#f0f0f1]">
                        {message.kind === "review" && (
                          <div className="mb-3 overflow-hidden rounded-lg bg-black/40 py-1.5 font-mono text-[12px] leading-[1.8]">
                            {(["name", "reason", "email"] as Field[]).map((field) => (
                              <p key={field} className="truncate bg-[#3ee6a8]/10 px-3 text-[#9df3d0]">+ {field}: {answers[field]}</p>
                            ))}
                          </div>
                        )}
                        {message.text}
                      </div>
                    </motion.div>
                  );
                })}
                {typing && (
                  <motion.div key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-[13px] text-[#9b9da5]">
                    <span className="flex gap-1" aria-hidden="true">
                      {[0, 1, 2].map((dot) => <span key={dot} className="nefer-typing-dot h-1.5 w-1.5 rounded-full" style={{ background: NEFER_BY_ID[typing].accent, animationDelay: `${dot * 0.15}s` }} />)}
                    </span>
                    {NEFER_BY_ID[typing].name} is {stage === "submitting" ? "running checks" : "typing"}…
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="border-t border-white/10 p-3">
              {asking && (
                <form onSubmit={submitAnswer} className="flex items-end gap-2">
                  <label htmlFor="nefer-join-input" className="sr-only">{PLACEHOLDER[stage]}</label>
                  <textarea
                    ref={input}
                    id="nefer-join-input"
                    rows={1}
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={onKeyDown}
                    disabled={busy}
                    placeholder={PLACEHOLDER[stage]}
                    autoComplete={stage === "email" ? "email" : stage === "name" ? "name" : "off"}
                    inputMode={stage === "email" ? "email" : "text"}
                    className="max-h-28 min-h-11 flex-1 resize-none rounded-xl bg-white/[0.05] px-4 py-2.5 text-[15px] text-white placeholder:text-[#74767e] focus:outline-none focus:ring-1 focus:ring-white/30 disabled:opacity-50"
                  />
                  <button type="submit" disabled={busy || !draft.trim()} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-[#101114] transition-opacity disabled:opacity-30" style={{ background: NEFER_BY_ID[ASKER[stage]!].accent }} aria-label="Send">
                    <ArrowUp className="h-5 w-5" />
                  </button>
                </form>
              )}
              {(stage === "consent" || stage === "error") && !typing && (
                <div className="flex flex-col gap-2">
                  <button type="button" onClick={approve} className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#3ee6a8] text-sm font-semibold text-[#06140e] transition-colors hover:bg-[#62efbb]">
                    {stage === "error" ? <RotateCcw className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                    {stage === "error" ? "Try again" : "Approve & join"}
                  </button>
                  <p className="px-1 text-center text-xs leading-5 text-[#9b9da5]">By approving, you agree to the processing of your information for early access.</p>
                </div>
              )}
              {stage === "submitting" && <p className="py-3 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-[#9b9da5]">Submitting…</p>}
              {stage === "done" && <p className="py-3 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-[#3ee6a8]">✓ You&apos;re on the list</p>}
              {stage === "locked" && <p className="py-3 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-[#9b9da5]">Waitlist full</p>}
            </div>

            {stage === "done" && Array.from({ length: 28 }).map((_, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 rounded-[2px]"
                style={{ background: NEFER_BY_ID[(["pixel", "loop", "byte", "patch"] as NeferId[])[i % 4]].accent }}
                initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                animate={{ x: Math.cos(i * 0.23 * Math.PI) * (140 + (i % 3) * 60), y: Math.sin(i * 0.23 * Math.PI) * (110 + (i % 4) * 35), opacity: 0, rotate: 220 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            ))}
          </div>

          <p className="mt-4 text-center text-sm text-[#9b9da5] min-[901px]:text-left">
            <button type="button" onClick={() => setClassic(true)} className="border-b border-white/25 pb-0.5 hover:border-white hover:text-white">
              Prefer a boring form?
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}

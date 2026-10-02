"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { HERO, NEFERS, NEFER_BY_ID, type NeferId } from "./nefers/data";
import { useVoice, voice } from "./nefers/voice";
import WebGLBoundary from "./nefers/WebGLBoundary";

const HeroAppStage = dynamic(() => import("./HeroAppStage"), { ssr: false });

// Demo akışı: idle (kullanıcı görevi gönderir) → run (4 ajan sırayla çalışır) → approval (kullanıcı karar verir).
// "Request changes" → changes (Byte düzeltir, Patch bakar) → approval. "Approve" → shipped. Onay hep kullanıcıda.
type Phase = "idle" | "run" | "approval" | "changes" | "shipped";

const PROMPT = "Build a login page for my app. Email and password, nothing fancy.";
const BEAT_MS = [3000, 3000, 3400, 3200];
const FIX_MS = [2600, 2000];
const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));
const FIX_FROM: NeferId[] = ["byte", "patch"];

// Grafikteki düğüm konumları (%): Pixel → Loop → Byte → Patch.
const NODES = [
  { x: 50, y: 13, status: ["Writing brief", "Brief ready"] },
  { x: 50, y: 45, status: ["Planning", "4 steps"] },
  { x: 25, y: 77, status: ["Coding", "3 files"] },
  { x: 75, y: 77, status: ["Reviewing", "Reviewed"] },
];
const EDGES: [number, number][] = [[0, 1], [1, 2], [2, 3]];

const RAIL = ["You describe it", "Agents build it", "You approve it"];
const BRIEF = ["Email + password sign-in", "Reset password link", "Clear error states", "Works on mobile"];
const PLAN = ["Layout", "Form + validation", "Session", "Tests"];
const CODE = [
  "export function LoginForm() {",
  "  const { signIn, pending } = useAuth();",
  "  const thing2 = useSession();",
  "  return <Form onSubmit={signIn}>",
  "    <Button loading={pending}>Sign in</Button>",
  "  </Form>;",
];
const CHECKS = ["Tests 12/12", "Accessibility AA", "No secrets in diff", "Ran on local model"];

type Message = { key: string; from: NeferId | "you" | "system"; text: string };

function messagesFor(phase: Phase, beat: number, fixBeat: number, fixed: boolean, bold: boolean): Message[] {
  if (phase === "idle") return [];
  const list: Message[] = [{ key: "you", from: "you", text: PROMPT }];
  const done = phase === "run" ? beat : 3;
  for (let i = 0; i <= done; i++) list.push({ key: `t${i}`, from: NEFERS[i].id, text: HERO.team[i].text });
  if (fixed) {
    list.push({ key: "rc", from: "you", text: "Request changes: rename thing2." });
    const upTo = phase === "changes" ? fixBeat : 1;
    for (let i = 0; i <= upTo; i++) list.push({ key: `f${i}`, from: FIX_FROM[i], text: HERO.fix[i].text });
  }
  if (phase === "approval") list.push({ key: "wait", from: "system", text: "Waiting for your review" });
  if (phase === "shipped") {
    list.push({ key: "ok", from: "you", text: "Approve and merge." });
    if (bold) list.push({ key: "bold", from: "patch", text: HERO.bold.text });
    list.push({ key: "ship", from: "pixel", text: HERO.merged.text });
  }
  return list;
}

const pane = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
  transition: { duration: 0.22 },
};

function ChangesPane({ phase, beat, fixed, onApprove, onRequestChanges, onReplay }: {
  phase: Phase; beat: number; fixed: boolean; onApprove: () => void; onRequestChanges: () => void; onReplay: () => void;
}) {
  if (phase === "idle") {
    return (
      <motion.div key="empty" {...pane} className="hn-empty">
        <p>No changes yet.</p>
        <p>Agents propose. You decide.</p>
      </motion.div>
    );
  }
  if (phase === "run" && beat === 0) {
    return (
      <motion.div key="brief" {...pane}>
        <p className="hn-pane-label font-mono">Brief / Pixel</p>
        <ul className="hn-list">
          {BRIEF.map((item, i) => (
            <motion.li key={item} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.15 }}>
              <span className="font-mono">—</span>{item}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    );
  }
  if (phase === "run" && beat === 1) {
    return (
      <motion.div key="plan" {...pane}>
        <p className="hn-pane-label font-mono">Plan / Loop</p>
        <ol className="hn-list">
          {PLAN.map((item, i) => (
            <motion.li key={item} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 + i * 0.15 }}>
              <span className="font-mono">{String(i + 1).padStart(2, "0")}</span>{item}
            </motion.li>
          ))}
        </ol>
      </motion.div>
    );
  }
  if ((phase === "run" && beat === 2) || phase === "changes") {
    const fixing = phase === "changes";
    return (
      <motion.div key={fixing ? "fix" : "code"} {...pane}>
        <p className="hn-pane-label font-mono">LoginForm.tsx / Byte</p>
        <pre className="hn-code font-mono">
          {CODE.map((codeLine, i) => {
            const renamed = fixing && i === 2;
            return (
              <motion.span
                key={i}
                className={renamed ? "is-fix" : ""}
                initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
                transition={{ delay: fixing ? (renamed ? 0.5 : 0) : 0.1 + i * 0.13, duration: 0.25 }}
              >
                <i>+</i>{renamed ? "  const session = useSession();" : codeLine}
              </motion.span>
            );
          })}
        </pre>
      </motion.div>
    );
  }
  if (phase === "run" && beat === 3) {
    return (
      <motion.div key="review" {...pane}>
        <p className="hn-pane-label font-mono">Review / Patch</p>
        <ul className="hn-list">
          {CHECKS.map((item, i) => (
            <motion.li key={item} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.25 }}>
              <Check size={13} strokeWidth={1.8} />{item}
            </motion.li>
          ))}
          <motion.li className="is-nit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
            <span className="font-mono">!</span>Nit: <code className="font-mono">thing2</code> needs a real name
          </motion.li>
        </ul>
      </motion.div>
    );
  }
  if (phase === "approval") {
    return (
      <motion.div key="approval" {...pane} className="hn-approval">
        <p className="hn-pane-label font-mono">Your review</p>
        <p className="hn-approval-title">Add login page</p>
        <p className="hn-approval-meta font-mono">3 files <b>+86</b> <s>−4</s> · checks passed</p>
        <p className="hn-approval-note">
          {fixed ? <><Check size={13} strokeWidth={1.8} /> <code className="font-mono">thing2</code> renamed to <code className="font-mono">session</code></> : <><span className="font-mono">!</span> 1 nit open: <code className="font-mono">thing2</code></>}
        </p>
        <div className="hn-approval-actions">
          <button type="button" className="hn-approve" onClick={onApprove}>Approve &amp; merge <ArrowUpRight size={16} aria-hidden="true" /></button>
          {!fixed && <button type="button" className="hn-request" onClick={onRequestChanges}>Request changes</button>}
        </div>
      </motion.div>
    );
  }
  return (
    <motion.div key="shipped" {...pane} className="hn-shipped">
      <p className="hn-pane-label font-mono"><Check size={12} strokeWidth={2} /> Merged to main</p>
      <p className="hn-shipped-title">Shipped.</p>
      <p className="hn-shipped-copy">Planned, coded and reviewed by agents. Approved by you.</p>
      <button type="button" className="hn-replay font-mono" onClick={onReplay}><RotateCcw size={12} aria-hidden="true" /> Watch again</button>
    </motion.div>
  );
}

export default function HeroApp() {
  const figure = useRef<HTMLElement>(null);
  const pokeCount = useRef(0);
  const phaseRef = useRef<Phase>("idle");
  const { enabled: soundOn } = useVoice();
  const [phase, setPhase] = useState<Phase>("idle");
  const [beat, setBeat] = useState(0);
  const [fixBeat, setFixBeat] = useState(0);
  const [fixed, setFixed] = useState(false);
  const [bold, setBold] = useState(false);
  const [visible, setVisible] = useState(true);
  const [load3d, setLoad3d] = useState(false);
  const [ready, setReady] = useState(false);
  const [poke, setPoke] = useState<{ index: number; text: string } | null>(null);

  // Grafikte o an çalışan ajan (-1: kimse). "shipped"de hepsi kutlar (4).
  const working = phase === "run" ? beat : phase === "changes" ? (fixBeat === 0 ? 2 : 3) : phase === "shipped" ? 4 : -1;
  const doneUpTo = phase === "run" ? beat - 1 : phase === "idle" ? -1 : 3;
  const railStep = phase === "idle" ? 0 : phase === "run" || phase === "changes" ? 1 : phase === "approval" ? 2 : 3;
  const messages = messagesFor(phase, beat, fixBeat, fixed, bold);
  const latest = [...messages].reverse().find((message) => message.from !== "you");

  // Çıkış animasyonundaki eski paneldeki butonlar tıklanırsa yok sayılsın diye güncel aşama ref'te tutulur.
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    const el = figure.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Ajanlar sırayla konuşur; replik bitmeden sonraki ajana geçilmez. Son ajandan sonra kullanıcı onayı beklenir.
  useEffect(() => {
    if (phase !== "run" || !visible) return;
    let alive = true;
    const spoken = voice.say(NEFERS[beat].id, HERO.team[beat]).then(() => wait(400));
    void Promise.all([wait(BEAT_MS[beat]), spoken]).then(() => {
      if (!alive) return;
      if (beat < 3) setBeat(beat + 1);
      else setPhase("approval");
    });
    return () => { alive = false; };
  }, [phase, beat, visible]);

  useEffect(() => {
    if (phase !== "changes" || !visible) return;
    let alive = true;
    const spoken = voice.say(FIX_FROM[fixBeat], HERO.fix[fixBeat]).then(() => wait(400));
    void Promise.all([wait(FIX_MS[fixBeat]), spoken]).then(() => {
      if (!alive) return;
      if (fixBeat === 0) setFixBeat(1);
      else setPhase("approval");
    });
    return () => { alive = false; };
  }, [phase, fixBeat, visible]);

  // Hero ekrandan çıkınca ya da sayfadan ayrılınca konuşma kesilir.
  useEffect(() => {
    if (!visible) voice.hush();
  }, [visible]);
  useEffect(() => () => voice.hush(), []);

  // 3D sahne sayfa boşa çıkınca yüklenir; o zamana kadar PNG'ler görünür.
  useEffect(() => {
    const idle = window as Window & { requestIdleCallback?: (cb: () => void, options?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    const start = () => setLoad3d(true);
    if (idle.requestIdleCallback) {
      const id = idle.requestIdleCallback(start, { timeout: 2500 });
      return () => idle.cancelIdleCallback?.(id);
    }
    const timer = window.setTimeout(start, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!poke) return;
    const timer = window.setTimeout(() => setPoke(null), 2300);
    return () => window.clearTimeout(timer);
  }, [poke]);

  const run = (withSound: boolean) => {
    if (withSound) voice.enable();
    setFixed(false);
    setBold(false);
    setFixBeat(0);
    setBeat(0);
    setPhase("run");
  };

  // Nit açıkken onaylanırsa Patch önce laf sokar, sonra Pixel kapanışı yapar.
  const approve = () => {
    if (phaseRef.current !== "approval") return;
    phaseRef.current = "shipped";
    voice.sfx("pop");
    setBold(!fixed);
    setPhase("shipped");
    const quip = fixed ? Promise.resolve() : voice.say("patch", HERO.bold).then(() => wait(250));
    void quip.then(() => voice.say("pixel", HERO.merged));
  };

  const requestChanges = () => {
    if (phaseRef.current !== "approval") return;
    phaseRef.current = "changes";
    voice.sfx("pop");
    setFixed(true);
    setFixBeat(0);
    setPhase("changes");
  };

  const replay = () => {
    voice.hush();
    setPhase("idle");
  };

  const onPoke = useCallback((index: number) => {
    const nefer = NEFERS[index];
    const pokeLine = nefer.pokes[pokeCount.current++ % nefer.pokes.length];
    voice.sfx("boing");
    void voice.say(nefer.id, pokeLine);
    setPoke({ index, text: pokeLine.text });
  }, []);
  const onReady = useCallback(() => setReady(true), []);

  return (
    <figure ref={figure} className="hn" aria-label="Jennefer demo: four specialist agents plan, code, and review a login page, then wait for your approval.">
      <div className="hn-lines" aria-hidden="true" />

      <div className="hn-stack">
        <div className="hn-caption font-mono" aria-hidden="true">
          <span>Jennefer / Live demo</span>
          <span><i /> Local model</span>
        </div>

        <div className="hn-window">
          <div className="hn-titlebar">
            <span className="hn-mark" aria-hidden="true">J</span>
            <span className="hn-title" aria-hidden="true">Jennefer <span className="font-mono">my-app / login-page</span></span>
            {phase !== "idle" && (
              <button type="button" className="hn-sound font-mono" onClick={() => voice.toggle()} aria-label={soundOn ? "Mute the agents" : "Unmute the agents"} aria-pressed={soundOn}>
                {soundOn ? <Volume2 size={14} aria-hidden="true" /> : <VolumeX size={14} aria-hidden="true" />}
                <span>{soundOn ? "Sound on" : "Muted"}</span>
              </button>
            )}
          </div>

          <div className="hn-body">
            <section className="hn-chat" aria-label="Chat">
              <p className="hn-pane-head font-mono" aria-hidden="true">01 / Chat</p>
              <div className="hn-messages" aria-hidden="true">
                <AnimatePresence initial={false}>
                  {messages.map((message) => {
                    const nefer = message.from === "you" || message.from === "system" ? null : NEFER_BY_ID[message.from];
                    return (
                      <motion.div key={message.key} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`hn-msg is-${nefer ? "agent" : message.from}`}>
                        {message.from !== "system" && (
                          <p className="hn-msg-from font-mono">
                            {nefer && <i style={{ background: nefer.accent }} />}
                            {nefer ? nefer.name : "You"}
                          </p>
                        )}
                        <p className="hn-msg-text">{message.text}</p>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
              <div className="hn-composer">
                {phase === "idle" ? (
                  <>
                    <p className="hn-prompt">{PROMPT}</p>
                    <div className="hn-composer-actions">
                      <button type="button" className="hn-send" onClick={() => run(true)}>Send with sound <ArrowUpRight size={16} aria-hidden="true" /></button>
                      <button type="button" className="hn-muted" onClick={() => run(false)}>Run muted</button>
                    </div>
                  </>
                ) : (
                  <p className="hn-composer-status font-mono" aria-hidden="true">
                    {phase === "approval" ? "Waiting for you" : phase === "shipped" ? "Done" : "Agents working"}
                  </p>
                )}
              </div>
            </section>

            <section className="hn-graph" aria-hidden="true">
              <p className="hn-pane-head font-mono">02 / Living Org</p>
              <div className="hn-graph-area">
                <svg className="hn-edges" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {EDGES.map(([from, to]) => (
                    <line
                      key={`${from}-${to}`}
                      x1={NODES[from].x} y1={NODES[from].y} x2={NODES[to].x} y2={NODES[to].y}
                      className={doneUpTo >= from && (working >= to || doneUpTo >= to) ? "is-lit" : ""}
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </svg>
                {NEFERS.map((nefer, i) => {
                  const isWorking = working === i || working === 4;
                  const isDone = doneUpTo >= i;
                  return (
                    <div key={nefer.id} className={`hn-node ${isWorking ? "is-working" : ""} ${isDone ? "is-done" : ""}`} style={{ left: `${NODES[i].x}%`, top: `${NODES[i].y}%`, "--node": nefer.accent } as CSSProperties}>
                      <AnimatePresence>
                        {poke?.index === i && (
                          <motion.p key={poke.text} className="hn-poke" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            {poke.text}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      <span className="hn-face" data-hn-face={i}>
                        <Image className={`hn-face-png ${ready ? "is-hidden" : ""}`} src={`/images/nefers/${nefer.id}.png`} alt="" width={120} height={120} priority={i === 0} />
                      </span>
                      <span className="hn-node-label"><i />{nefer.name}</span>
                      <span className="hn-node-status font-mono">{isWorking && working < 4 ? NODES[i].status[0] : isDone ? NODES[i].status[1] : nefer.role.split(" · ").pop()}</span>
                    </div>
                  );
                })}
              </div>
              {latest && (
                <p key={latest.key} className="hn-ticker">
                  {latest.from !== "system" && latest.from !== "you" && <b className="font-mono">{NEFER_BY_ID[latest.from].name} </b>}
                  {latest.text}
                </p>
              )}
            </section>

            <section className="hn-changes-pane" aria-label="Changes">
              <p className="hn-pane-head font-mono" aria-hidden="true">03 / Changes</p>
              <div className="hn-pane-body">
                <AnimatePresence mode="wait">
                  <ChangesPane key={`${phase}-${beat}`} phase={phase} beat={beat} fixed={fixed} onApprove={approve} onRequestChanges={requestChanges} onReplay={replay} />
                </AnimatePresence>
              </div>
            </section>
          </div>
        </div>

        <ol className="hn-rail" aria-label="How Jennefer works">
          {RAIL.map((label, i) => (
            <li key={label} className={`${railStep === i ? "is-active" : ""} ${railStep > i ? "is-done" : ""}`}>
              <span className="font-mono">{railStep > i ? <Check size={12} strokeWidth={2} /> : String(i + 1).padStart(2, "0")}</span>
              {label}
            </li>
          ))}
        </ol>
      </div>

      {load3d && (
        <WebGLBoundary>
          <HeroAppStage eventSource={figure} working={working} paused={!visible} ready={ready} onReady={onReady} onPoke={onPoke} />
        </WebGLBoundary>
      )}
    </figure>
  );
}

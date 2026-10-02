"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Check, Rocket } from "lucide-react";
import { NEFERS } from "./data";
import { director } from "./director";
import { voice } from "./voice";

const STEPS = ["Brief", "Plan", "Code", "Review"];

const PLAN = ["Layout & design tokens", "Login form + validation", "Session API hookup", "Tests & accessibility pass"];

const CODE = [
  "export function LoginForm() {",
  "  const [email, setEmail] = useState(\"\");",
  "  const { signIn, pending } = useAuth();",
  "  return (",
  "    <Form onSubmit={() => signIn(email)}>",
  "      <Input label=\"Email\" value={email} />",
  "      <Button loading={pending}>Sign in</Button>",
  "    </Form>",
  "  );",
  "}",
];

function stepFor(progress: number) {
  if (progress < 0.26) return 0;
  if (progress < 0.44) return 1;
  if (progress < 0.62) return 2;
  if (progress < 0.8) return 3;
  return 4;
}

const panel = {
  initial: { opacity: 0, y: 16, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -16, filter: "blur(6px)" },
  transition: { duration: 0.35 },
};

function StepBody({ step }: { step: number }) {
  if (step === 0) {
    return (
      <motion.div key="brief" {...panel} className="flex h-full flex-col gap-4">
        <p className="text-sm text-[#b8bac1]"><span className="font-semibold" style={{ color: NEFERS[0].accent }}>Pixel</span> opened a task</p>
        <p className="text-xl font-semibold tracking-[-0.03em] text-[#f0f0f1]">“We need a login page. Make it beautiful.”</p>
        <div className="mx-auto mt-1 flex w-full max-w-[240px] flex-1 flex-col items-center justify-center gap-2.5 rounded-xl border border-dashed border-white/20 p-5">
          <span className="h-7 w-7 rounded-full border-2" style={{ borderColor: NEFERS[0].accent }} />
          <span className="h-7 w-full rounded-md bg-white/10" />
          <span className="h-7 w-full rounded-md bg-white/10" />
          <span className="h-7 w-full rounded-md" style={{ background: NEFERS[0].accent }} />
        </div>
      </motion.div>
    );
  }
  if (step === 1) {
    return (
      <motion.div key="plan" {...panel} className="flex h-full flex-col gap-4">
        <p className="text-sm text-[#b8bac1]"><span className="font-semibold" style={{ color: NEFERS[1].accent }}>Loop</span> split it into a graph</p>
        <ol className="flex flex-col">
          {PLAN.map((item, i) => (
            <motion.li key={item} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.14 }} className="flex items-stretch gap-3">
              <span className="flex flex-col items-center">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-semibold text-[#101114]" style={{ background: NEFERS[1].accent }}>{i + 1}</span>
                {i < PLAN.length - 1 && <span className="w-px flex-1 bg-white/20" />}
              </span>
              <span className="pb-4 pt-1 text-[15px] text-[#e3e4e7]">{item}</span>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    );
  }
  if (step === 2) {
    return (
      <motion.div key="code" {...panel} className="flex h-full flex-col gap-4">
        <p className="text-sm text-[#b8bac1]"><span className="font-semibold" style={{ color: NEFERS[2].accent }}>Byte</span> is writing LoginForm.tsx</p>
        <pre className="flex-1 overflow-hidden rounded-xl bg-black/40 p-4 font-mono text-[11px] leading-[1.7] text-[#cfd3ff] sm:text-[13px]">
          {CODE.map((codeLine, i) => (
            <motion.span key={i} className="block whitespace-pre" initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }} animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }} transition={{ delay: 0.1 + i * 0.09, duration: 0.25 }}>
              {codeLine}
            </motion.span>
          ))}
        </pre>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: NEFERS[2].accent }}>✓ 24 tests passing</p>
      </motion.div>
    );
  }
  if (step === 3) {
    return (
      <motion.div key="review" {...panel} className="flex h-full flex-col gap-4">
        <p className="text-sm text-[#b8bac1]"><span className="font-semibold" style={{ color: NEFERS[3].accent }}>Patch</span> is reviewing the diff</p>
        <div className="overflow-hidden rounded-xl bg-black/40 font-mono text-[12px] leading-[1.9] sm:text-[13px]">
          <p className="bg-[#ff5a6a]/10 px-4 text-[#ff9aa4]">- const thing2 = await getSession();</p>
          <p className="bg-[#3ee6a8]/10 px-4 text-[#9df3d0]">+ const session = await getSession();</p>
          <p className="px-4 text-[#9b9da5]">  if (!session) redirect(&quot;/login&quot;);</p>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, type: "spring" }} className="rounded-2xl rounded-tl-sm border border-white/10 bg-white/[0.04] p-4 text-[15px] text-[#e3e4e7]">
          Renamed <code className="font-mono text-[#9df3d0]">thing2</code>. Edge cases covered. Checks are green.
          <span className="mt-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: NEFERS[3].accent }}><Check className="h-3.5 w-3.5" /> Approved</span>
        </motion.div>
      </motion.div>
    );
  }
  return (
    <motion.div key="shipped" {...panel} className="relative flex h-full flex-col items-center justify-center gap-3 text-center">
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-2 w-2 rounded-[2px]"
          style={{ background: NEFERS[i % 4].accent }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: Math.cos(i * 0.35 * Math.PI) * (120 + (i % 3) * 40), y: Math.sin(i * 0.35 * Math.PI) * (90 + (i % 4) * 25), opacity: 0, rotate: 180 }}
          transition={{ duration: 1.3, ease: "easeOut" }}
        />
      ))}
      <Rocket className="h-9 w-9 text-[#f0f0f1]" />
      <p className="text-[clamp(2.6rem,5vw,4rem)] font-semibold tracking-[-0.07em] text-[#f0f0f1]">Shipped.</p>
      <p className="max-w-[300px] text-[15px] leading-6 text-[#b8bac1]">From brief to production. Four Nefers, one graph, zero chaos.</p>
    </motion.div>
  );
}

export default function NeferTeam() {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = stepFor(progress);
    if (next === director.teamStep) return;
    director.teamStep = next;
    setStep(next);
    if (progress <= 0 || progress >= 1) return;
    if (next < 4) voice.say(NEFERS[next].id, NEFERS[next].team);
    else {
      director.cheer++;
      voice.sfx("pop");
    }
  });

  return (
    <section ref={ref} data-shot="team" className="relative h-[480vh]" aria-labelledby="nefer-team">
      <div className="sticky top-0 z-10 flex h-screen items-start pt-[96px] max-[900px]:pt-[84px]">
        <div className="mx-auto grid w-full max-w-[1380px] items-start gap-4 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-12">
          <div className="pointer-events-auto max-[1023px]:hidden">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#b8bac1]">05 / The team</p>
            <h2 id="nefer-team" className="mt-4 text-[clamp(3rem,5.5vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.075em] text-[#f0f0f1]">
              One task.<br /><span className="text-[#9b9da5]">Four Nefers.</span>
            </h2>
            <p className="mt-6 max-w-[420px] text-[17px] leading-[1.7] text-[#b8bac1] text-pretty">
              This is Jennefer&apos;s Living Org in miniature. A brief becomes a plan. The plan becomes a graph of steps. Nothing ships until review says so.
            </p>
          </div>

          <p className="text-center text-[2rem] font-semibold leading-none tracking-[-0.06em] text-[#f0f0f1] lg:hidden">One task. <span className="text-[#9b9da5]">Four Nefers.</span></p>

          <div className="pointer-events-auto mx-auto w-full max-w-[600px] overflow-hidden rounded-2xl border border-white/10 bg-[#0d0e11]/85 shadow-[0_28px_75px_rgba(0,0,0,.4)] backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <span className="flex gap-1.5" aria-hidden="true">{[0, 1, 2].map((dot) => <span key={dot} className="h-2.5 w-2.5 rounded-full bg-white/15" />)}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#9b9da5]">task / login-page</span>
            </div>
            <ol className="grid grid-cols-4 gap-px border-b border-white/10 bg-white/10" aria-label="Pipeline">
              {STEPS.map((label, i) => {
                const done = step > i;
                const active = step === i;
                return (
                  <li key={label} className="flex items-center justify-center gap-2 bg-[#0d0e11] py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors" style={{ color: done || active ? NEFERS[i].accent : "#72757d" }}>
                    {done ? <Check className="h-3 w-3" /> : <span className={`h-1.5 w-1.5 rounded-full ${active ? "animate-pulse" : ""}`} style={{ background: "currentColor" }} />}
                    {label}
                  </li>
                );
              })}
            </ol>
            <div className="h-[clamp(300px,40vh,380px)] p-5 sm:p-6">
              <AnimatePresence mode="wait">
                <StepBody step={step} />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

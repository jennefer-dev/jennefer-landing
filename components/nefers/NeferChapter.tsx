"use client";

import { useRef } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { Volume2 } from "lucide-react";
import type { Nefer } from "./data";
import { useVoice, voice } from "./voice";

export function TalkingBars({ color, active }: { color: string; active: boolean }) {
  return (
    <span className="flex h-3.5 items-end gap-[3px]" aria-hidden="true">
      {[0, 1, 2, 3].map((bar) => (
        <span
          key={bar}
          className={`w-[3px] rounded-full ${active ? "nefer-talk-bar" : ""}`}
          style={{ background: color, height: active ? undefined : 4, animationDelay: `${bar * 0.12}s` }}
        />
      ))}
    </span>
  );
}

export default function NeferChapter({ nefer, index }: { nefer: Nefer; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const spoken = useRef(false);
  const { speaker } = useVoice();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Karakter sahneye oturunca bir kez kendini tanıtır; bölümden çıkınca tekrar tanıtabilir.
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (progress > 0.18 && progress < 0.8 && !spoken.current) {
      spoken.current = true;
      voice.say(nefer.id, nefer.intro);
    }
    if (progress <= 0.02 || progress >= 0.98) spoken.current = false;
  });

  const opacity = useTransform(scrollYProgress, [0.05, 0.2, 0.82, 0.96], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.05, 0.2, 0.82, 0.96], [60, 0, 0, -60]);
  const nameX = useTransform(scrollYProgress, [0, 1], ["18%", "-28%"]);
  const talking = speaker === nefer.id;

  return (
    <section ref={ref} data-shot={nefer.id} className="relative grid h-[260vh]" aria-labelledby={`nefer-${nefer.id}`}>
      <div className="sticky top-0 col-start-1 row-start-1 flex h-screen items-end overflow-hidden opacity-30" aria-hidden="true">
        <motion.p
          style={{ x: nameX, opacity, WebkitTextStroke: `2px ${nefer.accent}` }}
          className="translate-y-[22%] whitespace-nowrap text-[clamp(10rem,32vw,34rem)] font-semibold leading-none tracking-[-0.08em] text-transparent max-[900px]:translate-y-[-36vh]"
        >
          {nefer.name}
        </motion.p>
      </div>

      <div className="sticky top-0 z-10 col-start-1 row-start-1 flex h-screen items-center max-[900px]:items-end">
        <motion.div style={{ opacity, y }} className="mx-auto w-full max-w-[1380px] px-5 sm:px-8 lg:px-12 max-[900px]:pb-10">
          <div className="pointer-events-auto max-w-[520px] max-[900px]:max-w-none">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: nefer.accent }}>
              0{index + 1} / {nefer.role}
            </p>
            <h2 id={`nefer-${nefer.id}`} className="mt-4 text-[clamp(4rem,9vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.075em] text-[#f0f0f1]">
              {nefer.name}
            </h2>
            <p className="mt-5 text-[clamp(1.35rem,2.2vw,2rem)] font-semibold leading-tight tracking-[-0.04em] text-[#f0f0f1] text-balance">
              {nefer.tagline}
            </p>
            <p className="mt-5 hidden max-w-[460px] text-[17px] leading-[1.7] text-[#b8bac1] text-pretty sm:block">{nefer.description}</p>

            <dl className="mt-8 hidden divide-y divide-white/10 border-y border-white/10 text-[15px] min-[901px]:block">
              <div className="grid grid-cols-[120px_1fr] gap-4 py-3.5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#9b9da5]">Superpower</dt>
                <dd className="text-[#e3e4e7]">{nefer.superpower}</dd>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-4 py-3.5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#9b9da5]">Weakness</dt>
                <dd className="text-[#e3e4e7]">{nefer.weakness}</dd>
              </div>
            </dl>

            <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10">
              {nefer.stats.map((stat) => (
                <div key={stat.label} className="bg-[#0d0e11]/90 px-4 py-3.5 backdrop-blur">
                  <p className="text-xl font-semibold tracking-[-0.04em] text-[#f0f0f1] sm:text-2xl">{stat.value}</p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[#9b9da5] sm:text-[10px]">{stat.label}</p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                if (!voice.snapshot.enabled) voice.enable();
                voice.say(nefer.id, nefer.intro);
              }}
              className="mt-6 inline-flex min-h-11 items-center gap-3 rounded-full border px-5 text-sm font-semibold text-[#f0f0f1] transition-colors hover:bg-white/5"
              style={{ borderColor: `${nefer.accent}66` }}
            >
              {talking ? <TalkingBars color={nefer.accent} active /> : <Volume2 className="h-4 w-4" style={{ color: nefer.accent }} />}
              Hear {nefer.name}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

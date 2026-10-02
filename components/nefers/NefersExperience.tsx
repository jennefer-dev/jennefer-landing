"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import JenneferLogo from "@/components/JenneferLogo";
import { NEFERS, NEFER_BY_ID } from "./data";
import NeferChapter, { TalkingBars } from "./NeferChapter";
import NeferJoin from "./NeferJoin";
import NeferTeam from "./NeferTeam";
import { useVoice, voice } from "./voice";
import WebGLBoundary from "./WebGLBoundary";

const NeferStage = dynamic(() => import("./NeferStage"), { ssr: false });

const POKE_GOAL = 12;

function SoundToggle() {
  const { enabled, speaker } = useVoice();
  return (
    <button
      type="button"
      onClick={() => voice.toggle()}
      aria-pressed={enabled}
      className="pointer-events-auto fixed bottom-5 right-5 z-40 inline-flex min-h-11 items-center gap-3 rounded-full border border-white/15 bg-[#0d0e11]/85 px-4 text-sm font-semibold text-[#f0f0f1] backdrop-blur-xl transition-colors hover:bg-[#1b1c20] sm:bottom-7 sm:right-7"
    >
      {enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4 text-[#9b9da5]" />}
      {enabled ? "Sound on" : "Sound off"}
      <TalkingBars color={speaker ? NEFER_BY_ID[speaker].accent : "#72757d"} active={enabled && !!speaker} />
    </button>
  );
}

function Subtitle() {
  const { speaker, text } = useVoice();
  const nefer = speaker ? NEFER_BY_ID[speaker] : null;
  return (
    <div className="pointer-events-none fixed inset-x-0 top-[84px] z-30 flex justify-center px-5 sm:top-auto sm:bottom-8" aria-live="polite">
      <AnimatePresence>
        {nefer && text && (
          <motion.div
            key={text}
            initial={{ opacity: 0, y: 14, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="max-w-[560px] rounded-2xl border border-white/10 bg-[#0d0e11]/90 px-5 py-3 text-center shadow-[0_18px_50px_rgba(0,0,0,.45)] backdrop-blur-xl"
          >
            <span className="mr-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: nefer.accent }}>{nefer.name}</span>
            <span className="text-[15px] text-[#f0f0f1]">{text}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TopBar() {
  return (
    <header className="pointer-events-auto fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#090a0c]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-3 text-white" aria-label="Jennefer home">
          <JenneferLogo className="h-8 w-8" />
          <span className="text-lg font-semibold tracking-[-0.05em]">Jennefer</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-[#a4a6ad]">
          <Link href="/" className="hidden hover:text-white sm:inline">Product</Link>
          <Link href="/roadmap" className="hidden hover:text-white sm:inline">Roadmap</Link>
          <a href="#waitlist" className="inline-flex min-h-10 items-center gap-3 bg-[#e4e4e6] px-4 text-sm font-semibold text-[#101114] transition-colors hover:bg-white">
            Request access <ArrowUpRight className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </header>
  );
}

function Intro() {
  const { enabled } = useVoice();
  return (
    <section data-shot="intro" className="relative h-[115vh]">
      <div className="sticky top-0 z-10 flex h-screen flex-col items-center px-5 pt-[clamp(110px,17vh,170px)] text-center">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#b8bac1]">
          The tiny agents inside Jennefer
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120, damping: 16 }}
          className="mt-5 text-[clamp(3.6rem,10vw,9.5rem)] font-semibold leading-[0.92] tracking-[-0.075em] text-[#f0f0f1]"
        >
          Meet the <span className="nefer-rainbow">Nefers.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mt-5 max-w-[520px] text-[17px] leading-[1.7] text-[#b8bac1] text-pretty">
          Four small agents with big personalities. They plan, build, and review your code, and they have opinions about all of it.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-3">
          {!enabled && (
            <button type="button" onClick={() => voice.enable()} className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#e5e5e7] px-6 text-sm font-semibold text-[#101114] transition-colors hover:bg-white">
              <Volume2 className="h-4 w-4" /> Turn on sound. They talk.
            </button>
          )}
          <span className="inline-flex min-h-12 items-center gap-2 px-3 text-sm text-[#9b9da5]">
            <ArrowDown className="h-4 w-4 animate-bounce" /> Scroll to meet them
          </span>
        </motion.div>
      </div>
    </section>
  );
}

function Playground() {
  const { pokes } = useVoice();
  const unlocked = pokes >= POKE_GOAL;
  return (
    <section data-shot="play" className="relative h-[170vh]" aria-labelledby="nefer-play">
      <div className="sticky top-0 z-10 flex h-screen flex-col items-center px-5 pt-[clamp(110px,16vh,160px)] text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#b8bac1]">06 / Playground</p>
        <h2 id="nefer-play" className="mt-4 text-[clamp(3.2rem,7.5vw,7rem)] font-semibold leading-[0.95] tracking-[-0.075em] text-[#f0f0f1]">
          Go on. <span className="text-[#9b9da5]">Poke them.</span>
        </h2>
        <p className="mt-4 text-[17px] text-[#b8bac1]">Click any Nefer. They have feelings, mostly about code.</p>
        <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#b8bac1]">
          Pokes <span className="text-[#f0f0f1]">{pokes}</span>
          <span className="h-1 w-16 overflow-hidden rounded-full bg-white/10">
            <span className="block h-full rounded-full bg-[#ff6b81] transition-[width]" style={{ width: `${Math.min(100, (pokes / POKE_GOAL) * 100)}%` }} />
          </span>
        </div>
        <AnimatePresence>
          {unlocked && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="mt-5 max-w-[420px] rounded-2xl border border-[#ffb547]/40 bg-[#ffb547]/10 px-5 py-4 text-left"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#ffb547]">Achievement unlocked</p>
              <p className="mt-1 text-lg font-semibold tracking-[-0.03em] text-[#f0f0f1]">Certified Distraction</p>
              <p className="mt-1 text-sm text-[#b8bac1]">The Nefers would now like to get back to work. Your project, maybe?</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default function NefersExperience({ children, isLocked = false }: { children: React.ReactNode; isLocked?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  return (
    <div ref={root} className="nefers-root relative min-h-screen bg-[#090a0c] text-[#f0f0f1] selection:bg-white/25">
      <div className="nefer-glow pointer-events-none fixed inset-0" aria-hidden="true" />
      <WebGLBoundary>
        <NeferStage root={root} />
      </WebGLBoundary>
      <TopBar />
      <div className="pointer-events-none">
        <Intro />
        {NEFERS.map((nefer, index) => <NeferChapter key={nefer.id} nefer={nefer} index={index} />)}
        <NeferTeam />
        <Playground />
        <NeferJoin isLocked={isLocked} />
      </div>
      <div data-shot="end" className="relative z-20 bg-[#090a0c]">{children}</div>
      <Subtitle />
      <SoundToggle />
    </div>
  );
}

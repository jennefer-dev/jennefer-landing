"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const slides = [
  {
    id: 1,
    title: "First look to ide",
    src: "/showcase/launcher.png",
    alt: "First look to ide - Workspace Launcher",
    tag: "WORKSPACE",
  },
  {
    id: 2,
    title: "How the engine works",
    src: "/showcase/node.png",
    alt: "How the engine works - Flow Canvas & DAG",
    tag: "ENGINE DAG",
  },
  {
    id: 3,
    title: "Fully agentic 0 cost",
    src: "/showcase/ai.png",
    alt: "Fully agentic 0 cost - AI Assistant Pipeline",
    tag: "LOCAL SWARM",
  },
  {
    id: 4,
    title: "A living org as like you",
    src: "/showcase/living-org.png",
    alt: "A living org as like you - Living Organization Dashboard",
    tag: "AUTONOMOUS ORG",
  },
];

export default function AppSliderShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      className="relative h-[460vh] bg-[#07080c] overflow-clip"
    >
      {/* Sticky Fullscreen Center Stage: Exactly ONE centered image visible at a time with page transitions */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-8 select-none">
        
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none -z-10" />

        {/* Central Card Container for all 4 slides */}
        <div className="relative w-full max-w-5xl h-[68vh] max-h-[640px] flex items-center justify-center">
          {slides.map((slide, index) => {
            return (
              <SlideScene
                key={slide.id}
                slide={slide}
                index={index}
                progress={smoothProgress}
              />
            );
          })}
        </div>

        {/* Bottom Minimal Progress Indicator Dots */}
        <div className="mt-6 flex items-center gap-3 font-mono text-xs text-slate-500">
          {slides.map((_, i) => (
            <ProgressDot key={i} index={i} progress={smoothProgress} />
          ))}
        </div>

      </div>
    </section>
  );
}

function SlideScene({
  slide,
  index,
  progress,
}: {
  slide: (typeof slides)[0];
  index: number;
  progress: any;
}) {
  // 4 discrete intervals across 0 to 1
  // Slide 0: [0.00 -> 0.25] (center 0.12)
  // Slide 1: [0.25 -> 0.50] (center 0.37)
  // Slide 2: [0.50 -> 0.75] (center 0.62)
  // Slide 3: [0.75 -> 1.00] (center 0.88)
  const isFirst = index === 0;
  const isLast = index === 3;

  const startEnter = index * 0.25;
  const finishEnter = startEnter + 0.08;
  const startExit = (index + 1) * 0.25 - 0.08;
  const finishExit = (index + 1) * 0.25;

  // Slide translation: Enters from right (60px), stays centered (0px), exits to left (-60px)
  const x = useTransform(
    progress,
    isFirst
      ? [0, startExit, finishExit]
      : isLast
      ? [startEnter, finishEnter, 1]
      : [startEnter, finishEnter, startExit, finishExit],
    isFirst
      ? [0, 0, -60]
      : isLast
      ? [60, 0, 0]
      : [60, 0, 0, -60],
    { clamp: true }
  );

  // Opacity: Fades in, stays solid 1, fades out
  const opacity = useTransform(
    progress,
    isFirst
      ? [0, startExit, finishExit]
      : isLast
      ? [startEnter, finishEnter, 1]
      : [startEnter, finishEnter, startExit, finishExit],
    isFirst
      ? [1, 1, 0]
      : isLast
      ? [0, 1, 1]
      : [0, 1, 1, 0],
    { clamp: true }
  );

  // Scale: 0.96 -> 1.0 -> 0.96 (Apple / Linear depth transition)
  const scale = useTransform(
    progress,
    isFirst
      ? [0, startExit, finishExit]
      : isLast
      ? [startEnter, finishEnter, 1]
      : [startEnter, finishEnter, startExit, finishExit],
    isFirst
      ? [1, 1, 0.96]
      : isLast
      ? [0.96, 1, 1]
      : [0.96, 1, 1, 0.96],
    { clamp: true }
  );

  const display = useTransform(progress, (p: number) => {
    if (isFirst) return p <= finishExit ? "flex" : "none";
    if (isLast) return p >= startEnter ? "flex" : "none";
    return p >= startEnter && p <= finishExit ? "flex" : "none";
  });

  // Text Fill Animation (SVG Mask gradient from left to right as you scroll through this slide's duration)
  // 0% -> 100% fill
  const textFillPercent = useTransform(
    progress,
    [startEnter, isLast ? 0.95 : startExit],
    ["0%", "100%"],
    { clamp: true }
  );

  return (
    <motion.div
      style={{
        x,
        opacity,
        scale,
        display,
      }}
      className="absolute inset-0 w-full h-full flex flex-col justify-between"
    >
      {/* Window Frame with High-Fidelity Uncompressed Image */}
      <div className="relative w-full flex-1 rounded-none bg-[#050505] border border-[#222] shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col">
        
        {/* Window Chrome */}
        <div className="h-10 px-5 bg-[#000] border-b border-[#222] flex items-center justify-between shrink-0">
          <div className="w-12"></div>
          <span className="text-[11px] font-mono tracking-widest text-white uppercase font-bold">
            {slide.tag}
          </span>
          <div className="w-12 text-right text-[11px] font-mono text-zinc-500 font-bold">
            0{index + 1} / 04
          </div>
        </div>

        {/* Viewport Screenshot - Crisp pixel-perfect rendering with zero blur/filters */}
        <div className="relative w-full flex-1 bg-black overflow-hidden">
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            unoptimized
            priority
            className="object-contain object-center"
            style={{ imageRendering: "auto" }}
          />
        </div>
      </div>

      {/* SVG Fill Text Animation (Soldan sağa kaydırdıkça parlayarak dolan yazı efekti) */}
      <div className="mt-5 px-2 flex items-center justify-between">
        <div className="relative overflow-hidden">
          {/* Base faded text */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-white/20 select-none">
            {slide.title}
          </h3>

          {/* Foreground text filled from left to right */}
          <motion.div
            style={{
              clipPath: useTransform(
                textFillPercent,
                (val) => `polygon(0 0, ${val} 0, ${val} 100%, 0 100%)`
              ),
            }}
            className="absolute inset-0 select-none pointer-events-none"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-white">
              {slide.title}
            </h3>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function ProgressDot({ index, progress }: { index: number; progress: any }) {
  const start = index * 0.25;
  const end = (index + 1) * 0.25;

  const width = useTransform(progress, [start, end], [12, 32], { clamp: true });
  const opacity = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0.3, 1, 1, 0.3], { clamp: true });
  const bg = useTransform(progress, [start, start + 0.05, end - 0.05, end], ["#475569", "#ffffff", "#ffffff", "#475569"], { clamp: true });

  return (
    <motion.div
      style={{ width, opacity, backgroundColor: bg }}
      className="h-1.5 rounded-full transition-all"
    />
  );
}

"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  tag?: string;
  heightClass?: string;
  id?: string;
}

const CHAPTERS: Record<string, string> = {
  "What is Jennefer": "01 / The workspace",
  "Agent Choosing System": "02 / The intelligence",
  "Ecosystem & Security": "03 / The foundation",
  "Features & Benefits": "04 / The workflow",
  "Autonomous Engineering Squad": "05 / The team",
  Showcase: "06 / In practice",
  "In Short": "07 / The essentials",
  "Early Access": "08 / Join the preview",
};

export default function SectionHeading({
  title,
  tag,
  heightClass = "h-[250vh]",
  id,
}: SectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const fillPercent = useTransform(
    scrollYProgress,
    [0.10, 0.60, 0.92, 0.98],
    [0, 100, 100, 100],
    { clamp: true }
  );
  const y = useTransform(
    scrollYProgress,
    [0.08, 0.35, 0.92, 0.98],
    [40, 0, 0, -40],
    { clamp: true }
  );
  const opacity = useTransform(
    scrollYProgress,
    [0.06, 0.20, 0.92, 0.98],
    [0, 1, 1, 0],
    { clamp: true }
  );
  const scale = useTransform(
    scrollYProgress,
    [0.08, 0.35, 0.92, 0.98],
    [0.96, 1, 1, 0.96],
    { clamp: true }
  );
  const chapter = tag ?? CHAPTERS[title] ?? "Jennefer / Platform";

  return (
    <div id={id} ref={containerRef} className={`chapter-section relative ${heightClass} bg-[#101010] overflow-clip`}>
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-5 select-none sm:px-10">
        <div className="chapter-lines pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="absolute inset-x-5 top-28 flex items-center justify-between pt-4 font-mono text-xs uppercase tracking-[0.13em] text-[#9e9e9e] sm:inset-x-10">
          <span>Jennefer / Field notes</span><span>{chapter}</span>
        </div>
        <motion.div style={{ y, opacity, scale }} className="relative z-10 flex w-full max-w-6xl flex-col items-start px-1 text-left pointer-events-none sm:px-6">
          <div className="mb-7 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.15em] text-[#c1c1c1]">
            <span className="h-px w-8 bg-[#c1c1c1]" /> {chapter}
          </div>
          <div className="relative max-w-full overflow-hidden py-3">
            <h2 className="max-w-[1050px] text-balance text-[clamp(3.25rem,8.5vw,9rem)] font-semibold tracking-[-0.075em] text-white/15 leading-[0.98]">{title}</h2>
            <motion.div
              style={{
                clipPath: useTransform(
                  fillPercent,
                  (val) => `polygon(0 ${100 - val}%, 100% ${100 - val}%, 100% 100%, 0 100%)`
                ),
              }}
              className="absolute inset-0 select-none pointer-events-none py-3"
            >
              <h2 aria-hidden="true" className="max-w-[1050px] text-balance text-[clamp(3.25rem,8.5vw,9rem)] font-semibold tracking-[-0.075em] text-[#f1f1f1] leading-[0.98]">{title}</h2>
            </motion.div>
          </div>
          <div className="mt-9 h-px w-24 bg-[#c1c1c1]/70" />
        </motion.div>
        <div className="absolute inset-x-5 bottom-10 flex items-center justify-between pb-4 font-mono text-xs uppercase tracking-[0.12em] text-[#969696] sm:inset-x-10">
          <span>Scroll to discover</span><span className="hidden sm:inline">Private engineering, in motion</span>
        </div>
      </div>
    </div>
  );
}

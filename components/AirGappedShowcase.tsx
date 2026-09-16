"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AirGappedShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // =========================================================================
  // BULLETPROOF STAGES (h-[850vh]):
  //
  // 1. WI-FI SWITCH: [0.00 - 0.24]
  //    - ON: 0.00 - 0.08
  //    - Flips OFF: 0.08 - 0.14
  //    - OFF: 0.14 - 0.20
  //    - Fades out: 0.20 - 0.24
  //
  // 2. TEXT 1: [0.24 - 0.48]
  //    - Fades in: 0.24 - 0.28
  //    - Dwell: 0.28 - 0.44
  //    - Fades out: 0.44 - 0.48
  //
  // 3. LOCAL LLM SWITCH (QWEN CODER): [0.48 - 0.84]
  //    - Standby (OFF) enters: 0.48 - 0.52
  //    - Standby Dwell: 0.52 - 0.60
  //    - Flipping to ON: 0.60 - 0.66
  //    - ACTIVE (ON) LOCKED DWELL: 0.66 - 0.80  <-- EXTENDED & SOLID!
  //    - Fades out: 0.80 - 0.84
  //
  // 4. TEXT 2: [0.84 - 1.00]
  //    - Fades in: 0.84 - 0.88
  //    - Dwell: 0.88 - 1.00
  // =========================================================================

  // --- STAGE 1: WI-FI (ON -> OFF) ---
  const s1ThumbProgress = useTransform(scrollYProgress, [0.08, 0.14], [1, 0], { clamp: true });
  const s1TrackBg = useTransform(scrollYProgress, [0.08, 0.14], ["#0f121d", "#f8f5f2"], { clamp: true });
  const s1TrackBorder = useTransform(scrollYProgress, [0.08, 0.14], ["rgba(37, 99, 235, 0.45)", "rgba(251, 146, 60, 0.4)"], { clamp: true });
  const s1ThumbBg = useTransform(scrollYProgress, [0.08, 0.14], [
    "linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)",
    "linear-gradient(135deg, #fb923c 0%, #ea580c 100%)",
  ], { clamp: true });
  const s1TextLeftOpacity = useTransform(scrollYProgress, [0.08, 0.11], [1, 0], { clamp: true });
  const s1TextRightOpacity = useTransform(scrollYProgress, [0.11, 0.14], [0, 1], { clamp: true });
  const s1SlashPathLength = useTransform(scrollYProgress, [0.09, 0.14], [0, 1], { clamp: true });
  const s1SlashOpacity = useTransform(scrollYProgress, [0.085, 0.10], [0, 1], { clamp: true });

  const s1Opacity = useTransform(scrollYProgress, [0.20, 0.24], [1, 0], { clamp: true });
  const s1Scale = useTransform(scrollYProgress, [0.20, 0.24], [1, 0.85], { clamp: true });
  const s1Y = useTransform(scrollYProgress, [0.20, 0.24], [0, -30], { clamp: true });
  const s1Display = useTransform(scrollYProgress, (v) => (v < 0.24 ? "flex" : "none"));

  // --- STAGE 2: TEXT 1 ---
  const text1Opacity = useTransform(scrollYProgress, [0.24, 0.28, 0.44, 0.48], [0, 1, 1, 0], { clamp: true });
  const text1Y = useTransform(scrollYProgress, [0.24, 0.28, 0.44, 0.48], [35, 0, 0, -35], { clamp: true });
  const text1Scale = useTransform(scrollYProgress, [0.24, 0.28, 0.44, 0.48], [0.95, 1, 1, 0.95], { clamp: true });
  const text1Blur = useTransform(scrollYProgress, [0.24, 0.28, 0.44, 0.48], [10, 0, 0, 10], { clamp: true });
  const text1Filter = useTransform(text1Blur, (b) => `blur(${b}px)`);
  const text1Display = useTransform(scrollYProgress, (v) => (v >= 0.23 && v < 0.48 ? "flex" : "none"));

  // --- STAGE 3: QWEN CODER (OFF -> ON) ---
  const s2OffOpacity = useTransform(scrollYProgress, [0.48, 0.52, 0.60, 0.64], [0, 1, 1, 0], { clamp: true });
  const s2OffDisplay = useTransform(scrollYProgress, (v) => (v >= 0.47 && v < 0.64 ? "flex" : "none"));

  const s2OnOpacity = useTransform(scrollYProgress, [0.60, 0.64, 0.80, 0.84], [0, 1, 1, 0], { clamp: true });
  const s2OnThumbProgress = useTransform(scrollYProgress, [0.60, 0.65], [0, 1], { clamp: true });
  const s2OnScale = useTransform(scrollYProgress, [0.80, 0.84], [1, 0.85], { clamp: true });
  const s2OnY = useTransform(scrollYProgress, [0.80, 0.84], [0, -30], { clamp: true });
  const s2OnDisplay = useTransform(scrollYProgress, (v) => (v >= 0.59 && v < 0.84 ? "flex" : "none"));

  // --- STAGE 4: TEXT 2 ---
  const text2Opacity = useTransform(scrollYProgress, [0.84, 0.88], [0, 1], { clamp: true });
  const text2Y = useTransform(scrollYProgress, [0.84, 0.88], [35, 0], { clamp: true });
  const text2Scale = useTransform(scrollYProgress, [0.84, 0.88], [0.95, 1], { clamp: true });
  const text2Blur = useTransform(scrollYProgress, [0.84, 0.88], [10, 0], { clamp: true });
  const text2Filter = useTransform(text2Blur, (b) => `blur(${b}px)`);
  const text2Display = useTransform(scrollYProgress, (v) => (v >= 0.83 ? "flex" : "none"));

  return (
    <section
      ref={containerRef}
      className="relative h-[850vh] bg-[#07080c] overflow-clip"
    >
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 select-none">
        <div className="absolute w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

        {/* ================= 1. SWITCH 1: WI-FI ================= */}
        <motion.div
          style={{ opacity: s1Opacity, scale: s1Scale, y: s1Y, display: s1Display }}
          className="absolute z-20 flex items-center justify-center scale-[0.78] sm:scale-100 origin-center"
        >
          <motion.div
            style={{ backgroundColor: s1TrackBg, borderColor: s1TrackBorder }}
            className="relative w-[380px] sm:w-[420px] h-[130px] sm:h-[140px] rounded-full border p-[10px] sm:p-[12px] flex items-center overflow-hidden shadow-2xl"
          >
            <motion.div style={{ opacity: s1TextLeftOpacity }} className="absolute left-8 sm:left-12 flex flex-col items-start pointer-events-none">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white">Wi-Fi</span>
              <span className="text-[11px] font-mono text-cyan-400 font-semibold tracking-wider uppercase">Connected</span>
            </motion.div>

            <motion.div style={{ opacity: s1TextRightOpacity }} className="absolute right-8 sm:right-12 flex flex-col items-end pointer-events-none">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-800">Wi-Fi</span>
              <span className="text-[11px] font-mono text-rose-500 font-semibold tracking-wider uppercase">Severed</span>
            </motion.div>

            <motion.div
              style={{
                x: useTransform(s1ThumbProgress, (p) => p * 258),
                background: s1ThumbBg,
              }}
              className="relative w-[110px] sm:w-[116px] h-[110px] sm:h-[116px] rounded-full flex items-center justify-center will-change-transform shrink-0 z-10 shadow-lg"
            >
              <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="24" cy="36" r="2.5" fill="currentColor" />
                <path d="M17 29 C19.5 26.5, 28.5 26.5, 31 29" />
                <path d="M11 23 C16 18, 32 18, 37 23" />
                <path d="M5 17 C13 9, 35 9, 43 17" />
                <motion.line x1="8" y1="8" x2="40" y2="40" stroke="#ffffff" strokeWidth="4" style={{ pathLength: s1SlashPathLength, opacity: s1SlashOpacity }} />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ================= 2. TEXT 1 ================= */}
        <motion.div
          style={{
            opacity: text1Opacity,
            y: text1Y,
            scale: text1Scale,
            filter: text1Filter,
            display: text1Display,
          }}
          className="absolute z-20 flex flex-col items-center justify-center text-center max-w-4xl px-4 pointer-events-none"
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.03em] text-white leading-[1.08]">
            Turn the Wi-Fi off. <br className="hidden sm:inline" />
            Not the coding.
          </h2>
        </motion.div>

        {/* ================= 3A. SWITCH 2: STANDBY (OFF) ================= */}
        <motion.div
          style={{ opacity: s2OffOpacity, display: s2OffDisplay }}
          className="absolute z-20 flex items-center justify-center scale-[0.78] sm:scale-100 origin-center"
        >
          <div className="relative w-[380px] sm:w-[420px] h-[130px] sm:h-[140px] rounded-full border border-slate-300 bg-[#f4efe9] p-[10px] sm:p-[12px] flex items-center overflow-hidden shadow-2xl">
            {/* Standby Label */}
            <div className="absolute right-8 sm:right-12 flex flex-col items-end pointer-events-none select-none">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-800">Qwen Coder</span>
              <span className="text-[11px] font-mono text-amber-600 font-semibold tracking-wider uppercase">Standby</span>
            </div>

            {/* Standby Thumb (Stationary Left) */}
            <div
              style={{
                background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                boxShadow: "0 10px 25px -4px rgba(217, 119, 6, 0.5)",
              }}
              className="relative w-[110px] sm:w-[116px] h-[110px] sm:h-[116px] rounded-full flex items-center justify-center shrink-0 z-20"
            >
              <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                <line x1="12" y1="2" x2="12" y2="12" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* ================= 3B. SWITCH 2: ACTIVE (ON) - PURE, CRISP & SOLID ================= */}
        <motion.div
          style={{ opacity: s2OnOpacity, scale: s2OnScale, y: s2OnY, display: s2OnDisplay }}
          className="absolute z-20 flex items-center justify-center scale-[0.78] sm:scale-100 origin-center"
        >
          <div className="relative w-[380px] sm:w-[420px] h-[130px] sm:h-[140px] rounded-full border border-emerald-500/50 bg-[#0a0d14] p-[10px] sm:p-[12px] flex items-center overflow-hidden shadow-[0_25px_60px_-10px_rgba(0,0,0,0.9),0_0_50px_rgba(16,185,129,0.25)]">
            {/* Active Label */}
            <div className="absolute left-8 sm:left-12 flex flex-col items-start pointer-events-none select-none">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white">Qwen Coder</span>
              <span className="text-[11px] font-mono text-emerald-400 font-semibold tracking-wider uppercase">Active • Local</span>
            </div>

            {/* Active Sliding Thumb */}
            <motion.div
              style={{
                x: useTransform(s2OnThumbProgress, (p) => p * 258),
                background: "linear-gradient(135deg, #34d399 0%, #059669 100%)",
                boxShadow: "0 10px 30px -4px rgba(16, 185, 129, 0.8), 0 0 25px rgba(52, 211, 153, 0.6)",
              }}
              className="relative w-[110px] sm:w-[116px] h-[110px] sm:h-[116px] rounded-full flex items-center justify-center will-change-transform shrink-0 z-20"
            >
              <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M26 6 L12 26 L24 26 L22 42 L36 22 L24 22 Z" fill="rgba(255, 255, 255, 0.3)" />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* ================= 4. TEXT 2 ================= */}
        <motion.div
          style={{
            opacity: text2Opacity,
            y: text2Y,
            scale: text2Scale,
            filter: text2Filter,
            display: text2Display,
          }}
          className="absolute z-20 flex flex-col items-center justify-center text-center max-w-4xl px-4 pointer-events-none"
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.03em] text-white leading-[1.08]">
            0 cost. <br className="hidden sm:inline" />
            Unlimited generations.
          </h2>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Sparkles, Palette, Code2, Bug, Server, Crown, CheckCircle2 } from "lucide-react";

export default function AgentCircuitFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // =========================================================================
  // STAGE 1: DEVRE AKIŞI (0.00 -> 0.58)
  // 1. KUTU 0: "create a wonderful project" (X: 0, Y: 180)
  // 2. Hat 1: Kutu 0 -> %30 ayrım noktası (X: 320, Y: 180)
  // 3. Hat 2A & 2B: UX Designer (Y: 80) & Coder (Y: 280)
  // 4. Hat 3: Coder -> QA Tester (Y: 280)
  // 5. Hat 4: QA Tester -> DevOps (Y: 280)
  // 6. Hat 5: DevOps & UX -> CEO (X: 1040, Y: 180)
  // 7. Hat 6: CEO -> Alt kablo ile sola dönüp USER'a geri döner
  //    Ortasında "DELIVERED TO USER" rozeti parıldayarak açılır!
  //
  // STAGE 2: GEÇİŞ (0.58 -> 0.65)
  // - Devre hafifçe yukarı/küçülerek söner.
  //
  // STAGE 3: PUNCHLINE REVEAL (0.64 -> 0.96)
  // - Diğer bölümler gibi saf beyaz Hero fontu: "A loop that thinks for you."
  // =========================================================================

  // Kutu 0: "create a wonderful project"
  const boxStartOpacity = useTransform(smoothProgress, [0.02, 0.08], [0, 1], { clamp: true });
  const boxStartX = useTransform(smoothProgress, [0.02, 0.08], [-30, 0], { clamp: true });

  // Hat 1: Kutu 0 -> X: 320
  const line1 = useTransform(smoothProgress, [0.06, 0.16], [0, 1], { clamp: true });

  // Hat 2A: Yukarı 90° kırılım -> UX Designer
  const lineUX = useTransform(smoothProgress, [0.14, 0.24], [0, 1], { clamp: true });
  // Hat 2B: Aşağı 90° kırılım -> Coder
  const lineCoder = useTransform(smoothProgress, [0.14, 0.24], [0, 1], { clamp: true });

  // Kutular: UX Designer & Coder
  const boxUXOpacity = useTransform(smoothProgress, [0.20, 0.28], [0, 1], { clamp: true });
  const boxUXX = useTransform(smoothProgress, [0.20, 0.28], [-25, 0], { clamp: true });

  const boxCoderOpacity = useTransform(smoothProgress, [0.20, 0.28], [0, 1], { clamp: true });
  const boxCoderX = useTransform(smoothProgress, [0.20, 0.28], [-25, 0], { clamp: true });

  // Hat 3: Coder -> QA Tester
  const lineQA = useTransform(smoothProgress, [0.26, 0.36], [0, 1], { clamp: true });
  const boxQAOpacity = useTransform(smoothProgress, [0.32, 0.38], [0, 1], { clamp: true });
  const boxQAX = useTransform(smoothProgress, [0.32, 0.38], [-25, 0], { clamp: true });

  // Hat 4: QA Tester -> DevOps
  const lineDevOps = useTransform(smoothProgress, [0.38, 0.46], [0, 1], { clamp: true });
  const boxDevOpsOpacity = useTransform(smoothProgress, [0.42, 0.48], [0, 1], { clamp: true });
  const boxDevOpsX = useTransform(smoothProgress, [0.42, 0.48], [-25, 0], { clamp: true });

  // Hat 5: DevOps & UX -> CEO
  const lineCEO = useTransform(smoothProgress, [0.46, 0.54], [0, 1], { clamp: true });
  const boxCEOOpacity = useTransform(smoothProgress, [0.50, 0.56], [0, 1], { clamp: true });
  const boxCEOX = useTransform(smoothProgress, [0.50, 0.56], [-25, 0], { clamp: true });

  // Hat 6: CEO'dan çıkan alt hat -> Sola dönüp USER'a geri döner
  const lineDeliver = useTransform(smoothProgress, [0.54, 0.65], [0, 1], { clamp: true });

  // Ortadaki "Delivered to User" rozeti
  const deliverBadgeOpacity = useTransform(smoothProgress, [0.60, 0.67], [0, 1], { clamp: true });
  const deliverBadgeScale = useTransform(smoothProgress, [0.60, 0.67], [0.85, 1], { clamp: true });

  // Circuit Stage Out (0.68 -> 0.73)
  const circuitOpacity = useTransform(smoothProgress, [0.68, 0.73], [1, 0], { clamp: true });
  const circuitY = useTransform(smoothProgress, [0.68, 0.73], [0, -35], { clamp: true });
  const circuitScale = useTransform(smoothProgress, [0.68, 0.73], [1, 0.95], { clamp: true });
  const circuitDisplay = useTransform(smoothProgress, (v: number) => (v < 0.73 ? "flex" : "none"));

  // PUNCHLINE (0.72 -> 0.96): "A loop that thinks for you."
  const textOpacity = useTransform(smoothProgress, [0.72, 0.77, 0.93, 0.97], [0, 1, 1, 0], { clamp: true });
  const textY = useTransform(smoothProgress, [0.72, 0.77, 0.93, 0.97], [35, 0, 0, -35], { clamp: true });
  const textScale = useTransform(smoothProgress, [0.72, 0.77, 0.93, 0.97], [0.95, 1, 1, 0.95], { clamp: true });
  const textBlur = useTransform(smoothProgress, [0.72, 0.77, 0.93, 0.97], [8, 0, 0, 8], { clamp: true });
  const textFilter = useTransform(textBlur, (b) => `blur(${b}px)`);
  const textDisplay = useTransform(smoothProgress, (v: number) => (v >= 0.71 && v < 0.97 ? "flex" : "none"));

  return (
    <section
      ref={containerRef}
      className="relative h-[440vh] bg-[#07080c] overflow-clip select-none"
    >
      {/* Sticky Fullscreen Center Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden px-4 sm:px-8">
        
        {/* Background Subtle Ambient Glow */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[850px] h-[450px] bg-cyan-600/5 rounded-full blur-[180px] pointer-events-none -z-10" />

        {/* ================= 1. THE CIRCUIT STAGE ================= */}
        <motion.div
          style={{
            opacity: circuitOpacity,
            y: circuitY,
            scale: circuitScale,
            display: circuitDisplay,
          }}
          className="w-full max-w-7xl flex flex-col justify-center items-center overflow-hidden px-2 sm:px-6"
        >
          {/* SVG Circuit Canvas and Interactive Agent Nodes - Responsive Scaled Container */}
          <div className="relative w-[1200px] h-[520px] origin-center scale-[0.3] min-[420px]:scale-[0.38] min-[520px]:scale-[0.48] sm:scale-[0.62] md:scale-[0.78] lg:scale-[0.92] xl:scale-100 transition-transform">
            
            {/* ORTHOGONAL SVG CIRCUIT */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              viewBox="0 0 1200 520"
              fill="none"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="circuitNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#38bdf8" floodOpacity="0.9" />
                  <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#0284c7" floodOpacity="0.5" />
                </filter>
              </defs>

              {/* 1. "create a wonderful project" (X: 195) -> %30 ayrımı (X: 320) */}
              <motion.path
                d="M 195 180 L 320 180"
                stroke="#38bdf8"
                strokeWidth="2.5"
                filter="url(#circuitNeonGlow)"
                style={{ pathLength: line1 }}
              />

              {/* 2A. Yukarı 90° kırılım: -> UX Designer */}
              <motion.path
                d="M 320 180 L 320 80 L 390 80"
                stroke="#38bdf8"
                strokeWidth="2.5"
                fill="none"
                filter="url(#circuitNeonGlow)"
                style={{ pathLength: lineUX }}
              />

              {/* 2B. Aşağı 90° kırılım: -> Coder */}
              <motion.path
                d="M 320 180 L 320 280 L 390 280"
                stroke="#38bdf8"
                strokeWidth="2.5"
                fill="none"
                filter="url(#circuitNeonGlow)"
                style={{ pathLength: lineCoder }}
              />

              {/* 3. Coder (X:530) -> QA Tester (X:620) (Düz hat) */}
              <motion.path
                d="M 530 280 L 620 280"
                stroke="#38bdf8"
                strokeWidth="2.5"
                filter="url(#circuitNeonGlow)"
                style={{ pathLength: lineQA }}
              />

              {/* 4. QA Tester (X:750) -> DevOps (X:840) (Düz hat) */}
              <motion.path
                d="M 750 280 L 840 280"
                stroke="#38bdf8"
                strokeWidth="2.5"
                filter="url(#circuitNeonGlow)"
                style={{ pathLength: lineDevOps }}
              />

              {/* 5A. DevOps -> CEO */}
              <motion.path
                d="M 960 280 L 1000 280 L 1000 180 L 1040 180"
                stroke="#38bdf8"
                strokeWidth="2.5"
                fill="none"
                filter="url(#circuitNeonGlow)"
                style={{ pathLength: lineCEO }}
              />

              {/* 5B. UX -> CEO */}
              <motion.path
                d="M 530 80 L 1000 80 L 1000 180"
                stroke="#38bdf8"
                strokeWidth="2"
                fill="none"
                filter="url(#circuitNeonGlow)"
                style={{ pathLength: lineCEO }}
              />

              {/* 6. CEO -> USER LOOPBACK */}
              <motion.path
                d="M 1120 180 L 1150 180 L 1150 440 L 95 440 L 95 215"
                stroke="#38bdf8"
                strokeWidth="2.5"
                fill="none"
                filter="url(#circuitNeonGlow)"
                style={{ pathLength: lineDeliver }}
              />
            </svg>

            {/* ================= DEVRE ÜZERİNDEKİ KUTULAR ================= */}
            
            {/* KUTU 0: create a wonderful project (USER TRIGGER) */}
            <motion.div
              style={{ opacity: boxStartOpacity, x: boxStartX }}
              className="absolute left-0 top-[180px] -translate-y-1/2 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-white/[0.08] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white tracking-tight">create a wonderful project</span>
                <span className="text-[11px] font-mono text-slate-400">User Prompt Intent</span>
              </div>
            </motion.div>

            {/* KUTU 1A: UX Designer */}
            <motion.div
              style={{ opacity: boxUXOpacity, x: boxUXX }}
              className="absolute left-[33%] top-[80px] -translate-y-1/2 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center">
                <Palette className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white tracking-tight">UX Designer</span>
                <span className="text-[11px] font-mono text-slate-400">Design System Spec</span>
              </div>
            </motion.div>

            {/* KUTU 1B: Coder */}
            <motion.div
              style={{ opacity: boxCoderOpacity, x: boxCoderX }}
              className="absolute left-[33%] top-[280px] -translate-y-1/2 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white tracking-tight">Coder</span>
                <span className="text-[11px] font-mono text-slate-400">Implementation AST</span>
              </div>
            </motion.div>

            {/* KUTU 2: QA Tester */}
            <motion.div
              style={{ opacity: boxQAOpacity, x: boxQAX }}
              className="absolute left-[51%] top-[280px] -translate-y-1/2 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center">
                <Bug className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white tracking-tight">QA Tester</span>
                <span className="text-[11px] font-mono text-slate-400">Synthesize Tests</span>
              </div>
            </motion.div>

            {/* KUTU 3: DevOps */}
            <motion.div
              style={{ opacity: boxDevOpsOpacity, x: boxDevOpsX }}
              className="absolute left-[69%] top-[280px] -translate-y-1/2 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center">
                <Server className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white tracking-tight">DevOps</span>
                <span className="text-[11px] font-mono text-slate-400">Air-Gap Runtime</span>
              </div>
            </motion.div>

            {/* KUTU 4: CEO */}
            <motion.div
              style={{ opacity: boxCEOOpacity, x: boxCEOX }}
              className="absolute left-[86%] top-[180px] -translate-y-1/2 flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.08] shadow-[0_15px_35px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.08] flex items-center justify-center">
                <Crown className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white tracking-tight">CEO</span>
                <span className="text-[11px] font-mono text-white/90 font-medium">Consensus Approved</span>
              </div>
            </motion.div>

            {/* ALT KABLODAKİ ROZET: "Delivered to User" */}
            <motion.div
              style={{
                opacity: deliverBadgeOpacity,
                scale: deliverBadgeScale,
              }}
              className="absolute left-1/2 -translate-x-1/2 top-[440px] -translate-y-1/2 flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#0c101a] border border-cyan-400/50 shadow-[0_0_25px_rgba(56,189,248,0.4)] backdrop-blur-xl"
            >
              <CheckCircle2 className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-xs font-mono font-semibold tracking-wider text-white uppercase">
                Delivered to User
              </span>
            </motion.div>

          </div>
        </motion.div>

        {/* ================= 2. PUNCHLINE REVEAL (Hero Font, Clean, Just Headline, Long Linger) ================= */}
        <motion.div
          style={{
            opacity: textOpacity,
            y: textY,
            scale: textScale,
            filter: textFilter,
            display: textDisplay,
          }}
          className="absolute z-20 flex flex-col items-center justify-center text-center max-w-4xl px-4 pointer-events-none"
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.03em] text-white leading-[1.08]">
            A loop that thinks for you.
          </h2>
        </motion.div>

      </div>
    </section>
  );
}

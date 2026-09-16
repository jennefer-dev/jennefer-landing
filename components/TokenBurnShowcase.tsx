"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, Loader2, AlertTriangle } from "lucide-react";

export default function TokenBurnShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // =========================================================================
  // EXTENDED SEQUENTIAL AGENTIC TASKS & TOKEN METER (h-[480vh]):
  //
  // Stage 1 (0.00 - 0.52):
  //   - Left Editor: Pure black with macOS traffic lights.
  //     Tasks trigger sequentially with ample scroll distance:
  //     1. "Parsing AST & extracting project graph"
  //     2. "Analyzing UI layouts & image mockups"
  //     3. "Refactoring monolithic core architecture"
  //     4. "Synthesizing autonomous unit test suites"
  //     5. "Simulating edge-case network latency & stress"
  //     6. "Generating semantic API contract documentation"
  //     7. "Verifying air-gapped local compilation"
  //
  //   - Popup at bottom of editor (0.45 - 0.58):
  //     "Rate limit exceeded / Outage detected" with a simple white button "Enable Outage".
  //
  // Stage 2 (0.52 - 0.58):
  //   - Left editor & right meter linger at max count, then smoothly exit.
  //
  // Stage 3 (0.58 - 0.96):
  //   - "No more token counting." lingers in center for a long scroll duration.
  // =========================================================================

  // Task 1: 0.04 -> 0.10
  const task1Opacity = useTransform(scrollYProgress, [0.03, 0.06], [0, 1], { clamp: true });
  const task1Spinner = useTransform(scrollYProgress, (v) => (v < 0.10 ? 1 : 0));
  const task1Check = useTransform(scrollYProgress, (v) => (v >= 0.10 ? 1 : 0));

  // Task 2: 0.10 -> 0.16
  const task2Opacity = useTransform(scrollYProgress, [0.09, 0.12], [0, 1], { clamp: true });
  const task2Spinner = useTransform(scrollYProgress, (v) => (v < 0.16 ? 1 : 0));
  const task2Check = useTransform(scrollYProgress, (v) => (v >= 0.16 ? 1 : 0));

  // Task 3: 0.16 -> 0.22
  const task3Opacity = useTransform(scrollYProgress, [0.15, 0.18], [0, 1], { clamp: true });
  const task3Spinner = useTransform(scrollYProgress, (v) => (v < 0.22 ? 1 : 0));
  const task3Check = useTransform(scrollYProgress, (v) => (v >= 0.22 ? 1 : 0));

  // Task 4: 0.22 -> 0.28
  const task4Opacity = useTransform(scrollYProgress, [0.21, 0.24], [0, 1], { clamp: true });
  const task4Spinner = useTransform(scrollYProgress, (v) => (v < 0.28 ? 1 : 0));
  const task4Check = useTransform(scrollYProgress, (v) => (v >= 0.28 ? 1 : 0));

  // Task 5: 0.28 -> 0.34
  const task5Opacity = useTransform(scrollYProgress, [0.27, 0.30], [0, 1], { clamp: true });
  const task5Spinner = useTransform(scrollYProgress, (v) => (v < 0.34 ? 1 : 0));
  const task5Check = useTransform(scrollYProgress, (v) => (v >= 0.34 ? 1 : 0));

  // Task 6: 0.34 -> 0.40
  const task6Opacity = useTransform(scrollYProgress, [0.33, 0.36], [0, 1], { clamp: true });
  const task6Spinner = useTransform(scrollYProgress, (v) => (v < 0.40 ? 1 : 0));
  const task6Check = useTransform(scrollYProgress, (v) => (v >= 0.40 ? 1 : 0));

  // Task 7: 0.40 -> 0.46
  const task7Opacity = useTransform(scrollYProgress, [0.39, 0.42], [0, 1], { clamp: true });
  const task7Spinner = useTransform(scrollYProgress, (v) => (v < 0.46 ? 1 : 0));
  const task7Check = useTransform(scrollYProgress, (v) => (v >= 0.46 ? 1 : 0));

  // Popup button "Enable Outage" in editor: appears at 0.44 and stays visible
  const popupOpacity = useTransform(scrollYProgress, [0.44, 0.47], [0, 1], { clamp: true });
  const popupY = useTransform(scrollYProgress, [0.44, 0.47], [12, 0], { clamp: true });

  // Token counter: finishes accelerating at 0.46, then holds/lingers until 0.54
  const tokenVal = useTransform(
    scrollYProgress,
    [0.04, 0.46, 0.54],
    [12400, 4820000, 4820000],
    { clamp: true }
  );

  // Color ramp: White -> Green -> Yellow -> Orange -> Red (reaches red at 0.46)
  const numberColor = useTransform(
    scrollYProgress,
    [0.04, 0.15, 0.26, 0.37, 0.46],
    ["#ffffff", "#22c55e", "#eab308", "#f97316", "#ef4444"],
    { clamp: true }
  );

  // Widget transition out: lingers after counting finishes (0.46 to 0.54), then fades out (0.54 -> 0.58)
  const widgetOpacity = useTransform(scrollYProgress, [0.54, 0.58], [1, 0], { clamp: true });
  const widgetY = useTransform(scrollYProgress, [0.54, 0.58], [0, -30], { clamp: true });
  const widgetScale = useTransform(scrollYProgress, [0.54, 0.58], [1, 0.95], { clamp: true });
  const widgetDisplay = useTransform(scrollYProgress, (v) => (v < 0.58 ? "flex" : "none"));

  // Punchline text: Enters at 0.58, stays rock solid ALL THE WAY to 0.95!
  const textOpacity = useTransform(scrollYProgress, [0.58, 0.63, 0.93, 0.97], [0, 1, 1, 0], { clamp: true });
  const textY = useTransform(scrollYProgress, [0.58, 0.63, 0.93, 0.97], [35, 0, 0, -35], { clamp: true });
  const textScale = useTransform(scrollYProgress, [0.58, 0.63, 0.93, 0.97], [0.95, 1, 1, 0.95], { clamp: true });
  const textBlur = useTransform(scrollYProgress, [0.58, 0.63, 0.93, 0.97], [10, 0, 0, 10], { clamp: true });
  const textFilter = useTransform(textBlur, (b) => `blur(${b}px)`);
  const textDisplay = useTransform(scrollYProgress, (v) => (v >= 0.56 && v < 0.97 ? "flex" : "none"));

  return (
    <section
      ref={containerRef}
      className="relative h-[480vh] bg-[#07080c] overflow-clip"
    >
      {/* Sticky Fullscreen Center Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-8 md:px-12 select-none">
        
        {/* Subtle Backdrop Glow */}
        <div className="absolute w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

        {/* ================= 1. THE AGENTIC TASKS WIDGET ================= */}
        <motion.div
          style={{
            opacity: widgetOpacity,
            y: widgetY,
            scale: widgetScale,
            display: widgetDisplay,
          }}
          className="absolute z-20 w-full max-w-4xl px-4 sm:px-6 md:px-10 flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-12"
        >
          {/* LEFT: Pure Black Editor with Traffic Lights, Agentic Tasks & Outage Popup */}
          <div className="flex-1 w-full rounded-2xl bg-[#000000] border border-white/[0.12] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] font-mono text-xs flex flex-col">
            {/* macOS Traffic Lights */}
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-white/[0.08]">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>

            {/* Sequential Agentic Tasks */}
            <div className="space-y-3">
              {/* Task 1 */}
              <motion.div style={{ opacity: task1Opacity }} className="flex items-center gap-3 text-slate-300">
                <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
                  <motion.div style={{ opacity: task1Spinner }} className="absolute text-cyan-400">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  </motion.div>
                  <motion.div style={{ opacity: task1Check }} className="absolute text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                  </motion.div>
                </div>
                <span>Parsing AST & extracting project graph</span>
              </motion.div>

              {/* Task 2 */}
              <motion.div style={{ opacity: task2Opacity }} className="flex items-center gap-3 text-slate-300">
                <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
                  <motion.div style={{ opacity: task2Spinner }} className="absolute text-cyan-400">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  </motion.div>
                  <motion.div style={{ opacity: task2Check }} className="absolute text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                  </motion.div>
                </div>
                <span>Analyzing UI layouts & image mockups</span>
              </motion.div>

              {/* Task 3 */}
              <motion.div style={{ opacity: task3Opacity }} className="flex items-center gap-3 text-slate-300">
                <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
                  <motion.div style={{ opacity: task3Spinner }} className="absolute text-cyan-400">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  </motion.div>
                  <motion.div style={{ opacity: task3Check }} className="absolute text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                  </motion.div>
                </div>
                <span>Refactoring monolithic core architecture</span>
              </motion.div>

              {/* Task 4 */}
              <motion.div style={{ opacity: task4Opacity }} className="flex items-center gap-3 text-slate-300">
                <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
                  <motion.div style={{ opacity: task4Spinner }} className="absolute text-cyan-400">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  </motion.div>
                  <motion.div style={{ opacity: task4Check }} className="absolute text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                  </motion.div>
                </div>
                <span>Synthesizing autonomous unit test suites</span>
              </motion.div>

              {/* Task 5 */}
              <motion.div style={{ opacity: task5Opacity }} className="flex items-center gap-3 text-slate-300">
                <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
                  <motion.div style={{ opacity: task5Spinner }} className="absolute text-cyan-400">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  </motion.div>
                  <motion.div style={{ opacity: task5Check }} className="absolute text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                  </motion.div>
                </div>
                <span>Simulating edge-case network latency & stress</span>
              </motion.div>

              {/* Task 6 */}
              <motion.div style={{ opacity: task6Opacity }} className="flex items-center gap-3 text-slate-300">
                <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
                  <motion.div style={{ opacity: task6Spinner }} className="absolute text-cyan-400">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  </motion.div>
                  <motion.div style={{ opacity: task6Check }} className="absolute text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                  </motion.div>
                </div>
                <span>Generating semantic API contract documentation</span>
              </motion.div>

              {/* Task 7 */}
              <motion.div style={{ opacity: task7Opacity }} className="flex items-center gap-3 text-slate-300">
                <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
                  <motion.div style={{ opacity: task7Spinner }} className="absolute text-cyan-400">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  </motion.div>
                  <motion.div style={{ opacity: task7Check }} className="absolute text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                  </motion.div>
                </div>
                <span>Verifying air-gapped local compilation</span>
              </motion.div>
            </div>

            {/* POPUP: Simple white button "enable outage" after tasks */}
            <motion.div
              style={{ opacity: popupOpacity, y: popupY }}
              className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between"
            >
              <div className="flex items-center gap-2 text-rose-400 text-[11px]">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Token Limit Exceeded</span>
              </div>
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg bg-white text-black font-sans font-medium text-xs shadow-sm hover:bg-neutral-200 transition-colors"
              >
                enable outage
              </button>
            </motion.div>
          </div>

          {/* RIGHT: Borderless, Transparent, Minimal Token Cost */}
          <div className="flex flex-col justify-center items-start pl-2 md:pl-0 min-w-[200px]">
            {/* White Title */}
            <span className="text-xs font-mono tracking-wider text-white uppercase select-none mb-2">
              token cost
            </span>

            {/* Meter Number Shifting White -> Green -> Yellow -> Orange -> Red */}
            <motion.div
              style={{ color: numberColor }}
              className="text-4xl sm:text-5xl font-mono font-bold tracking-tight"
            >
              {useFormatNumber(tokenVal)}
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
            No more token counting.
          </h2>
        </motion.div>

      </div>
    </section>
  );
}

function useFormatNumber(val: any) {
  const [formatted, setFormatted] = React.useState("12,400");

  React.useEffect(() => {
    return val.on("change", (latest: number) => {
      setFormatted(Math.floor(latest).toLocaleString("en-US"));
    });
  }, [val]);

  return formatted;
}

"use client";

import { useRef } from "react";
import { motion, MotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUp, BatteryFull, Check, ChevronDown, CloudOff, Cpu, HardDrive, MousePointer2, Volume2, Wifi, WifiOff } from "lucide-react";
import StoryFrame from "./StoryFrame";

function TaskbarWifiPanel({
  scrollProgress,
  opacity,
  y,
  scale,
  display,
}: {
  scrollProgress: MotionValue<number>;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
  display: MotionValue<"block" | "none">;
}) {
  const flyoutOpacity = useTransform(scrollProgress, [0.055, 0.085, 0.175, 0.205], [0, 1, 1, 0], { clamp: true });
  const flyoutY = useTransform(scrollProgress, [0.055, 0.085, 0.175, 0.205], [14, 0, 0, 14], { clamp: true });
  const flyoutDisplay = useTransform(scrollProgress, (value) => value > 0.055 && value < 0.205 ? "block" : "none");
  const wifiOnOpacity = useTransform(scrollProgress, [0.125, 0.16], [1, 0], { clamp: true });
  const wifiOffOpacity = useTransform(scrollProgress, [0.125, 0.16], [0, 1], { clamp: true });
  const tileColor = useTransform(scrollProgress, [0.125, 0.16], ["#e4e4e6", "#303136"], { clamp: true });
  const trayHighlight = useTransform(scrollProgress, [0.05, 0.085], [0, 1], { clamp: true });
  const cursorOpacity = useTransform(scrollProgress, [0.025, 0.04, 0.175, 0.205], [0, 1, 1, 0], { clamp: true });
  const cursorX = useTransform(scrollProgress, [0.025, 0.055, 0.09, 0.13], [34, 0, 0, -116], { clamp: true });
  const cursorY = useTransform(scrollProgress, [0.025, 0.055, 0.09, 0.13], [24, 0, 0, -125], { clamp: true });
  const cursorScale = useTransform(scrollProgress, [0.055, 0.07, 0.085, 0.13, 0.145], [1, 0.78, 1, 0.78, 1], { clamp: true });

  return (
    <motion.div style={{ opacity, y, scale, display }} className="absolute z-20 w-full max-w-[800px] px-5 sm:px-8">
      <div className="relative h-[390px] overflow-hidden rounded-xl border border-white/15 bg-[#141518] shadow-[0_30px_90px_rgba(0,0,0,0.4)] sm:h-[440px]">
        <div className="flex h-12 items-center justify-between border-b border-white/10 bg-[#1a1b1e] px-5">
          <span className="text-sm font-semibold text-[#e8e8eb]">Jennefer <span className="ml-2 font-normal text-[#85868c]">/ Workspace</span></span>
          <span className="flex items-center gap-2 text-xs text-[#a7a8ae]"><span className="h-1.5 w-1.5 rounded-full bg-white" /> Running</span>
        </div>

        <div className="absolute inset-x-5 bottom-[78px] top-[68px] flex overflow-hidden rounded-md border border-white/10 bg-[#101114] sm:inset-x-8">
          <div className="hidden w-36 shrink-0 border-r border-white/10 p-4 sm:block">
            <div className="text-xs font-semibold text-[#c5c6cb]">Project</div>
            <div className="mt-6 space-y-4"><div className="h-2 w-20 rounded-full bg-white/15" /><div className="h-2 w-24 rounded-full bg-white/10" /><div className="h-2 w-16 rounded-full bg-white/10" /></div>
          </div>
          <div className="min-w-0 flex-1 p-5 sm:p-7">
            <span className="text-xs text-[#91929a]">Engineering workspace</span>
            <h3 className="mt-2 text-[clamp(1.5rem,4vw,2.2rem)] font-semibold tracking-[-0.05em] text-white">Keep building.</h3>
            <div className="mt-8 max-w-sm space-y-3"><div className="h-2 w-4/5 rounded-full bg-white/10" /><div className="h-2 w-3/5 rounded-full bg-white/10" /><div className="h-2 w-2/3 rounded-full bg-white/10" /></div>
          </div>
        </div>

        <motion.div style={{ opacity: flyoutOpacity, y: flyoutY, display: flyoutDisplay }} className="absolute bottom-[66px] right-3 z-30 w-[min(286px,calc(100%-24px))] rounded-lg border border-white/20 bg-[#222328] p-4 shadow-[0_22px_65px_rgba(0,0,0,0.6)] sm:right-5" aria-hidden="true">
          <div className="mb-3 text-sm font-semibold text-white">Quick settings</div>
          <motion.div style={{ backgroundColor: tileColor }} className="relative h-[66px] overflow-hidden rounded-md">
            <motion.div style={{ opacity: wifiOnOpacity }} className="absolute inset-0 flex items-center gap-3 px-4 text-[#17181b]"><Wifi size={20} /><span className="text-sm font-semibold">Wi-Fi on</span></motion.div>
            <motion.div style={{ opacity: wifiOffOpacity }} className="absolute inset-0 flex items-center gap-3 px-4 text-white"><WifiOff size={20} /><span className="text-sm font-semibold">Wi-Fi off</span></motion.div>
          </motion.div>
          <div className="relative mt-3 h-5 text-xs text-[#abadb4]"><motion.span style={{ opacity: wifiOnOpacity }} className="absolute inset-0">Connected to studio network</motion.span><motion.span style={{ opacity: wifiOffOpacity }} className="absolute inset-0">No network connection</motion.span></div>
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 z-20 flex h-14 items-center justify-between border-t border-white/10 bg-[#1d1e22]/95 px-4 backdrop-blur-md sm:px-5">
          <div className="grid h-8 w-8 place-items-center rounded-md border border-white/15 bg-[#2c2d32] text-sm font-semibold text-white">J</div>
          <div className="flex items-center gap-3 text-[#d2d3d7]">
            <div className="relative grid h-9 w-9 place-items-center rounded-md">
              <motion.div style={{ opacity: trayHighlight }} className="absolute inset-0 rounded-md bg-white/10" />
              <motion.span style={{ opacity: wifiOnOpacity }} className="absolute"><Wifi size={18} /></motion.span>
              <motion.span style={{ opacity: wifiOffOpacity }} className="absolute"><WifiOff size={18} /></motion.span>
            </div>
            <Volume2 size={17} /><BatteryFull size={18} className="hidden sm:block" /><span className="hidden border-l border-white/15 pl-3 text-xs text-[#a8a9b0] sm:block">10:24</span>
          </div>
        </div>
        <motion.span style={{ opacity: cursorOpacity, x: cursorX, y: cursorY, scale: cursorScale }} className="pointer-events-none absolute bottom-[6px] right-[40px] z-40 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] sm:right-[130px]" aria-hidden="true"><MousePointer2 size={24} fill="#18191c" strokeWidth={1.8} /></motion.span>
      </div>
    </motion.div>
  );
}

function ModelSelectPanel({
  scrollProgress,
  opacity,
  y,
  scale,
  display,
}: {
  scrollProgress: MotionValue<number>;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
  display: MotionValue<"block" | "none">;
}) {
  const menuOpacity = useTransform(scrollProgress, [0.55, 0.59, 0.68, 0.72], [0, 1, 1, 0], { clamp: true });
  const menuY = useTransform(scrollProgress, [0.55, 0.59, 0.68, 0.72], [-8, 0, 0, -8], { clamp: true });
  const menuScale = useTransform(scrollProgress, [0.55, 0.59, 0.68, 0.72], [0.97, 1, 1, 0.97], { clamp: true });
  const menuDisplay = useTransform(scrollProgress, (value) => value > 0.55 && value < 0.72 ? "block" : "none");
  const selectedOpacity = useTransform(scrollProgress, [0.66, 0.71], [0, 1], { clamp: true });
  const placeholderOpacity = useTransform(scrollProgress, [0.66, 0.71], [1, 0], { clamp: true });
  const rowHighlight = useTransform(scrollProgress, [0.61, 0.66], [0, 1], { clamp: true });
  const chevronRotate = useTransform(scrollProgress, [0.55, 0.59, 0.68, 0.72], [0, 180, 180, 0], { clamp: true });
  const cursorOpacity = useTransform(scrollProgress, [0.51, 0.53, 0.69, 0.72], [0, 1, 1, 0], { clamp: true });
  const cursorX = useTransform(scrollProgress, [0.51, 0.54, 0.60, 0.64], [230, 210, 210, 140], { clamp: true });
  const cursorY = useTransform(scrollProgress, [0.51, 0.54, 0.60, 0.64], [38, 18, 18, 110], { clamp: true });
  const cursorScale = useTransform(scrollProgress, [0.53, 0.55, 0.57, 0.64, 0.66], [1, 0.78, 1, 0.78, 1], { clamp: true });

  return (
    <motion.div style={{ opacity, y, scale, display }} className="absolute z-20 w-full max-w-[760px] px-5 sm:px-8">
      <div className="relative rounded-xl border border-white/15 bg-[#17181b] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.38)] sm:p-8">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-md border border-white/15 bg-[#25262a] text-white"><Cpu size={18} strokeWidth={1.6} /></span>
            <span className="text-sm font-semibold text-white">Jennefer AI</span>
          </div>
          <span className="flex items-center gap-2 text-xs text-[#b5b5b9]"><span className="h-1.5 w-1.5 rounded-full bg-white" /> Offline workspace</span>
        </div>

        <div className="py-8 sm:py-10">
          <p className="text-sm text-[#a9aab0]">Your workspace is ready</p>
          <h3 className="mt-2 max-w-[540px] text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.06em] text-[#f1f1f1]">Choose a model.<br />Keep building.</h3>
        </div>

        <div className="rounded-md border border-white/15 bg-[#0e0f11] p-4 sm:p-5">
          <div className="min-h-[58px] text-sm text-[#85868e] sm:text-base">Ask Jennefer to work on your code...</div>
          <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-3">
            <div className="relative min-w-0 flex-1">
              <div className="relative flex h-10 w-full max-w-[270px] items-center gap-2 rounded-md border border-white/15 bg-[#1e1f23] px-3 text-sm text-[#dedee1] sm:w-[270px]">
                <HardDrive size={15} className="shrink-0 text-[#b6b7bd]" strokeWidth={1.7} />
                <span className="relative min-w-0 flex-1 overflow-hidden whitespace-nowrap">
                  <motion.span style={{ opacity: placeholderOpacity }} className="absolute inset-0">Select model</motion.span>
                  <motion.span style={{ opacity: selectedOpacity }} className="block">Qwen Coder <span className="text-[#a7a8af]">· Local</span></motion.span>
                </span>
                <motion.span style={{ rotate: chevronRotate }} className="shrink-0 text-[#a7a8af]"><ChevronDown size={15} /></motion.span>
              </div>

              <motion.div
                style={{ opacity: menuOpacity, y: menuY, scale: menuScale, display: menuDisplay }}
                className="absolute left-0 top-[calc(100%+8px)] z-30 w-[min(330px,calc(100vw-70px))] origin-top-left rounded-md border border-white/20 bg-[#222328] p-2 shadow-[0_22px_60px_rgba(0,0,0,0.55)]"
                aria-hidden="true"
              >
                <div className="px-3 py-2 text-xs font-medium text-[#a3a4ab]">Models on this device</div>
                <div className="relative overflow-hidden rounded-sm border border-white/10 px-3 py-3">
                  <motion.div style={{ opacity: rowHighlight }} className="absolute inset-0 bg-white/10" />
                  <div className="relative flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center rounded-sm bg-[#35363b] text-white"><HardDrive size={16} /></span>
                    <span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-white">Qwen Coder</span><span className="block text-xs text-[#acadb4]">Local · Ready</span></span>
                    <motion.span style={{ opacity: rowHighlight }} className="text-white"><Check size={16} /></motion.span>
                  </div>
                </div>
                <div className="mt-1 flex items-center gap-3 px-3 py-3 text-xs text-[#888991]"><CloudOff size={16} /> Cloud models unavailable offline</div>
              </motion.div>
              <motion.span style={{ opacity: cursorOpacity, x: cursorX, y: cursorY, scale: cursorScale }} className="pointer-events-none absolute left-0 top-0 z-40 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" aria-hidden="true"><MousePointer2 size={24} fill="#18191c" strokeWidth={1.8} /></motion.span>
            </div>
            <motion.span style={{ opacity: selectedOpacity }} className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-[#e7e7e9] text-[#111215]"><ArrowUp size={17} strokeWidth={1.8} /></motion.span>
          </div>
        </div>

        <motion.p style={{ opacity: selectedOpacity }} className="mt-4 text-sm text-[#bcbec4]">Qwen Coder is ready on this device.</motion.p>
      </div>
    </motion.div>
  );
}

export default function AirGappedShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 130, damping: 27, mass: 0.7 });

  // The scroll still tells the same story: disconnect, keep working, start the local model.
  const wifiOpacity = useTransform(scrollYProgress, [0.20, 0.24], [1, 0], { clamp: true });
  const wifiY = useTransform(scrollYProgress, [0.20, 0.24], [0, -24], { clamp: true });
  const wifiScale = useTransform(scrollYProgress, [0.20, 0.24], [1, 0.96], { clamp: true });
  const wifiDisplay = useTransform(scrollYProgress, (v) => (v < 0.24 ? "block" : "none"));

  const text1Opacity = useTransform(scrollYProgress, [0.24, 0.28, 0.44, 0.48], [0, 1, 1, 0], { clamp: true });
  const text1Y = useTransform(scrollYProgress, [0.24, 0.28, 0.44, 0.48], [24, 0, 0, -24], { clamp: true });
  const text1Display = useTransform(scrollYProgress, (v) => (v >= 0.23 && v < 0.48 ? "flex" : "none"));

  const modelOpacity = useTransform(scrollYProgress, [0.48, 0.52, 0.80, 0.84], [0, 1, 1, 0], { clamp: true });
  const modelY = useTransform(scrollYProgress, [0.48, 0.52, 0.80, 0.84], [24, 0, 0, -24], { clamp: true });
  const modelScale = useTransform(scrollYProgress, [0.48, 0.52, 0.80, 0.84], [0.96, 1, 1, 0.96], { clamp: true });
  const modelDisplay = useTransform(scrollYProgress, (v) => (v >= 0.47 && v < 0.84 ? "block" : "none"));

  const text2Opacity = useTransform(scrollYProgress, [0.84, 0.88], [0, 1], { clamp: true });
  const text2Y = useTransform(scrollYProgress, [0.84, 0.88], [24, 0], { clamp: true });
  const text2Display = useTransform(scrollYProgress, (v) => (v >= 0.83 ? "flex" : "none"));

  return (
    <section ref={containerRef} data-story="offline" className="story-canvas relative h-[850vh] overflow-clip bg-[#101010]">
      <div className="sticky top-0 flex h-screen w-full select-none items-center justify-center overflow-hidden px-4">
        <StoryFrame number="04.3" title="Offline by choice" detail="Disconnect / Continue" />
        <div className="pointer-events-none absolute -z-10 h-[620px] w-[620px] rounded-full bg-[#999999]/[0.08] blur-[160px]" />

        <TaskbarWifiPanel
          scrollProgress={smoothProgress}
          opacity={wifiOpacity}
          y={wifiY}
          scale={wifiScale}
          display={wifiDisplay}
        />

        <motion.div
          style={{ opacity: text1Opacity, y: text1Y, display: text1Display }}
          className="pointer-events-none absolute z-20 flex max-w-4xl flex-col items-center justify-center px-4 text-center"
        >
          <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-[#f1f1f1] sm:text-6xl md:text-7xl">
            Turn the Wi-Fi off. <br className="hidden sm:inline" />Not the coding.
          </h2>
        </motion.div>

        <ModelSelectPanel
          scrollProgress={smoothProgress}
          opacity={modelOpacity}
          y={modelY}
          scale={modelScale}
          display={modelDisplay}
        />

        <motion.div
          style={{ opacity: text2Opacity, y: text2Y, display: text2Display }}
          className="pointer-events-none absolute z-20 flex max-w-4xl flex-col items-center justify-center px-4 text-center"
        >
          <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-[#f1f1f1] sm:text-6xl md:text-7xl">
            0 cost. <br className="hidden sm:inline" />Unlimited generations.
          </h2>
        </motion.div>
      </div>
    </section>
  );
}

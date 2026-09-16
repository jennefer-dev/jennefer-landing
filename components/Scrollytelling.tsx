"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { 
  Terminal, 
  Cpu, 
  Activity, 
  CheckCircle2, 
  Zap, 
  Maximize2
} from "lucide-react";

interface SceneInfo {
  tag: string;
  title: string;
  subtitle: string;
  telemetry: string;
  image: string;
  statusText: string;
  vramText: string;
  ipcText: string;
  activeAgents: string;
  stats: { label: string; value: string }[];
}

const SCENES: SceneInfo[] = [
  {
    tag: "01 / NATIVE DESKTOP SHELL",
    title: "Zero Bloat. Pure Native Performance.",
    subtitle:
      "No Electron wrappers. Built from scratch with sub-millisecond redraws, immediate boot times, and instant local project indexing.",
    telemetry: "Memory footprint 84MB vs 1.4GB legacy IDEs. Zero background telemetry pinging.",
    image: "/shots/launcher.png",
    statusText: "ENGINE READY • IDLE",
    vramText: "0.2 GB / 24 GB",
    ipcText: "0.04 ms",
    activeAgents: "Standby (0 active)",
    stats: [
      { label: "Memory Footprint", value: "84 MB" },
      { label: "Cold Start", value: "<180ms" },
      { label: "UI Thread Latency", value: "0.8ms" }
    ]
  },
  {
    tag: "02 / DETERMINISTIC PIPELINES",
    title: "Visual Flow Canvas (DAG).",
    subtitle:
      "Move beyond stochastic single-prompt agents. Chain workflows visually with syntax gates, automated test passes, and Human-In-The-Loop approval checkpoints.",
    telemetry: "Live Directed Acyclic Graph orchestrating 4 local agents with strict topological ordering.",
    image: "/shots/node.png",
    statusText: "DAG EXECUTING • 4 NODES ACTIVE",
    vramText: "8.6 GB / 24 GB",
    ipcText: "0.18 ms",
    activeAgents: "Mesh Swarm (4 nodes)",
    stats: [
      { label: "Graph Nodes", value: "12 active" },
      { label: "Verification Gate", value: "100% Passed" },
      { label: "IPC Throughput", value: "1.4 GB/s" }
    ]
  },
  {
    tag: "03 / DEEP REASONING PROTOCOL",
    title: "Formal Architectural Decision Records.",
    subtitle:
      "Analysts draft mathematical foundations (HNSW vector indices, SIMD caching), while Coder nodes implement and run local CLI test suites autonomously.",
    telemetry: "Local DeepSeek / Qwen 2.5 32B quantized 4-bit reasoning on local RTX/Apple Silicon.",
    image: "/shots/ai.png",
    statusText: "DEEP REASONING • SIMD OPTIMIZATION",
    vramText: "14.2 GB / 24 GB",
    ipcText: "0.32 ms",
    activeAgents: "Arch-Analyst + Rust-Coder",
    stats: [
      { label: "Quantization", value: "Q4_K_M" },
      { label: "Tokens/sec", value: "48.6 t/s" },
      { label: "Local Context", value: "64k tokens" }
    ]
  },
  {
    tag: "04 / ENTERPRISE MISSIONS",
    title: "Mission Control for Autonomous Software.",
    subtitle:
      "A unified executive dashboard tracking DAG tasks, active sub-agents, automated consensus validation, and live git diff inspection without sending code offsite.",
    telemetry: "Multi-agent consensus converged. 14 unit tests passed, 0 security vulnerabilities.",
    image: "/shots/dashboard.png",
    statusText: "MISSION CONTROL • LIVE CONSENSUS",
    vramText: "11.8 GB / 24 GB",
    ipcText: "0.12 ms",
    activeAgents: "Swarm Cluster (7 nodes)",
    stats: [
      { label: "Agent Consensus", value: "3/3 Verified" },
      { label: "Diff Verification", value: "+148 / -12 lines" },
      { label: "Cloud Exposure", value: "0.00%" }
    ]
  }
];

export default function Scrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.25) {
      setActiveScene(0);
    } else if (latest < 0.5) {
      setActiveScene(1);
    } else if (latest < 0.75) {
      setActiveScene(2);
    } else {
      setActiveScene(3);
    }
  });

  const current = SCENES[activeScene];

  return (
    <section 
      id="scrollyflow" 
      ref={containerRef} 
      className="relative min-h-[420vh] bg-gradient-to-b from-[#07080c] via-[#090d15] to-[#07080c]"
    >
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-[90vh] flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          {/* LEFT VIEWPORT (58%) */}
          <div className="w-full lg:w-[58%] h-full flex flex-col justify-center relative">
            
            <div 
              className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-cyan-500/15 to-indigo-600/20 rounded-3xl blur-2xl -z-10 opacity-70 transition-all duration-700"
              style={{
                transform: activeScene === 0 ? "scale(0.98)" : activeScene === 1 ? "scale(1.02) rotate(-0.5deg)" : activeScene === 2 ? "scale(1.01) rotate(0.5deg)" : "scale(1.03)"
              }}
            />

            <div className="w-full h-[520px] sm:h-[580px] rounded-2xl bg-[#0b0f17]/90 backdrop-blur-2xl border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden relative group">
              
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

              <div className="h-11 px-4 bg-slate-950/80 border-b border-white/[0.08] flex items-center justify-between shrink-0 select-none">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/50" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/50" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/50" />
                  <div className="h-3 w-[1px] bg-white/10 mx-1.5" />
                  <span className="text-[11px] font-mono text-slate-400 font-medium flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-cyan-400" />
                    jennefer-core-v0.1.local
                  </span>
                </div>

                <div className="hidden sm:flex items-center gap-4 text-[10px] font-mono">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Activity className="w-3 h-3 text-blue-400 animate-pulse" />
                    <span>IPC: <strong className="text-cyan-300">{current.ipcText}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Cpu className="w-3 h-3 text-indigo-400" />
                    <span>VRAM: <strong className="text-indigo-300">{current.vramText}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-900/30 border border-blue-500/30 text-cyan-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span>{current.statusText}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-500">
                  <Maximize2 className="w-3.5 h-3.5 hover:text-slate-300 transition-colors cursor-pointer" />
                </div>
              </div>

              <div className="relative flex-1 bg-black/60 overflow-hidden">
                {SCENES.map((scene, idx) => (
                  <div
                    key={scene.tag}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      activeScene === idx ? "opacity-100 scale-100 z-10" : "opacity-0 scale-[1.02] z-0 pointer-events-none"
                    }`}
                    style={{ transitionProperty: "opacity, transform" }}
                  >
                    <Image
                      src={scene.image}
                      alt={scene.title}
                      fill
                      priority
                      className="object-contain object-center sm:p-2 filter drop-shadow-2xl"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent pointer-events-none" />
                  </div>
                ))}
              </div>

              <div className="h-10 px-4 bg-slate-950/90 border-t border-white/[0.08] flex items-center justify-between shrink-0 font-mono text-[11px] text-slate-400">
                <div className="flex items-center gap-2 truncate max-w-[70%]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-slate-300 font-medium truncate">{current.telemetry}</span>
                </div>
                <div className="hidden sm:flex items-center gap-3 text-slate-500 shrink-0">
                  <span>SWARM: <strong className="text-slate-300">{current.activeAgents}</strong></span>
                  <span>MODE: <strong className="text-emerald-400">AIR-GAPPED</strong></span>
                </div>
              </div>

            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {current.stats.map((stat, i) => (
                <div 
                  key={i} 
                  className="px-3 py-2 rounded-xl bg-slate-950/40 border border-white/[0.06] backdrop-blur-md flex flex-col"
                >
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{stat.label}</span>
                  <span className="text-xs sm:text-sm font-mono font-semibold text-cyan-300 mt-0.5">{stat.value}</span>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT NARRATIVE STREAM (42%) */}
          <div className="w-full lg:w-[42%] flex flex-col justify-center relative pl-0 lg:pl-4">
            
            <div className="flex items-center gap-2 mb-6">
              {SCENES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const el = document.getElementById(`scene-step-${idx}`);
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeScene === idx 
                      ? "w-8 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]" 
                      : "w-2 bg-slate-800 hover:bg-slate-700"
                  }`}
                  aria-label={`Jump to scene ${idx + 1}`}
                />
              ))}
              <span className="ml-2 font-mono text-[11px] text-slate-500">
                SCENE {activeScene + 1} OF 4
              </span>
            </div>

            <div className="relative rounded-2xl bg-slate-950/70 border border-white/[0.08] p-6 sm:p-8 backdrop-blur-xl shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-xs font-mono text-cyan-400 mb-4 shadow-[0_0_12px_rgba(6,182,212,0.15)]">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>{current.tag}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
                {current.title}
              </h3>

              <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {current.subtitle}
              </p>

              <div className="mt-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                <Zap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-xs font-mono text-slate-400 leading-relaxed">
                  <strong className="text-cyan-300 font-semibold">Telemetry Insight:</strong>{" "}
                  {current.telemetry}
                </div>
              </div>

              <div className="mt-6 space-y-2.5">
                {activeScene === 0 && (
                  <>
                    <div className="flex items-center gap-2.5 text-xs font-mono text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Zero Chromium dependencies or heavy DOM overhead</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs font-mono text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Direct Rust / C++ kernel rendering with 120fps redraws</span>
                    </div>
                  </>
                )}
                {activeScene === 1 && (
                  <>
                    <div className="flex items-center gap-2.5 text-xs font-mono text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Visual node graphs enforce deterministic DAG flow execution</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs font-mono text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Interactive breakpoints for human-in-the-loop review</span>
                    </div>
                  </>
                )}
                {activeScene === 2 && (
                  <>
                    <div className="flex items-center gap-2.5 text-xs font-mono text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Analyst agent produces ADRs with HNSW math proofs</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs font-mono text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Coder agent executes local compilers & verifies unit tests</span>
                    </div>
                  </>
                )}
                {activeScene === 3 && (
                  <>
                    <div className="flex items-center gap-2.5 text-xs font-mono text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Mission Control aggregates swarm telemetry in real-time</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs font-mono text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Inspect atomic Git diffs before committing to main</span>
                    </div>
                  </>
                )}
              </div>

            </div>

          </div>

        </div>
      </div>

      <div className="relative z-0">
        <div id="scene-step-0" className="h-[105vh]" />
        <div id="scene-step-1" className="h-[105vh]" />
        <div id="scene-step-2" className="h-[105vh]" />
        <div id="scene-step-3" className="h-[105vh]" />
      </div>
    </section>
  );
}

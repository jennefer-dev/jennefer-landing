"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Cpu, 
  Layers, 
  Database, 
  ShieldCheck,
  Zap
} from "lucide-react";

const MATRIX_CARDS = [
  {
    icon: Cpu,
    title: "Native Local LLM Gateways",
    category: "01 / HARDWARE ORCHESTRATION",
    description:
      "Direct binary bindings to Ollama, LM Studio, vLLM, and llama.cpp runtimes. Dynamic VRAM auto-balancing, quantized GGUF/AWQ loading, and multi-GPU tensor splitting without external daemons.",
    tags: ["Ollama API", "vLLM Engine", "llama.cpp", "Apple Metal / CUDA"],
    badge: "Sub-ms IPC",
    gradient: "from-blue-600/20 via-cyan-600/10 to-transparent",
    borderGlow: "hover:border-blue-500/50"
  },
  {
    icon: Layers,
    title: "Tiling Docking Engine",
    category: "02 / RUNTIME WORKSPACE",
    description:
      "High-performance native layout tree supporting arbitrary drag & drop split panes, floating agent heads-up monitors, and zero-lag terminal docks. Built for multi-monitor developer environments.",
    tags: ["Zero DOM Overhead", "Virtual Terminals", "Split-View DAG", "120 FPS Redraw"],
    badge: "Native Rust View",
    gradient: "from-cyan-600/20 via-indigo-600/10 to-transparent",
    borderGlow: "hover:border-cyan-500/50"
  },
  {
    icon: Database,
    title: "Local Vector RAG & Cache",
    category: "03 / CONTEXT SUBSYSTEM",
    description:
      "In-memory Hierarchical Navigable Small World (HNSW) vector indices with zero-copy Rust buffers. Incremental semantic indexing for codebases up to 2M LOC in under 1.2 seconds, 100% on-device.",
    tags: ["HNSW Indexing", "Zero-Copy Buffers", "AST Chunking", "0% Network IO"],
    badge: "Zero Cloud Leakage",
    gradient: "from-indigo-600/20 via-blue-600/10 to-transparent",
    borderGlow: "hover:border-indigo-500/50"
  }
];

export default function HardwareMatrix() {
  return (
    <section id="hardware" className="relative py-24 sm:py-32 bg-[#07080c] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/40 border border-blue-500/30 text-xs font-mono text-cyan-400 mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <Zap className="w-3.5 h-3.5 text-cyan-300" />
            <span>CORE SUBSYSTEM ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Hardware Integration Matrix
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-400 font-normal">
            Bypass cloud token costs, network round-trips, and privacy liability.
            Jennefer talks directly to your silicon with zero compromise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {MATRIX_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`group relative rounded-2xl bg-gradient-to-b ${card.gradient} bg-slate-950/70 p-6 sm:p-8 border border-white/[0.08] backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] ${card.borderGlow} transition-all duration-300 flex flex-col justify-between`}
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span className="text-[11px] font-mono text-slate-500 font-semibold tracking-wider uppercase">
                      {card.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 font-medium">
                      {card.badge}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-105 group-hover:border-cyan-500/40 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all mb-6">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-cyan-200 transition-colors">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-400 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-white/[0.06] text-[11px] font-mono text-slate-300 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div id="benchmarks" className="mt-16 rounded-2xl bg-slate-950/80 border border-white/[0.08] p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-semibold text-white">Local Execution Verification</h4>
                <p className="text-xs sm:text-sm text-slate-400">Deterministic code-generation runs with 0 bytes sent to external cloud LLM providers.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-300">
                <span className="text-slate-500">CLOUD API COST: </span>
                <span className="text-emerald-400 font-bold">$0.00 / mo</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-300">
                <span className="text-slate-500">TELEMETRY LEAKAGE: </span>
                <span className="text-emerald-400 font-bold">0.00%</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-300">
                <span className="text-slate-500">OFFLINE AUDIT: </span>
                <span className="text-cyan-400 font-bold">AIR-GAPPED READY</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Crown,
  Brain,
  Code2,
  ShieldCheck,
  FileCheck,
  Terminal,
  Palette,
  GitFork,
} from 'lucide-react';

const squadAgents = [
  {
    role: "Supervisor",
    subtitle: "Autonomous Orchestration",
    desc: "Task decomposition, dependency scheduling & agent consensus.",
    icon: Crown,
    iconColor: "text-amber-400",
  },
  {
    role: "Architect",
    subtitle: "Requirements & ADRs",
    desc: "Translates high-level prompts into deterministic tech specs.",
    icon: Brain,
    iconColor: "text-blue-400",
  },
  {
    role: "Developer",
    subtitle: "AST Refactoring & Codegen",
    desc: "Context-aware implementation and AST code mutations.",
    icon: Code2,
    iconColor: "text-emerald-400",
  },
  {
    role: "QA Tester",
    subtitle: "Test Suite Synthesis",
    desc: "Generates edge cases, fuzzing and unit test matrices.",
    icon: ShieldCheck,
    iconColor: "text-rose-400",
  },
  {
    role: "Reviewer",
    subtitle: "Consensus Gate",
    desc: "Enforces code standards, security audits & PR diff approval.",
    icon: FileCheck,
    iconColor: "text-purple-400",
  },
  {
    role: "DevOps",
    subtitle: "Sandboxed Execution",
    desc: "Local runtime isolation, dependency builds & migrations.",
    icon: Terminal,
    iconColor: "text-cyan-400",
  },
  {
    role: "UI Designer",
    subtitle: "Component Styling",
    desc: "Tailwind tokens, CSS variables & design system sync.",
    icon: Palette,
    iconColor: "text-pink-400",
  },
  {
    role: "Dispatcher",
    subtitle: "DAG Execution",
    desc: "Directs parallel execution threads across available models.",
    icon: GitFork,
    iconColor: "text-slate-300",
  },
];

export default function AgentSquadGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const renderCardContent = (agent: typeof squadAgents[0]) => {
    const Icon = agent.icon;
    return (
      <>
        {/* Icon */}
        <div className="h-10 w-10 relative mb-6">
          <Icon className={`w-8 h-8 ${agent.iconColor} opacity-90`} />
        </div>
        
        {/* Content */}
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-white tracking-tight uppercase mb-2">
            {agent.role}
          </h3>
          <span className="inline-flex items-center w-max bg-transparent px-2 py-0.5 text-[11px] font-mono text-zinc-400 border border-white/10 rounded-sm my-2">
            {agent.subtitle}
          </span>
          <p className="text-sm text-zinc-500 leading-relaxed min-h-[60px] mt-2">
            {agent.desc}
          </p>
        </div>
      </>
    );
  };

  return (
    <section className="w-full bg-[#07080c] relative">
      
      {/* ==================================== */}
      {/* DESKTOP VIEW (Pinned Scrollytelling) */}
      {/* ==================================== */}
      <div ref={containerRef} className="hidden lg:block h-[300vh] w-full relative">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
            <motion.div 
              style={{ 
                opacity: useTransform(scrollYProgress, [0, 0.1, 0.92, 1], [0, 1, 1, 0], { clamp: true }) 
              }}
              className="grid grid-cols-4 bg-black/40 border border-white/[0.1] shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-sm"
            >
              {squadAgents.map((agent, index) => {
                // With 8 items, delay them by 0.08 each, starting at 0.1
                const start = 0.1 + (index * 0.08);
                const end = start + 0.15;
                
                const y = useTransform(scrollYProgress, [start, end, 0.92, 1], [50, 0, 0, -50], { clamp: true });
                const opacity = useTransform(scrollYProgress, [start, end, 0.92, 1], [0, 1, 1, 0], { clamp: true });
                
                return (
                  <motion.div 
                    key={index} 
                    style={{ y, opacity }}
                    className="flex flex-col bg-[#050505]/80 border border-white/[0.03] p-8 transition-colors hover:bg-[#080808]"
                  >
                    {renderCardContent(agent)}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ==================================== */}
      {/* TABLET VIEW (Static Grid, 2 cols)    */}
      {/* ==================================== */}
      <div className="hidden md:block lg:hidden w-full px-6 py-24">
        <div className="grid grid-cols-2 gap-4">
          {squadAgents.map((agent, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="flex flex-col bg-[#050505]/80 border border-white/[0.03] p-8 transition-colors hover:bg-[#080808]"
            >
              {renderCardContent(agent)}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ==================================== */}
      {/* MOBILE VIEW (Standard Flow Stack)    */}
      {/* ==================================== */}
      <div className="block md:hidden w-full px-4 py-24">
        <div className="grid grid-cols-1 gap-4">
          {squadAgents.map((agent, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="flex flex-col bg-[#050505]/80 border border-white/[0.03] p-8 transition-colors"
            >
              {renderCardContent(agent)}
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}

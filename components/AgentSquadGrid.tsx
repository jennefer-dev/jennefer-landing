"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import StoryFrame from "./StoryFrame";
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
    iconColor: "text-[#c1c1c1]",
  },
  {
    role: "Architect",
    subtitle: "Requirements & ADRs",
    desc: "Translates high-level prompts into deterministic tech specs.",
    icon: Brain,
    iconColor: "text-[#c1c1c1]",
  },
  {
    role: "Developer",
    subtitle: "AST Refactoring & Codegen",
    desc: "Context-aware implementation and AST code mutations.",
    icon: Code2,
    iconColor: "text-[#c1c1c1]",
  },
  {
    role: "QA Tester",
    subtitle: "Test Suite Synthesis",
    desc: "Generates edge cases, fuzzing and unit test matrices.",
    icon: ShieldCheck,
    iconColor: "text-[#c1c1c1]",
  },
  {
    role: "Reviewer",
    subtitle: "Consensus Gate",
    desc: "Enforces code standards, security audits & PR diff approval.",
    icon: FileCheck,
    iconColor: "text-[#c1c1c1]",
  },
  {
    role: "DevOps",
    subtitle: "Sandboxed Execution",
    desc: "Local runtime isolation, dependency builds & migrations.",
    icon: Terminal,
    iconColor: "text-[#c1c1c1]",
  },
  {
    role: "UI Designer",
    subtitle: "Component Styling",
    desc: "Tailwind tokens, CSS variables & design system sync.",
    icon: Palette,
    iconColor: "text-[#c1c1c1]",
  },
  {
    role: "Dispatcher",
    subtitle: "DAG Execution",
    desc: "Directs parallel execution threads across available models.",
    icon: GitFork,
    iconColor: "text-[#c1c1c1]",
  },
];

function DesktopAgentCard({ index, progress, children }: { index: number; progress: MotionValue<number>; children: React.ReactNode }) {
  const start = 0.1 + index * 0.08;
  const end = start + 0.15;
  const y = useTransform(progress, [start, end, 0.92, 1], [50, 0, 0, -50], { clamp: true });
  const opacity = useTransform(progress, [start, end, 0.92, 1], [0, 1, 1, 0], { clamp: true });

  return <motion.div style={{ y, opacity }} className="flex flex-col bg-[#1b1b1b] p-8 transition-colors hover:bg-[#262626]">{children}</motion.div>;
}

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
        <div className="mb-7 flex w-full items-start justify-between">
          <Icon className={`w-6 h-6 ${agent.iconColor} opacity-90`} strokeWidth={1.5} />
          <span className="font-mono text-[10px] text-[#909090]">0{squadAgents.indexOf(agent) + 1}</span>
        </div>
        
        {/* Content */}
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold text-[#f1f1f1] tracking-[-0.04em] mb-2">
            {agent.role}
          </h3>
          <span className="inline-flex items-center w-max text-[10px] uppercase tracking-[0.1em] font-mono text-[#c1c1c1] my-2">
            {agent.subtitle}
          </span>
          <p className="text-sm text-[#ababab] leading-[1.65] min-h-[60px] mt-2">
            {agent.desc}
          </p>
        </div>
      </>
    );
  };

  return (
    <section className="story-canvas w-full bg-[#101010] relative">
      
      {/* ==================================== */}
      {/* DESKTOP VIEW (Pinned Scrollytelling) */}
      {/* ==================================== */}
      <div ref={containerRef} className="hidden lg:block h-[300vh] w-full relative">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          <StoryFrame number="05" title="Specialists in concert" detail="Eight roles / One workspace" />
          <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
            <motion.div 
              style={{ 
                opacity: useTransform(scrollYProgress, [0, 0.1, 0.92, 1], [0, 1, 1, 0], { clamp: true }) 
              }}
              className="story-grid grid grid-cols-4 gap-px bg-[#8e8e8e]/20 border border-[#8e8e8e]/20 shadow-[0_26px_80px_rgba(0,0,0,0.25)]"
            >
              {squadAgents.map((agent, index) => (
                <DesktopAgentCard key={agent.role} index={index} progress={scrollYProgress}>
                  {renderCardContent(agent)}
                </DesktopAgentCard>
              ))}
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
              className="flex flex-col bg-[#1b1b1b] border border-[#8e8e8e]/20 p-8 transition-colors hover:bg-[#262626]"
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
              className="flex flex-col bg-[#1b1b1b] border border-[#8e8e8e]/20 p-8 transition-colors"
            >
              {renderCardContent(agent)}
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}

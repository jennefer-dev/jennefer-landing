"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Shield,
  Layers,
  Zap,
  Boxes,
  Crown,
  Briefcase,
  ListTodo,
  Code2,
  Palette,
  Server,
  Bug,
  SearchCode,
  ShieldCheck,
  FileCheck,
  Terminal,
  GitFork,
  Brain
} from "lucide-react";

// Feature Cards
const features = [
  {
    id: 1,
    icon: Zap,
    tag: "ZERO PER-TOKEN COST",
    title: "100% Offline Local Swarms",
    description:
      "Execute unbounded autonomous agent swarms running on your hardware with Ollama, LM Studio, or llama.cpp. No cloud rates, no monthly surprise bills.",
  },
  {
    id: 2,
    icon: Shield,
    tag: "ZERO TELEMETRY",
    title: "Air-Gapped Privacy by Design",
    description:
      "Your IP and proprietary codebase never touch remote servers. Hardware-enforced loopback isolation prevents model training leaks and remote context indexing.",
  },
  {
    id: 3,
    icon: Layers,
    tag: "AUTONOMOUS DAG",
    title: "Visual Agent Flow Engine",
    description:
      "Compose, orchestrate, and debug complex multi-role workflows visually. Drag-and-drop triggers, consensus gates, and automated test loops.",
  },
  {
    id: 4,
    icon: Boxes,
    tag: "ORGANIZATIONAL AGENTS",
    title: "Living Org Autonomous Pipeline",
    description:
      "Supervisors delegate to Architects, Developers, and QA engineers simultaneously. Each role handles specialized scopes with verifiable handoffs.",
  },
];



export default function IdeFeaturesShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const agentTrackRef = useRef<HTMLDivElement>(null);

  // Agent Set için scroll'a bağlı yatay kayma mekaniği:
  const { scrollYProgress: agentScroll } = useScroll({
    target: agentTrackRef,
    offset: ["start end", "end start"],
  });

  const smoothAgentScroll = useSpring(agentScroll, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Üst sıra: sağdan sola akar
  const row1X = useTransform(smoothAgentScroll, [0, 1], ["5%", "-25%"]);
  // Alt sıra: soldan sağa akar (counter-motion)
  const row2X = useTransform(smoothAgentScroll, [0, 1], ["-25%", "5%"]);

  return (
    <section ref={containerRef} className="relative py-28 sm:py-36 bg-[#07080c] overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/5 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        {/* Section Subtitle / Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-28">
          <h3 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-white leading-[1.1]">
            Engineered for high-security, autonomous workflows.
          </h3>
        </div>

        {/* Feature Cards Çapraz (Zig-Zag / Staggered Diagonal) Sıralama */}
        <div className="flex flex-col gap-12 sm:gap-20">
          {features.map((feature, i) => {
            const isRightSide = i % 2 === 1;
            return (
              <div
                key={feature.id}
                className={`flex w-full ${
                  isRightSide ? "justify-end sm:pl-16" : "justify-start sm:pr-16"
                }`}
              >
                <div className="w-full max-w-xl">
                  <FeatureCard feature={feature} index={i} />
                </div>
              </div>
            );
          })}
        </div>
      </div>


    </section>
  );
}

// Her kart kendi viewport alanına ulaştığında bağımsız olarak dolar
function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = feature.icon;
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 0.90", "center 0.45"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [45, 0], { clamp: true });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.2, 1], { clamp: true });
  const fillPercent = useTransform(scrollYProgress, [0.1, 0.95], [0, 100], { clamp: true });

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity }}
      className="relative rounded-2xl sm:rounded-3xl bg-[#090b11]/90 p-8 sm:p-10 backdrop-blur-xl overflow-hidden flex flex-col justify-between shadow-2xl transition-all duration-300 hover:bg-[#0c0f17]"
    >
      <motion.div
        style={{
          clipPath: useTransform(
            fillPercent,
            (val) => `polygon(0 ${100 - val}%, 100% ${100 - val}%, 100% 100%, 0 100%)`
          ),
        }}
        className="absolute inset-0 bg-gradient-to-t from-white/[0.09] via-white/[0.04] to-transparent pointer-events-none"
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.06] flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>

          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase bg-white/[0.03] px-3 py-1 rounded-full">
            {feature.tag}
          </span>
        </div>

        <h4 className="text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-white mb-3.5">
          {feature.title}
        </h4>

        <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
          {feature.description}
        </p>
      </div>

      <div className="relative z-10 mt-10 pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs font-mono text-slate-500">
        <span>0{index + 1} // ARCHITECTURE</span>
      </div>
    </motion.div>
  );
}

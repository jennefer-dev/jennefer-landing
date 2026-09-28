"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Shield,
  Layers,
  Zap,
  Boxes
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

  return (
    <section ref={containerRef} className="relative py-28 sm:py-36 bg-[#101010] overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-zinc-600/5 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        {/* Section Subtitle / Header */}
        <div className="mb-20 flex flex-col justify-between gap-7 pt-5 sm:mb-28 md:flex-row md:items-end">
          <div>
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-[#c1c1c1]">07 / The essentials</p>
            <h3 className="max-w-3xl text-[clamp(2.8rem,5.5vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.07em] text-[#f1f1f1]">
              All the capability.<br />None of the compromise.
          </h3>
          </div>
          <p className="max-w-sm text-sm leading-[1.7] text-[#ababab]">A private development environment designed around real engineering work.</p>
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
      className="relative rounded-md border border-[#cdcdcd]/15 bg-[#1d1d1d] p-8 sm:p-10 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#cdcdcd]/35 hover:bg-[#252525]"
    >
      <motion.div
        style={{
          clipPath: useTransform(
            fillPercent,
            (val) => `polygon(0 ${100 - val}%, 100% ${100 - val}%, 100% 100%, 0 100%)`
          ),
        }}
        className="absolute inset-0 bg-gradient-to-t from-[#c1c1c1]/[0.09] to-transparent pointer-events-none"
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="w-12 h-12 border border-[#cdcdcd]/20 bg-[#2c2c2c] flex items-center justify-center">
            <Icon className="w-5 h-5 text-[#c1c1c1]" strokeWidth={1.5} />
          </div>

          <span className="text-[10px] font-mono tracking-[0.12em] text-[#c1c1c1] uppercase">
            {feature.tag}
          </span>
        </div>

        <h4 className="text-2xl sm:text-3xl font-semibold tracking-[-0.05em] text-[#f1f1f1] mb-3.5">
          {feature.title}
        </h4>

        <p className="text-sm sm:text-base text-[#b2b2b2] leading-[1.7] font-normal">
          {feature.description}
        </p>
      </div>

      <div className="relative z-10 mt-10 pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs font-mono text-slate-500">
        <span>0{index + 1} / Architecture</span>
      </div>
    </motion.div>
  );
}

"use client";

import React from "react";
import JenneferLogo from "./JenneferLogo";
import AgentSparklesCanvas from "./AgentSparklesCanvas";
import { Monitor, ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const handleScrollToDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('main-video');
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 64; // Account for header
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16 z-20 overflow-hidden">
      {/* Interactive agent sparkles canvas STRICTLY confined to the Hero section */}
      <AgentSparklesCanvas />

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-20 pointer-events-none">
        
        {/* Big Impact Headline strictly formatted like the reference photo */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.03em] text-white leading-[1.08] max-w-4xl">
          Experience liftoff with the <br className="hidden sm:inline" />
          next-gen agent platform
        </h1>

        {/* Buttons Centered Under Headline */}
        <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 pointer-events-auto">
          {/* Primary Action */}
          <a
            href="#waitlist"
            className="h-12 px-7 rounded-full bg-white text-[#07080c] font-semibold text-sm flex items-center justify-center gap-2.5 shadow-xl hover:bg-slate-200 hover:shadow-cyan-500/25 transition-all cursor-pointer"
          >
            <span>Request Early Access</span>
            <ArrowRight className="w-4 h-4 text-[#07080c]" />
          </a>
          {/* Secondary Action: Watch Video */}
          <button
            onClick={handleScrollToDemo}
            className="h-12 px-7 rounded-full bg-white/[0.03] text-white border border-white/10 font-semibold text-sm flex items-center justify-center gap-2.5 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Watch Demo</span>
          </button>
        </div>
      </div>
    </section>
  );
}

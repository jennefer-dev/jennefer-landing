"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function CoreEngineArchitecture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  return (
    <section ref={containerRef} className="relative min-h-[300vh] w-full bg-[#07080c]">
       <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row relative">
         
         {/* Left: Sticky Terminal */}
         <div className="w-full md:w-1/2 relative hidden md:block">
            <div className="sticky top-1/4 h-[420px] w-full max-w-xl mx-auto">
               <TerminalMockup progress={scrollYProgress} />
            </div>
         </div>

         {/* Right: Scrolling Content */}
         <div className="w-full md:w-1/2 flex flex-col relative z-10">
            <StepContent 
              index={0} 
              progress={scrollYProgress}
              title="Deterministic AST & Memory Graph" 
              description="Jennefer constructs your project's complete semantic dependency graph before touching an LLM. No token waste, absolute context." 
            />
            <StepContent 
              index={1} 
              progress={scrollYProgress}
              title="Multi-Agent Swarm Orchestration" 
              description="Autonomous agents collaborate concurrently—planning, authoring, and reviewing code in parallel micro-loops." 
            />
            <StepContent 
              index={2} 
              progress={scrollYProgress}
              title="Sandboxed Local Compilation" 
              description="Executes, builds, and verifies everything locally or in isolated sandboxes. Your core intellectual property never leaves your machine." 
            />
         </div>
         
         {/* Mobile: Standard flow since sticky terminal + text is hard on small screens */}
         <div className="block md:hidden py-12">
           <TerminalMockup progress={scrollYProgress} />
         </div>
       </div>
    </section>
  );
}

function TerminalMockup({ progress }: { progress: any }) {
  // We can switch the terminal content based on progress thresholds
  const step1Opacity = useTransform(progress, [0, 0.3, 0.35], [1, 1, 0]);
  const step1Y = useTransform(progress, [0.3, 0.35], [0, -20]);

  const step2Opacity = useTransform(progress, [0.25, 0.35, 0.6, 0.65], [0, 1, 1, 0]);
  const step2Y = useTransform(progress, [0.25, 0.35, 0.6, 0.65], [20, 0, 0, -20]);

  const step3Opacity = useTransform(progress, [0.55, 0.65, 1], [0, 1, 1]);
  const step3Y = useTransform(progress, [0.55, 0.65], [20, 0]);

  return (
    <div className="w-full h-[420px] rounded-xl bg-[#030407] border border-white/10 shadow-[0_0_50px_-15px_rgba(255,255,255,0.05)] overflow-hidden flex flex-col relative font-mono text-[13px] sm:text-sm">
      {/* Mac window header */}
      <div className="h-10 border-b border-white/5 flex items-center px-4 gap-2 bg-[#050608]">
        <div className="w-3 h-3 rounded-full bg-zinc-800" />
        <div className="w-3 h-3 rounded-full bg-zinc-800" />
        <div className="w-3 h-3 rounded-full bg-zinc-800" />
        <span className="ml-2 text-[10px] text-zinc-600">jennefer-engine &mdash; zsh</span>
      </div>
      
      {/* Content Area */}
      <div className="p-6 relative flex-1 text-zinc-400">
        
        {/* Step 1 Content */}
        <motion.div style={{ opacity: step1Opacity, y: step1Y }} className="absolute inset-6 flex flex-col gap-3">
          <div className="text-amber-500/80 mb-2">~ jennefer-engine --analyze</div>
          <div className="flex gap-2">
            <span className="text-cyan-400">&gt;</span> 
            <span>Indexing repository root...</span>
          </div>
          <div className="flex gap-2">
            <span className="text-cyan-400">&gt;</span> 
            <span>AST parsed: <span className="text-white">1,420</span> nodes mapped to local graph.</span>
          </div>
          <div className="flex gap-2 animate-pulse mt-1">
            <span className="text-cyan-400">&gt;</span> 
            <span>Zero-token context cache initialized.</span>
          </div>
        </motion.div>

        {/* Step 2 Content */}
        <motion.div style={{ opacity: step2Opacity, y: step2Y }} className="absolute inset-6 flex flex-col gap-3">
          <div className="text-amber-500/80 mb-2">~ jennefer-engine --swarm-start</div>
          <div className="flex gap-2">
            <span className="text-purple-400 shrink-0">[Supervisor]</span> 
            <span>Dispatched AST diff to <span className="text-white">#Coder-01</span></span>
          </div>
          <div className="flex gap-2">
            <span className="text-emerald-400 shrink-0">[QA Agent]</span> 
            <span>Generating edge-case unit tests...</span>
          </div>
          <div className="flex gap-2 animate-pulse mt-1">
            <span className="text-blue-400 shrink-0">[Security Agent]</span> 
            <span>Contract constraints verified.</span>
          </div>
        </motion.div>

        {/* Step 3 Content */}
        <motion.div style={{ opacity: step3Opacity, y: step3Y }} className="absolute inset-6 flex flex-col gap-3">
          <div className="text-amber-500/80 mb-2">~ jennefer-engine --compile</div>
          <div className="flex gap-2">
            <span className="text-emerald-500 shrink-0">✔</span> 
            <span>Local runtime: compilation passed (0 errors)</span>
          </div>
          <div className="flex gap-2">
            <span className="text-emerald-500 shrink-0">✔</span> 
            <span>Air-gapped sandbox: verified with zero leaks.</span>
          </div>
          <div className="text-white mt-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Ready to merge to branch.
          </div>
        </motion.div>

      </div>
    </div>
  );
}

function StepContent({ index, progress, title, description }: { index: number, progress: any, title: string, description: string }) {
  let opacityRange: number[];
  let opacityValues: number[];
  
  if (index === 0) {
    opacityRange = [0, 0.25, 0.35, 0.4];
    opacityValues = [1, 1, 0.3, 0.3];
  } else if (index === 1) {
    opacityRange = [0.2, 0.35, 0.6, 0.7];
    opacityValues = [0.3, 1, 1, 0.3];
  } else {
    opacityRange = [0.55, 0.7, 1];
    opacityValues = [0.3, 1, 1];
  }
  
  const opacity = useTransform(progress, opacityRange, opacityValues);

  return (
    <div className="h-auto py-32 md:h-[100vh] flex flex-col justify-center pr-4 md:pl-16">
      <motion.div style={{ opacity }} className="transition-opacity duration-300">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
          {title}
        </h2>
        <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-lg">
          {description}
        </p>
      </motion.div>
    </div>
  );
}

"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FolderOpen, FileCode, CheckCircle2, Search, GitPullRequest, Terminal, Network, Cpu, ArrowUp, User } from "lucide-react";

// Reusable component for safe typing effect
const TypingCodeBlock = ({ codeLines, trigger }: { codeLines: string[], trigger: boolean }) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);

  useEffect(() => {
    if (!trigger) {
      setDisplayedLines([]);
      return;
    }

    let isMounted = true;
    const startTime = Date.now();
    const msPerChar = 15; // 15ms per character
    
    // Flatten code lines to know exactly what to type
    const flatString = codeLines.join('\n');
    const totalChars = flatString.length;
    
    let animationFrameId: number;
    let lastRenderedChars = -1;
    
    const tick = () => {
      if (!isMounted) return;
      
      const elapsed = Date.now() - startTime;
      const targetChars = Math.floor(elapsed / msPerChar);
      
      if (targetChars >= totalChars) {
        setDisplayedLines(codeLines); // Fully done
        return;
      }
      
      // Only trigger a React state update if the number of chars has actually increased
      // This prevents unnecessary re-renders and makes it much smoother
      if (targetChars > lastRenderedChars) {
        const currentString = flatString.substring(0, targetChars);
        setDisplayedLines(currentString.split('\n'));
        lastRenderedChars = targetChars;
      }
      
      animationFrameId = requestAnimationFrame(tick);
    };
    
    animationFrameId = requestAnimationFrame(tick);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
    };
  }, [trigger, codeLines]);

  return (
    <div className="bg-emerald-500/10 rounded-md py-2 text-emerald-400 min-h-[140px]">
      {displayedLines.map((line, index) => (
        <div key={index} className="flex whitespace-pre-wrap px-2 mb-1">
          <span className="w-6 select-none opacity-40 text-right pr-3">{index + 1}</span>
          <span className="w-5 select-none opacity-50">+</span>
          <span>{line}</span>
        </div>
      ))}
      {!trigger && (
        <div className="flex whitespace-pre-wrap px-2 mb-1 opacity-0">
          <span className="w-6 select-none text-right pr-3">1</span>
          <span className="w-5 select-none">+</span>
          <span>Placeholder</span>
        </div>
      )}
    </div>
  );
};

const particleCode = [
  "export const ParticleField = () => {",
  "  const canvasRef = useRef<HTMLCanvasElement>(null);",
  "  // WebGL initialization logic...",
  "  return (",
  "    <canvas ref={canvasRef} className=\"absolute inset-0 z-0\" />",
  "  );",
  "};"
];

const heroCode = [
  "import { ParticleField } from './ParticleField';",
  "",
  "export const Hero = () => (",
  "  <section className=\"relative pt-24 overflow-hidden\">",
  "    <ParticleField />",
  "    <div className=\"relative z-10\">",
  "      <h1 className=\"text-5xl font-bold\">",
  "        Build AI swarms natively.",
  "      </h1>",
  "    </div>",
  "  </section>",
  ");"
];

export default function ProductAnatomy() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Start animation only when the IDE comes into view
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isInView && progress < 100) {
      const duration = 15000; // 15 seconds total simulation
      const start = Date.now();
      
      let animationFrameId: number;
      
      const tick = () => {
        const elapsed = Date.now() - start;
        const p = Math.min((elapsed / duration) * 100, 100);
        setProgress(p);
        
        if (p < 100) {
          animationFrameId = requestAnimationFrame(tick);
        }
      };
      
      animationFrameId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [isInView]);

  // Derive active steps from progress (0 to 100)
  // Adjusted so logs trigger VERY early, so code typing starts quickly
  const activeStep = progress < 2 ? 0 
                   : progress < 5 ? 1 
                   : progress < 10 ? 2 
                   : progress < 20 ? 3 
                   : progress < 30 ? 4 
                   : 5;

  const isFinished = progress >= 100;

  return (
    <section className="relative w-full bg-[#07080c] z-10 py-20">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
      
      <div ref={containerRef} className="w-full flex flex-col items-center justify-center relative">
        
        {/* IDE Mockup - Full Width & Taller */}
        <div className="w-[92vw] md:w-[96vw] max-w-[1600px] mx-auto bg-[#07080c] shadow-2xl flex flex-col h-[550px] md:h-[750px] relative mb-12">
          
          {/* Header */}
          <div className="h-12 bg-[#0c0d12] rounded-t-2xl flex items-center px-4 justify-between border-b border-white/5">
            <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-zinc-400" />
              Jennefer IDE
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs font-medium bg-emerald-500/15 text-white px-2.5 py-1 rounded-md">
                <span className={`w-1.5 h-1.5 rounded-full bg-emerald-400 ${!isFinished ? 'animate-pulse' : ''}`} />
                {isFinished ? 'Session Complete' : 'Live System'}
              </span>
            </div>
          </div>

          {/* IDE Body Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 h-full gap-4 p-4 bg-[#07080c] rounded-b-2xl overflow-hidden">
            
            {/* 1. Explorer (Left, col-3) */}
            <div className="hidden md:flex md:col-span-3 flex-col bg-[#0c0d12] rounded-xl overflow-hidden shadow-lg h-full">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#0f1117] text-xs font-mono text-zinc-400 mb-2 border-b border-white/5">
                <FolderOpen className="w-4 h-4 text-zinc-500" />
                Project Graph
              </div>
              
              <div className="p-4 font-mono text-xs flex flex-col gap-2 flex-1 custom-scrollbar overflow-y-auto">
                <div className="flex items-center gap-2 text-zinc-300">
                  <FolderOpen className="w-4 h-4 text-zinc-500" /> src
                </div>
                
                <div className="flex flex-col gap-2 pl-5 ml-1.5 mt-1 border-l border-white/5">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <FolderOpen className="w-4 h-4 text-zinc-500" /> components
                  </div>
                  
                  <div className="flex flex-col gap-3 pl-5 ml-1.5 mt-1 border-l border-white/5">
                    {/* File 1 */}
                    <div className="flex items-center justify-between text-zinc-300">
                      <span className="flex items-center gap-2">
                        <FileCode className="w-4 h-4 text-amber-500" /> ParticleField.tsx
                      </span>
                      {activeStep >= 4 && (
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] font-medium px-2 py-0.5 bg-emerald-500/20 rounded-md text-white">
                          Compiled
                        </motion.span>
                      )}
                    </div>
                    
                    {/* File 2 */}
                    <div className="flex items-center justify-between text-zinc-300">
                      <span className="flex items-center gap-2">
                        <FileCode className="w-4 h-4 text-cyan-500" /> Hero.tsx
                      </span>
                      {activeStep >= 5 && (
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] font-medium px-2 py-0.5 bg-emerald-500/20 rounded-md text-white">
                          Compiled
                        </motion.span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pl-5 ml-1.5 mt-2 border-l border-white/5">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <FolderOpen className="w-4 h-4 text-zinc-500" /> styles
                  </div>
                  <div className="flex flex-col gap-2 pl-5 ml-1.5 mt-1 border-l border-white/5">
                    <div className="flex items-center justify-between text-zinc-400">
                      <span className="flex items-center gap-2">
                        <FileCode className="w-4 h-4 text-blue-400" /> globals.css
                      </span>
                      {activeStep >= 3 && (
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] font-medium px-2 py-0.5 bg-blue-500/20 rounded-md text-white">
                          Read
                        </motion.span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Live Semantic Diff (Center, col-5) */}
            <div className="hidden md:flex md:col-span-5 flex-col gap-4 h-full">
              
              {/* Top Pane: ParticleField.tsx */}
              <div className="flex-1 flex flex-col bg-[#0c0d12] rounded-xl overflow-hidden shadow-lg border border-transparent">
                <div className="flex items-center justify-between px-4 py-3 bg-[#0f1117] text-xs font-mono text-zinc-400 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-amber-500" />
                    src/components/ParticleField.tsx
                  </div>
                  {activeStep >= 4 && <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Active Diff</span>}
                </div>
                <div className="flex-1 p-4 font-mono text-[12px] leading-relaxed custom-scrollbar overflow-y-auto">
                  <TypingCodeBlock codeLines={particleCode} trigger={activeStep >= 4} />
                </div>
              </div>

              {/* Bottom Pane: Hero.tsx */}
              <div className="flex-1 flex flex-col bg-[#0c0d12] rounded-xl overflow-hidden shadow-lg border border-transparent">
                <div className="flex items-center justify-between px-4 py-3 bg-[#0f1117] text-xs font-mono text-zinc-400 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-cyan-500" />
                    src/components/Hero.tsx
                  </div>
                  {activeStep >= 5 && <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Active Diff</span>}
                </div>
                <div className="flex-1 p-4 font-mono text-[12px] leading-relaxed custom-scrollbar overflow-y-auto">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: activeStep >= 5 ? 1 : 0 }} transition={{ duration: 0.5 }}>
                    <div className="flex text-rose-400/80 mb-2 whitespace-pre-wrap px-2 py-1 bg-rose-500/5 rounded-md">
                      <span className="w-6 select-none opacity-40 text-right pr-3">1</span>
                      <span className="w-5 select-none opacity-50">-</span>
                      <span>export const Hero = () =&gt; &lt;div&gt;Draft&lt;/div&gt;;</span>
                    </div>
                    <TypingCodeBlock codeLines={heroCode} trigger={activeStep >= 5} />
                  </motion.div>
                </div>
              </div>

            </div>

            {/* 3. AI Panel (Right, col-4) */}
            <div className="md:col-span-4 flex flex-col bg-[#0c0d12] rounded-xl overflow-hidden shadow-lg h-full">
              
              {/* AI Panel Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-[#0f1117]">
                <div className="text-[12px] font-mono text-white uppercase tracking-wider flex items-center gap-2">
                  <Network className="w-4 h-4 text-purple-400" /> AI Execution Report
                </div>
                <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-md">Swarm Active</span>
              </div>
              
              {/* Chat & Logs Area */}
              <div className="flex-1 p-5 flex flex-col gap-5 font-mono pb-24 custom-scrollbar overflow-y-auto">
                
                {/* User Prompt Bubble */}
                <div className="flex gap-3 w-full">
                  <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl rounded-tl-sm p-3 text-[11px] md:text-[13px] text-blue-100 leading-relaxed">
                    "Refactor the Hero section. Build a WebGL Particle Field component and integrate it as the animated background."
                  </div>
                </div>

                <div className="w-full h-px bg-white/5 my-2 shrink-0" />

                {/* Log 1: CEO */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: activeStep >= 1 ? 1 : 0, y: activeStep >= 1 ? 0 : 10 }} transition={{ duration: 0.4 }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Consensus Gate
                    </div>
                    <span className="text-[10px] font-medium text-white bg-emerald-500/20 px-2 py-0.5 rounded-md">Approved</span>
                  </div>
                  <div className="text-[11px] md:text-[13px] text-zinc-400 leading-relaxed pl-6">
                    Specification approved: WebGL Particle Field integration.
                  </div>
                </motion.div>

                {/* Log 2: Tasker */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: activeStep >= 2 ? 1 : 0, y: activeStep >= 2 ? 0 : 10 }} transition={{ duration: 0.4 }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                      <Search className="w-4 h-4 text-amber-500" /> Tasker
                    </div>
                    <span className="text-[10px] font-medium text-white bg-amber-500/20 px-2 py-0.5 rounded-md">Delegated</span>
                  </div>
                  <div className="text-[11px] md:text-[13px] text-zinc-400 leading-relaxed pl-6">
                    Decomposed into 2 subtasks: 1. `ParticleField.tsx`, 2. Update `Hero.tsx`.
                  </div>
                </motion.div>

                {/* Log 3: UX Designer */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: activeStep >= 3 ? 1 : 0, y: activeStep >= 3 ? 0 : 10 }} transition={{ duration: 0.4 }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                      <GitPullRequest className="w-4 h-4 text-blue-500" /> UX Designer
                    </div>
                    <span className="text-[10px] font-medium text-white bg-blue-500/20 px-2 py-0.5 rounded-md">Processed</span>
                  </div>
                  <div className="text-[11px] md:text-[13px] text-zinc-400 leading-relaxed pl-6">
                    Scanning global styles... Reading `tailwind.config.ts`.
                  </div>
                </motion.div>

                {/* Log 4: Coder (File 1) */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: activeStep >= 4 ? 1 : 0, y: activeStep >= 4 ? 0 : 10 }} transition={{ duration: 0.4 }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                      <Terminal className="w-4 h-4 text-purple-500" /> Coder
                    </div>
                    <span className="text-[10px] font-medium text-white bg-purple-500/20 px-2 py-0.5 rounded-md">Writing</span>
                  </div>
                  <div className="text-[11px] md:text-[13px] text-zinc-400 leading-relaxed pl-6">
                    Implementing `ParticleField.tsx` WebGL logic...
                  </div>
                </motion.div>

                {/* Log 5: Coder (File 2) */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: activeStep >= 5 ? 1 : 0, y: activeStep >= 5 ? 0 : 10 }} transition={{ duration: 0.4 }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                      <Terminal className="w-4 h-4 text-purple-500" /> Coder
                    </div>
                    <span className="text-[10px] font-medium text-white bg-emerald-500/20 px-2 py-0.5 rounded-md">Finalizing</span>
                  </div>
                  <div className="text-[11px] md:text-[13px] text-zinc-400 leading-relaxed pl-6">
                    Integrating particle field into `Hero.tsx`...
                  </div>
                </motion.div>
              </div>

              {/* AI Input Box (Footer of AI Panel) */}
              <div className="mt-auto p-4 bg-[#0a0c10] border-t border-white/5 shrink-0 relative">
                
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder={isFinished ? "Session complete." : "Autonomous agents working..."} 
                    className="w-full bg-[#12141a] border border-white/10 rounded-lg py-3 px-4 text-[11px] md:text-[13px] text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-purple-500/50 transition-colors"
                    readOnly
                  />
                  <div className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md flex items-center justify-center border transition-all duration-300 ${isFinished ? 'bg-emerald-500/20 border-emerald-500/30' : 'bg-purple-500/20 border-purple-500/30'}`}>
                    {isFinished ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <ArrowUp className="w-4 h-4 text-purple-400" />
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3 px-1">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-zinc-500" />
                    <span className="text-[10px] font-mono text-zinc-500">Model:</span>
                    <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">Qwen Coder 32B</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-600">Local Runtime</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Scroll Down Prompt Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col items-center gap-3 mt-4"
        >
          <div className="text-[11px] font-mono text-zinc-500 tracking-widest uppercase">
            Scroll to explore
          </div>
          <div className="w-5 h-8 rounded-full border-2 border-white/20 flex justify-center p-1">
            <motion.div 
              animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
              className="w-1 h-2 bg-white/50 rounded-full"
            />
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}

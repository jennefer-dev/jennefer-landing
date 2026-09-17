"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FolderOpen, FileCode, CheckCircle2, Search, Terminal, Network, Cpu, ArrowUp, User, RotateCcw, Check, Clock, FileText, BrainCircuit, GitPullRequest, Layout, ChevronDown } from "lucide-react";
import JenneferLogo from "./JenneferLogo";

// Typing Block for IDE Editors
const TypingCodeBlock = ({ codeLines, trigger, speed = 12 }: { codeLines: string[], trigger: boolean, speed?: number }) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);

  useEffect(() => {
    if (!trigger) {
      setDisplayedLines([]);
      return;
    }
    let isMounted = true;
    const startTime = Date.now();
    const flatString = codeLines.join('\n');
    const totalChars = flatString.length;
    let animationFrameId: number;
    let lastRenderedChars = -1;
    
    const tick = () => {
      if (!isMounted) return;
      const elapsed = Date.now() - startTime;
      const targetChars = Math.floor(elapsed / speed);
      
      if (targetChars >= totalChars) {
        setDisplayedLines(codeLines);
        return;
      }
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
  }, [trigger, codeLines, speed]);

  return (
    <div className="py-2 text-emerald-400 min-h-[140px] font-mono text-[13px] leading-relaxed">
      {displayedLines.map((line, index) => (
        <div key={index} className="flex whitespace-pre-wrap px-2">
          <span className="w-8 select-none text-zinc-600 text-right pr-4">{index + 1}</span>
          <span>{line}</span>
        </div>
      ))}
    </div>
  );
};

// Plain Text Typewriter for AI Chat Bubbles
const TypewriterText = ({ text, trigger, speed = 15, delay = 0 }: { text: string, trigger: boolean, speed?: number, delay?: number }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!trigger) {
      setDisplayedText("");
      return;
    }
    let isMounted = true;
    let animationFrameId: number;
    let timeoutId: NodeJS.Timeout;
    
    timeoutId = setTimeout(() => {
      const startTime = Date.now();
      const totalChars = text.length;
      let lastRenderedChars = -1;
      
      const tick = () => {
        if (!isMounted) return;
        const elapsed = Date.now() - startTime;
        const targetChars = Math.floor(elapsed / speed);
        
        if (targetChars >= totalChars) {
          setDisplayedText(text);
          return;
        }
        if (targetChars > lastRenderedChars) {
          setDisplayedText(text.substring(0, targetChars));
          lastRenderedChars = targetChars;
        }
        animationFrameId = requestAnimationFrame(tick);
      };
      animationFrameId = requestAnimationFrame(tick);
    }, delay);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [trigger, text, speed, delay]);

  return <span className="whitespace-pre-wrap">{displayedText}</span>;
};

const particleCode = [
  "export const ParticleField = () => {",
  "  const canvasRef = useRef<HTMLCanvasElement>(null);",
  "  ",
  "  useEffect(() => {",
  "    const initWebGL = () => {",
  "      const gl = canvasRef.current.getContext('webgl2');",
  "      if (!gl) return;",
  "      // Hardware accelerated particle simulation initialized",
  "      setupShaders(gl);",
  "    };",
  "    initWebGL();",
  "  }, []);",
  "",
  "  return <canvas ref={canvasRef} className=\"absolute inset-0 z-0\" />;",
  "};"
];

const heroCode = [
  "import { ParticleField } from './ParticleField';",
  "",
  "export const Hero = () => (",
  "  <section className=\"relative pt-24 pb-32 overflow-hidden bg-black\">",
  "    {/* Animated WebGL Background */}",
  "    <ParticleField />",
  "    ",
  "    <div className=\"relative z-10 container mx-auto px-6\">",
  "      <h1 className=\"text-5xl font-bold tracking-tight text-white\">",
  "        Build AI swarms natively.",
  "      </h1>",
  "    </div>",
  "  </section>",
  ");"
];

export default function ProductAnatomy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const aiScrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  
  const [step, setStep] = useState(-2);
  const [isPlaying, setIsPlaying] = useState(false);

  const startSimulation = () => {
    setStep(-2);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (aiScrollRef.current) {
      aiScrollRef.current.scrollTo({
        top: aiScrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [step]);

  useEffect(() => {
    if (isInView && !isPlaying && step === -2) {
      startSimulation();
    }
  }, [isInView]);

  useEffect(() => {
    if (!isPlaying) return;
    let timeoutId: NodeJS.Timeout;
    const next = (delay: number, nextStep: number) => {
      timeoutId = setTimeout(() => setStep(nextStep), delay);
    };

    if (step === -2) next(2500, -1);     // Type the prompt
    else if (step === -1) next(800, 0);  // Click send (ripple)
    else if (step === 0) next(1000, 1);  // CEO Reasoning
    else if (step === 1) next(2500, 2);  // Analyst Spec
    else if (step === 2) next(2000, 3);  // Tasker Breakdown
    else if (step === 3) next(2500, 4);  // UX Designer loading
    else if (step === 4) next(3000, 5);  // Coder starts ParticleField
    else if (step === 5) next(4500, 6);  // Coder starts Hero
    else if (step === 6) next(4000, 7);  // Linting Step
    else if (step === 7) next(3000, 8);  // Tasker Checkoff
    else if (step === 8) next(4000, 9);  // CEO Final Message
    else if (step === 9) next(4000, 10); // Finished
    else if (step === 10) setIsPlaying(false);

    return () => clearTimeout(timeoutId);
  }, [step, isPlaying]);

  const isFinished = step >= 10;

  return (
    <section className="relative w-full bg-[#07080c] z-10 py-32 overflow-hidden" id="anatomy">
      <style>{`
        .sharp-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .sharp-scrollbar::-webkit-scrollbar-track {
          background: #000;
          border-left: 1px solid #1a1a1a;
        }
        .sharp-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
        }
        .sharp-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>

      <div ref={containerRef} className="w-full flex flex-col items-center justify-center relative px-6 md:px-12 max-w-[1600px] mx-auto">
        
        {/* Animated Corner Grid Lines - Extending Outwards */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Left */}
          <motion.div initial={{ width: 0 }} animate={isInView ? { width: '100vw' } : {}} transition={{ duration: 1.5, ease: "easeOut" }} className="absolute top-0 right-full h-px bg-white/10" />
          <motion.div initial={{ height: 0 }} animate={isInView ? { height: '100vh' } : {}} transition={{ duration: 1.5, ease: "easeOut" }} className="absolute bottom-full left-0 w-px bg-white/10" />
          
          {/* Top Right */}
          <motion.div initial={{ width: 0 }} animate={isInView ? { width: '100vw' } : {}} transition={{ duration: 1.5, ease: "easeOut" }} className="absolute top-0 left-full h-px bg-white/10" />
          <motion.div initial={{ height: 0 }} animate={isInView ? { height: '100vh' } : {}} transition={{ duration: 1.5, ease: "easeOut" }} className="absolute bottom-full right-0 w-px bg-white/10" />

          {/* Bottom Left */}
          <motion.div initial={{ width: 0 }} animate={isInView ? { width: '100vw' } : {}} transition={{ duration: 1.5, ease: "easeOut" }} className="absolute bottom-0 right-full h-px bg-white/10" />
          <motion.div initial={{ height: 0 }} animate={isInView ? { height: '100vh' } : {}} transition={{ duration: 1.5, ease: "easeOut" }} className="absolute top-full left-0 w-px bg-white/10" />

          {/* Bottom Right */}
          <motion.div initial={{ width: 0 }} animate={isInView ? { width: '100vw' } : {}} transition={{ duration: 1.5, ease: "easeOut" }} className="absolute bottom-0 left-full h-px bg-white/10" />
          <motion.div initial={{ height: 0 }} animate={isInView ? { height: '100vh' } : {}} transition={{ duration: 1.5, ease: "easeOut" }} className="absolute top-full right-0 w-px bg-white/10" />
        </div>

        {/* IDE Container - Solid Black, Sharp Corners, No Glassmorphism */}
        <div className="w-full bg-black flex flex-col h-[60vh] min-h-[450px] md:h-[850px] relative rounded-none border border-[#222]">
          
          {/* IDE Header */}
          <div className="h-10 bg-[#000] flex items-center px-4 justify-between border-b border-[#222]">
            <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400">
              <JenneferLogo className="w-5 h-5 text-white" />
              Jennefer IDE
            </div>
            
            <div className="flex items-center gap-3">
              <button onClick={startSimulation} className="p-1 hover:bg-[#222] text-zinc-500 hover:text-white transition-colors" title="Replay">
                <RotateCcw className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin-slow opacity-50' : ''}`} />
              </button>
              
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase bg-[#111] border border-[#333] text-zinc-300 px-3 py-1">
                <span className={`w-1.5 h-1.5 ${isFinished ? 'bg-emerald-500' : 'bg-cyan-500 animate-pulse'}`} />
                {isFinished ? 'Session Complete' : 'Swarm Active'}
              </div>
            </div>
          </div>

          {/* IDE Body Grid - Strict Layout */}
          <div className="flex-1 flex overflow-hidden relative">
            
            {/* Local Execution Overlay - Shown when finished */}
            <AnimatePresence>
              {isFinished && (
                <motion.div 
                  initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                  className="absolute inset-0 z-50 bg-black/60 flex flex-col items-center justify-center p-4"
                >
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, type: "spring", damping: 25, stiffness: 200 }}
                    className="flex flex-col items-center gap-4 bg-[#0a0a0a] border border-[#222] p-8 max-w-sm w-full shadow-2xl"
                  >
                    <motion.div 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }} 
                      transition={{ delay: 1.2, type: "spring", damping: 15, stiffness: 300 }}
                      className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-2"
                    >
                       <CheckCircle2 className="w-8 h-8" /> 
                    </motion.div>
                    <div className="text-xl font-bold text-white text-center font-mono">
                      100% Local Execution
                    </div>
                    <div className="mt-4 flex items-center gap-4 bg-[#111] border border-[#222] px-6 py-3 w-full justify-between">
                      <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Inference Cost</span>
                      <span className="text-emerald-400 font-mono text-2xl font-bold">$0.00</span>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Left Panel: Explorer (col-2 roughly) */}
            <div className="w-64 flex flex-col bg-[#050505] shrink-0 hidden lg:flex">
              <div className="px-4 py-3 text-[10px] font-bold text-zinc-500 tracking-wider uppercase">
                Project Graph
              </div>
              <div className="p-4 font-mono text-[12px] flex flex-col gap-1 flex-1 sharp-scrollbar overflow-y-auto">
                <div className="flex items-center gap-2 text-zinc-300 py-1 hover:bg-[#111] px-2 cursor-default">
                  <FolderOpen className="w-3.5 h-3.5 text-zinc-500" /> src
                </div>
                <div className="flex flex-col ml-3 pl-3 border-l border-[#222]">
                  <div className="flex items-center gap-2 text-zinc-400 py-1 hover:bg-[#111] px-2 cursor-default">
                    <FolderOpen className="w-3.5 h-3.5 text-zinc-600" /> components
                  </div>
                  <div className="flex flex-col ml-3 pl-3 border-l border-[#222]">
                    <AnimatePresence>
                      {step >= 5 && (
                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center justify-between py-1 hover:bg-[#111] px-2 cursor-default overflow-hidden">
                          <span className="flex items-center gap-2 text-zinc-200">
                            <FileCode className="w-3 h-3 text-amber-500" /> ParticleField.tsx
                          </span>
                          <span className="text-[11px] font-bold text-emerald-500">W</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <AnimatePresence>
                      {step >= 6 && (
                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center justify-between py-1 hover:bg-[#111] px-2 cursor-default overflow-hidden">
                          <span className="flex items-center gap-2 text-zinc-200">
                            <FileCode className="w-3 h-3 text-cyan-500" /> Hero.tsx
                          </span>
                          <span className="text-[11px] font-bold text-emerald-500">W</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Panel: Editors (col-4 roughly) */}
            <AnimatePresence>
              {step >= 5 && (
                <motion.div initial={{ opacity: 0, flex: 0 }} animate={{ opacity: 1, flex: 1 }} className="hidden md:flex flex-col min-w-0 bg-[#0a0a0a] overflow-hidden">
                  {/* ParticleField.tsx */}
                  <div className="flex-1 flex flex-col min-h-0">
                <div className="flex items-center justify-between px-4 py-2 bg-[#0a0a0a] shrink-0">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                    <FileCode className="w-3.5 h-3.5 text-amber-500" /> src/components/ParticleField.tsx
                  </div>
                  {step === 5 && <span className="text-[9px] bg-blue-600 text-white px-1.5 py-0.5 font-bold uppercase tracking-wider">Active Diff</span>}
                </div>
                <div className="flex-1 overflow-y-auto sharp-scrollbar bg-[#0a0a0a] p-4">
                  <TypingCodeBlock codeLines={particleCode} trigger={step >= 5} speed={10} />
                </div>
              </div>

              {/* Hero.tsx */}
              <AnimatePresence>
                {step >= 6 && (
                  <motion.div initial={{ opacity: 0, flex: 0 }} animate={{ opacity: 1, flex: 1 }} className="flex flex-col min-h-0 border-t border-[#111] overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 bg-[#0a0a0a] shrink-0">
                      <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                        <FileCode className="w-3.5 h-3.5 text-cyan-500" /> src/components/Hero.tsx
                      </div>
                      {step === 6 && <span className="text-[9px] bg-blue-600 text-white px-1.5 py-0.5 font-bold uppercase tracking-wider">Active Diff</span>}
                    </div>
                    <div className="flex-1 overflow-y-auto sharp-scrollbar bg-[#0a0a0a] p-4">
                      <div className="font-mono text-[13px] leading-relaxed text-emerald-400">
                        <div className="flex text-rose-500 mb-2 whitespace-pre-wrap px-2">
                          <span className="w-8 select-none text-zinc-600 text-right pr-4">1</span>
                          <span className="opacity-80">export const Hero = () =&gt; &lt;div&gt;Draft&lt;/div&gt;;</span>
                        </div>
                        <TypingCodeBlock codeLines={heroCode} trigger={step >= 6} speed={10} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

            {/* Right Panel: AI Execution Report (col-6 roughly) */}
            <motion.div layout className={`w-full ${step >= 5 ? 'md:w-[45%]' : 'md:flex-1'} flex flex-col bg-[#0f0f0f] min-w-0 border-l border-[#222]`}>
              
              <div className="flex items-center justify-between px-5 py-3 bg-[#0f0f0f] shrink-0">
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <Network className="w-3.5 h-3.5" /> AI Execution Report
                </div>
              </div>
              
              <div ref={aiScrollRef} className="flex-1 overflow-y-auto sharp-scrollbar p-5 flex flex-col gap-6">
                
                {/* 1. User Prompt */}
                <AnimatePresence>
                  {step >= 0 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-1 items-end">
                      <div className="flex items-center justify-end gap-2 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                        <User className="w-3.5 h-3.5" /> You
                      </div>
                      <div className="text-right text-[12.5px] text-zinc-300 font-medium leading-relaxed">
                        Build a high-performance WebGL Particle Field component and integrate it into the Hero section.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 2. CEO Reasoning & Action */}
                <AnimatePresence>
                  {step >= 1 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[11px] font-bold">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span className="text-zinc-200">CEO</span>
                      </div>
                      <div className="text-[12px] font-mono text-zinc-300 pl-3">
                        <div className="flex gap-2 mb-2">
                          <BrainCircuit className="w-4 h-4 text-purple-400 shrink-0" />
                          <span className="text-purple-300 font-semibold">Reasoning:</span>
                          <span className="text-zinc-400"><TypewriterText text="Decomposing prompt into WebGL architecture and layout integration." trigger={step >= 1} speed={15} /></span>
                        </div>
                        <div className="flex gap-2 items-center text-blue-400 mt-2">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>Action: <TypewriterText text="Delegating spec creation to Business Analyst." trigger={step >= 1} speed={15} /></span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 3. Analyst Spec */}
                <AnimatePresence>
                  {step >= 2 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[11px] font-bold">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                          <span className="text-zinc-200">Analyst</span>
                        </div>
                      </div>
                      <div className="text-[12.5px] text-zinc-300 leading-relaxed pl-3">
                        <TypewriterText text="I have drafted the engineering specifications and mathematical foundations for the WebGL Particle Index." trigger={step >= 2} speed={15} />
                        <div className="mt-3 bg-[#111] p-2 flex items-center justify-between">
                          <div className="flex items-center gap-2 font-bold text-xs font-mono">
                            <FileText className="w-3.5 h-3.5 text-emerald-400" />
                            Particle_Engine_ADR.md
                          </div>
                          <span className="text-[9px] text-emerald-400 flex items-center gap-1 font-bold uppercase tracking-widest"><CheckCircle2 className="w-3 h-3"/> Approved</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 4. Tasker Breakdown */}
                <AnimatePresence>
                  {step >= 3 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[11px] font-bold">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        <span className="text-zinc-200">Tasker</span>
                      </div>
                      <div className="text-[12px] font-mono text-zinc-300 flex flex-col gap-2 pl-3">
                        <div className="flex items-center gap-2 text-rose-400">
                          <Search className="w-4 h-4" /> Delegating subtasks:
                        </div>
                        <div className="pl-4 ml-2 mt-1 text-zinc-400">
                          <TypewriterText text={"1. [UX Designer]: Verify hero section DOM structure.\n2. [Coder]: Implement `ParticleField.tsx` WebGL logic.\n3. [Coder]: Integrate into `Hero.tsx`."} trigger={step >= 3} speed={10} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 5. UX Designer */}
                <AnimatePresence>
                  {step >= 4 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[11px] font-bold">
                          <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                          <span className="text-zinc-200">UX Designer</span>
                        </div>
                      </div>
                      <div className="text-[12px] font-mono text-zinc-400 pl-3">
                        <div className="flex gap-2 items-center text-blue-400">
                          <Layout className="w-4 h-4" /> Read File: globals.css
                        </div>
                        <div className="mt-2 text-zinc-500"><TypewriterText text="Verified z-index stacking context for WebGL background integration." trigger={step >= 4} speed={15} /></div>
                        <div className="mt-2 flex items-center justify-end w-full">
                          {step === 4 ? (
                            <span className="text-[9px] text-pink-400 flex items-center gap-1.5 font-bold uppercase tracking-widest">
                              <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                              Designing
                            </span>
                          ) : (
                            <span className="text-[9px] text-emerald-400 flex items-center gap-1 font-bold uppercase tracking-widest"><CheckCircle2 className="w-3 h-3"/> Completed</span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 6. Coder */}
                <AnimatePresence>
                  {step >= 5 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2 pb-8">
                      <div className="flex items-center gap-2 text-[11px] font-bold">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-zinc-200">Coder</span>
                      </div>
                      
                      <div className="text-[12.5px] text-zinc-300 pl-3">
                        <TypewriterText text="Beginning implementation of ParticleField component and injecting it into the DOM tree." trigger={step >= 5} speed={15} />
                      </div>

                      <div className="flex flex-col gap-2 mt-2 pl-3">
                        {/* Write File 1 */}
                        <div className="bg-[#111] p-2 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                            <FileCode className="w-3.5 h-3.5 text-amber-500" /> Write file: ParticleField.tsx
                          </div>
                          {step === 5 ? (
                            <span className="text-[9px] text-blue-400 flex items-center gap-1.5 font-bold uppercase tracking-widest">
                              <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                              Writing
                            </span>
                          ) : (
                            <span className="text-[9px] text-emerald-400 flex items-center gap-1 font-bold uppercase tracking-widest"><CheckCircle2 className="w-3 h-3"/> Completed</span>
                          )}
                        </div>

                        {/* Write File 2 */}
                        {step >= 6 && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#111] p-2 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                              <FileCode className="w-3.5 h-3.5 text-cyan-500" /> Write file: Hero.tsx
                            </div>
                            {step === 6 ? (
                              <span className="text-[9px] text-blue-400 flex items-center gap-1.5 font-bold uppercase tracking-widest">
                                <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                Writing
                              </span>
                            ) : (
                              <span className="text-[9px] text-emerald-400 flex items-center gap-1 font-bold uppercase tracking-widest"><CheckCircle2 className="w-3 h-3"/> Completed</span>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 6. Coder Terminal Linting */}
                <AnimatePresence>
                  {step >= 7 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2 pb-8">
                      <div className="flex items-center gap-2 text-[11px] font-bold">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-zinc-200">Coder</span>
                      </div>
                      <div className="text-[12.5px] text-zinc-300 pl-3">
                        <TypewriterText text="Verifying implementation against strict architectural guidelines." trigger={step >= 7} speed={15} />
                      </div>
                      <div className="flex flex-col gap-2 mt-2 pl-3">
                        <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono">
                          <Terminal className="w-3.5 h-3.5" /> 
                          <span className="text-zinc-300">npm run lint</span>
                        </div>
                        <div className="mt-1 text-emerald-500 text-[11px] font-mono whitespace-pre-wrap leading-relaxed">
                          <TypewriterText text={"> No linting errors found.\n> Typecheck passed.\n> Build optimized."} trigger={step >= 7} speed={10} delay={1500} />
                        </div>
                        <div className="mt-2 flex items-center justify-end w-full">
                          {step === 7 ? (
                            <span className="text-[9px] text-emerald-400 flex items-center gap-1.5 font-bold uppercase tracking-widest">
                              <RotateCcw className="w-3 h-3 animate-spin-slow" /> Validating...
                            </span>
                          ) : (
                            <span className="text-[9px] text-emerald-400 flex items-center gap-1 font-bold uppercase tracking-widest">
                              <CheckCircle2 className="w-3 h-3" /> Approved
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 7. Tasker Checkoff */}
                <AnimatePresence>
                  {step >= 8 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2 pb-4">
                      <div className="flex items-center gap-2 text-[11px] font-bold">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        <span className="text-zinc-200">Tasker</span>
                      </div>
                      <div className="text-[12.5px] text-zinc-300 pl-3">
                        <TypewriterText text="Sub-agents have completed their execution blocks. Verifying checklist." trigger={step >= 8} speed={15} />
                      </div>
                      <div className="pl-4 ml-2 mt-2 text-emerald-400/90 text-[12px] font-mono leading-relaxed flex flex-col gap-1">
                        <TypewriterText text={"[x] Verify hero section DOM structure.\n[x] Implement `ParticleField.tsx` WebGL logic.\n[x] Integrate into `Hero.tsx`."} trigger={step >= 8} speed={10} delay={1000} />
                      </div>
                      <div className="text-[12.5px] text-zinc-400 pl-3 mt-2">
                        <TypewriterText text="All tasks successfully executed. Escalating back to CEO." trigger={step >= 8} speed={15} delay={2500} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 8. CEO Final Message */}
                <AnimatePresence>
                  {step >= 9 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2 pb-8">
                      <div className="flex items-center gap-2 text-[11px] font-bold">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span className="text-zinc-200">CEO</span>
                      </div>
                      <div className="text-[12.5px] text-zinc-200 pl-3 leading-relaxed">
                        <TypewriterText text="The WebGL Particle Field has been successfully engineered and integrated into the Hero section. Performance metrics show 60fps rendering with zero layout thrashing. The application is ready for deployment." trigger={step >= 9} speed={15} />
                      </div>
                      <div className="mt-2 flex items-center justify-end w-full">
                        <span className="text-[9px] text-emerald-400 flex items-center gap-1 font-bold uppercase tracking-widest">
                          <CheckCircle2 className="w-3 h-3" /> Swarm Execution Complete
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

              {/* Input Area (Bottom) */}
              <div className="p-4 bg-[#050505] shrink-0">
                <div className="relative flex items-center">
                  <div className="flex-1 bg-[#111] border border-[#333] py-2.5 px-4 text-[12px] text-zinc-200 min-h-[40px] flex items-center font-medium">
                    {step === -2 || step === -1 ? (
                      <TypewriterText text="Build a high-performance WebGL Particle Field component and integrate it into the Hero section." trigger={step === -2 || step === -1} speed={25} />
                    ) : (
                      <span className="text-zinc-600">Ask a question or assign a task to CEO...</span>
                    )}
                  </div>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                    {(step === -2 || step === -1) ? (
                      <div className="relative flex items-center justify-center w-6 h-6">
                        {step === -1 && (
                          <motion.div 
                            initial={{ scale: 0.8, opacity: 1 }} 
                            animate={{ scale: 2.5, opacity: 0 }} 
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="absolute inset-0 bg-blue-500 rounded-full"
                          />
                        )}
                        <div className={`p-1 rounded-full ${step === -1 ? 'bg-blue-600 text-white' : 'bg-[#222] text-zinc-500'} relative z-10 transition-colors`}>
                          <ArrowUp className="w-3 h-3" />
                        </div>
                      </div>
                    ) : (
                      <div className="text-zinc-600 text-[10px] font-mono font-bold tracking-wider">
                        {isFinished ? 'DONE' : 'WORKING...'}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  <Cpu className="w-3 h-3 text-blue-500" />
                  Qwen/qwen2-coder-32b
                </div>
              </div>

            </motion.div>
          </div>
        </div>

        {/* Scroll to Explore - Shown when execution finishes */}
        <AnimatePresence>
          {isFinished && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 font-mono text-[10px] uppercase tracking-widest"
            >
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
              Scroll to explore
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

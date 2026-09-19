"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Zap, CheckCircle2, LayoutDashboard, RotateCcw, Terminal } from "lucide-react";
import { AGENT_THEMES, DEMO_TASKS, TaskType, AgentClass } from "@/lib/tasks";

const AGENT_ORDER: AgentClass[] = [
  'Supervisor',       // 0
  'Business Analyst', // 1
  'Tasker',           // 2
  'Developer',        // 3
  'Designer',         // 4
  'DevOps',           // 5
  'QA',               // 6
  'Reviewer'          // 7
];

const CARD_HEIGHT = 100;
const VISIBLE_HEIGHT = 300;

const AgentRobotSVG = ({ color, isActive, className = "w-12 h-12 shrink-0" }: { color: string, isActive: boolean, className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} style={{ color }}>
    <rect width="100" height="100" rx="30" fill="currentColor" fillOpacity="0.15" />
    <motion.rect 
      x="25" y="35" width="12" height="16" rx="6" fill="currentColor" 
      animate={{ scaleY: [1, 0.1, 1, 1] }} 
      transition={{ repeat: Infinity, duration: 4, times: [0, 0.05, 0.1, 1], repeatDelay: Math.random() }}
    />
    <motion.rect 
      x="63" y="35" width="12" height="16" rx="6" fill="currentColor" 
      animate={{ scaleY: [1, 0.1, 1, 1] }} 
      transition={{ repeat: Infinity, duration: 4, times: [0, 0.05, 0.1, 1], repeatDelay: Math.random() }}
    />
    <path
      d={isActive ? "M 30 65 Q 50 80 70 65" : "M 35 65 Q 50 68 65 65"}
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      fill="transparent"
      className="transition-all duration-300"
    />
  </svg>
);

interface HistoryEntry {
  id: string;
  task: TaskType;
  agent: AgentClass;
  latency: number;
  isCached: boolean;
  status: 'working' | 'done';
  duration: number; // Random working duration
}

const DataBridge = ({ active, color = "#06b6d4", id }: { active: boolean, color?: string, id: string }) => {
  // A single clean trunk that forks into 3 connectors at the end
  const paths = [
    "M 0 16 L 80 16 L 88 8 L 100 8",
    "M 0 16 L 100 16",
    "M 0 16 L 80 16 L 88 24 L 100 24"
  ];

  return (
    <div className="flex-1 h-[372px] flex items-center justify-center min-w-[20px] pt-[72px]">
      <svg className="w-full h-16 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 32">
        <defs>
          <filter id={`glowBridge-${id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Active solid lines */}
        <AnimatePresence>
          {active && (
            <>
              {paths.map((d, i) => (
                <motion.path 
                  key={`line-${i}`}
                  d={d} fill="transparent" stroke={color} strokeWidth={2} filter={`url(#glowBridge-${id})`}
                  initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} exit={{ opacity: 0 }} 
                  transition={{ duration: 2.0, ease: "easeInOut" }} 
                />
              ))}
              
              {/* Energy pulses */}
              {paths.map((d, i) => (
                <motion.path 
                  key={`pulse-${i}`}
                  d={d} fill="transparent" stroke="#fff" strokeWidth={2} filter={`url(#glowBridge-${id})`}
                  strokeDasharray={`10 200`} initial={{ strokeDashoffset: 200, opacity: 0 }} animate={{ strokeDashoffset: 0, opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 3.0, delay: i * 0.4, repeat: Infinity, ease: "linear" }} 
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
};

const TaskLogItem = ({ entry }: { entry: HistoryEntry }) => {
  const [percent, setPercent] = useState(0);
  const theme = AGENT_THEMES[entry.agent];
  const isWorking = entry.status === 'working';

  useEffect(() => {
    if (isWorking) {
      let startTime: number | null = null;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / entry.duration, 1);
        setPercent(Math.floor(progress * 100));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    } else {
      setPercent(100);
    }
  }, [isWorking, entry.duration]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center justify-between py-3 border-b border-white/[0.02] last:border-0 hover:bg-white/[0.01] px-4 rounded-xl transition-colors gap-4"
    >
      <div className="flex items-center gap-3 w-40 shrink-0">
        <AgentRobotSVG color={theme.color} isActive={isWorking} className="w-5 h-5 shrink-0" />
        <span className="text-[11px] font-mono truncate uppercase tracking-wider" style={{ color: theme.color }}>{entry.agent}</span>
      </div>

      <div className="text-xs font-mono text-slate-300 line-clamp-1 flex-1">
        {entry.task.title}
      </div>
      
      <div className="w-12 flex justify-end text-right shrink-0">
        <AnimatePresence mode="wait">
          {!isWorking ? (
            <motion.div 
              key="done"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex justify-end"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </motion.div>
          ) : (
            <motion.div 
              key="percent"
              exit={{ opacity: 0 }}
              className="text-[11px] font-mono text-amber-400"
            >
              {percent}%
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default function JevAgentShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logScrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });

  // State Machine
  const [isPlaying, setIsPlaying] = useState(false);
  const [replayCount, setReplayCount] = useState(0);
  const [step, setStep] = useState(0); // 0 to DEMO_TASKS.length
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Orchestration States
  const [bridge1Active, setBridge1Active] = useState(false);
  const [bridge2Active, setBridge2Active] = useState(false);
  const [slotLanded, setSlotLanded] = useState(false);

  // Current routed task states
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<AgentClass | null>(null);
  const [reason, setReason] = useState<string | null>(null);
  const [isRouting, setIsRouting] = useState(false);
  
  // Metrics
  const [latency, setLatency] = useState<number>(0);
  const [isCached, setIsCached] = useState<boolean>(false);
  const [targetIndex, setTargetIndex] = useState<number>(0);

  // Auto-scroll the log container whenever history changes
  useEffect(() => {
    if (logScrollRef.current) {
      logScrollRef.current.scrollTop = logScrollRef.current.scrollHeight;
    }
  }, [history]);

  // Auto-start when scrolled into view
  useEffect(() => {
    if (isInView && step === 0 && !isPlaying && history.length === 0) {
      setIsPlaying(true);
    }
  }, [isInView, isPlaying, step, history.length]);

  useEffect(() => {
    if (!isPlaying) return;

    if (step >= DEMO_TASKS.length) {
      setIsPlaying(false);
      return;
    }

    let isMounted = true;
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    const processNextTask = async () => {
      const task = DEMO_TASKS[step];
      setActiveTask(task);
      setSelectedAgent(null);
      setReason(null);
      setLatency(0);
      setBridge1Active(false);
      setBridge2Active(false);
      setSlotLanded(false);

      await delay(400); // 1. initial wait to clear UI
      if (!isMounted) return;

      setBridge1Active(true);
      await delay(2000); // 2. wait for bridge 1
      if (!isMounted) return;

      setIsRouting(true); // Spin engine
      const startTime = performance.now();
      
      try {
        const res = await fetch('/api/jev-route', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ taskId: task.id, title: task.title })
        });
        
        const data = await res.json();
        const endTime = performance.now();
        if (!isMounted) return;

        if (res.ok) {
          const fetchedLatency = Math.round(endTime - startTime);
          setLatency(fetchedLatency);
          setIsCached(data.cached);
          
          const indexInOrder = AGENT_ORDER.indexOf(data.agent);
          if (indexInOrder !== -1) {
            // Add 16 items (2 full loops) to the current base to spin smoothly
            setTargetIndex(prev => prev - (prev % 8) + 16 + indexInOrder);
          }
          
          setIsRouting(false); // End simulated fetch latency
          
          // Wait for slot machine to visually stop spinning (2.5s)
          await delay(2500);
          if (!isMounted) return;

          setSlotLanded(true);

          setBridge2Active(true);
          await delay(2000); // 3. wait for bridge 2
          if (!isMounted) return;

          setSelectedAgent(data.agent);
          setReason(data.reason);

          await delay(1500); // 4. read time for IDE
          if (!isMounted) return;
            
          // 4. Execution / Work
          const workDuration = Math.random() * 1000 + 500;
          setHistory(prev => [...prev, {
            id: task.id,
            task,
            agent: data.agent,
            latency: fetchedLatency,
            isCached: data.cached,
            status: 'working',
            duration: workDuration
          }]);

          await delay(workDuration);
          if (!isMounted) return;

          // 5. Done, reset bridges
          setHistory(prev => prev.map(entry => 
            entry.id === task.id ? { ...entry, status: 'done' } : entry
          ));

          setBridge1Active(false);
          setBridge2Active(false);
          
          await delay(400); // wait before next loop
          if (!isMounted) return;

          setStep(s => s + 1); // trigger next
        }
      } catch (e) {
        console.error("Routing error:", e);
        if (isMounted) setIsRouting(false);
      }
    };

    processNextTask();

    return () => { isMounted = false; };
  }, [isPlaying, step]);

  const handleReplay = () => {
    setHistory([]);
    setStep(0);
    setActiveTask(null);
    setSelectedAgent(null);
    setReason(null);
    setIsRouting(false);
    setBridge1Active(false);
    setBridge2Active(false);
    setReplayCount(c => c + 1);
    setIsPlaying(true);
  };

  // Create a long array so it can spin endlessly downwards
  const slotItems = Array.from({ length: 400 }).map((_, i) => AGENT_ORDER[i % AGENT_ORDER.length]);
  const centerOffset = (VISIBLE_HEIGHT / 2) - (CARD_HEIGHT / 2);
  const yOffset = -(targetIndex * CARD_HEIGHT) + centerOffset;

  // Reusable Slot Machine Component for both Desktop and Mobile views
  const renderSlotMachineUI = () => (
    <>
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#07080c] to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#07080c] to-transparent z-10 pointer-events-none" />
        
        <div className="absolute top-1/2 left-0 right-0 h-[100px] -translate-y-1/2 bg-white/[0.03] pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-1 h-[60px] -translate-y-1/2 bg-cyan-500 rounded-r-full z-20" />

        <motion.div
          className="w-full"
          animate={{ y: yOffset }}
          transition={{ duration: 2.5, ease: [0.15, 0.85, 0.25, 1] }}
        >
          {slotItems.map((agent, i) => {
            const theme = AGENT_THEMES[agent as AgentClass];
            const isActive = i === targetIndex && slotLanded;
            
            return (
              <div 
                key={`${agent}-${i}`}
                className="w-full flex items-center justify-between px-6 transition-all duration-500"
                style={{ 
                  height: CARD_HEIGHT,
                  opacity: isRouting ? 0.4 : (isActive ? 1 : 0.3),
                  scale: isActive ? 1 : 0.95,
                }}
              >
                <div className="flex items-center gap-4">
                  <AgentRobotSVG color={theme.color} isActive={isActive} />
                  <span className={`text-lg font-bold ${isActive ? 'text-white' : 'text-slate-400'}`}>
                    {agent}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>
    </>
  );

  return (
    <div ref={containerRef} className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-20 relative">
      
      {/* -------------------- */}
      {/* DESKTOP LAYOUT        */}
      {/* -------------------- */}
      <div className="hidden lg:flex flex-row items-start justify-between mb-12 relative z-0 min-h-[372px]">
        
        {/* Left Column: Task Feed */}
        <div className="w-[30%] flex flex-col items-center relative z-10">
          <div className="h-14 w-full max-w-xs flex items-center justify-between mb-4 px-5 py-3 bg-white/[0.02] border border-white/5 rounded-2xl shadow-sm backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-semibold text-white">Incoming Task</span>
            </div>
            <button 
              onClick={handleReplay} 
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors group flex items-center justify-center" 
              title="Restart Demo"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
            </button>
          </div>
          
          <div className="w-full max-w-xs h-[300px] relative bg-[#07080c] rounded-3xl overflow-hidden ring-1 ring-white/5 shadow-2xl flex flex-col items-center justify-center p-6">
            <AnimatePresence mode="wait">
              {step < DEMO_TASKS.length && activeTask ? (
                <motion.div
                  key={activeTask.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/10 text-white uppercase tracking-wider shadow-sm">
                      {activeTask.fileBadge}
                    </span>
                  </div>
                  <h4 className="text-lg font-medium leading-relaxed text-white">
                    {activeTask.title}
                  </h4>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-mono text-slate-500 text-center"
                >
                  Waiting for task...
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bridge 1 (Task -> Slot) */}
        <DataBridge id="bridge1" active={bridge1Active} color="#06b6d4" />

        {/* Center Column: Slot Machine */}
        <div className="w-[30%] flex flex-col items-center relative z-10">
          <div className="h-14 w-full max-w-xs flex items-center justify-between mb-4 px-5 py-3 bg-white/[0.02] border border-white/5 rounded-2xl shadow-sm backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-semibold text-white">Decision Engine</span>
            </div>
            {latency > 0 && (
              <div className="flex flex-col items-end">
                <span className="text-xs font-mono text-amber-400 font-bold">{latency}ms</span>
                {isCached && <span className="text-[9px] text-emerald-400 font-mono uppercase">cached</span>}
              </div>
            )}
          </div>

          <div 
            className="w-full max-w-xs relative bg-[#0a0c10] rounded-3xl overflow-hidden ring-1 ring-white/5 shadow-2xl"
            style={{ height: VISIBLE_HEIGHT }}
          >
            {renderSlotMachineUI()}
          </div>
        </div>

        {/* Bridge 2 (Slot -> IDE) */}
        <DataBridge id="bridge2" active={bridge2Active} color={selectedAgent ? AGENT_THEMES[selectedAgent].color : "#3b82f6"} />

        {/* Right Column: Active Agent Showcase */}
        <div className="w-[30%] flex flex-col items-center relative z-10">
          <div className="h-14 w-full max-w-xs flex items-center justify-between mb-4 px-5 py-3 bg-white/[0.02] border border-white/5 rounded-2xl shadow-sm backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-semibold text-white">Jennefer IDE</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-white/10" />
              <div className="w-2 h-2 rounded-full bg-white/10" />
            </div>
          </div>

          <div className="w-full max-w-xs h-[300px] relative bg-[#07080c] rounded-3xl overflow-hidden ring-1 ring-white/5 shadow-2xl p-6 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {selectedAgent && reason ? (
                <motion.div
                  key={selectedAgent}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", delay: 0.1 }}
                  className="w-full"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <AgentRobotSVG color={AGENT_THEMES[selectedAgent].color} isActive={true} />
                    <div>
                      <h3 className="text-xl font-bold text-white">{selectedAgent}</h3>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-white/60">
                        Assigned Agent
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-4 mb-4 ring-1 ring-white/5">
                    <p className="text-sm text-slate-300 leading-relaxed font-mono">
                      <span className="text-emerald-400 mr-2">{'>'}</span>
                      {reason}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-xs font-mono text-emerald-400 ring-1 ring-emerald-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    <span>Match Verified</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-slate-500 h-full w-full"
                >
                  <Terminal className="w-8 h-8 mb-4 opacity-40" />
                  <span className="text-sm font-mono">Awaiting Agent...</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* -------------------- */}
      {/* MOBILE SLIDER LAYOUT  */}
      {/* -------------------- */}
      <div className="flex lg:hidden flex-col w-full gap-8 relative min-h-[500px]">
        {/* Top: Mobile Task Slider */}
        <div className="w-full flex flex-col relative h-[140px] overflow-hidden rounded-3xl bg-blue-600/5 ring-1 ring-blue-500/10">
          <AnimatePresence mode="popLayout">
            {activeTask && step < DEMO_TASKS.length && (
              <motion.div
                key={activeTask.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="w-full p-6 absolute inset-0 flex flex-col justify-center items-start"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/10 text-white uppercase tracking-wider shadow-sm">
                    {activeTask.fileBadge}
                  </span>
                </div>
                <h4 className="text-sm font-medium leading-relaxed text-white">
                  {activeTask.title}
                </h4>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom: Mobile Slot Machine */}
        {step < DEMO_TASKS.length && (
          <div className="w-full flex justify-center">
            <div 
              className="w-full max-w-xs relative bg-[#0a0c10] rounded-3xl overflow-hidden ring-1 ring-white/5 shadow-2xl shadow-black/50"
              style={{ height: VISIBLE_HEIGHT }}
            >
              {renderSlotMachineUI()}
            </div>
          </div>
        )}
      </div>

      {/* -------------------- */}
      {/* Tasks Log Section    */}
      {/* -------------------- */}
      <div className="w-full max-w-4xl mx-auto hidden lg:flex flex-col bg-white/[0.02] rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden h-64 md:h-80 relative">
        <div className="px-8 py-6 flex items-center justify-between z-10 bg-gradient-to-b from-[#0a0c10] to-[#0a0c10]/0">
          <h3 className="text-sm font-semibold text-white">Tasks</h3>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Live Feed</span>
        </div>
        <div ref={logScrollRef} className="px-4 py-2 flex flex-col overflow-y-auto" style={{ scrollBehavior: 'smooth' }}>
          <AnimatePresence initial={false}>
            {history.map((entry, idx) => (
              <TaskLogItem key={`${entry.id}-${idx}`} entry={entry} />
            ))}
          </AnimatePresence>
          {history.length === 0 && (
            <div className="text-center text-sm text-slate-500 py-10 font-mono">Waiting for routing data...</div>
          )}
        </div>
      </div>

      {/* Final Success Overlay */}
      <AnimatePresence>
        {step >= DEMO_TASKS.length && !isPlaying && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#07080c]/60 rounded-[3rem]"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="p-8 rounded-3xl bg-white/[0.05] ring-1 ring-white/10 shadow-[0_0_80px_rgba(37,99,235,0.2)] flex flex-col items-center max-w-sm text-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6 ring-1 ring-emerald-500/40">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">100% Match Success</h2>
              <p className="text-sm text-slate-300 mb-8 leading-relaxed">
                Jev automatically dispatched all tasks to the deterministic agents correctly with near-zero latency.
              </p>
              
              <button 
                onClick={handleReplay}
                className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-slate-200 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Replay Routing Engine
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Cpu, LoaderCircle, RotateCcw } from "lucide-react";
import { DEMO_TASKS, type AgentClass, type TaskType } from "@/lib/tasks";

const AGENTS: AgentClass[] = [
  "Supervisor",
  "Business Analyst",
  "Tasker",
  "Developer",
  "Designer",
  "DevOps",
  "QA",
  "Reviewer",
];

type RouteResult = {
  agent: AgentClass;
  reason: string;
  cached: boolean;
};

type RouteStatus = "loading" | "ready" | "error";

export default function JevAgentShowcase() {
  const [selectedTaskId, setSelectedTaskId] = useState(DEMO_TASKS[3].id);
  const [requestNonce, setRequestNonce] = useState(0);
  const [status, setStatus] = useState<RouteStatus>("loading");
  const [result, setResult] = useState<RouteResult | null>(null);
  const reducedMotion = useReducedMotion();

  const selectedIndex = DEMO_TASKS.findIndex((task) => task.id === selectedTaskId);
  const selectedTask = DEMO_TASKS[selectedIndex] ?? DEMO_TASKS[0];

  useEffect(() => {
    const controller = new AbortController();
    let revealTimer: ReturnType<typeof setTimeout> | undefined;

    const route = async () => {
      try {
        const response = await fetch("/api/jev-route", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ taskId: selectedTask.id, title: selectedTask.title }),
          signal: controller.signal,
        });

        if (!response.ok) throw new Error(`Routing request failed: ${response.status}`);
        const data: RouteResult = await response.json();
        if (!AGENTS.includes(data.agent) || typeof data.reason !== "string") {
          throw new Error("Invalid routing response");
        }

        revealTimer = setTimeout(() => {
          setResult(data);
          setStatus("ready");
        }, reducedMotion ? 0 : 320);
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Routing demo failed:", error);
        setStatus("error");
      }
    };

    route();
    return () => {
      controller.abort();
      if (revealTimer) clearTimeout(revealTimer);
    };
  }, [selectedTask.id, selectedTask.title, requestNonce, reducedMotion]);

  const selectTask = (task: TaskType) => {
    if (task.id === selectedTaskId && status !== "error") return;
    setStatus("loading");
    setResult(null);
    if (task.id === selectedTaskId) setRequestNonce((current) => current + 1);
    else setSelectedTaskId(task.id);
  };

  return (
    <section id="routing-demo" className="relative overflow-hidden bg-[#101010] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-32" aria-labelledby="routing-title">
      <div className="pointer-events-none absolute right-[-14rem] top-[-12rem] h-[720px] w-[720px] rounded-full bg-[#aaaaaa]/[0.055] blur-[130px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1440px]">
        <div className="mb-8 flex flex-col justify-between gap-6 lg:mb-16 lg:flex-row lg:items-end lg:gap-8">
          <div>
            <p className="mb-4 text-sm font-medium text-[#c1c1c1] lg:mb-6">Agent routing</p>
            <h2 id="routing-title" className="max-w-[900px] text-[clamp(2.7rem,7.4vw,7.6rem)] font-semibold leading-[0.98] tracking-[-0.075em] text-[#f1f1f1] sm:text-[clamp(3.4rem,7.4vw,7.6rem)] lg:leading-[0.96]">
              The right agent<br /><span className="text-[#d9d9d9]">for each task.</span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-[1.7] text-[#b6b6b6]">
            Select a task to see which specialist handles it and why.
          </p>
        </div>

        <div className="overflow-hidden border border-[#cdcdcd]/20 bg-[#171717] shadow-[0_28px_90px_rgba(0,0,0,0.22)]">
          <div className="hidden flex-wrap items-center justify-between gap-3 border-b border-[#cdcdcd]/15 px-5 py-4 text-sm text-[#a1a1a1] sm:px-8 lg:flex">
            <span>Choose a task and see the handoff</span>
          </div>

          <div className="grid lg:grid-cols-[0.88fr_1.12fr]">
            <div className="border-b border-[#cdcdcd]/15 lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between px-5 pb-3 pt-5 sm:px-8 lg:pb-4 lg:pt-7">
                <div>
                  <h3 className="mt-2 text-xl font-semibold tracking-[-0.045em] text-[#f1f1f1]">Choose a task</h3>
                </div>
              </div>

              <div className="px-5 pb-5 sm:px-8 lg:hidden">
                <label htmlFor="routing-task" className="sr-only">Choose an example task</label>
                <div className="relative">
                  <select
                    id="routing-task"
                    value={selectedTaskId}
                    onChange={(event) => {
                      const task = DEMO_TASKS.find((item) => item.id === event.target.value);
                      if (task) selectTask(task);
                    }}
                    aria-controls="routing-result"
                    className="min-h-12 w-full appearance-none border border-white/20 bg-[#242424] px-4 pr-11 text-base font-medium text-white transition-colors focus:border-white [color-scheme:dark]"
                  >
                    {DEMO_TASKS.map((task) => <option key={task.id} value={task.id}>{task.fileBadge}</option>)}
                  </select>
                  <ChevronDown size={18} strokeWidth={1.7} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#c7c7c7]" aria-hidden="true" />
                </div>
                <p className="mt-3 text-sm leading-6 text-[#bcbcbc]">{selectedTask.title}</p>
              </div>

              <div className="hidden grid-cols-1 gap-px border-t border-[#cdcdcd]/10 bg-[#cdcdcd]/10 lg:grid lg:grid-cols-1">
                {DEMO_TASKS.map((task, index) => {
                  const active = task.id === selectedTaskId;
                  return (
                    <button
                      key={task.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => selectTask(task)}
                      className={`group relative min-h-[76px] overflow-hidden bg-[#191919] px-5 py-3.5 text-left transition-colors duration-200 hover:bg-[#272727] sm:px-8 ${active ? "text-[#f4f4f4]" : "text-[#b7b7b7]"}`}
                    >
                      {active && (
                        <motion.span
                          layoutId="routing-selection"
                          className="pointer-events-none absolute inset-0 border-l-2 border-[#d9d9d9] bg-[#d9d9d9]/[0.07]"
                          transition={{ duration: reducedMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
                        />
                      )}
                      <span className="relative flex items-center gap-4">
                        <span className={`w-6 shrink-0 font-mono text-xs ${active ? "text-[#d9d9d9]" : "text-[#818181]"}`}>{String(index + 1).padStart(2, "0")}</span>
                        <span className="min-w-0 flex-1">
                          <span className="mt-1 block text-sm font-medium leading-[1.45] sm:text-base">{task.title}</span>
                        </span>
                        <ArrowRight aria-hidden="true" className={`h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1 ${active ? "text-[#d9d9d9]" : "text-[#6c6c6c]"}`} strokeWidth={1.6} />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex min-w-0 flex-col p-5 sm:p-8 lg:p-10">
              <div className="hidden items-start justify-between gap-4 lg:flex">
                <div>
                  <h3 className="mt-2 text-xl font-semibold tracking-[-0.045em] text-[#f1f1f1]">A decision you can inspect</h3>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#cdcdcd]/25 bg-[#272727] text-[#d9d9d9]"><Cpu size={18} strokeWidth={1.6} /></div>
              </div>

              <div className="mt-8 hidden bg-[#222222] p-5 sm:p-7 lg:block">
                <div className="mb-4 text-xs font-medium text-[#9f9f9f]">Selected request</div>
                <p className="max-w-[600px] text-lg font-medium leading-[1.4] tracking-[-0.025em] text-[#ececec] sm:text-xl">{selectedTask.title}</p>
              </div>

              <div className="hidden h-8 lg:block" aria-hidden="true" />

              <div id="routing-result" className="min-h-[170px] lg:min-h-[186px]" aria-live="polite" aria-atomic="true">
                <AnimatePresence mode="wait" initial={false}>
                  {status === "ready" && result ? (
                    <motion.div key={`${selectedTask.id}-ready`} initial={{ opacity: 0, y: reducedMotion ? 0 : 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }} transition={{ duration: reducedMotion ? 0 : 0.35 }}>
                      <p className="mb-3 flex items-center gap-2 text-sm text-[#d9d9d9]"><Check size={14} strokeWidth={1.7} /> Assigned specialist</p>
                      <p className="text-[clamp(3rem,5.5vw,5.8rem)] font-semibold leading-none tracking-[-0.07em] text-[#f1f1f1]">{result.agent}</p>
                      <p className="mt-5 max-w-[580px] text-sm leading-[1.7] text-[#bbbbbb] sm:text-base">{result.reason}</p>
                    </motion.div>
                  ) : status === "error" ? (
                    <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <p className="text-lg font-medium text-[#f1f1f1]">The routing result is unavailable.</p>
                      <p className="mt-2 text-sm text-[#aeaeae]">Please retry the local decision request.</p>
                      <button type="button" onClick={() => selectTask(selectedTask)} className="mt-5 inline-flex items-center gap-2 border border-[#cdcdcd]/35 px-4 py-2.5 text-sm text-[#e3e3e3] transition-colors hover:bg-[#2c2c2c]"><RotateCcw size={15} /> Retry</button>
                    </motion.div>
                  ) : (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex min-h-[160px] items-center gap-4 text-[#d2d2d2]">
                      <LoaderCircle className={`h-6 w-6 ${reducedMotion ? "" : "animate-spin"}`} strokeWidth={1.4} />
                      <span className="font-mono text-xs uppercase tracking-[0.14em]">Matching task to expertise...</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-auto hidden pt-8 lg:block">
                <div className="mb-4 text-sm text-[#a7a7a7]">Available specialists</div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {AGENTS.map((agent) => {
                    const active = status === "ready" && result?.agent === agent;
                    return (
                      <div key={agent} className={`flex min-h-11 items-center gap-2 border px-2.5 py-2 text-xs leading-tight transition-colors duration-300 ${active ? "border-[#d9d9d9]/55 bg-[#d9d9d9]/10 text-[#ededed]" : "border-[#cdcdcd]/15 bg-[#1b1b1b] text-[#939393]"}`}>
                        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${active ? "bg-[#d9d9d9]" : "bg-[#717171]"}`} />{agent}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

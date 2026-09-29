"use client";

import { useState } from "react";
import { ArrowRight, Check, RotateCcw } from "lucide-react";

const agents = [
  { number: "01", name: "Architect", action: "Plans the system" },
  { number: "02", name: "Developer", action: "Builds the workspace" },
  { number: "03", name: "Reviewer", action: "Checks the changes" },
];

export default function HeroWorkflow() {
  const [run, setRun] = useState(0);

  return (
    <figure className="hero-workflow" aria-label="A sample task is handled by a local model and specialist agents, then handed back to you for review">
      <div className="hero-workflow-topline font-mono">
        <span>JENNEFER / WORKFLOW PREVIEW</span>
        <span className="hero-workflow-local"><span aria-hidden="true" /> ON YOUR MACHINE</span>
      </div>

      <div className="hero-workflow-run" key={run}>
        <div className="hero-workflow-task">
          <div className="hero-workflow-eyebrow font-mono"><span>YOUR TASK</span><span>01 / INPUT</span></div>
          <div className="hero-workflow-prompt"><span className="hero-workflow-chevron" aria-hidden="true">›</span>Build a private workspace<span className="hero-workflow-cursor" aria-hidden="true" /></div>
        </div>

        <div className="hero-workflow-system">
          <span className="hero-workflow-system-mark" aria-hidden="true">J</span>
          <span><strong>Local model ready</strong><small className="font-mono">RUNNING ON YOUR HARDWARE</small></span>
          <span className="hero-workflow-system-state font-mono">OFFLINE / PRIVATE</span>
        </div>

        <div className="hero-workflow-route font-mono"><span>ROUTING TO SPECIALISTS</span><span className="hero-workflow-route-line" aria-hidden="true" /></div>

        <div className="hero-workflow-agents" aria-label="Specialist agents">
          {agents.map((agent, index) => (
            <div className={`hero-workflow-agent hero-workflow-agent-${index + 1}`} key={agent.number}>
              <span className="hero-workflow-agent-number font-mono">{agent.number} / AGENT</span>
              <span className="hero-workflow-agent-name">{agent.name}</span>
              <span className="hero-workflow-agent-action">{agent.action}</span>
              <span className="hero-workflow-agent-signal" aria-hidden="true" />
            </div>
          ))}
        </div>

        <div className="hero-workflow-output">
          <div className="hero-workflow-output-heading font-mono"><span>WORKSPACE / OUTPUT</span><span>FILES UPDATED</span></div>
          <div className="hero-workflow-output-body">
            <div className="hero-workflow-file-list font-mono"><span>workspace.tsx</span><span>workspace.css</span></div>
            <div className="hero-workflow-code" aria-hidden="true"><i /><i /><i /><i /></div>
          </div>
        </div>

        <div className="hero-workflow-checks"><span className="hero-workflow-check-icon" aria-hidden="true"><Check size={15} strokeWidth={1.8} /></span><span>Reviewer checks the changes</span><span className="font-mono">REVIEW COMPLETE</span></div>

        <div className="hero-workflow-result">
          <div><span className="hero-workflow-result-label font-mono">FINAL STEP / HUMAN DECISION</span><strong>Ready for your review</strong></div>
          <ArrowRight className="hero-workflow-result-arrow" size={19} strokeWidth={1.6} aria-hidden="true" />
        </div>
      </div>

      <div className="hero-workflow-footer font-mono">
        <span>BUILD WITH AGENTS. KEEP THE KEYS.</span>
        <button type="button" onClick={() => setRun((value) => value + 1)} className="hero-workflow-replay" aria-label="Replay the agent workflow"><RotateCcw size={13} strokeWidth={1.7} aria-hidden="true" /> REPLAY</button>
      </div>
    </figure>
  );
}

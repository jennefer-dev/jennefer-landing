"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, RotateCcw } from "lucide-react";

export default function HeroCinema({ children }: { children?: React.ReactNode }) {
  const [take, setTake] = useState(0);

  return (
    <figure className="hero-cinema" aria-label="A laptop opens Jennefer. A local model builds a private workspace as moonlight turns into daylight, and the finished project opens at daybreak.">
      <div className="hero-cinema-scene" key={take} aria-hidden="true">
        <div className="hero-cinema-night" />
        <div className="hero-cinema-stars" />
        <div className="hero-cinema-day" />
        <div className="hero-cinema-orb" />
        <div className="hero-cinema-horizon" />
        <div className="hero-cinema-atmosphere" />

        <div className="hero-cinema-caption hero-cinema-caption-night font-mono"><span>01 / NIGHT</span><span>BUILDING LOCALLY</span></div>
        <div className="hero-cinema-caption hero-cinema-caption-day font-mono"><span>02 / DAYBREAK</span><span>PROJECT READY</span></div>

        <div className="hero-cinema-laptop">
          {/* Proje hazır olunca Byte kapağın arkasından bakıyor; /nefers sayfasına götürür. */}
          <a href="/nefers" tabIndex={-1} className="hero-nefer-peek">
            <span className="hero-nefer-peek-bubble font-mono"><span className="hero-nefer-peek-idle">PSST. WE BUILT THIS.</span><span className="hero-nefer-peek-hover">MEET THE NEFERS ↗</span></span>
            <span className="hero-nefer-peek-body"><Image src="/images/nefers/byte-side.png" alt="" width={160} height={160} sizes="110px" /></span>
          </a>
          <div className="hero-cinema-lid">
            <div className="hero-cinema-camera" />
            <div className="hero-cinema-display">
              <div className="hero-cinema-boot"><span className="hero-cinema-boot-mark">J</span><span>Jennefer</span></div>

              <div className="hero-cinema-app">
                <div className="hero-cinema-appbar"><span className="hero-cinema-appmark">J</span><strong>Jennefer</strong><span className="hero-cinema-model font-mono"><i /> LOCAL MODEL</span></div>
                <div className="hero-cinema-ai">
                  <div className="hero-cinema-ai-eyebrow font-mono">PRIVATE WORKSPACE / NEW TASK</div>
                  <div className="hero-cinema-ai-title">What should we build?</div>
                  <div className="hero-cinema-input"><span className="hero-cinema-input-text">Build a private engineering workspace</span><span className="hero-cinema-input-cursor" /><span className="hero-cinema-send"><ArrowRight size={14} strokeWidth={1.8} /></span></div>
                  <div className="hero-cinema-local-note font-mono">RUNNING ON YOUR HARDWARE · NO CLOUD CONNECTION</div>
                </div>

                <div className="hero-cinema-build">
                  <div className="hero-cinema-build-top font-mono"><span>JENNEFER / EXECUTION</span><span>LOCAL RUNTIME</span></div>
                  <h3>Building your workspace<span className="hero-cinema-build-ellipsis">...</span></h3>
                  <div className="hero-cinema-progress"><span /></div>
                  <div className="hero-cinema-build-steps font-mono">
                    <div className="hero-cinema-step hero-cinema-step-1"><span>01</span><Image className="hero-cinema-step-face" src="/images/nefers/loop.png" alt="" width={40} height={40} sizes="24px" /><strong>Architect</strong><em>Planning the system</em><Check size={12} /></div>
                    <div className="hero-cinema-step hero-cinema-step-2"><span>02</span><Image className="hero-cinema-step-face" src="/images/nefers/byte.png" alt="" width={40} height={40} sizes="24px" /><strong>Developer</strong><em>Creating the project</em><Check size={12} /></div>
                    <div className="hero-cinema-step hero-cinema-step-3"><span>03</span><Image className="hero-cinema-step-face" src="/images/nefers/patch.png" alt="" width={40} height={40} sizes="24px" /><strong>Reviewer</strong><em>Checking the changes</em><Check size={12} /></div>
                  </div>
                  <div className="hero-cinema-build-files font-mono"><span>workspace.tsx</span><span>workspace.css</span><span>README.md</span></div>
                </div>

                <div className="hero-cinema-project">
                  <div className="hero-cinema-browser"><span className="hero-cinema-browser-dots"><i /><i /><i /></span><span>private-workspace.local</span><span className="hero-cinema-browser-ready font-mono">READY</span></div>
                  <div className="hero-cinema-project-content">
                    <aside><span className="hero-cinema-project-logo">W</span><strong>Workspace</strong><span className="hero-cinema-project-nav active">Overview</span><span className="hero-cinema-project-nav">Projects</span><span className="hero-cinema-project-nav">Team</span></aside>
                    <div className="hero-cinema-project-main"><div className="hero-cinema-project-top font-mono">YOUR PRIVATE SPACE <span>LOCAL / SECURE</span></div><h3>Good morning.</h3><p>Your workspace is ready to build.</p><div className="hero-cinema-project-cards"><div><small>ACTIVE PROJECT</small><strong>Platform launch</strong><span>In progress <ArrowRight size={12} /></span></div><div><small>YOUR TEAM</small><strong>3 specialists</strong><span>Ready to work <ArrowRight size={12} /></span></div></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-cinema-base"><div className="hero-cinema-keys" /><div className="hero-cinema-trackpad" /></div>
          <div className="hero-cinema-lip" />
        </div>
      </div>

      {children}
      <div className="hero-cinema-footer font-mono">
        <span className="hero-cinema-footer-copy">LOCAL MODEL. YOUR MACHINE. YOUR PROJECT.</span>
        <div className="hero-cinema-mobile-actions">
          <a href="#waitlist" className="hero-cinema-access">Request access <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" /></a>
          <a href="#routing" className="hero-cinema-scroll">Scroll to explore <ArrowDown size={13} strokeWidth={1.7} aria-hidden="true" /></a>
        </div>
        <button type="button" onClick={() => setTake((value) => value + 1)} className="hero-cinema-replay" aria-label="Replay the laptop demo"><RotateCcw size={13} strokeWidth={1.7} aria-hidden="true" /> REPLAY</button>
      </div>
    </figure>
  );
}

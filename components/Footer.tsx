"use client";

import React from "react";
import Link from "next/link";
import { Shield, ArrowUpRight, Cpu } from "lucide-react";
import JenneferLogo from "./JenneferLogo";

export default function Footer() {
  return (
    <footer className="relative bg-[#050608] border-t border-white/[0.08] py-12 sm:py-16 text-slate-400 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4 group inline-flex">
              <JenneferLogo className="w-8 h-8 transition-transform group-hover:scale-105" />
              <div className="flex items-baseline gap-1 font-sans">
                <span className="text-xl font-bold tracking-tight text-white">Jennefer</span>
                <span className="text-xs font-mono font-medium text-cyan-400">.dev</span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed mb-4">
              A standalone, from-scratch autonomous IDE orchestrating local LLM agent swarms. 
              Built for high-security teams and private engineering environments.
            </p>

            {/* Minimalist status line */}
            <div className="inline-flex items-center gap-2 text-xs font-mono text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All models running locally on client hardware.</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-4">
              Architecture
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#scrollyflow" className="hover:text-cyan-300 transition-colors">
                  Visual Flow DAG
                </a>
              </li>
              <li>
                <a href="#hardware" className="hover:text-cyan-300 transition-colors">
                  Local LLM Gateways
                </a>
              </li>
              <li>
                <a href="#benchmarks" className="hover:text-cyan-300 transition-colors">
                  Zero Leakage Proof
                </a>
              </li>
              <li>
                <a href="#hardware" className="hover:text-cyan-300 transition-colors">
                  In-Memory Vector Cache
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact & Legal */}
          <div>
            <h4 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-4">
              Access & Inquiries
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="mailto:contact@jennefer.dev"
                  className="hover:text-cyan-300 transition-colors font-mono text-xs flex items-center gap-1"
                >
                  <span>contact@jennefer.dev</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
                </a>
              </li>
              <li>
                <a href="#waitlist" className="hover:text-cyan-300 transition-colors">
                  Closed Alpha Waitlist
                </a>
              </li>
              <li>
                <span className="text-slate-500 text-xs font-mono">
                  Enterprise Air-Gap Deployments
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Ecosystem & Partnerships */}
        <div className="border-t border-white/5 pt-8 mb-8 flex flex-col md:flex-row items-start md:items-center gap-3">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 shrink-0">
            Backed & Supported
          </div>
          <div className="hidden md:block h-3 w-[1px] bg-white/10 mx-3"></div>
          <div className="text-xs text-zinc-400 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span><span className="text-zinc-300 font-medium">Anthropic</span> <span className="text-zinc-500">&bull; Claude for Startups</span></span>
            <span><span className="text-zinc-300 font-medium">Auth0 by Okta</span> <span className="text-zinc-500">&bull; B2B Security</span></span>
            <span><span className="text-zinc-300 font-medium">Neo4j</span> <span className="text-zinc-500">&bull; Aura Graph Partner</span></span>
            <span><span className="text-zinc-300 font-medium">PostHog</span> <span className="text-zinc-500">&bull; Scale Cohort</span></span>
            <span><span className="text-zinc-300 font-medium">Sentry</span> <span className="text-zinc-500">&bull; Error Infrastructure</span></span>
            <span><span className="text-zinc-300 font-medium">Notion</span> <span className="text-zinc-500">&bull; Knowledge Architecture</span></span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © 2026 Jennefer. A product of Ahmet Enes LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>v0.1-alpha-offline</span>
            <span>SHA256 Verified Runtime</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

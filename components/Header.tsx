"use client";

import React, { useState, useEffect } from "react";
import JenneferLogo from "./JenneferLogo";
import { ChevronDown, Menu, X, ArrowRight, Layers, GitBranch, Network, Sparkles, Users, Play, Flame } from "lucide-react";

export default function Header({ seatsLeft }: { seatsLeft?: number }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const element = document.getElementById(id);
    if (element) {
      let offset = 0;
      if (['ecosystem', 'squad'].includes(id)) {
        offset = window.innerHeight * 0.25;
      } else if (['features', 'showcase'].includes(id)) {
        offset = window.innerHeight * 0.6;
      }

      const top = element.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      {/* Announcement Bar */}
      <div className="w-full bg-gradient-to-r from-[#47A248]/10 via-zinc-950 to-[#47A248]/10 border-b border-[#47A248]/20 flex flex-wrap sm:flex-nowrap items-center justify-center gap-x-2 gap-y-1 py-1.5 px-4 text-xs font-medium text-zinc-300 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(71,162,72,0.08),transparent_70%)]" />
        <img
          src="https://cdn.simpleicons.org/mongodb/47A248"
          alt="MongoDB"
          width="16"
          height="16"
          className="h-4 w-4 object-contain shrink-0 relative z-10"
        />
        <span className="hidden sm:inline relative z-10">Selected for MongoDB for Startups &middot; Powering memory &amp; telemetry</span>
        <span className="sm:hidden leading-snug relative z-10">Selected for MongoDB for Startups</span>
        <a
          href="#ecosystem"
          onClick={(e) => handleScroll(e, 'ecosystem')}
          className="text-[#47A248] hover:text-emerald-300 transition-colors font-mono flex items-center gap-1 group whitespace-nowrap relative z-10"
        >
          Explore <span className="hidden sm:inline">infrastructure</span> <span className="group-hover:translate-x-0.5 transition-transform inline-block">&rarr;</span>
        </a>
      </div>

      {/* Main Navbar */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mt-3">
        {/* Gradient border wrapper */}
        <div className={`relative rounded-2xl p-px transition-all duration-500 ${scrolled ? 'bg-gradient-to-r from-white/[0.08] via-white/[0.12] to-white/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)]' : 'bg-gradient-to-r from-white/[0.06] via-white/[0.08] to-white/[0.06]'}`}>
          <div className={`bg-[#08090e]/90 backdrop-blur-2xl rounded-2xl h-14 sm:h-[60px] flex items-center justify-between px-5 sm:px-6 transition-all duration-500 ${scrolled ? 'bg-[#06070b]/95' : ''}`}>

            {/* Left: Brand + Navigation */}
            <div className="flex items-center gap-7">
              <a href="#hero" onClick={(e) => handleScroll(e, 'hero')} className="flex items-center group relative">
                <div className="absolute -inset-2 rounded-xl bg-white/0 group-hover:bg-white/[0.03] transition-colors duration-300" />
                <JenneferLogo className="w-8 h-8 transition-transform duration-300 group-hover:scale-105 relative z-10" />
              </a>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-1">
                <div className="relative group">
                  <button className="flex items-center gap-1.5 text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/[0.05]">
                    Platform
                    <ChevronDown className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-300" />
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 pt-3 opacity-0 -translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 ease-out">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-px rounded-2xl">
                        <div className="w-full h-full rounded-2xl bg-[#08090e]" />
                      </div>
                      <div className="relative bg-[#0a0b10]/98 border border-white/[0.08] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.04)] p-1.5 w-60 flex flex-col backdrop-blur-2xl">
                        {[
                          { href: 'anatomy', label: 'What is Jennefer', sub: 'Architecture overview' },
                          { href: 'routing', label: 'Agent Choosing System', sub: 'Intelligent routing' },
                          { href: 'ecosystem', label: 'Ecosystem', sub: 'Integrations & tools' },
                          { href: 'features', label: 'Features & Benefits', sub: 'What you get' },
                          { href: 'squad', label: 'Agent Squad', sub: 'Meet the agents' },
                          { href: 'showcase', label: 'Showcase', sub: 'See it in action' },
                        ].map((item) => (
                          <a
                            key={item.href}
                            href={`#${item.href}`}
                            onClick={(e) => handleScroll(e, item.href)}
                            className="flex flex-col px-3 py-2.5 rounded-xl text-left hover:bg-white/[0.05] transition-colors duration-150 group/item"
                          >
                            <span className="text-sm text-zinc-300 group-hover/item:text-white transition-colors font-medium">{item.label}</span>
                            <span className="text-xs text-zinc-600 group-hover/item:text-zinc-500 transition-colors mt-0.5">{item.sub}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>

            {/* Right: Waitlist CTA */}
            <div className="hidden md:flex items-center">
              <a
                href="#waitlist"
                onClick={(e) => handleScroll(e, 'waitlist')}
                className={`relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 overflow-hidden group/cta ${
                  seatsLeft === 0
                    ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20 cursor-default'
                    : 'bg-white text-[#07080c] hover:bg-zinc-100 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]'
                }`}
              >
                {seatsLeft !== 0 && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700 ease-in-out" />
                )}
                <span className="relative z-10">{seatsLeft === 0 ? 'Waitlist Full' : 'Join Waitlist'}</span>
                {seatsLeft !== undefined && seatsLeft > 0 && (
                  <span className="relative z-10 flex items-center gap-1 pl-2.5 border-l border-black/10">
                    <Flame className="w-3 h-3 text-orange-500/70" />
                    <span className="text-xs font-mono font-medium text-black/40">{seatsLeft}</span>
                  </span>
                )}
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden relative p-2 -mr-1 text-zinc-400 hover:text-white transition-colors rounded-xl hover:bg-white/[0.05] active:scale-95"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`}>
                <X className="w-5 h-5" />
              </span>
              <span className={`flex items-center justify-center transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'}`}>
                <Menu className="w-5 h-5" />
              </span>
            </button>
          </div>
        </div>
      </div>

    </header>

      {/* Mobile Full-Screen Overlay — outside <header> so z-index stacking context doesn't clip it */}
      <div
        className={`md:hidden fixed inset-0 z-[60] transition-opacity duration-300 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Slide-in Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[85vw] max-w-sm bg-[#07080d] border-l border-white/[0.07] shadow-[-40px_0_80px_rgba(0,0,0,0.8)] flex flex-col transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Panel Header — padded to clear announcement bar + navbar */}
          <div className="flex items-center justify-between px-6 pt-[96px] pb-6 border-b border-white/[0.06]">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-mono text-zinc-600 tracking-widest uppercase">Navigation</span>
              <span className="text-base font-semibold text-white">Jennefer</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl bg-white/[0.05] text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 overflow-y-auto px-4 py-4">
            <p className="text-[10px] font-mono text-zinc-700 tracking-widest uppercase px-3 mb-3">Platform</p>
            <div className="flex flex-col gap-1">
              {[
                { href: 'anatomy', label: 'What is Jennefer', sub: 'Architecture overview', Icon: Layers },
                { href: 'routing', label: 'Agent Choosing', sub: 'Intelligent routing', Icon: GitBranch },
                { href: 'ecosystem', label: 'Ecosystem', sub: 'Integrations & tools', Icon: Network },
                { href: 'features', label: 'Features & Benefits', sub: 'What you unlock', Icon: Sparkles },
                { href: 'squad', label: 'Agent Squad', sub: 'Meet the agents', Icon: Users },
                { href: 'showcase', label: 'Showcase', sub: 'See it in action', Icon: Play },
              ].map(({ href, label, sub, Icon }) => (
                <a
                  key={href}
                  href={`#${href}`}
                  onClick={(e) => handleScroll(e, href)}
                  className="flex items-center gap-4 px-3 py-3.5 rounded-2xl hover:bg-white/[0.04] active:bg-white/[0.07] transition-colors group/nav"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.06] flex items-center justify-center shrink-0 group-hover/nav:bg-white/[0.08] group-hover/nav:border-white/[0.1] transition-colors">
                    <Icon className="w-4 h-4 text-zinc-400 group-hover/nav:text-zinc-200 transition-colors" />
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-sm font-medium text-zinc-300 group-hover/nav:text-white transition-colors leading-none">{label}</span>
                    <span className="text-xs text-zinc-600 group-hover/nav:text-zinc-500 transition-colors leading-none mt-1">{sub}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-700 group-hover/nav:text-zinc-400 group-hover/nav:translate-x-0.5 transition-all ml-auto shrink-0" />
                </a>
              ))}
            </div>
          </nav>

          {/* Bottom CTA */}
          <div className="px-4 pb-8 pt-4 border-t border-white/[0.06] bg-gradient-to-t from-black/30 to-transparent">
            {seatsLeft !== undefined && seatsLeft > 0 && (
              <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 font-mono mb-4">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <span>{seatsLeft} spots remaining</span>
              </div>
            )}
            <a
              href="#waitlist"
              onClick={(e) => handleScroll(e, 'waitlist')}
              className={`w-full h-12 flex items-center justify-center gap-2 rounded-2xl font-semibold text-sm transition-all duration-200 active:scale-[0.98] ${
                seatsLeft === 0
                  ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                  : 'bg-white text-black hover:bg-zinc-100 shadow-[0_0_30px_rgba(255,255,255,0.08)]'
              }`}
            >
              {seatsLeft === 0 ? 'Waitlist Full' : 'Join Waitlist'}
              {seatsLeft !== 0 && <ArrowRight className="w-4 h-4" />}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

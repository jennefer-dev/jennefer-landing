"use client";

import React, { useState } from "react";
import Link from "next/link";
import JenneferLogo from "./JenneferLogo";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Header({ seatsLeft }: { seatsLeft?: number }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const element = document.getElementById(id);
    if (element) {
      // Ecosystem and Squad have h-[150vh], so scrolling distance is 50vh. Offset = 25vh (progress ~0.5)
      // Features/Showcase have h-[250vh], scrolling distance is 150vh. Offset = 60vh (progress ~0.4)
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
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      {/* Announcement Bar */}
      <div className="w-full bg-zinc-950 border-b border-white/10 flex flex-wrap sm:flex-nowrap items-center justify-center gap-x-2 gap-y-1 py-1.5 px-4 text-xs font-medium text-zinc-300 text-center">
        <img 
          src="https://cdn.simpleicons.org/mongodb/47A248" 
          alt="MongoDB" 
          width="16"
          height="16"
          className="h-4 w-4 object-contain shrink-0" 
        />
        <span className="hidden sm:inline">Selected for MongoDB for Startups &middot; Powering memory & telemetry</span>
        <span className="sm:hidden leading-snug">Selected for MongoDB for Startups</span>
        <a 
          href="#ecosystem" 
          onClick={(e) => handleScroll(e, 'ecosystem')}
          className="text-zinc-400 hover:text-white transition-colors font-mono flex items-center gap-1 group whitespace-nowrap"
        >
          Explore <span className="hidden sm:inline">infrastructure</span> <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
        </a>
      </div>

      {/* Main Navbar */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mt-4">
        <div className="bg-[#0c0d12]/80 backdrop-blur-xl border border-white/10 rounded-full h-14 sm:h-16 flex items-center justify-between px-5 sm:px-6 shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
          
          {/* Left: Brand + Navigation */}
          <div className="flex items-center gap-8">
            <a href="#hero" onClick={(e) => handleScroll(e, 'hero')} className="flex items-center group">
              <JenneferLogo className="w-9 h-9 transition-transform group-hover:scale-105" />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <div className="relative group">
                <button className="flex items-center gap-1.5 text-sm font-medium text-zinc-300 hover:text-white transition-colors py-2">
                  Platform <ChevronDown className="w-3.5 h-3.5 opacity-50 group-hover:rotate-180 transition-transform duration-300" />
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                  <div className="bg-[#0a0b10]/95 border border-white/10 rounded-xl shadow-2xl p-2 w-56 flex flex-col gap-1 backdrop-blur-xl">
                    <a href="#anatomy" onClick={(e) => handleScroll(e, 'anatomy')} className="px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left flex items-center gap-2">
                      What is Jennefer
                    </a>
                    <a href="#routing" onClick={(e) => handleScroll(e, 'routing')} className="px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left flex items-center gap-2">
                      Agent Choosing System
                    </a>
                    <a href="#ecosystem" onClick={(e) => handleScroll(e, 'ecosystem')} className="px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left flex items-center gap-2">
                      Ecosystem
                    </a>
                    <a href="#features" onClick={(e) => handleScroll(e, 'features')} className="px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left flex items-center gap-2">
                      Features & Benefits
                    </a>
                    <a href="#squad" onClick={(e) => handleScroll(e, 'squad')} className="px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left flex items-center gap-2">
                      Agent Squad
                    </a>
                    <a href="#showcase" onClick={(e) => handleScroll(e, 'showcase')} className="px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left flex items-center gap-2">
                      Showcase
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Waitlist CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#waitlist"
              onClick={(e) => handleScroll(e, 'waitlist')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-colors shadow-lg ${
                seatsLeft === 0 
                  ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20 cursor-default'
                  : 'bg-white text-[#07080c] hover:bg-slate-200 hover:shadow-cyan-500/20'
              }`}
            >
              <span>{seatsLeft === 0 ? 'Waitlist Full' : 'Join Waitlist'}</span>
              {seatsLeft !== undefined && seatsLeft > 0 && (
                <span className="text-xs opacity-60 font-mono tracking-tight flex items-center gap-1">
                  • <span className="font-semibold">{seatsLeft} left</span>
                </span>
              )}
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 -mr-2 text-zinc-400 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#050505] border-b border-[#222] px-4 py-4 flex flex-col shadow-2xl">
          <div className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase mb-2 px-2">Platform</div>
          <div className="flex flex-col">
            <a href="#anatomy" onClick={(e) => handleScroll(e, 'anatomy')} className="text-sm font-semibold text-zinc-300 hover:text-white hover:bg-[#111] px-2 py-3 transition-colors">What is Jennefer</a>
            <a href="#routing" onClick={(e) => handleScroll(e, 'routing')} className="text-sm font-semibold text-zinc-300 hover:text-white hover:bg-[#111] px-2 py-3 transition-colors">Agent Choosing System</a>
            <a href="#ecosystem" onClick={(e) => handleScroll(e, 'ecosystem')} className="text-sm font-semibold text-zinc-300 hover:text-white hover:bg-[#111] px-2 py-3 transition-colors">Ecosystem</a>
            <a href="#features" onClick={(e) => handleScroll(e, 'features')} className="text-sm font-semibold text-zinc-300 hover:text-white hover:bg-[#111] px-2 py-3 transition-colors">Features & Benefits</a>
            <a href="#squad" onClick={(e) => handleScroll(e, 'squad')} className="text-sm font-semibold text-zinc-300 hover:text-white hover:bg-[#111] px-2 py-3 transition-colors">Agent Squad</a>
            <a href="#showcase" onClick={(e) => handleScroll(e, 'showcase')} className="text-sm font-semibold text-zinc-300 hover:text-white hover:bg-[#111] px-2 py-3 transition-colors">Showcase</a>
          </div>
          
          <div className="mt-4 pt-4 border-t border-[#222]">
            <a 
              href="#waitlist" 
              onClick={(e) => handleScroll(e, 'waitlist')} 
              className={`w-full text-center h-12 flex items-center justify-center gap-2 rounded-none font-bold text-sm transition-colors ${
                seatsLeft === 0
                  ? 'bg-[#111] text-amber-500 border border-[#222]'
                  : 'bg-white text-black hover:bg-neutral-200'
              }`}
            >
              <span>{seatsLeft === 0 ? 'Waitlist Full' : 'Join Waitlist'}</span>
              {seatsLeft !== undefined && seatsLeft > 0 && (
                <span className="text-xs opacity-60 font-mono tracking-tight">
                  • {seatsLeft} left
                </span>
              )}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

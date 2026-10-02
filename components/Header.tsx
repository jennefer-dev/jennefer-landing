"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import JenneferLogo from "./JenneferLogo";

const navItems = [
  { id: "anatomy", label: "Product" },
  { id: "routing", label: "Agent routing" },
  { id: "ecosystem", label: "Ecosystem" },
  { id: "features", label: "How it works" },
  { id: "squad", label: "Agents" },
  { id: "showcase", label: "Showcase" },
];

export default function Header({ seatsLeft }: { seatsLeft?: number }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScroll = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    const section = document.getElementById(id);
    if (!section) return;
    const chapterOffset = ["ecosystem", "squad"].includes(id) ? 0.35 : 0.45;
    const top = section.getBoundingClientRect().top + window.scrollY + window.innerHeight * chapterOffset;
    window.scrollTo({ top, behavior: "smooth" });
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b border-white/10 backdrop-blur-xl transition-colors ${scrolled ? "bg-[#090a0c]/95" : "bg-[#090a0c]/80"}`}>
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-8 px-5 sm:px-8 lg:px-12">
        <a href="#hero" className="flex shrink-0 items-center gap-3 text-white" aria-label="Jennefer, back to top">
          <JenneferLogo className="h-8 w-8" /><span className="text-lg font-semibold tracking-[-0.055em]">Jennefer</span>
        </a>
        <nav aria-label="Primary navigation" className="hidden items-center gap-6 lg:flex xl:gap-9">
          {navItems.map((item) => <a key={item.id} href={`#${item.id}`} onClick={(event) => handleScroll(event, item.id)} className="text-sm font-medium text-[#a4a6ad] transition-colors hover:text-white">{item.label}</a>)}
          <a href="/nefers" className="group inline-flex items-center gap-1.5 text-sm font-medium text-[#a4a6ad] transition-colors hover:text-white"><Image src="/images/nefers/pixel.png" alt="" width={40} height={40} sizes="20px" className="h-5 w-5 transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:-translate-y-0.5 group-hover:-rotate-12" />Nefers</a>
          <a href="/roadmap" className="text-sm font-medium text-[#a4a6ad] transition-colors hover:text-white">Roadmap</a>
        </nav>
        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <a href="#waitlist" className="hidden min-h-10 items-center gap-3 bg-[#e4e4e6] px-4 text-sm font-semibold text-[#101114] transition-colors hover:bg-white sm:inline-flex">
            {seatsLeft === 0 ? "Waitlist full" : "Request access"}<ArrowUpRight className="h-4 w-4" />
          </a>
          <button type="button" onClick={() => setMobileMenuOpen((open) => !open)} aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" className="inline-flex h-10 w-10 items-center justify-center border border-white/15 text-white lg:hidden">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <nav id="mobile-navigation" aria-label="Mobile navigation" className={`${mobileMenuOpen ? "block" : "hidden"} border-t border-white/10 bg-[#0d0e11] px-5 pb-8 pt-2 lg:hidden`}>
        {navItems.map((item) => <a key={item.id} href={`#${item.id}`} onClick={(event) => handleScroll(event, item.id)} className="block border-b border-white/10 py-4 text-lg text-white">{item.label}</a>)}
        <a href="/nefers" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5 border-b border-white/10 py-4 text-lg text-white"><Image src="/images/nefers/pixel.png" alt="" width={48} height={48} sizes="24px" className="h-6 w-6" />Nefers</a>
        <a href="/roadmap" onClick={() => setMobileMenuOpen(false)} className="block border-b border-white/10 py-4 text-lg text-white">Roadmap</a>
        <a href="#waitlist" onClick={() => setMobileMenuOpen(false)} className="mt-6 inline-flex min-h-12 w-full items-center justify-between bg-[#e4e4e6] px-5 text-sm font-semibold text-[#101114]">Request access <ArrowUpRight className="h-4 w-4" /></a>
      </nav>
    </header>
  );
}

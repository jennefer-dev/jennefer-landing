import React from "react";
import Image from "next/image";
import { ArrowUpRight, Globe } from "lucide-react";

export default function LeadershipSection() {
  return (
    <section className="relative overflow-hidden bg-[#151515] py-28 sm:py-36" id="leadership">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="mb-16 flex items-center justify-between pt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#c1c1c1]">
          <span>08 / The people behind it</span><span>Independent by design</span>
        </div>
        <div className="grid items-end gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <h2 className="max-w-2xl text-[clamp(3rem,6vw,6rem)] font-semibold leading-[1.02] tracking-[-0.075em] text-[#f1f1f1]">
              Made by engineers who want a better way to build.
            </h2>
            <p className="mt-8 max-w-xl text-base leading-[1.8] text-[#b5b5b5]">
              Jennefer began with a simple conviction: powerful development tools should give teams more control over their work, their infrastructure, and their ideas.
            </p>
          </div>
          <div className="grid gap-7 border-t border-[#cdcdcd]/20 pt-7 sm:grid-cols-[180px_1fr] sm:items-end">
            <div className="relative aspect-[4/5] max-w-[220px] overflow-hidden bg-[#222222] grayscale">
              <Image src="https://avatars.githubusercontent.com/u/61010746?v=4" alt="Ahmet Enes Keçeci" fill unoptimized sizes="(max-width: 640px) 220px, 180px" className="object-cover" />
            </div>
            <div className="pb-1">
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#c1c1c1]">Founder &amp; lead architect</p>
              <h3 className="text-2xl font-semibold tracking-[-0.045em] text-[#f1f1f1]">Ahmet Enes Keçeci</h3>
              <p className="mt-3 max-w-sm text-sm leading-[1.7] text-[#ababab]">
                Mathematical engineer and systems developer focused on local AI and autonomous software workflows.
              </p>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#cdcdcd]/15 pt-5 font-mono text-xs text-[#d3d3d3]">
                <a href="https://www.linkedin.com/in/ahmet-enes/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">LinkedIn <ArrowUpRight className="h-3.5 w-3.5" /></a>
                <a href="https://github.com/AhmetEnesKCC" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">GitHub <ArrowUpRight className="h-3.5 w-3.5" /></a>
                <a href="https://eneskececi.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">Website <Globe className="h-3.5 w-3.5" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

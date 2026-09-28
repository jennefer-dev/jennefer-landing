import React from "react";

export default function StoryFrame({
  number,
  title,
  detail,
}: {
  number: string;
  title: string;
  detail: string;
}) {
  return (
    <div className="story-frame pointer-events-none absolute inset-0 z-30 hidden select-none md:block" aria-hidden="true">
      <div className="absolute inset-x-8 top-[118px] flex items-center justify-between gap-6 pt-4 lg:inset-x-12">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs tracking-[0.12em] text-[#d0d0d0]">{number}</span>
          <span className="h-3 w-px bg-[#b5b5b5]/30" />
          <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#d1d1d1]">{title}</span>
        </div>
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#a0a0a0]">{detail}</span>
      </div>
      <div className="absolute inset-x-8 bottom-9 flex items-center gap-4 pb-4 font-mono text-xs uppercase tracking-[0.12em] text-[#999999] lg:inset-x-12">
        <span>Jennefer / System study</span>
        <span className="ml-auto">Scroll to continue</span>
        <span className="text-[#d0d0d0]">↘</span>
      </div>
    </div>
  );
}

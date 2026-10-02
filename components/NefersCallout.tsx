import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const FACES = [
  { id: "pixel", role: "CEO · UX", accent: "#ff6b81" },
  { id: "loop", role: "Planner", accent: "#ffb547" },
  { id: "byte", role: "Coder", accent: "#4d7cff" },
  { id: "patch", role: "Reviewer", accent: "#3ee6a8" },
];

// Ajan ekibinin "yüzleri": dört Nefer kartın üst kenarından bakıyor, kart /nefers sayfasına gider.
export default function NefersCallout() {
  return (
    <section className="bg-[#101010] px-4 pb-24 pt-28 sm:px-6 lg:pb-32" aria-labelledby="nefers-callout">
      <Link href="/nefers" className="group relative mx-auto block max-w-7xl focus-visible:outline-none">
        <div className="pointer-events-none absolute left-6 top-0 z-0 flex -translate-y-[58%] gap-1 sm:left-10 sm:gap-2 lg:left-12" aria-hidden="true">
          {FACES.map((face, index) => (
            <span key={face.id} className="relative block w-[68px] transition-transform duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:-translate-y-3 sm:w-[92px] lg:w-[104px]" style={{ transitionDelay: `${index * 60}ms` }}>
              <Image src={`/images/nefers/${face.id}${index % 2 ? "" : "-side"}.png`} alt="" width={208} height={208} sizes="(min-width: 1024px) 104px, (min-width: 640px) 92px, 68px" className="h-auto w-full drop-shadow-[0_10px_18px_rgba(0,0,0,.45)]" />
            </span>
          ))}
        </div>

        <div className="relative z-10 grid gap-8 border border-[#8e8e8e]/20 bg-[#1b1b1b] p-7 pt-12 transition-colors group-hover:bg-[#222] group-focus-visible:ring-2 group-focus-visible:ring-white sm:p-10 sm:pt-14 lg:grid-cols-[1fr_auto] lg:items-end lg:p-12 lg:pt-16">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#909090]">Field note / The squad, in person</p>
            <h2 id="nefers-callout" className="mt-4 max-w-[620px] text-[clamp(2rem,3.6vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.06em] text-[#f1f1f1]">
              Every specialist has a face.
            </h2>
            <p className="mt-4 max-w-[560px] text-[15px] leading-[1.7] text-[#ababab]">
              Meet Pixel, Loop, Byte, and Patch, the Nefers. They plan, build, and review inside Jennefer, and they have opinions about all of it.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#c1c1c1]">
              {FACES.map((face) => (
                <li key={face.id} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: face.accent }} />
                  {face.id} <span className="text-[#7c7c7c]">{face.role}</span>
                </li>
              ))}
            </ul>
          </div>
          <span className="inline-flex min-h-12 w-fit items-center gap-3 bg-[#e4e4e6] px-5 text-sm font-semibold text-[#101114] transition-colors group-hover:bg-white">
            Meet the Nefers <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </section>
  );
}

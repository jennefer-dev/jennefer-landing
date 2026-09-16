"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  tag?: string;
  heightClass?: string;
  id?: string;
}

export default function SectionHeading({
  title,
  tag,
  heightClass = "h-[250vh]",
  id,
}: SectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Alttan yukarıya dolma oranı (0% -> 100%)
  // 0.10'da başlar, 0.60'a kadar kademeli ve yavaşça dolar, 0.92'ye kadar dopdolu kalır
  const fillPercent = useTransform(
    scrollYProgress,
    [0.10, 0.60, 0.92, 0.98],
    [0, 100, 100, 100],
    { clamp: true }
  );

  // Yükselme ve kaybolma hareketi
  const y = useTransform(
    scrollYProgress,
    [0.08, 0.35, 0.92, 0.98],
    [40, 0, 0, -40],
    { clamp: true }
  );

  const opacity = useTransform(
    scrollYProgress,
    [0.06, 0.20, 0.92, 0.98],
    [0, 1, 1, 0],
    { clamp: true }
  );

  const scale = useTransform(
    scrollYProgress,
    [0.08, 0.35, 0.92, 0.98],
    [0.96, 1, 1, 0.96],
    { clamp: true }
  );

  return (
    <div
      id={id}
      ref={containerRef}
      className={`relative ${heightClass} bg-[#07080c] overflow-clip`}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 select-none">
        
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none -z-10" />

        <motion.div
          style={{ y, opacity, scale }}
          className="relative z-10 flex flex-col items-center text-center max-w-5xl px-4 pointer-events-none"
        >
          {tag && (
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-semibold mb-3">
              {tag}
            </span>
          )}

          {/* Masked Text: Alttan yukarı dolarak gelen beyaz başlık */}
          <div className="relative overflow-hidden py-2">
            {/* Arka plandaki sönük / gölge metin */}
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-[-0.04em] text-white/15 leading-[1.05]">
              {title}
            </h2>

            {/* Alttan yukarı dolan saf beyaz katman */}
            <motion.div
              style={{
                clipPath: useTransform(
                  fillPercent,
                  (val) => `polygon(0 ${100 - val}%, 100% ${100 - val}%, 100% 100%, 0 100%)`
                ),
              }}
              className="absolute inset-0 select-none pointer-events-none py-2"
            >
              <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-[-0.04em] text-white leading-[1.05]">
                {title}
              </h2>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

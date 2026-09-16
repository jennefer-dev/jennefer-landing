"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function PrivacyLockShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // =========================================================================
  // DAHA BÜYÜK VE ORANTILI (DAHA KISA VE DENGELİ ÜST KISIM) ASMA KİLİT
  //
  // - Kilit boyutu büyütüldü (w-72 h-80).
  // - Üst kanca (shackle) boyu kısaltıldı, gövdeyle mükemmel orantılandı.
  // - Sol bacak gövdenin içinde kalır.
  // - Sağ bacak açıkken gövdenin üstünde açık durur.
  // - Scroll ettikçe tüm üst kısım aşağı iner ve sağ bacak gövdeye girip kilitlenir.
  // =========================================================================

  // Scroll 0.15 -> 0.35: Üst kısım aşağı iner (y: -22 -> 0)
  const shackleY = useTransform(scrollYProgress, [0.15, 0.35], [-22, 0], { clamp: true });
  const lockColor = useTransform(scrollYProgress, [0.15, 0.35], ["#94a3b8", "#ffffff"], { clamp: true });

  // Kilit ekrandan çıkışı (0.45 -> 0.52)
  const lockOpacity = useTransform(scrollYProgress, [0.45, 0.52], [1, 0], { clamp: true });
  const lockScale = useTransform(scrollYProgress, [0.45, 0.52], [1, 0.9], { clamp: true });
  const lockDisplay = useTransform(scrollYProgress, (v) => (v < 0.52 ? "flex" : "none"));

  // Punchline (0.52 -> 0.95): "100% Privacy. Zero Leaks."
  const textOpacity = useTransform(scrollYProgress, [0.52, 0.58, 0.93, 0.97], [0, 1, 1, 0], { clamp: true });
  const textY = useTransform(scrollYProgress, [0.52, 0.58, 0.93, 0.97], [30, 0, 0, -30], { clamp: true });
  const textScale = useTransform(scrollYProgress, [0.52, 0.58, 0.93, 0.97], [0.95, 1, 1, 0.95], { clamp: true });
  const textBlur = useTransform(scrollYProgress, [0.52, 0.58, 0.93, 0.97], [8, 0, 0, 8], { clamp: true });
  const textFilter = useTransform(textBlur, (b) => `blur(${b}px)`);
  const textDisplay = useTransform(scrollYProgress, (v) => (v >= 0.51 && v < 0.97 ? "flex" : "none"));

  return (
    <section
      ref={containerRef}
      className="relative h-[320vh] bg-[#07080c] overflow-clip"
    >
      {/* Sticky Fullscreen Center Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 select-none">
        
        {/* Subtle Backdrop Glow */}
        <div className="absolute w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none -z-10" />

        {/* ================= 1. BÜYÜK & ORANTILI VEKTÖREL ASMA KİLİT ================= */}
        <motion.div
          style={{
            opacity: lockOpacity,
            scale: lockScale,
            display: lockDisplay,
          }}
          className="absolute z-20 flex flex-col items-center justify-center"
        >
          {/* Büyütülmüş kilit kapsayıcısı: w-72 h-80 */}
          <div className="relative w-72 h-80 flex items-center justify-center">
            <svg
              viewBox="0 0 140 150"
              className="w-full h-full overflow-visible"
              fill="none"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* ÜST KANCA (SHACKLE): 
                  Kısaltılmış ve gövdeyle orantılı yay.
                  - Sol bacak x: 44, y: 38 -> 92 (Açıkken bile y-22 = 70, gövde y:66'da başladığı için sol bacak hep içeride)
                  - Üst kavis: Tepe noktası y: 14 civarında (kısa ve derli toplu)
                  - Sağ bacak x: 96, y: 38 -> 72 (Açıkken y-22 = 50, gövdenin (y:66) 16px üstünde açık)
                  - Aşağı inince (y: 0) sağ bacak 72'ye inip gövdenin içine girer ve kilitlenir!
              */}
              <motion.path
                d="M44 92 V40 C44 22 55 14 70 14 C85 14 96 22 96 40 V72"
                style={{
                  y: shackleY,
                  stroke: lockColor,
                }}
              />

              {/* KİLİT GÖVDESİ (BODY) - Y: 66'da başlar */}
              <motion.rect
                x="22"
                y="66"
                width="96"
                height="74"
                rx="18"
                style={{ stroke: lockColor }}
                fill="#07080c"
              />

              {/* MİNİMAL DELİK */}
              <motion.circle
                cx="70"
                cy="96"
                r="5.5"
                style={{ fill: lockColor, stroke: "none" }}
              />
              <motion.path
                d="M67.5 99 L66 114 H74 L72.5 99 Z"
                style={{ fill: lockColor, stroke: "none" }}
              />
            </svg>
          </div>
        </motion.div>

        {/* ================= 2. PUNCHLINE (Hero Font, Clean, Just Headline, Long Linger) ================= */}
        <motion.div
          style={{
            opacity: textOpacity,
            y: textY,
            scale: textScale,
            filter: textFilter,
            display: textDisplay,
          }}
          className="absolute z-20 flex flex-col items-center justify-center text-center max-w-4xl px-4 pointer-events-none"
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.03em] text-white leading-[1.08]">
            100% Privacy. Zero Leaks.
          </h2>
        </motion.div>

      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -56]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => preference.matches ? video.pause() : video.play().catch(() => {});
    syncPlayback();
    preference.addEventListener("change", syncPlayback);
    return () => preference.removeEventListener("change", syncPlayback);
  }, []);

  const scrollToStory = () => {
    const chapter = document.getElementById("anatomy");
    if (!chapter) return;
    const top = chapter.getBoundingClientRect().top + window.scrollY + window.innerHeight * 0.45;
    window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
    window.history.replaceState(null, "", "#anatomy");
  };

  return (
    <section ref={heroRef} id="hero" className="hero-v2 relative overflow-hidden">
      <div className="hero-v2-inner">
        <div className="hero-v2-content">
          <h1 className="hero-v2-title">Build with agents.<br /><span>Stay in control.</span></h1>
          <p className="hero-v2-description">A private workspace for local models, specialist agents, and the people who make the final call.</p>
          <div className="hero-v2-actions">
            <a href="#waitlist" className="hero-v2-primary">Request access <ArrowUpRight aria-hidden="true" size={18} /></a>
            <a href="#main-video" className="hero-v2-secondary">Explore the product <span aria-hidden="true">↗</span></a>
          </div>
          <motion.button type="button" onClick={scrollToStory} style={{ opacity: reducedMotion ? 1 : cueOpacity }} className="hero-scroll-cue">
            <span className="hero-scroll-rail" aria-hidden="true" />
            <span>Scroll to explore</span>
            <ArrowDown size={16} strokeWidth={1.7} aria-hidden="true" />
          </motion.button>
        </div>
        <motion.div style={{ y: reducedMotion ? 0 : visualY }} className="hero-v2-visual">
          <div className="hero-v2-video-shell">
            <video ref={videoRef} autoPlay muted loop playsInline preload="metadata" poster="/hero-motion-poster.png" aria-label="Jennefer product workflow" className="hero-v2-video">
              <source src="/hero-motion.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

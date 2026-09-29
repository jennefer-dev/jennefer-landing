"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import HeroWorkflow from "./HeroWorkflow";

function formatCountdown(milliseconds: number) {
  const secondsLeft = Math.max(0, Math.floor(milliseconds / 1000));
  const days = Math.floor(secondsLeft / 86400);
  const hours = Math.floor((secondsLeft % 86400) / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;
  return `${String(days).padStart(2, "0")}D ${String(hours).padStart(2, "0")}H ${String(minutes).padStart(2, "0")}M ${String(seconds).padStart(2, "0")}S`;
}

export default function Hero({ seatsLeft, launchAt }: { seatsLeft: number; launchAt: string | null }) {
  const heroRef = useRef<HTMLElement>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -56]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    if (!launchAt) return;
    const deadline = new Date(launchAt).getTime();
    const updateCountdown = () => setTimeLeft(deadline - Date.now());
    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);
    document.addEventListener("visibilitychange", updateCountdown);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", updateCountdown);
    };
  }, [launchAt]);

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
          <div className="hero-launch-status font-mono" aria-live="off">
            <span className="hero-launch-countdown">[ <span className="hero-launch-label">Closed beta launch:</span> {launchAt ? <time dateTime={launchAt}>{timeLeft === null ? "--D --H --M --S" : formatCountdown(timeLeft)}</time> : <span>TBA</span>} ]</span>
            <span className="hero-launch-seats"><span className="hero-launch-indicator" aria-hidden="true" />{seatsLeft} seats remaining</span>
          </div>
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
          <HeroWorkflow />
        </motion.div>
      </div>
    </section>
  );
}

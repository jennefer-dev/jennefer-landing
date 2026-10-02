"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Cpu, ShieldCheck, UsersRound } from "lucide-react";
import HeroApp from "./HeroApp";
import HeroLineup from "./HeroLineup";

const POINTS = [
  { icon: Cpu, title: "Local models", text: "Runs on your machine. Your code never leaves it." },
  { icon: UsersRound, title: "Specialist agents", text: "A planner, a coder, and a reviewer working as one team." },
  { icon: ShieldCheck, title: "You decide", text: "Every change waits for your approval." },
];

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
    const chapter = document.getElementById("routing");
    if (!chapter) return;
    const top = chapter.getBoundingClientRect().top + window.scrollY + window.innerHeight * 0.45;
    window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
    window.history.replaceState(null, "", "#routing");
  };

  return (
    <section ref={heroRef} id="hero" className="hero-v2 relative overflow-hidden">
      <div className="hero-v2-inner">
        <div id="hero-content" className="hero-v2-content">
          <div className="hero-launch-status font-mono" aria-live="off">
            <span className="hero-launch-countdown">[ <span className="hero-launch-label">Closed beta launch:</span> {launchAt ? <time dateTime={launchAt}>{timeLeft === null ? "--D --H --M --S" : formatCountdown(timeLeft)}</time> : <span>TBA</span>} ]</span>
            <span className="hero-launch-seats"><span className="hero-launch-indicator" aria-hidden="true" />{seatsLeft} seats remaining</span>
          </div>
          <h1 className="hero-v2-title">Your AI dev team.<br /><span>On your machine. Under your control.</span></h1>
          <HeroLineup />
          <p className="hero-v2-description">Jennefer is a desktop app where specialist AI agents plan, write, and review your code on local models. Nothing ships until you approve it.</p>
          <ul className="hero-v2-points">
            {POINTS.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
                <p><b>{title}</b>{text}</p>
              </li>
            ))}
          </ul>
          <div className="hero-v2-actions">
            <a href="#waitlist" className="hero-v2-primary">Request access <ArrowUpRight aria-hidden="true" size={18} /></a>
            <a href="/nefers" className="hero-v2-secondary">Meet the Nefers <span aria-hidden="true">↗</span></a>
          </div>
          <motion.button type="button" onClick={scrollToStory} style={{ opacity: reducedMotion ? 1 : cueOpacity }} className="hero-scroll-cue">
            <span className="hero-scroll-rail" aria-hidden="true" />
            <span>Scroll to explore</span>
            <ArrowDown size={16} strokeWidth={1.7} aria-hidden="true" />
          </motion.button>
        </div>
        <div className="hero-v2-visual">
          <HeroApp />
        </div>
      </div>
    </section>
  );
}

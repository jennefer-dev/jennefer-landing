"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Check, Play, Rocket, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { NEFERS } from "./nefers/data";
import { useVoice, voice } from "./nefers/voice";

const HeroNeferStage = dynamic(() => import("./HeroNeferStage"), { ssr: false });

// Her adımın en kısa süresi (ms): Brief, Plan, Code, Review, Shipped. Replik daha uzunsa bitmesi beklenir.
const STEP_MS = [3400, 3200, 3600, 3200, 3800];
const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));
const STEPS = ["Brief", "Plan", "Code", "Review"];
const PLAN = ["Layout & design tokens", "Login form + validation", "Session API hookup", "Tests & accessibility"];
const CODE = [
  "export function LoginForm() {",
  "  const { signIn, pending } = useAuth();",
  "  return (",
  "    <Form onSubmit={signIn}>",
  "      <Button loading={pending}>Sign in</Button>",
  "    </Form>",
  "  );",
  "}",
];

const panel = {
  initial: { opacity: 0, y: 10, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -10, filter: "blur(4px)" },
  transition: { duration: 0.3 },
};

function TaskBody({ step }: { step: number }) {
  if (step === 0) {
    return (
      <motion.div key="brief" {...panel} className="hero-nefers-body-inner">
        <p className="hero-nefers-who"><b style={{ color: NEFERS[0].accent }}>Pixel</b> opened a task</p>
        <p className="hero-nefers-brief">“We need a login page. Make it beautiful.”</p>
        <div className="hero-nefers-wire"><i style={{ borderColor: NEFERS[0].accent }} /><span /><span /><span style={{ background: NEFERS[0].accent }} /></div>
      </motion.div>
    );
  }
  if (step === 1) {
    return (
      <motion.div key="plan" {...panel} className="hero-nefers-body-inner">
        <p className="hero-nefers-who"><b style={{ color: NEFERS[1].accent }}>Loop</b> split it into a graph</p>
        <ol className="hero-nefers-plan">
          {PLAN.map((item, i) => (
            <motion.li key={item} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.14 }}>
              <span style={{ background: NEFERS[1].accent }}>{i + 1}</span>{item}
            </motion.li>
          ))}
        </ol>
      </motion.div>
    );
  }
  if (step === 2) {
    return (
      <motion.div key="code" {...panel} className="hero-nefers-body-inner">
        <p className="hero-nefers-who"><b style={{ color: NEFERS[2].accent }}>Byte</b> is writing LoginForm.tsx</p>
        <pre className="hero-nefers-code font-mono">
          {CODE.map((codeLine, i) => (
            <motion.span key={i} initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }} animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }} transition={{ delay: 0.1 + i * 0.12, duration: 0.25 }}>
              {codeLine}
            </motion.span>
          ))}
        </pre>
      </motion.div>
    );
  }
  if (step === 3) {
    return (
      <motion.div key="review" {...panel} className="hero-nefers-body-inner">
        <p className="hero-nefers-who"><b style={{ color: NEFERS[3].accent }}>Patch</b> is reviewing the diff</p>
        <div className="hero-nefers-diff font-mono">
          <p className="is-del">- const thing2 = await getSession();</p>
          <p className="is-add">+ const session = await getSession();</p>
        </div>
        <motion.p initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, type: "spring" }} className="hero-nefers-approved font-mono" style={{ color: NEFERS[3].accent }}>
          <Check size={13} /> Approved · checks green
        </motion.p>
      </motion.div>
    );
  }
  return (
    <motion.div key="shipped" {...panel} className="hero-nefers-body-inner hero-nefers-shipped">
      {Array.from({ length: 16 }).map((_, i) => (
        <motion.span
          key={i}
          className="hero-nefers-confetti"
          style={{ background: NEFERS[i % 4].accent }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: Math.cos(i * 0.39 * Math.PI) * (100 + (i % 3) * 40), y: Math.sin(i * 0.39 * Math.PI) * (70 + (i % 4) * 20), opacity: 0, rotate: 200 }}
          transition={{ duration: 1.3, ease: "easeOut" }}
        />
      ))}
      <Rocket size={26} />
      <p className="hero-nefers-shipped-title">Shipped.</p>
      <p className="hero-nefers-shipped-copy">Brief to production. Reviewed before it reached you.</p>
    </motion.div>
  );
}

export default function HeroNefers({ children }: { children?: React.ReactNode }) {
  const figure = useRef<HTMLElement>(null);
  const pokeCount = useRef(0);
  const { enabled: soundOn } = useVoice();
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);
  const [load3d, setLoad3d] = useState(false);
  const [ready, setReady] = useState(false);
  const [poke, setPoke] = useState<{ index: number; text: string } | null>(null);
  // Başlamadan önce kimse aktif değil; Pixel sesi açmayı teklif eder.
  const shown = started ? step : -1;
  const speaking = poke?.index ?? (!started ? 0 : shown < 4 ? shown : -1);
  const bubble = poke?.text ?? (!started ? "Psst. Sound on? We'll build you a login page." : shown < 4 ? NEFERS[shown].team.text : "");
  const accent = !started ? "#5b6cff" : shown < 4 ? NEFERS[shown].accent : "#8b6bff";

  useEffect(() => {
    const el = figure.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Görev akışı: her Nefer kendi repliğini söyler, replik bitmeden sonraki adıma geçilmez.
  // "Shipped" son adım; baştan almak için kullanıcı "Watch again" der. Ekranda değilken durur.
  useEffect(() => {
    if (!started || !visible) return;
    const nefer = NEFERS[step];
    if (!nefer) {
      voice.sfx("pop");
      return;
    }
    let alive = true;
    const spoken = voice.say(nefer.id, nefer.team).then(() => wait(450));
    void Promise.all([wait(STEP_MS[step]), spoken]).then(() => {
      if (alive) setStep((value) => value + 1);
    });
    return () => { alive = false; };
  }, [step, started, visible]);

  // Hero ekrandan çıkınca ya da sayfadan ayrılınca konuşma kesilir.
  useEffect(() => {
    if (!visible) voice.hush();
  }, [visible]);
  useEffect(() => () => voice.hush(), []);

  const start = (withSound: boolean) => {
    if (withSound) voice.enable();
    setStep(0);
    setStarted(true);
  };

  // 3D sahne sayfa boşa çıkınca yüklenir; o zamana kadar PNG'ler görünür.
  useEffect(() => {
    const idle = window as Window & { requestIdleCallback?: (cb: () => void, options?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    const start = () => setLoad3d(true);
    if (idle.requestIdleCallback) {
      const id = idle.requestIdleCallback(start, { timeout: 2500 });
      return () => idle.cancelIdleCallback?.(id);
    }
    const timer = window.setTimeout(start, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!poke) return;
    const timer = window.setTimeout(() => setPoke(null), 2300);
    return () => window.clearTimeout(timer);
  }, [poke]);

  const onPoke = useCallback((index: number) => {
    const nefer = NEFERS[index];
    const pokeLine = nefer.pokes[pokeCount.current++ % nefer.pokes.length];
    voice.sfx("boing");
    void voice.say(nefer.id, pokeLine);
    setPoke({ index, text: pokeLine.text });
  }, []);
  const onReady = useCallback(() => setReady(true), []);

  return (
    <figure ref={figure} className="hero-nefers" style={{ "--hero-accent": accent } as CSSProperties} aria-label="Four Jennefer agents, Pixel, Loop, Byte, and Patch, turn a brief into a plan, code, and a reviewed change.">
      <div className="hero-nefers-scene">
        <div className="hero-nefers-glow" aria-hidden="true" />
        <div className="hero-nefers-grid" aria-hidden="true" />
        <div className="hero-nefers-caption font-mono" aria-hidden="true"><span>LIVE / LIVING ORG</span><span>4 AGENTS · LOCAL MODEL</span></div>

        <div className="hero-nefers-window">
          <div className="hero-nefers-window-bar font-mono">
            <span className="hero-nefers-dots" aria-hidden="true"><i /><i /><i /></span>
            <span aria-hidden="true">task / login-page</span>
            <span className="hero-nefers-local" aria-hidden="true"><i /> LOCAL</span>
            {started && (
              <button type="button" className="hero-nefers-sound" onClick={() => voice.toggle()} aria-label={soundOn ? "Mute the Nefers" : "Unmute the Nefers"} aria-pressed={soundOn}>
                {soundOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
              </button>
            )}
          </div>
          <ol className="hero-nefers-chips font-mono" aria-hidden="true">
            {STEPS.map((label, i) => {
              const done = shown > i;
              const active = shown === i;
              return (
                <li key={label} style={{ color: done || active ? NEFERS[i].accent : undefined }}>
                  {done ? <Check size={11} /> : <span className={active ? "is-active" : ""} />}
                  {label}
                </li>
              );
            })}
          </ol>
          <div className="hero-nefers-body">
            {started ? (
              <div aria-hidden="true" className="h-full">
                <AnimatePresence mode="wait">
                  <TaskBody step={shown} />
                </AnimatePresence>
              </div>
            ) : null}
            {started && step === STEPS.length && (
              <button type="button" className="hero-nefers-replay font-mono" onClick={() => setStep(0)}>
                <RotateCcw size={12} /> Watch again
              </button>
            )}
            {!started && (
              <div className="hero-nefers-start">
                <p className="hero-nefers-start-title">Four agents. One login page.</p>
                <p className="hero-nefers-start-copy">Watch Pixel, Loop, Byte, and Patch take it from brief to approved.</p>
                <button type="button" className="hero-nefers-play" onClick={() => start(true)}>
                  <span className="hero-nefers-play-icon"><Play size={14} fill="currentColor" /></span>
                  Sound on &amp; start
                </button>
                <button type="button" className="hero-nefers-muted font-mono" onClick={() => start(false)}>or watch muted</button>
              </div>
            )}
          </div>
        </div>

        <div className="hero-nefers-stage" aria-hidden="true">
          <div className="hero-nefers-slots">
            {NEFERS.map((nefer, i) => (
              <div key={nefer.id} className="hero-nefers-slot">
                <AnimatePresence>
                  {speaking === i && bubble && (
                    <motion.p
                      key={bubble}
                      className="hero-nefers-bubble"
                      initial={{ opacity: 0, y: 8, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 380, damping: 26 }}
                    >
                      <b className="font-mono" style={{ color: nefer.accent }}>{nefer.name}</b>
                      {bubble}
                    </motion.p>
                  )}
                </AnimatePresence>
                <Image
                  className={`hero-nefers-fallback ${ready ? "is-hidden" : ""} ${shown === i ? "is-active" : ""}`}
                  src={`/images/nefers/${nefer.id}.png`}
                  alt=""
                  width={260}
                  height={260}
                  sizes="130px"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
          {load3d && <HeroNeferStage eventSource={figure} step={shown} paused={!visible} ready={ready} onReady={onReady} onPoke={onPoke} />}
        </div>
      </div>

      {children}
      <div className="hero-cinema-footer font-mono">
        <span className="hero-cinema-footer-copy">FOUR AGENTS. ONE GRAPH. YOUR MACHINE.</span>
        <div className="hero-cinema-mobile-actions">
          <a href="#waitlist" className="hero-cinema-access">Request access <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" /></a>
          <a href="#routing" className="hero-cinema-scroll">Scroll to explore <ArrowDown size={13} strokeWidth={1.7} aria-hidden="true" /></a>
        </div>
        <a href="/nefers" className="hero-nefers-meet">Meet the Nefers <ArrowUpRight size={13} strokeWidth={1.8} aria-hidden="true" /></a>
      </div>
    </figure>
  );
}

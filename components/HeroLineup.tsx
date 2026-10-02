"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { NEFERS } from "./nefers/data";
import { voice } from "./nefers/voice";
import WebGLBoundary from "./nefers/WebGLBoundary";

const HeroAppStage = dynamic(() => import("./HeroAppStage"), { ssr: false });

const MOBILE = "(max-width: 767px)";
const TURN_MS = 2200;

// Mobil hero: başlığın altında 4 Nefer, 2x2 ızgara. Sırayla zıplarlar, dokununca laf atarlar.
// Masaüstünde gizli; 3D sahne yalnızca mobilde yüklenir, açılamazsa PNG'ler kalır.
export default function HeroLineup() {
  const root = useRef<HTMLDivElement>(null);
  const pokeCount = useRef(0);
  const [mobile, setMobile] = useState(false);
  const [visible, setVisible] = useState(true);
  const [turn, setTurn] = useState(0);
  const [ready, setReady] = useState(false);
  const [poke, setPoke] = useState<{ index: number; text: string } | null>(null);

  useEffect(() => {
    const query = window.matchMedia(MOBILE);
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Sıra Pixel → Loop → Byte → Patch; hareket azaltılmışsa sıra dönmez.
  useEffect(() => {
    if (!mobile || !visible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setTurn((current) => (current + 1) % NEFERS.length), TURN_MS);
    return () => window.clearInterval(timer);
  }, [mobile, visible]);

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
    <div ref={root} className="hl" aria-label="Meet the team: Pixel, Loop, Byte and Patch">
      <ul className="hl-row">
        {NEFERS.map((nefer, i) => (
          <li key={nefer.id} className={turn === i ? "is-turn" : ""}>
            <AnimatePresence>
              {poke?.index === i && (
                <motion.p key={poke.text} className={`hl-poke ${i % 2 === 0 ? "is-start" : "is-end"}`} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  {poke.text}
                </motion.p>
              )}
            </AnimatePresence>
            <button type="button" className="hl-face" data-hl-face={i} onClick={() => !ready && onPoke(i)} aria-label={`Poke ${nefer.name}`}>
              <Image className={`hl-face-png ${ready ? "is-hidden" : ""}`} src={`/images/nefers/${nefer.id}.png`} alt="" width={120} height={120} priority />
            </button>
            <span className="hl-name"><i style={{ background: nefer.accent }} />{nefer.name}</span>
          </li>
        ))}
      </ul>
      {mobile && (
        <WebGLBoundary>
          <HeroAppStage eventSource={root} slot="hl-face" working={turn} paused={!visible} ready={ready} onReady={onReady} onPoke={onPoke} />
        </WebGLBoundary>
      )}
    </div>
  );
}

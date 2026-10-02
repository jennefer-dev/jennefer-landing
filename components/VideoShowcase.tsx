"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Maximize, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";

// Tanıtım filmi: masaüstünde yatay (promo.mp4), mobilde dikey (mobil_promo.mp4) video.
// Görünür olan video ekrana girince sessiz başlar, çıkınca durur; ses kullanıcıyla açılır.
const SOURCES = [
  { key: "desktop", src: "/videos/promo.mp4", poster: "/videos/promo-poster.jpg" },
  { key: "mobile", src: "/videos/mobil_promo.mp4", poster: "/videos/mobil_promo-poster.jpg" },
] as const;

const clock = (seconds: number) => `0:${String(Math.floor(seconds)).padStart(2, "0")}`;

type FullscreenVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };

export default function VideoShowcase() {
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(true);
  const [ended, setEnded] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(25);

  // display:none olan video ölçülemez; o an görünen video aktif kabul edilir.
  const active = () => videos.current.find((video) => video && video.offsetParent !== null) ?? null;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting && !video.ended) video.play().catch(() => {});
        else video.pause();
      }),
      { threshold: 0.35 },
    );
    videos.current.forEach((video) => video && observer.observe(video));
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const video = active();
    if (!video) return;
    if (video.paused) void video.play().catch(() => {});
    else video.pause();
  };

  const restart = () => {
    const video = active();
    if (!video) return;
    video.currentTime = 0;
    void video.play().catch(() => {});
  };

  const toggleSound = () => {
    const video = active();
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (!video.muted && video.paused) void video.play().catch(() => {});
  };

  // Sesli izle: baştan, sesi açık başlatır.
  const playWithSound = () => {
    const video = active();
    if (!video) return;
    video.muted = false;
    setMuted(false);
    if (video.ended) video.currentTime = 0;
    void video.play().catch(() => {});
  };

  const fullscreen = () => {
    const video = active() as FullscreenVideo | null;
    if (!video) return;
    if (video.requestFullscreen) void video.requestFullscreen().catch(() => {});
    else video.webkitEnterFullscreen?.();
  };

  return (
    <section id="main-video" className="video-stage vs" aria-label="Jennefer product film">
      <div className="vs-head font-mono" aria-hidden="true">
        <span>01 / Inside Jennefer</span>
        <span>Product film / {clock(duration)}</span>
      </div>

      <div className="vs-frame">
        {SOURCES.map((source, i) => (
          <video
            key={source.key}
            ref={(el) => { videos.current[i] = el; }}
            className={`vs-video is-${source.key}`}
            src={source.src}
            poster={source.poster}
            muted={muted}
            playsInline
            preload="metadata"
            onPlay={() => { setPaused(false); setEnded(false); }}
            onPause={() => setPaused(true)}
            onEnded={() => setEnded(true)}
            onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
            onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 25)}
            onClick={togglePlay}
          />
        ))}

        {(paused || muted) && (
          <div className={`vs-overlay ${paused ? "is-paused" : ""}`}>
            <button type="button" className="vs-primary" onClick={playWithSound}>
              {ended ? "Watch again with sound" : "Watch with sound"} <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          </div>
        )}

        <div className="vs-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${duration ? Math.min(1, time / duration) : 0})` }} />
        </div>
      </div>

      <div className="vs-controls">
        <button type="button" onClick={togglePlay} aria-label={paused ? "Play" : "Pause"}>
          {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
        </button>
        <button type="button" onClick={restart} aria-label="Restart">
          <RotateCcw size={15} aria-hidden="true" />
        </button>
        <button type="button" className="vs-sound font-mono" onClick={toggleSound} aria-pressed={!muted}>
          {muted ? <VolumeX size={15} aria-hidden="true" /> : <Volume2 size={15} aria-hidden="true" />}
          <span>{muted ? "Sound off" : "Sound on"}</span>
        </button>
        <span className="vs-time font-mono" aria-hidden="true">{clock(time)} / {clock(duration)}</span>
        <button type="button" className="vs-full" onClick={fullscreen} aria-label="Fullscreen">
          <Maximize size={15} aria-hidden="true" />
        </button>
      </div>

      <div className="vs-foot font-mono" aria-hidden="true">
        <span>See the product before the details</span>
        <span>↓ Scroll to continue</span>
      </div>
    </section>
  );
}

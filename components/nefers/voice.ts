"use client";

import { useSyncExternalStore } from "react";
import { NEFERS, SFX, type NeferId, type VoiceLine } from "./data";

type Snapshot = { enabled: boolean; speaker: NeferId | null; text: string | null; pokes: number };

// Tek bir global ses motoru: WebAudio ile oynatır, analyser ile ağız hareketi için ses seviyesini verir.
// Ses kapalıyken de altyazı ve sahte ağız hareketi çalışır.
class VoiceEngine {
  private ctx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private samples: Uint8Array<ArrayBuffer> | null = null;
  private buffers = new Map<string, Promise<AudioBuffer>>();
  private source: AudioBufferSourceNode | null = null;
  private token = 0;
  private fakeUntil = 0;
  private current: Promise<void> = Promise.resolve();
  private release: (() => void) | null = null;
  private listeners = new Set<() => void>();
  snapshot: Snapshot = { enabled: false, speaker: null, text: null, pokes: 0 };

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  private set(patch: Partial<Snapshot>) {
    this.snapshot = { ...this.snapshot, ...patch };
    this.listeners.forEach((listener) => listener());
  }

  private load(src: string) {
    if (!this.ctx) return null;
    let buffer = this.buffers.get(src);
    if (!buffer) {
      const ctx = this.ctx;
      buffer = fetch(src).then((res) => res.arrayBuffer()).then((data) => ctx.decodeAudioData(data));
      buffer.catch(() => this.buffers.delete(src));
      this.buffers.set(src, buffer);
    }
    return buffer;
  }

  enable() {
    if (!this.ctx) {
      const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new Ctx();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 512;
      this.analyser.connect(this.ctx.destination);
      this.samples = new Uint8Array(this.analyser.fftSize);
      NEFERS.forEach((nefer) => this.load(nefer.intro.src));
    }
    void this.ctx.resume();
    this.set({ enabled: true });
    this.sfx("pop");
  }

  disable() {
    this.stop();
    this.set({ enabled: false });
  }

  toggle() {
    if (this.snapshot.enabled) this.disable();
    else this.enable();
  }

  private stop() {
    this.token++;
    try { this.source?.stop(); } catch {}
    this.source = null;
    this.release?.();
    this.release = null;
  }

  // Konuşmayı keser ve altyazıyı kapatır.
  hush() {
    this.stop();
    this.fakeUntil = 0;
    this.set({ speaker: null, text: null });
  }

  // O an çalan replik bitince (veya kesilince) çözülür.
  idle() {
    return this.current;
  }

  // Dönen promise replik bitince ya da başka bir replik onu kesince çözülür.
  say(speaker: NeferId, voiceLine: VoiceLine): Promise<void> {
    this.stop();
    const token = this.token;
    this.set({ speaker, text: voiceLine.text });
    let release!: () => void;
    this.current = new Promise<void>((resolve) => { release = resolve; });
    this.release = release;
    const ended = () => {
      if (token !== this.token) return;
      this.release = null;
      release();
    };
    const finish = () => {
      if (token === this.token) this.set({ speaker: null, text: null });
    };

    const buffer = this.snapshot.enabled ? this.load(voiceLine.src) : null;
    if (!buffer || !this.ctx || !this.analyser) {
      const duration = 900 + voiceLine.text.length * 55;
      this.fakeUntil = performance.now() + duration;
      window.setTimeout(ended, duration);
      window.setTimeout(finish, duration + 400);
      return this.current;
    }

    const ctx = this.ctx;
    const analyser = this.analyser;
    buffer.then((audio) => {
      if (token !== this.token) return;
      const source = ctx.createBufferSource();
      source.buffer = audio;
      source.connect(analyser);
      source.onended = () => { ended(); window.setTimeout(finish, 500); };
      source.start();
      this.source = source;
    }).catch(() => { ended(); finish(); });
    return this.current;
  }

  sfx(name: keyof typeof SFX) {
    if (!this.snapshot.enabled || !this.ctx) return;
    const ctx = this.ctx;
    this.load(SFX[name])?.then((audio) => {
      const source = ctx.createBufferSource();
      const gain = ctx.createGain();
      gain.gain.value = 0.45;
      source.buffer = audio;
      source.connect(gain).connect(ctx.destination);
      source.start();
    }).catch(() => {});
  }

  poke() {
    this.set({ pokes: this.snapshot.pokes + 1 });
  }

  // 0..1 arası konuşma seviyesi; sadece o an konuşan karakter için sıfırdan büyük.
  level(id: NeferId, time: number) {
    if (this.snapshot.speaker !== id) return 0;
    if (this.source && this.analyser && this.samples) {
      this.analyser.getByteTimeDomainData(this.samples);
      let sum = 0;
      for (let i = 0; i < this.samples.length; i++) {
        const value = (this.samples[i] - 128) / 128;
        sum += value * value;
      }
      return Math.min(1, Math.sqrt(sum / this.samples.length) * 4.5);
    }
    if (performance.now() > this.fakeUntil) return 0;
    return Math.max(0, Math.sin(time * 22) * 0.5 + Math.sin(time * 9.3) * 0.35 + 0.15);
  }
}

export const voice = new VoiceEngine();

const serverSnapshot: Snapshot = { enabled: false, speaker: null, text: null, pokes: 0 };

export function useVoice() {
  return useSyncExternalStore(voice.subscribe, () => voice.snapshot, () => serverSnapshot);
}

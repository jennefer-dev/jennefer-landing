"use client";

import React, { useRef, useEffect, useState } from "react";

export type AgentClass =
  | 'Supervisor'
  | 'Business Analyst'
  | 'Tasker'
  | 'Developer'
  | 'Designer'
  | 'DevOps'
  | 'QA'
  | 'Reviewer';

interface AgentBadgeData {
  id: number;
  x: number;
  y: number;
  role: AgentClass;
  color: string;
  gradient: string;
  createdAt: number;
  opacity: number;
  scale: number;
  floatOffset: number;
}

const AGENT_THEMES: Record<AgentClass, { color: string; gradient: string }> = {
  Supervisor: {
    color: '#60a5fa',
    gradient: 'linear-gradient(135deg, rgba(37, 99, 235, 0.42), rgba(15, 23, 42, 0.88))'
  },
  'Business Analyst': {
    color: '#c084fc',
    gradient: 'linear-gradient(135deg, rgba(147, 51, 234, 0.42), rgba(15, 23, 42, 0.88))'
  },
  Tasker: {
    color: '#fbbf24',
    gradient: 'linear-gradient(135deg, rgba(217, 119, 6, 0.42), rgba(15, 23, 42, 0.88))'
  },
  Developer: {
    color: '#22d3ee',
    gradient: 'linear-gradient(135deg, rgba(8, 145, 178, 0.42), rgba(15, 23, 42, 0.88))'
  },
  Designer: {
    color: '#f472b6',
    gradient: 'linear-gradient(135deg, rgba(219, 39, 119, 0.42), rgba(15, 23, 42, 0.88))'
  },
  DevOps: {
    color: '#34d399',
    gradient: 'linear-gradient(135deg, rgba(5, 150, 105, 0.42), rgba(15, 23, 42, 0.88))'
  },
  QA: {
    color: '#f87171',
    gradient: 'linear-gradient(135deg, rgba(220, 38, 38, 0.42), rgba(15, 23, 42, 0.88))'
  },
  Reviewer: {
    color: '#818cf8',
    gradient: 'linear-gradient(135deg, rgba(79, 70, 229, 0.42), rgba(15, 23, 42, 0.88))'
  },
};

const AGENT_LIST: AgentClass[] = [
  'Supervisor',
  'Business Analyst',
  'Tasker',
  'Developer',
  'Designer',
  'DevOps',
  'QA',
  'Reviewer'
];

export default function AgentSparklesCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mousePos = useRef<{ x: number; y: number }>({ x: 600, y: 350 });
  const smoothCenter = useRef<{ x: number; y: number }>({ x: 600, y: 350 });
  const lastSpawn = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });

  const [badges, setBadges] = useState<AgentBadgeData[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    mousePos.current = { x: width * 0.5, y: height * 0.45 };
    smoothCenter.current = { x: width * 0.5, y: height * 0.45 };

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0 }
    );
    observer.observe(container);

    // Glowing rounded particles
    const particleColors = [
      '#f97316', '#fbbf24', '#a855f7', '#3b82f6', '#06b6d4', '#ec4899', '#10b981', '#6366f1'
    ];

    interface RoundParticle {
      radius: number;
      baseAngle: number;
      orbitDist: number;
      orbitSpeed: number;
      radialSpeed: number;
      color: string;
      alpha: number;
      pulseSpeed: number;
      organicWobble: number;
    }

    const particles: RoundParticle[] = [];
    for (let i = 0; i < 160; i++) {
      particles.push({
        radius: 1.8 + Math.random() * 2.6,
        baseAngle: Math.random() * Math.PI * 2,
        orbitDist: 130 + Math.pow(Math.random(), 1.6) * 540,
        orbitSpeed: (Math.random() - 0.5) * 0.0028,
        radialSpeed: 0.1 + Math.random() * 0.22,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        alpha: 0.25 + Math.random() * 0.65,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        organicWobble: 15 + Math.random() * 35
      });
    }

    // Single elegant initial badge
    const initialTime = Date.now();
    let currentBadges: AgentBadgeData[] = [
      {
        id: initialTime,
        x: width * 0.48,
        y: height * 0.36,
        role: 'Supervisor',
        color: AGENT_THEMES['Supervisor'].color,
        gradient: AGENT_THEMES['Supervisor'].gradient,
        createdAt: initialTime,
        scale: 1,
        opacity: 1,
        floatOffset: 0
      }
    ];
    setBadges([...currentBadges]);

    let tick = 0;
    const render = () => {
      animId = requestAnimationFrame(render);
      if (!isVisible) return;
      
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Smooth lerp (0.02)
      smoothCenter.current.x += (mousePos.current.x - smoothCenter.current.x) * 0.022;
      smoothCenter.current.y += (mousePos.current.y - smoothCenter.current.y) * 0.022;

      const cX = smoothCenter.current.x;
      const cY = smoothCenter.current.y;

      // 1. Draw rounded particles with organic amorf void
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.baseAngle += p.orbitSpeed;
        p.orbitDist += p.radialSpeed;

        if (p.orbitDist > 700) {
          p.orbitDist = 120 + Math.random() * 70;
          p.baseAngle = Math.random() * Math.PI * 2;
        }

        const voidShape =
          130 +
          Math.sin(p.baseAngle * 3 + tick * 0.012) * 35 +
          Math.cos(p.baseAngle * 5 - tick * 0.008) * 20;

        const finalDist = Math.max(p.orbitDist, voidShape);

        const wobble = Math.sin(tick * 0.025 + i) * p.organicWobble * 0.15;
        const posX = cX + Math.cos(p.baseAngle) * (finalDist + wobble);
        const posY = cY + Math.sin(p.baseAngle) * (finalDist + wobble);

        const currentAlpha = Math.abs(Math.sin(tick * p.pulseSpeed + i)) * p.alpha;

        ctx.save();
        ctx.beginPath();
        ctx.arc(posX, posY, p.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha * 0.22;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(posX, posY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = currentAlpha * 0.9;
        ctx.fill();

        ctx.restore();
      }

      // 2. Animate badges lifecycle with gentle elastic spring-in and floating
      const now = Date.now();
      const LIFETIME = 5800; // Longer lifespan for relaxed aesthetic
      const SPRING_IN_DURATION = 650; // Smooth soft spring
      const FADE_START = 4200;

      let stateNeedsUpdate = false;
      currentBadges = currentBadges.filter((b) => {
        const age = now - b.createdAt;
        if (age >= LIFETIME) {
          stateNeedsUpdate = true;
          return false;
        }

        // Soft elastic spring scale-in
        if (age < SPRING_IN_DURATION) {
          const t = age / SPRING_IN_DURATION;
          // Overshoot soft spring formula
          const s = 1 + Math.sin(t * Math.PI) * 0.12 * (1 - t);
          b.scale = Math.min(1.08, t * s);
          b.opacity = Math.min(1, t * 1.8);
          stateNeedsUpdate = true;
        } else if (age > FADE_START) {
          const fadeProgress = (age - FADE_START) / (LIFETIME - FADE_START);
          b.opacity = Math.max(0, 1 - Math.pow(fadeProgress, 1.2));
          b.scale = Math.max(0.75, 1 - fadeProgress * 0.25);
          stateNeedsUpdate = true;
        } else {
          b.scale = 1;
          b.opacity = 1;
        }

        // Ambient vertical breathing float
        b.floatOffset = Math.sin((tick + b.id) * 0.028) * 3;

        return true;
      });

      if (stateNeedsUpdate) {
        setBadges([...currentBadges]);
      }
    };

    render();

    // Less frequent, intentional badge spawn on mouse move
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mousePos.current = { x, y };

      const now = Date.now();
      const dist = Math.hypot(x - lastSpawn.current.x, y - lastSpawn.current.y);

      // STRICTLY LESS FREQUENT:
      // Requires moving at least 150px and at least 950ms delay between spawns
      if (dist > 150 && now - lastSpawn.current.time > 950) {
        lastSpawn.current = { x, y, time: now };

        const role = AGENT_LIST[Math.floor(Math.random() * AGENT_LIST.length)];
        const angle = Math.random() * Math.PI * 2;
        const rad = 45 + Math.random() * 55;
        const badgeX = Math.max(80, Math.min(width - 80, x + Math.cos(angle) * rad));
        const badgeY = Math.max(60, Math.min(height - 60, y + Math.sin(angle) * rad));

        const theme = AGENT_THEMES[role];

        const newBadge: AgentBadgeData = {
          id: now,
          x: badgeX,
          y: badgeY,
          role,
          color: theme.color,
          gradient: theme.gradient,
          createdAt: now,
          scale: 0.15,
          opacity: 0.1,
          floatOffset: 0
        };

        // Keep maximum 4 simultaneous badges to keep it minimal and clean
        currentBadges = [...currentBadges.slice(-3), newBadge];
        setBadges([...currentBadges]);
      }
    };

    container.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-10 pointer-events-auto overflow-hidden select-none opacity-60 transition-opacity duration-300"
    >
      {/* 1. Canvas for ultra-smooth rounded particles & organic void */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* 2. SVG Overlay for Soft Neural Connecting Lines & Glowing Pulse Dots */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
        {badges.map((b1, idx) => {
          if (idx === badges.length - 1) return null;
          const b2 = badges[idx + 1];
          const dist = Math.hypot(b2.x - b1.x, (b2.y + b2.floatOffset) - (b1.y + b1.floatOffset));
          if (dist > 540) return null;

          const midX = (b1.x + b2.x) / 2;
          const midY = (b1.y + b1.floatOffset + b2.y + b2.floatOffset) / 2;
          const lineAlpha = Math.max(0, 1 - dist / 540) * 0.45 * Math.min(b1.opacity, b2.opacity);

          return (
            <g key={`link-${b1.id}-${b2.id}`}>
              <line
                x1={b1.x}
                y1={b1.y + b1.floatOffset}
                x2={b2.x}
                y2={b2.y + b2.floatOffset}
                stroke={b2.color}
                strokeWidth="1.2"
                strokeDasharray="5 5"
                strokeOpacity={lineAlpha}
              />
              <circle
                cx={midX}
                cy={midY}
                r="4.5"
                fill={b2.color}
                fillOpacity={lineAlpha * 0.35}
              />
              <circle
                cx={midX}
                cy={midY}
                r="2"
                fill="#ffffff"
                fillOpacity={lineAlpha * 0.9}
              />
            </g>
          );
        })}
      </svg>

      {/* 3. Soft Filled Glassmorphic DOM Badges with Spring Scale-In & Glow */}
      {badges.map((badge, idx) => (
        <div
          key={badge.id}
          className="absolute z-30 pointer-events-none will-change-transform"
          style={{
            left: `${badge.x}px`,
            top: `${badge.y + badge.floatOffset}px`,
            transform: `translate(-50%, -50%) scale(${badge.scale})`,
            opacity: badge.opacity,
            transition: 'transform 0.12s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease-out'
          }}
        >
          <div
            className="flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-mono font-medium backdrop-blur-2xl shadow-xl border"
            style={{
              background: badge.gradient,
              borderColor: `${badge.color}55`,
              boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 0 20px -2px ${badge.color}35`,
            }}
          >
            {/* Pulsing indicator node */}
            <span className="relative flex h-2 w-2 shrink-0">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: badge.color }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: badge.color }}
              />
            </span>

            {/* Role Title */}
            <span className="font-semibold text-slate-100 tracking-tight text-[12px] whitespace-nowrap">
              {badge.role}
            </span>

            {/* Subtle Divider */}
            <span className="w-1 h-1 rounded-full bg-white/20" />

            {/* Agent Index Tag */}
            <span className="text-[10px] text-slate-300/80 font-mono tracking-wide">
              Agent #{idx + 1}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

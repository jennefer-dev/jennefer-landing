import type { NeferId } from "./data";

export type Shot = "intro" | NeferId | "team" | "play" | "join" | "end";

export type Pose = { x: number; y: number; z: number; s: number; ry: number };

// DOM bölümleri (data-shot) ile 3D sahne arasındaki paylaşılan durum. React state değil; useFrame içinden okunur.
export const director = {
  from: "intro" as Shot,
  to: "intro" as Shot,
  t: 0,
  teamStep: -1,
  // Artınca tüm karakterler zıplar (takım işi bitince).
  cheer: 0,
  // Sohbet formunda o an soru soran karakter; null ise dördü birlikte durur.
  joinSpeaker: "pixel" as NeferId | null,
};

const ORDER: NeferId[] = ["pixel", "loop", "byte", "patch"];
const HALF_HEIGHT = 10 * Math.tan((35 / 2) * (Math.PI / 180));

function row(index: number, aspect: number, maxSpacing: number, maxScale: number) {
  const halfWidth = HALF_HEIGHT * aspect;
  const spacing = Math.min(maxSpacing, (halfWidth * 1.8) / 4);
  return { x: (index - 1.5) * spacing, s: Math.min(maxScale, spacing / 1.55) };
}

export function poseFor(shot: Shot, id: NeferId, aspect: number, teamStep: number): Pose {
  const index = ORDER.indexOf(id);
  const narrow = aspect < 0.9;
  const halfWidth = HALF_HEIGHT * aspect;

  if (shot === "intro") {
    const { x, s } = row(index, aspect, 2.15, 1.2);
    return { x, y: narrow ? -1.7 : -2.55, z: 0, s, ry: (1.5 - index) * 0.12 };
  }

  if (shot === "team") {
    const { x, s } = row(index, aspect, 2.3, 1);
    const active = teamStep === index || teamStep >= 4;
    return { x, y: narrow ? -2.2 : -2.9, z: active ? 0.6 : 0, s: active ? s * 1.18 : s * 0.92, ry: active ? 0 : (1.5 - index) * 0.18 };
  }

  if (shot === "play") {
    const { x, s } = row(index, aspect, 2.5, 1.25);
    return { x, y: narrow ? -1.2 : -2.45, z: 0, s, ry: 0 };
  }

  if (shot === "join") {
    const anchorX = narrow ? 0 : Math.min(halfWidth * 0.5, 4);
    const baseY = narrow ? 1.25 : -1.9;
    const speaker = director.joinSpeaker;
    if (!speaker) {
      const spacing = narrow ? 0.62 : 1.15;
      return { x: anchorX + (index - 1.5) * spacing, y: baseY + (narrow ? 0.2 : 0.3), z: 0, s: narrow ? 0.5 : 0.95, ry: 0 };
    }
    if (speaker === id) return { x: anchorX, y: baseY, z: 0, s: narrow ? 0.85 : 2, ry: narrow ? 0 : -0.25 };
    return { x: anchorX + (ORDER.indexOf(speaker) < index ? 1.2 : -1.2), y: -8, z: 0, s: 1, ry: 0 };
  }

  if (shot === "end") {
    const { x, s } = row(index, aspect, 2.15, 1.2);
    return { x, y: -9, z: 0, s, ry: 0 };
  }

  // Karakter bölümü: sahnedeki karakter büyür, diğerleri aşağı iner.
  const focusX = narrow ? 0 : Math.min(halfWidth * 0.42, 3.6);
  const focus: Pose = narrow
    ? { x: 0, y: -0.25, z: 0, s: 1.35, ry: 0 }
    : { x: focusX, y: -2, z: 0, s: 2.35, ry: -0.3 };
  if (shot === id) return focus;
  const side = ORDER.indexOf(shot) < index ? 1 : -1;
  return { ...focus, x: focus.x + side * 1.5, y: -8, s: focus.s * 0.8 };
}

export function smooth(t: number) {
  const u = Math.min(1, Math.max(0, (t - 0.22) / 0.56));
  return u * u * (3 - 2 * u);
}

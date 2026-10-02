"use client";

import { Suspense, useEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { NEFERS, NEFER_BY_ID, type NeferId } from "./data";
import { director, poseFor, smooth, type Pose, type Shot } from "./director";
import { voice } from "./voice";

const GLOW: Record<Shot, string> = {
  intro: "#5b6cff",
  pixel: NEFER_BY_ID.pixel.accent,
  loop: NEFER_BY_ID.loop.accent,
  byte: NEFER_BY_ID.byte.accent,
  patch: NEFER_BY_ID.patch.accent,
  team: "#8b6bff",
  play: "#ff6b81",
  join: "#8b6bff",
  end: "#090a0c",
};

const glowFor = (shot: Shot) => (shot === "join" && director.joinSpeaker ? NEFER_BY_ID[director.joinSpeaker].accent : GLOW[shot]);

NEFERS.forEach((nefer) => useGLTF.preload(`/models/${nefer.id}.glb`));

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Her karede DOM'daki [data-shot] bölümlerinin konumuna göre hangi iki sahne arasında olduğumuzu hesaplar.
function Director({ root }: { root: RefObject<HTMLElement | null> }) {
  const glowFrom = useMemo(() => new THREE.Color(), []);
  const glowTo = useMemo(() => new THREE.Color(), []);
  useFrame(() => {
    const el = root.current;
    if (!el) return;
    const sections = el.querySelectorAll<HTMLElement>("[data-shot]");
    const viewportCenter = window.innerHeight / 2;
    const anchors: { shot: Shot; offset: number }[] = [];
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      anchors.push({ shot: section.dataset.shot as Shot, offset: rect.top + rect.height / 2 - viewportCenter });
    });
    if (!anchors.length) return;

    let from = anchors[0], to = anchors[0], t = 0;
    if (anchors[0].offset < 0) {
      from = to = anchors[anchors.length - 1];
      for (let i = 0; i < anchors.length - 1; i++) {
        if (anchors[i].offset <= 0 && anchors[i + 1].offset > 0) {
          from = anchors[i];
          to = anchors[i + 1];
          t = smooth(-from.offset / (to.offset - from.offset));
          break;
        }
      }
    }
    director.from = from.shot;
    director.to = to.shot;
    director.t = t;

    glowFrom.set(glowFor(from.shot)).lerp(glowTo.set(glowFor(to.shot)), t);
    el.style.setProperty("--nefer-glow", `#${glowFrom.getHexString()}`);
  });
  return null;
}

let shadowTexture: THREE.Texture | null = null;
function getShadowTexture() {
  if (shadowTexture) return shadowTexture;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, "rgba(0,0,0,0.65)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  shadowTexture = new THREE.CanvasTexture(canvas);
  return shadowTexture;
}

type Spring = { value: number; velocity: number };
const spring = (value: number): Spring => ({ value, velocity: 0 });

function step(s: Spring, target: number, dt: number, stiffness = 120, damping = 14) {
  s.velocity += (stiffness * (target - s.value) - damping * s.velocity) * dt;
  s.value += s.velocity * dt;
}

function NeferModel({ id, index }: { id: NeferId; index: number }) {
  const { scene, animations } = useGLTF(`/models/${id}.glb`);
  const { actions } = useAnimations(animations, scene);
  const wrapper = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const shadow = useRef<THREE.Mesh>(null);
  const size = useThree((state) => state.size);
  const state = useRef({
    x: spring((index - 1.5) * 2), y: spring(9), z: spring(0), s: spring(1),
    hop: spring(0), squash: spring(0), spin: spring(0), ry: 0, rx: 0, hover: 0, hoverShown: 0,
    bornAt: -1, landed: false, pokeIndex: 0, cheer: director.cheer, joinSpeaker: director.joinSpeaker,
  });

  // Ağız geometrisi pivotsuz export edilmiş; kendi merkezine taşıyıp ölçeklenebilir yapıyoruz.
  const mouth = useMemo(() => {
    const mesh = scene.getObjectByName(`${NEFER_BY_ID[id].name}_Mouth`) as THREE.Mesh | undefined;
    if (mesh && !mesh.userData.centered) {
      mesh.geometry = mesh.geometry.clone();
      mesh.geometry.computeBoundingBox();
      const center = mesh.geometry.boundingBox!.getCenter(new THREE.Vector3());
      mesh.geometry.translate(-center.x, -center.y, -center.z);
      mesh.position.add(center);
      mesh.userData.centered = true;
    }
    return mesh;
  }, [scene, id]);

  useEffect(() => {
    Object.values(actions).forEach((action) => action?.reset().setLoop(THREE.LoopRepeat, Infinity).play());
    scene.traverse((object) => {
      if ((object as THREE.Mesh).isMesh) object.frustumCulled = false;
    });
  }, [actions, scene]);

  useFrame((frame, rawDelta) => {
    const dt = Math.min(rawDelta, 1 / 30);
    const s = state.current;
    const time = frame.clock.elapsedTime;
    if (s.bornAt < 0) s.bornAt = time;
    const aspect = size.width / size.height;

    const a = poseFor(director.from, id, aspect, director.teamStep);
    const b = poseFor(director.to, id, aspect, director.teamStep);
    const t = director.t;
    const target: Pose = {
      x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, z: a.z + (b.z - a.z) * t,
      s: a.s + (b.s - a.s) * t, ry: a.ry + (b.ry - a.ry) * t,
    };

    // Giriş: karakterler sırayla yukarıdan düşer.
    const dropping = time - s.bornAt < 0.35 + index * 0.22;
    if (reducedMotion()) {
      s.x.value = target.x; s.y.value = target.y; s.z.value = target.z; s.s.value = target.s;
    } else {
      step(s.x, target.x, dt);
      step(s.y, dropping ? 9 : target.y, dt, 90, 9);
      step(s.z, target.z, dt);
      step(s.s, target.s, dt, 140, 13);
    }
    if (!s.landed && !dropping && s.y.value <= target.y + 0.05) {
      s.landed = true;
      s.squash.velocity = -5;
      voice.sfx("pop");
    }

    if (s.cheer !== director.cheer) {
      s.cheer = director.cheer;
      window.setTimeout(() => { s.hop.velocity = 8; s.squash.velocity = 6; s.spin.value = Math.PI * 2; }, index * 110);
    }

    if (s.joinSpeaker !== director.joinSpeaker) {
      s.joinSpeaker = director.joinSpeaker;
      if (s.joinSpeaker === id && director.to === "join") { s.hop.velocity = 5; s.squash.velocity = 4; }
    }

    step(s.hop, 0, dt, 70, 7);
    step(s.squash, 0, dt, 260, 9);
    step(s.spin, 0, dt, 40, 9);
    s.hoverShown += (s.hover - s.hoverShown) * Math.min(1, dt * 10);

    const talking = voice.level(id, time);
    if (talking > 0.05 && !reducedMotion() && Math.random() < 0.02) s.hop.velocity += 1.5;

    const g = wrapper.current!;
    g.position.set(s.x.value, s.y.value, s.z.value);
    const scale = Math.max(0.001, s.s.value * (1 + s.hoverShown * 0.06));
    g.scale.setScalar(scale);

    const lookY = target.ry + frame.pointer.x * 0.45;
    const lookX = -frame.pointer.y * 0.12;
    s.ry += (lookY - s.ry) * Math.min(1, dt * 5);
    s.rx += (lookX - s.rx) * Math.min(1, dt * 5);

    const inner = body.current!;
    inner.position.y = Math.max(0, s.hop.value);
    inner.rotation.set(s.rx, s.ry + s.spin.value, 0);
    const squash = s.squash.value;
    inner.scale.set(1 - squash * 0.5, 1 + squash + talking * 0.04, 1 - squash * 0.5);

    if (mouth) mouth.scale.set(1 + talking * 0.5, 1 + talking * 3.2, 1);

    const sh = shadow.current!;
    const lift = Math.max(0, s.hop.value);
    sh.scale.setScalar(1.6 / (1 + lift * 0.6));
    (sh.material as THREE.MeshBasicMaterial).opacity = 0.75 / (1 + lift);
  });

  const poke = () => {
    const s = state.current;
    const nefer = NEFER_BY_ID[id];
    s.hop.velocity = 7;
    s.squash.velocity = 7;
    s.spin.value = Math.random() < 0.5 ? Math.PI * 2 : -Math.PI * 2;
    voice.sfx("boing");
    voice.say(id, nefer.pokes[s.pokeIndex % nefer.pokes.length]);
    s.pokeIndex++;
    voice.poke();
  };

  return (
    <group ref={wrapper}>
      <mesh ref={shadow} rotation-x={-Math.PI / 2} position-y={0.005} renderOrder={-1}>
        <circleGeometry args={[0.55, 32]} />
        <meshBasicMaterial map={getShadowTexture()} transparent depthWrite={false} />
      </mesh>
      <group
        ref={body}
        onPointerDown={(event) => { event.stopPropagation(); poke(); }}
        onPointerOver={(event) => { event.stopPropagation(); state.current.hover = 1; document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { state.current.hover = 0; document.body.style.cursor = ""; }}
      >
        <primitive object={scene} />
      </group>
    </group>
  );
}

export default function NeferStage({ root }: { root: RefObject<HTMLElement | null> }) {
  return (
    <Canvas
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 5 }}
      eventSource={root as RefObject<HTMLElement>}
      eventPrefix="client"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 10], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Director root={root} />
      <hemisphereLight args={["#dfe6ff", "#1a1420", 1.4]} />
      <directionalLight position={[3, 5, 6]} intensity={2.4} />
      <directionalLight position={[-5, 2, -4]} intensity={1.6} color="#7a8cff" />
      <pointLight position={[0, -1, 4]} intensity={6} distance={12} color="#ffffff" />
      <Suspense fallback={null}>
        {NEFERS.map((nefer, index) => <NeferModel key={nefer.id} id={nefer.id} index={index} />)}
      </Suspense>
    </Canvas>
  );
}

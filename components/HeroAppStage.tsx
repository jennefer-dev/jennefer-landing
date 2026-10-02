"use client";

import { Suspense, useEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";
import { NEFERS, NEFER_BY_ID, type NeferId } from "./nefers/data";
import { voice } from "./nefers/voice";

NEFERS.forEach((nefer) => useGLTF.preload(`/models/${nefer.id}.glb`));

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Spring = { value: number; velocity: number };
const spring = (value: number): Spring => ({ value, velocity: 0 });

function step(s: Spring, target: number, dt: number, stiffness = 120, damping = 14) {
  s.velocity += (stiffness * (target - s.value) - damping * s.velocity) * dt;
  s.value += s.velocity * dt;
}

let shadowTexture: THREE.Texture | null = null;
function getShadowTexture() {
  if (shadowTexture) return shadowTexture;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, "rgba(0,0,0,0.7)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  shadowTexture = new THREE.CanvasTexture(canvas);
  return shadowTexture;
}

type Props = { working: number; onPoke: (index: number) => void; slot?: string };

function NodeNefer({ id, index, working, onPoke, slot = "hn-face" }: Props & { id: NeferId; index: number }) {
  const { scene: source, animations } = useGLTF(`/models/${id}.glb`);
  // useGLTF aynı sahne nesnesini önbellekten verir; bir nesne tek bir canvas'ta durabilir.
  // Mobilde hero dizisi ve demo grafiği ayrı canvas'lar olduğu için her örnek kendi kopyasını kullanır.
  const scene = useMemo(() => SkeletonUtils.clone(source), [source]);
  const { actions } = useAnimations(animations, scene);
  const wrapper = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const model = useRef<THREE.Group>(null);
  const shadow = useRef<THREE.Mesh>(null);
  const face = useRef<HTMLElement | null>(null);
  const gl = useThree((state) => state.gl);
  const viewport = useThree((state) => state.viewport);
  const size = useThree((state) => state.size);
  const state = useRef({
    pop: spring(0), active: spring(0), hop: spring(0), squash: spring(0), spin: spring(0),
    ry: 0, rx: 0, hover: 0, working,
  });

  // Modeller farklı boyutlarda export edilmiş; yükseklikleri 1 birime, tabanları 0'a normalize edilir.
  const bounds = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const height = Math.max(0.001, box.max.y - box.min.y);
    return { height, bottom: box.min.y, centerX: (box.min.x + box.max.x) / 2, centerZ: (box.min.z + box.max.z) / 2 };
  }, [scene]);

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
    const still = reducedMotion();
    const g = wrapper.current!;

    // Model, DOM'daki yuvasına (data-hn-face / data-hl-face) oturur; yuva nereye kayarsa model de oraya gider.
    face.current ??= document.querySelector<HTMLElement>(`[data-${slot}="${index}"]`);
    const rect = face.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) { g.visible = false; return; }
    g.visible = true;
    const canvas = gl.domElement.getBoundingClientRect();
    const unit = viewport.height / size.height;
    const head = rect.height * unit;
    const x = (rect.left + rect.width / 2 - canvas.left - size.width / 2) * unit;
    const baseY = -(rect.bottom - canvas.top - size.height / 2) * unit;

    // Sırası gelen zıplar; "shipped" anında hepsi sırayla zıplayıp döner.
    if (s.working !== working) {
      s.working = working;
      if (!still && working === index) { s.hop.velocity = 6; s.squash.velocity = 5; }
      if (!still && working === 4) {
        window.setTimeout(() => { s.hop.velocity = 8; s.squash.velocity = 6; s.spin.value = Math.PI * 2; }, index * 120);
      }
    }

    const active = working === index || working === 4 ? 1 : 0;
    if (still) {
      s.pop.value = 1; s.active.value = active;
    } else {
      step(s.pop, 1, dt, 90, 11);
      step(s.active, active, dt, 120, 14);
    }
    step(s.hop, 0, dt, 70, 7);
    step(s.squash, 0, dt, 260, 9);
    step(s.spin, 0, dt, 40, 9);

    const scale = Math.max(0.001, s.pop.value) * (0.92 + s.active.value * 0.18 + s.hover * 0.06);
    g.position.set(x, baseY, s.active.value * 0.3);
    g.scale.setScalar(scale);

    // Gözler imleci takip eder.
    const pointerX = THREE.MathUtils.clamp(frame.pointer.x, -1.4, 1.4) * (viewport.width / 2);
    const pointerY = THREE.MathUtils.clamp(frame.pointer.y, -1.4, 1.4) * (viewport.height / 2);
    const lookY = THREE.MathUtils.clamp((pointerX - x) / (viewport.width * 0.4), -0.7, 0.7);
    const lookX = THREE.MathUtils.clamp(-(pointerY - (baseY + head * 0.55)) / (viewport.height * 0.9), -0.3, 0.3);
    s.ry += (lookY - s.ry) * Math.min(1, dt * 5);
    s.rx += (lookX - s.rx) * Math.min(1, dt * 5);

    // Ses açıkken gerçek ses seviyesi, kapalıyken sahte ağız hareketi (voice motoru ikisini de verir).
    const talking = still ? 0 : voice.level(id, time);
    const inner = body.current!;
    inner.position.y = Math.max(0, s.hop.value) * head * 0.4;
    inner.rotation.set(s.rx, s.ry + s.spin.value, 0);
    const squash = s.squash.value;
    inner.scale.set(1 - squash * 0.5, 1 + squash + talking * 0.03, 1 - squash * 0.5);
    if (mouth) mouth.scale.set(1 + talking * 0.5, 1 + talking * 3.2, 1);

    const m = model.current!;
    const normalize = head / bounds.height;
    m.scale.setScalar(normalize);
    m.position.set(-bounds.centerX * normalize, -bounds.bottom * normalize, -bounds.centerZ * normalize);

    const sh = shadow.current!;
    const lift = Math.max(0, s.hop.value);
    sh.scale.set((head * 0.95) / (1 + lift * 0.5), head * 0.16, 1);
    (sh.material as THREE.MeshBasicMaterial).opacity = 0.8 / (1 + lift);
  });

  const poke = () => {
    const s = state.current;
    if (!reducedMotion()) {
      s.hop.velocity = 7;
      s.squash.velocity = 7;
      s.spin.value = Math.random() < 0.5 ? Math.PI * 2 : -Math.PI * 2;
    }
    onPoke(index);
  };

  return (
    <group ref={wrapper}>
      <mesh ref={shadow} position-z={-0.05} renderOrder={-1}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={getShadowTexture()} transparent depthWrite={false} />
      </mesh>
      <group
        ref={body}
        onPointerDown={(event) => { event.stopPropagation(); poke(); }}
        onPointerOver={(event) => { event.stopPropagation(); state.current.hover = 1; document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { state.current.hover = 0; document.body.style.cursor = ""; }}
      >
        <group ref={model}>
          <primitive object={scene} />
        </group>
      </group>
    </group>
  );
}

function Ready({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    // İlk kare çizilsin, sonra PNG'ler gizlensin.
    const timer = window.setTimeout(onReady, 120);
    return () => window.clearTimeout(timer);
  }, [onReady]);
  return null;
}

// Tek canvas tüm demoyu kaplar ama tıklamaları engellemez (pointer-events: none);
// olaylar figure'dan dinlenir, böylece Approve gibi butonlar çalışmaya devam eder.
export default function HeroAppStage({
  eventSource, working, paused, ready, onReady, onPoke, slot,
}: Props & { eventSource: RefObject<HTMLElement | null>; paused: boolean; ready: boolean; onReady: () => void }) {
  return (
    <Canvas
      className="hn-canvas"
      style={{ position: "absolute", inset: 0, zIndex: 6, pointerEvents: "none", opacity: ready ? 1 : 0, transition: "opacity .4s ease" }}
      eventSource={eventSource as RefObject<HTMLElement>}
      eventPrefix="client"
      onCreated={(state) => state.setEvents({
        compute: (event, store) => {
          const rect = store.gl.domElement.getBoundingClientRect();
          store.pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
          store.raycaster.setFromCamera(store.pointer, store.camera);
        },
      })}
      frameloop={paused ? "never" : "always"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 8], fov: 30 }}
      gl={{ antialias: true, alpha: true }}
    >
      <hemisphereLight args={["#dfe6ff", "#1a1420", 1.4]} />
      <directionalLight position={[3, 5, 6]} intensity={2.4} />
      <directionalLight position={[-5, 2, -4]} intensity={1.6} color="#7a8cff" />
      <pointLight position={[0, -1, 4]} intensity={6} distance={12} color="#ffffff" />
      <Suspense fallback={null}>
        {NEFERS.map((nefer, index) => (
          <NodeNefer key={nefer.id} id={nefer.id} index={index} working={working} onPoke={onPoke} slot={slot} />
        ))}
        <Ready onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}

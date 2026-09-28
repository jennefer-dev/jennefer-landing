import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';

const mint = '#bde2d5';
const muted = '#829a94';
const ease = Easing.bezier(0.16, 1, 0.3, 1);
const fade = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});

const Monogram = ({size = 40}: {size?: number}) => (
  <div style={{width: size, height: size, border: '1px solid #8ebdb2', borderRadius: size * 0.26, display: 'grid', placeItems: 'center', color: mint, fontSize: size * 0.59, fontWeight: 700, lineHeight: 1, boxShadow: 'inset 0 0 18px #8ebdb216'}}>
    J
  </div>
);

const Agent = ({x, y, label, sub, index, frame}: {x: number; y: number; label: string; sub: string; index: number; frame: number}) => {
  const appear = fade(frame, 142 + index * 17, 160 + index * 17);
  const active = frame > 205 + index * 17;
  return (
    <div style={{position: 'absolute', left: x, top: y, width: 238, height: 96, border: `1px solid ${active ? '#a6c9c574' : '#a6c9c535'}`, background: '#111c20', boxShadow: active ? '0 0 32px #75b6a623' : 'none', display: 'flex', alignItems: 'center', gap: 17, padding: '0 21px', opacity: appear, transform: `translateY(${(1 - appear) * 16}px)`}}>
      <div style={{width: 36, height: 36, border: '1px solid #a6c9c560', display: 'grid', placeItems: 'center', fontSize: 16, color: mint}}>{['⌘', '⌁', '◇'][index]}</div>
      <div><div style={{fontSize: 20, color: '#ecf3ed', fontWeight: 600}}>{label}</div><div style={{fontSize: 13, color: muted, marginTop: 4, fontFamily: 'monospace'}}>{sub}</div></div>
      <div style={{position: 'absolute', right: 12, top: 12, width: 5, height: 5, borderRadius: '50%', background: active ? mint : '#52645f'}} />
    </div>
  );
};

export const HeroMotion = () => {
  const frame = useCurrentFrame();
  const reset = interpolate(frame, [430, 449], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const prompt = fade(frame, 12, 38);
  const model = fade(frame, 58, 88);
  const connections = fade(frame, 120, 180);
  const product = fade(frame, 288, 324);
  const status = frame < 115 ? '01 / INTENT' : frame < 285 ? '02 / ORCHESTRATE' : '03 / DELIVER';
  const phaseOpacity = frame < 420 ? 1 : reset;
  const scanY = 90 + ((frame * 2.2) % 700);
  const pulse = 0.4 + 0.3 * Math.sin(frame / 15);

  return (
    <AbsoluteFill style={{background: '#090f12', color: '#ecf3ed', fontFamily: 'Arial, sans-serif', overflow: 'hidden', opacity: phaseOpacity}}>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse 48% 40% at 50% 49%, #426c6240 0%, transparent 76%), linear-gradient(135deg, #0d171a, #090f12 62%, #111b1e)'}} />
      <AbsoluteFill style={{opacity: 0.26, backgroundImage: 'linear-gradient(#a6c9c50d 1px, transparent 1px), linear-gradient(90deg, #a6c9c50d 1px, transparent 1px)', backgroundSize: '60px 60px'}} />
      <div style={{position: 'absolute', top: scanY, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #a6c9c524, transparent)'}} />
      <div style={{position: 'absolute', inset: 34, border: '1px solid #a6c9c52b', pointerEvents: 'none'}} />
      <div style={{position: 'absolute', top: 57, left: 62, display: 'flex', alignItems: 'center', gap: 14}}><Monogram /><div style={{fontSize: 24, letterSpacing: '-0.045em', fontWeight: 700}}>Jennefer</div></div>
      <div style={{position: 'absolute', top: 69, right: 67, color: muted, fontSize: 13, letterSpacing: '0.18em', fontFamily: 'monospace'}}>LOCAL RUNTIME <span style={{color: mint}}>●</span></div>
      <div style={{position: 'absolute', left: 64, right: 64, top: 126, height: 1, background: '#a6c9c52a'}} />

      <div style={{position: 'absolute', top: 166, left: 94, right: 94, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'monospace', fontSize: 14, letterSpacing: '0.12em', color: muted}}><span>{status}</span><span>YOUR MACHINE / YOUR CODE</span></div>

      <div style={{position: 'absolute', left: 94, top: 229, width: 400, opacity: prompt, transform: `translateY(${(1 - prompt) * 14}px)`}}>
        <div style={{fontSize: 13, color: muted, letterSpacing: '0.15em', fontFamily: 'monospace', marginBottom: 17}}>NEW TASK / 001</div>
        <div style={{fontSize: 47, lineHeight: 1.08, letterSpacing: '-0.055em', fontWeight: 600}}>One prompt.<br /><span style={{color: mint}}>A working product.</span></div>
        <div style={{marginTop: 34, background: '#121e21', border: '1px solid #a6c9c54a', padding: '20px 23px', color: '#d9e8df', fontFamily: 'monospace', fontSize: 17, width: 365, boxShadow: '0 22px 60px #0005'}}><span style={{color: mint, marginRight: 12}}>›</span>Build a private workspace<span style={{opacity: Math.round(frame / 12) % 2 ? 1 : 0, color: mint}}>_</span></div>
      </div>

      <div style={{position: 'absolute', left: 638, top: 231, width: 462, height: 319, opacity: model, transform: `translateY(${(1 - model) * 28}px)`, border: '1px solid #a6c9c552', background: 'linear-gradient(145deg, #18282a, #0e171a)', boxShadow: `0 0 ${28 + pulse * 30}px #77b5a22e, 0 28px 65px #0008`}}>
        <div style={{height: 50, borderBottom: '1px solid #a6c9c52e', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 21px', color: muted, fontFamily: 'monospace', letterSpacing: '0.08em', fontSize: 12}}><span>LOCAL MODEL / READY</span><span style={{color: mint}}>● OFFLINE</span></div>
        <div style={{display: 'flex', alignItems: 'center', gap: 24, padding: '38px 35px 24px'}}><div style={{width: 95, height: 95, display: 'grid', placeItems: 'center', border: '1px solid #a6c9c57a', borderRadius: '50%', background: 'radial-gradient(circle, #a6c9c52b, transparent 68%)', boxShadow: `0 0 ${24 + pulse * 30}px #a6c9c535`}}><Monogram size={51} /></div><div><div style={{fontSize: 30, fontWeight: 600, letterSpacing: '-0.04em'}}>Model online</div><div style={{fontFamily: 'monospace', fontSize: 15, color: muted, marginTop: 11}}>Running on your hardware</div></div></div>
        <div style={{margin: '0 35px', height: 1, background: '#a6c9c52b'}} />
        <div style={{display: 'flex', justifyContent: 'space-between', padding: '24px 35px', fontFamily: 'monospace', fontSize: 13, color: muted}}><span>NETWORK</span><span style={{color: mint}}>NO CLOUD CONNECTION</span></div>
      </div>

      <svg style={{position: 'absolute', inset: 0, pointerEvents: 'none', opacity: connections}} width="1200" height="880" viewBox="0 0 1200 880"><defs><linearGradient id="line"><stop stopColor="#77b6a8" stopOpacity="0"/><stop offset="0.55" stopColor="#bde2d5"/><stop offset="1" stopColor="#77b6a8" stopOpacity="0.45"/></linearGradient></defs><path d="M 870 550 V 625 H 290" fill="none" stroke="url(#line)" strokeWidth="2" strokeDasharray="9 9"/><path d="M 870 550 V 625 H 600" fill="none" stroke="#a6c9c584" strokeWidth="2" strokeDasharray="9 9"/><path d="M 870 550 V 625 H 910" fill="none" stroke="#a6c9c584" strokeWidth="2" strokeDasharray="9 9"/></svg>
      <Agent x={94} y={625} label="Architect" sub="Plans the system" index={0} frame={frame} />
      <Agent x={404} y={625} label="Developer" sub="Writes the code" index={1} frame={frame} />
      <Agent x={714} y={625} label="Reviewer" sub="Checks every step" index={2} frame={frame} />

      <div style={{position: 'absolute', left: 60, right: 60, top: 210, height: 532, background: '#0c1518', border: '1px solid #a6c9c550', boxShadow: '0 35px 90px #000a', opacity: product, transform: `translateY(${(1 - product) * 36}px)`}}>
        <div style={{height: 55, borderBottom: '1px solid #a6c9c530', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 26px', fontFamily: 'monospace', fontSize: 14, color: muted}}><span><span style={{color: mint}}>●</span> &nbsp; WORKSPACE / OUTPUT</span><span>LOCAL · VERIFIED</span></div>
        <div style={{display: 'flex', height: 477}}><div style={{width: 277, borderRight: '1px solid #a6c9c530', padding: 27, fontFamily: 'monospace', color: muted, fontSize: 15}}><div style={{color: mint, marginBottom: 26}}>FILES / 02</div><div style={{marginBottom: 17, color: '#e4eee8'}}>◇ &nbsp; workspace.tsx</div><div>◇ &nbsp; workspace.css</div><div style={{marginTop: 174, padding: 13, border: '1px solid #a6c9c54c', fontSize: 12, color: mint}}>✓ &nbsp; ALL CHECKS PASSED</div></div><div style={{padding: '29px 37px', fontFamily: 'monospace', fontSize: 18, lineHeight: 2.05}}><div style={{color: muted, fontSize: 14, marginBottom: 12}}>workspace.tsx &nbsp; / &nbsp; 01</div>{['export function Workspace() {', '  const model = useLocalModel();', '  const agents = createAgentTeam();', '', '  return <PrivateWorkspace', '    model={model}', '    agents={agents}', '  />;', '}'].map((line, i) => <div key={i} style={{opacity: fade(frame, 310 + i * 7, 320 + i * 7), color: i === 1 || i === 2 ? mint : '#e0ece6', whiteSpace: 'pre'}}><span style={{color: '#627771', marginRight: 23}}>{String(i + 1).padStart(2, '0')}</span>{line || ' '}</div>)}</div></div>
      </div>

      <div style={{position: 'absolute', bottom: 58, left: 63, right: 63, borderTop: '1px solid #a6c9c52a', paddingTop: 20, display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: 13, color: muted, letterSpacing: '0.11em'}}><span>BUILD WITH AGENTS. KEEP THE KEYS.</span><span style={{color: mint}}>JENNEFER.DEV</span></div>
    </AbsoluteFill>
  );
};

# Role & Philosophy: Principal Creative Technologist & Visual Engineer

## Visual Standard & Design Hierarchy

- Aesthetics Target: Linear, Raycast, Vercel, Resend, Warp.
- Theme: Strictly OLED/Deep Midnight Dark (#07080c, #0b0f17). No pure grays. Use cool-tinted slate borders (#1e293b / rgba(255,255,255,0.06)).
- Lighting & Depth:
  - Multi-layered glowing radial gradients with low opacity (8% - 15%) that subtly track scroll or pulse softly.
  - Sub-pixel borders (1px) with gradient stops (`border-image` or subtle linear fades) to create glassmorphic chamfers.
  - Subtle noise texture overlay (SVG feTurbulence) to prevent 8-bit banding on dark CSS gradients.

## Scrollytelling Mechanics

- Architecture: 55% Left Viewport (Sticky Canvas with 3D perspective tilt & dynamic glass reflection), 45% Right Stream (Staggered narrative nodes).
- Scroll Pacing: Smooth interpolations using Framer Motion `useScroll`, `useTransform`, or Lenis smooth-scroll wrapper.
- Performance:
  - All gradient animations must execute via GPU properties (`transform`, `opacity`, `filter`). Strictly avoid animating layout dimensions (`width`, `height`, `margin`).
  - Cross-fading screenshots must preload using Next.js Image component with high priority and hardware-accelerated crossfades.

## Developer Typography & Token Precision

- Headings: Clean geometric sans (Geist Sans, Inter Variable). Tight letter tracking (`-0.03em`).
- Metrics & Data Streams: JetBrains Mono. High contrast, tabular numerals (`font-feature-settings: 'tnum'`).
- Micro-badges: Monospace labels wrapped in pill-shaped glow containers with animated pulsing indicator dots (Emerald/Cyan).

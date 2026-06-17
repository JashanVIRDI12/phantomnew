# Hero Section — Phantom Logistics

## Architecture Overview

```
src/
├── components/
│   └── Hero.tsx              ← Client Component wrapper ('use client')
├── three/
│   └── Scene.tsx             ← Three.js 3D scene ('use client')
├── hooks/
│   └── useGSAPAnimation.ts   ← GSAP ScrollTrigger hook
├── styles/
│   └── hero.css              ← Hero-specific styles
└── lib/
    └── gsap.ts               ← Centralised GSAP + plugin registration (pre-existing)
```

### How the components connect

1. **`Hero.tsx`** is the orchestrator. It:
   - Creates a shared `MutableRefObject<SceneParams>` for inter-component communication
   - Dynamically imports `Scene.tsx` with `ssr: false` (Three.js is client-only)
   - Calls `useGSAPAnimation()` to bind load + scroll animations
   - Tracks mouse position and writes it to `sceneParamsRef` without re-renders

2. **`Scene.tsx`** reads from `paramsRef` on every animation frame:
   - `scrollProgress` (0→1) drives camera pull-back and globe rotation speed
   - `mouseX` / `mouseY` drive subtle camera tilt for desktop micro-interaction

3. **`useGSAPAnimation.ts`** binds two timelines:
   - **Load timeline**: staggered word mask reveal → subhead → CTA → scroll hint
   - **Scroll-driven**: writes `scrollProgress` to the scene ref, parallaxes text elements upward and fades them out as the user scrolls past the hero

4. **`hero.css`** contains all hero-specific visual styles, CTA glow-pulse animation, and responsive breakpoints. It uses CSS custom properties scoped to `.hero-section`.

## SSR Considerations (Next.js)

- **Three.js cannot run on the server.** `Scene.tsx` is loaded via `next/dynamic` with `{ ssr: false }`. This means the canvas only mounts after hydration. During SSR and initial HTML delivery, the hero renders headline + subhead + CTA over a solid black background — perfectly functional before JS loads.

- **GSAP elements start hidden** (e.g. `opacity: 0` in CSS) and are revealed by the load timeline. If JS fails, the text stays hidden — this is acceptable for a luxury brand hero. For more defensive handling, you could use `noscript` styles.

- **`Hero.tsx` is a `'use client'` component**, which is fine to import from `page.tsx` (a server component). Next.js handles the boundary correctly.

## 3D Scene — Design Decisions

| Element | Implementation | Why |
|---|---|---|
| Globe | `IcosahedronGeometry(1.5, 3)` + `EdgesGeometry` | Wireframe icosahedron gives a "network" feel with minimal poly count |
| Inner shell | Second icosahedron at r=1.42, detail=2 | Counter-rotates for depth parallax — sells the 3D illusion |
| Atmosphere | `SphereGeometry(1.62)` with `BackSide` + low opacity | Simulates atmospheric scattering around the globe edge |
| Connection arcs | `QuadraticBezierCurve3` between random vertex pairs | Curved outward past the globe surface for a "flight path" look |
| Data pulses | Small white spheres travelling along arc curves | Communicates "data in motion" — core brand message |
| Emblem | `OctahedronGeometry` + hexagonal `RingGeometry` | Central geometric mark that reads as a "phantom" sigil |
| Particles | 900 points in a spherical volume (r=5–19) | Depth cue + "star field" backdrop without impacting performance |
| Fog | `FogExp2(0x1a0000, 0.09)` | Red-tinted depth fog hides far geometry, adds atmosphere |

## Performance Optimizations

- **Pixel ratio capped at 2** — prevents 3x rendering on high-DPI mobile screens
- **All geometry is procedural** — zero network requests for 3D models
- **900 particles** (not thousands) — tested smooth on iPhone 12 and budget Androids
- **Single `requestAnimationFrame` loop** — no competing timers
- **`will-change: transform`** only on GSAP-animated elements to hint browser compositing
- **Full GPU cleanup on unmount** — every geometry, material, and the renderer are disposed
- **`powerPreference: "high-performance"`** — requests the discrete GPU on hybrid laptops
- **CSS `@media (prefers-reduced-motion: reduce)`** — disables CTA pulse and scroll hint animation

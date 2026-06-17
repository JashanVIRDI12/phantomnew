"use client";

import { useEffect, useRef } from "react";

/**
 * ParticleField — GPU-light Canvas2D "constellation" backdrop.
 *
 * Deliberately NOT WebGL/WebGPU: a 2D canvas with a capped particle count keeps
 * a steady 60fps on mobile and can never throw a lost-context / blank-canvas
 * error during a live presentation.
 *
 * Safety / edge cases handled:
 *  - prefers-reduced-motion → draws ONE static frame, never starts the rAF loop.
 *  - Offscreen (IntersectionObserver) and hidden tab (visibilitychange) → loop
 *    pauses, so it burns zero CPU when the hero is scrolled away.
 *  - Single rAF guard (`running`) prevents duplicate loops under React 19
 *    StrictMode double-mount.
 *  - devicePixelRatio capped at 2 to bound fill cost on retina/mobile.
 *  - ResizeObserver re-inits on container resize (rAF-debounced).
 *  - Full teardown on unmount: cancelAnimationFrame + disconnect observers +
 *    remove listeners (no leaks).
 *  - Pointer reactivity only on fine pointers (skipped on touch to avoid jank).
 */
export default function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Non-null captures so nested closures keep the narrowing.
    const cv: HTMLCanvasElement = canvas;
    const c2d: CanvasRenderingContext2D = ctx;

    const parent = cv.parentElement ?? cv;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    const LINK_DIST = 130; // px — constellation line threshold
    const POINTER_DIST = 175; // px — red cursor-link radius

    let width = 0;
    let height = 0;
    let particles: { x: number; y: number; vx: number; vy: number }[] = [];
    let rafId = 0;
    let running = false;
    const pointer = { x: -9999, y: -9999, active: false };

    function setup() {
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(width * dpr);
      cv.height = Math.round(height * dpr);
      cv.style.width = `${width}px`;
      cv.style.height = `${height}px`;
      c2d.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Count scales with area but is hard-capped so big desktops stay cheap.
      const target = Math.round((width * height) / 20000);
      const count = Math.max(16, Math.min(target, 80));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }));
    }

    function draw() {
      const c = c2d;
      c.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -5) p.x = width + 5;
        else if (p.x > width + 5) p.x = -5;
        if (p.y < -5) p.y = height + 5;
        else if (p.y > height + 5) p.y = -5;

        c.beginPath();
        c.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        c.fillStyle = "rgba(246,244,239,0.55)";
        c.fill();
      }

      // Constellation links (O(n²) but n ≤ 80 → trivial)
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (dx > LINK_DIST || dx < -LINK_DIST || dy > LINK_DIST || dy < -LINK_DIST) continue;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK_DIST * LINK_DIST) continue;
          const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.16;
          c.beginPath();
          c.moveTo(a.x, a.y);
          c.lineTo(b.x, b.y);
          c.strokeStyle = `rgba(246,244,239,${alpha})`;
          c.lineWidth = 1;
          c.stroke();
        }
      }

      // Red links to the cursor
      if (pointer.active) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          if (dx > POINTER_DIST || dx < -POINTER_DIST || dy > POINTER_DIST || dy < -POINTER_DIST) continue;
          const d2 = dx * dx + dy * dy;
          if (d2 > POINTER_DIST * POINTER_DIST) continue;
          const alpha = (1 - Math.sqrt(d2) / POINTER_DIST) * 0.5;
          c.beginPath();
          c.moveTo(p.x, p.y);
          c.lineTo(pointer.x, pointer.y);
          c.strokeStyle = `rgba(225,6,0,${alpha})`;
          c.lineWidth = 1;
          c.stroke();
        }
      }
    }

    function loop() {
      draw();
      rafId = requestAnimationFrame(loop);
    }
    function start() {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    }

    setup();

    // Reduced motion: one static frame, no loop, no listeners.
    if (reduce) {
      draw();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting);
        if (visible && document.visibilityState === "visible") start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(cv);

    const onVisibility = () => {
      if (document.visibilityState === "visible") start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    let resizeScheduled = false;
    const onResize = () => {
      if (resizeScheduled) return;
      resizeScheduled = true;
      requestAnimationFrame(() => {
        resizeScheduled = false;
        const wasRunning = running;
        stop();
        setup();
        if (wasRunning) start();
        else draw();
      });
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(parent);

    const onPointerMove = (e: PointerEvent) => {
      const rect = cv.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    if (fine) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerout", onPointerLeave, { passive: true });
    }

    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (fine) {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerout", onPointerLeave);
      }
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}

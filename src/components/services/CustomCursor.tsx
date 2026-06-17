"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * CustomCursor — trailing dot + lagging ring that reacts to `[data-cursor]` targets.
 *
 * Safety / edge cases handled:
 *  - Renders nothing unless `(hover: hover) and (pointer: fine)` AND motion is
 *    allowed — so touch devices and reduced-motion users get the native cursor
 *    and pay zero runtime cost (SSR-safe: server + first client render are both
 *    null, so no hydration mismatch).
 *  - Hides the native cursor via an html class that is always removed on cleanup.
 *  - Fades out on window blur / mouse leaving the document, fades in on re-entry.
 *  - All listeners + GSAP context fully torn down on unmount.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (fine && !reduce) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("cursor-none");

    const ctx = gsap.context(() => {
      gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

      const xDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
      const yDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
      const xRing = gsap.quickTo(ring, "x", { duration: 0.42, ease: "power3.out" });
      const yRing = gsap.quickTo(ring, "y", { duration: 0.42, ease: "power3.out" });

      let visible = false;
      let hovering = false;

      const show = () => {
        if (visible) return;
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.25, overwrite: "auto" });
      };
      const hide = () => {
        visible = false;
        gsap.to([dot, ring], { opacity: 0, duration: 0.2, overwrite: "auto" });
      };

      const onMove = (e: PointerEvent) => {
        xDot(e.clientX);
        yDot(e.clientY);
        xRing(e.clientX);
        yRing(e.clientY);
        show();
      };
      const onOver = (e: PointerEvent) => {
        const t = (e.target as Element | null)?.closest?.("[data-cursor]");
        if (t && !hovering) {
          hovering = true;
          gsap.to(ring, { scale: 1.9, borderColor: "rgba(225,6,0,0.9)", duration: 0.25 });
          gsap.to(dot, { scale: 0.4, duration: 0.25 });
        }
      };
      const onOut = (e: PointerEvent) => {
        const t = (e.target as Element | null)?.closest?.("[data-cursor]");
        if (t) {
          hovering = false;
          gsap.to(ring, { scale: 1, borderColor: "rgba(246,244,239,0.55)", duration: 0.25 });
          gsap.to(dot, { scale: 1, duration: 0.25 });
        }
      };
      const onDown = () => gsap.to(ring, { scale: hovering ? 1.5 : 0.7, duration: 0.16 });
      const onUp = () => gsap.to(ring, { scale: hovering ? 1.9 : 1, duration: 0.16 });

      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerover", onOver, { passive: true });
      document.addEventListener("pointerout", onOut, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
      window.addEventListener("pointerup", onUp, { passive: true });
      document.addEventListener("mouseleave", hide);
      window.addEventListener("blur", hide);

      return () => {
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerover", onOver);
        document.removeEventListener("pointerout", onOut);
        window.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointerup", onUp);
        document.removeEventListener("mouseleave", hide);
        window.removeEventListener("blur", hide);
      };
    });

    return () => {
      document.documentElement.classList.remove("cursor-none");
      ctx.revert();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-9 w-9 rounded-full border"
        style={{ borderColor: "rgba(246,244,239,0.55)", willChange: "transform" }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-red"
        style={{ willChange: "transform" }}
      />
    </>
  );
}

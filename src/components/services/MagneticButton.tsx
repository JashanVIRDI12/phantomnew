"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import Link from "next/link";

interface MagneticButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  /** Render as a plain <a> (for tel:/mailto:/external) instead of next/link. */
  external?: boolean;
  /** Magnetic pull factor (0 disables). */
  strength?: number;
}

/**
 * MagneticButton — framer-motion magnetic pull + spring bounce.
 *
 * The inner element is a real <Link>/<a> so keyboard focus and navigation work
 * normally; the motion wrappers only add visual flourish.
 *
 * Edge cases:
 *  - Magnetic translation is applied only for actual mouse input
 *    (`pointerType === "mouse"`) and is disabled entirely under
 *    prefers-reduced-motion, so touch + reduced-motion users get a plain button.
 */
export default function MagneticButton({
  href,
  children,
  className,
  ariaLabel,
  external = false,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || strength === 0 || e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <motion.span
      className="inline-flex"
      whileHover={reduceMotion ? undefined : { scale: 1.04 }}
      whileTap={reduceMotion ? undefined : { scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      {external ? (
        <a href={href} aria-label={ariaLabel} data-cursor="link" className={className}>
          {children}
        </a>
      ) : (
        <Link href={href} aria-label={ariaLabel} data-cursor="link" className={className}>
          {children}
        </Link>
      )}
    </motion.span>
  );

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      {inner}
    </motion.div>
  );
}

"use client";

import React from "react";
// `motion` and `framer-motion` are the same library; framer-motion ^12 is already
// installed and exposes the identical API, so we import from it (no duplicate package).
import { motion, type MotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

interface GradientTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  /** matches the surface the text sits on so the blend reads cleanly */
  surface?: string;
  /** "lighten" tints dark text on a light surface; "darken" tints light text on a dark surface */
  blend?: "lighten" | "darken";
}

function GradientText({
  className,
  children,
  as: Component = "span",
  surface = "bg-background",
  blend = "lighten",
  ...props
}: GradientTextProps) {
  // memoised so framer-motion doesn't re-create (and remount) the element each render
  const MotionComponent = React.useMemo(() => motion.create(Component), [Component]);

  return (
    <MotionComponent
      className={cn("relative inline-flex overflow-hidden", surface, className)}
      {...props}
    >
      {children}
      <span
        className={cn(
          "pointer-events-none absolute inset-0",
          blend === "darken" ? "mix-blend-darken" : "mix-blend-lighten",
        )}
      >
        <span className="pointer-events-none absolute -top-1/2 h-[30vw] w-[30vw] animate-[gradient-border_6s_ease-in-out_infinite,gradient-1_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-1))] mix-blend-overlay blur-[1rem]"></span>
        <span className="pointer-events-none absolute right-0 top-0 h-[30vw] w-[30vw] animate-[gradient-border_6s_ease-in-out_infinite,gradient-2_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-2))] mix-blend-overlay blur-[1rem]"></span>
        <span className="pointer-events-none absolute bottom-0 left-0 h-[30vw] w-[30vw] animate-[gradient-border_6s_ease-in-out_infinite,gradient-3_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-3))] mix-blend-overlay blur-[1rem]"></span>
        <span className="pointer-events-none absolute -bottom-1/2 right-0 h-[30vw] w-[30vw] animate-[gradient-border_6s_ease-in-out_infinite,gradient-4_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-4))] mix-blend-overlay blur-[1rem]"></span>
      </span>
    </MotionComponent>
  );
}

export { GradientText };

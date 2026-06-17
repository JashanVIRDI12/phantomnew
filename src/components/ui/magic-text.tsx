"use client";

import * as React from "react";
// `motion` and `framer-motion` are the same library (Framer rebranded it).
// framer-motion ^12 is already a project dependency and exposes the same APIs,
// so we import from it rather than shipping a duplicate `motion` package.
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

export interface MagicTextProps {
  text: string;
  /** className for the wrapping <p> — controls font, size, layout */
  className?: string;
  /** words (case/punctuation-insensitive) to render in the highlight style */
  highlightWords?: string[];
  /** className applied to highlighted words (e.g. a blue colour) */
  highlightClassName?: string;
}

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: number[];
  highlight?: boolean;
  highlightClassName?: string;
}

const normalize = (w: string) => w.toLowerCase().replace(/[.,—–-]/g, "");

const Word: React.FC<WordProps> = ({ children, progress, range, highlight, highlightClassName }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className={`relative mr-[0.25em] ${highlight ? highlightClassName ?? "" : ""}`}>
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};

export const MagicText: React.FC<MagicTextProps> = ({
  text,
  className,
  highlightWords = [],
  highlightClassName = "",
}) => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = text.split(" ");
  const highlight = new Set(highlightWords.map(normalize));

  return (
    <p ref={container} className={className ?? "flex flex-wrap leading-[0.5] p-4 text-3xl font-semibold"}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;

        return (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[start, end]}
            highlight={highlight.has(normalize(word))}
            highlightClassName={highlightClassName}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
};

export default MagicText;

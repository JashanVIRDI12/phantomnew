"use client";

import { useState } from "react";
// `motion` and `framer-motion` are the same library; framer-motion ^12 is already
// installed and exposes the identical API, so we import from it (no duplicate package).
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}

const containerVariants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.05 } },
};

const letterVariants: Variants = {
  initial: { y: 0, color: "var(--color-silver)" },
  animate: {
    y: "-150%",
    color: "var(--color-red)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export const Input = ({
  label,
  className = "",
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  type = "text",
  ...props
}: InputProps) => {
  const isControlled = value !== undefined;
  const [isFocused, setIsFocused] = useState(false);
  const [internal, setInternal] = useState(defaultValue !== undefined ? String(defaultValue) : "");

  const current = isControlled ? String(value) : internal;
  const showLabel = isFocused || current.length > 0;

  return (
    <div className={cn("relative", className)}>
      <motion.div
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2"
        variants={containerVariants}
        initial="initial"
        animate={showLabel ? "animate" : "initial"}
        aria-hidden="true"
      >
        {label.split("").map((char, index) => (
          <motion.span
            key={index}
            className="inline-block text-sm font-medium tracking-wide"
            variants={letterVariants}
            style={{ willChange: "transform" }}
          >
            {char === " " ? " " : char}
          </motion.span>
        ))}
      </motion.div>

      <input
        type={type}
        aria-label={label}
        {...props}
        {...(isControlled ? { value } : { defaultValue })}
        onFocus={(e) => { setIsFocused(true); onFocus?.(e); }}
        onBlur={(e) => { setIsFocused(false); onBlur?.(e); }}
        onChange={(e) => { if (!isControlled) setInternal(e.target.value); onChange?.(e); }}
        className="w-full border-0 border-b border-paper/30 bg-transparent py-2.5 text-base font-medium text-paper outline-none transition-colors duration-300 placeholder-transparent focus:border-red"
      />
    </div>
  );
};

export default Input;

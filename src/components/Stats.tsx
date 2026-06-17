"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const STATS = [
  { value: 2400, decimals: 0, suffix: "", label: "company trucks on the road" },
  { value: 48, decimals: 0, suffix: "", label: "contiguous states covered" },
  { value: 98.7, decimals: 1, suffix: "%", label: "on-time, door to door" },
  { value: 1.2, decimals: 1, suffix: "M", label: "sq ft bonded warehousing" },
];

function format(n: number, decimals: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export default function Stats() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-stat]",
          { opacity: 0, y: 44 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: scope.current, start: "top 78%" },
          }
        );

        gsap.utils.toArray<HTMLElement>("[data-stat-num]").forEach((el) => {
          const end = Number(el.dataset.statNum);
          const decimals = Number(el.dataset.statDecimals);
          const proxy = { n: 0 };
          gsap.to(proxy, {
            n: end,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: { trigger: scope.current, start: "top 78%" },
            onUpdate() {
              el.textContent = format(proxy.n, decimals);
            },
          });
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-stat]", { clearProps: "all", opacity: 1 });
      });
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      aria-label="Redline by the numbers"
      className="relative overflow-hidden bg-red py-[clamp(4rem,9vw,7rem)] text-paper"
    >
      <div className="relative mx-auto grid max-w-[1380px] gap-x-8 gap-y-12 px-5 sm:grid-cols-2 md:px-10 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} data-stat data-reveal className="flex flex-col gap-3">
            <p
              className="display leading-none"
              style={{ fontSize: "clamp(3.6rem, 8vw, 6rem)" }}
            >
              <span data-stat-num={s.value} data-stat-decimals={s.decimals}>
                {format(s.value, s.decimals)}
              </span>
              <span className="text-coal">{s.suffix}</span>
            </p>
            <p className="max-w-[20ch] border-t-2 border-coal/30 pt-3 font-mono text-[13px] uppercase tracking-[0.15em] text-paper/90">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

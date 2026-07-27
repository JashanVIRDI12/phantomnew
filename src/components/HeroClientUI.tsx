"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/* ─── Stat data ───────────────────────────────────────────────────────────── */
const STATS = [
  { value: 50, suffix: "+",  decimals: 0, label: "Active Fleet" },
  { value: 48,   suffix: "",   decimals: 0, label: "States Covered" },
  { value: 98.7, suffix: "%",  decimals: 1, label: "On-Time Rate" },
  { value: 24,   suffix: "/7", decimals: 0, label: "Live Dispatch" },
];

/* ─── Main Client Component ──────────────────────────────────────────────── */
export default function HeroClientUI() {
  const scopeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      /* ── Master timeline — cinematic initial load ─────────────────────── */
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      /* 1 ▸ Glass panel entrance
         Slides up from y:60, slight scale from 0.96 → 1.
         The panel feels like it's pressurising into position. */
      tl.fromTo(
        ".hero-glass-panel",
        { y: 60, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power4.out" },
        0.3
      );

      /* 2 ▸ Top-edge refraction highlight — wipes across the glass lip */
      tl.fromTo(
        ".hero-edge-highlight",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
        "-=0.6"
      );

      /* 3 ▸ Kicker text fade in */
      tl.fromTo(
        ".hero-kicker",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      );

      /* 4 ▸ Headline words — staggered slide up from masked overflow.
         Each word starts at y:110% inside its overflow:hidden mask. */
      tl.fromTo(
        ".hero-word",
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "power4.out",
        },
        "-=0.35"
      );

      /* 5 ▸ Red accent bar — scales in from center */
      tl.fromTo(
        ".hero-accent-bar",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: "power2.inOut" },
        "-=0.4"
      );

      /* 6 ▸ Description text */
      tl.fromTo(
        ".hero-desc",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.3"
      );

      /* 7 ▸ CTA buttons — staggered */
      tl.fromTo(
        ".hero-cta",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
        "-=0.3"
      );

      /* 8 ▸ Stat glass cards — slide in from below */
      tl.fromTo(
        ".hero-stat",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out" },
        "-=0.3"
      );

      /* 9 ▸ Number counter roll-up */
      const counters = gsap.utils.toArray<HTMLElement>(".hero-counter");
      counters.forEach((el) => {
        const target = parseFloat(el.dataset.target || "0");
        const dec = parseInt(el.dataset.decimals || "0", 10);
        const obj = { val: 0 };
        tl.to(
          obj,
          {
            val: target,
            duration: 1.4,
            ease: "power2.out",
            onUpdate() {
              el.textContent =
                dec > 0
                  ? obj.val.toFixed(dec)
                  : Math.ceil(obj.val).toLocaleString();
            },
          },
          "-=1.1"
        );
      });

      /* 10 ▸ Floating side badges (xl) — pop in with elastic */
      tl.fromTo(
        ".hero-badge",
        { opacity: 0, scale: 0.85, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.4)",
        },
        "-=0.8"
      );

      /* 11 ▸ Continuous subtle float on the badges (infinite) */
      gsap.utils.toArray<HTMLElement>(".hero-badge").forEach((badge, i) => {
        gsap.to(badge, {
          y: i % 2 === 0 ? -14 : 14,
          duration: 3.5 + i * 0.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: tl.duration(),
        });
      });
    },
    { scope: scopeRef }
  );

  /* ── Split headline into individually animated words ────────────────── */
  const line1Words = ["Phantom"];
  const line2Words = ["Logistics"];

  return (
    <div
      ref={scopeRef}
      className="relative z-20 flex min-h-[100svh] flex-col items-center justify-center px-5 py-[calc(var(--nav-h)+3rem)] md:px-10"
    >
      {/* ── Floating stat badges — xl desktop only ─────────────────────── */}
      <div
        className="hero-badge absolute right-[6%] top-[22%] hidden xl:block"
        style={{ opacity: 0 }}
      >
        <div className="glass-bright rounded-2xl p-5 pr-8">
          <p className="kicker mb-1">On-Time Delivery</p>
          <p className="display text-4xl text-paper">
            98.7<span className="text-red">%</span>
          </p>
        </div>
      </div>

      <div
        className="hero-badge absolute bottom-[26%] left-[5%] hidden xl:block"
        style={{ opacity: 0 }}
      >
        <div className="glass-bright rounded-2xl p-5 pr-8">
          <p className="kicker mb-1">Active Fleet</p>
          <p className="display text-4xl text-paper">
            50<span className="text-red">+</span>
          </p>
        </div>
      </div>

      {/* ── Main glassmorphism panel ─────────────────────────────────────── */}
      <div
        className="hero-glass-panel glass-hero relative w-full max-w-[820px] overflow-hidden rounded-3xl p-8 text-center md:p-14"
        style={{ opacity: 0 }}
      >
        {/* Top edge refraction highlight — simulates light hitting the glass lip */}
        <div
          aria-hidden="true"
          className="hero-edge-highlight pointer-events-none absolute inset-x-0 top-0 z-10 h-px origin-center bg-gradient-to-r from-transparent via-paper/30 to-transparent"
        />
        {/* Secondary softer inner glow below the top edge */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-4 top-0 z-10 h-[60px] bg-gradient-to-b from-paper/[0.04] to-transparent"
        />
        {/* Bottom inner shadow — grounds the panel */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-gradient-to-r from-transparent via-paper/5 to-transparent"
        />

        {/* ── Content (z-20 to sit above the noise ::after pseudo) ─────── */}
        <div className="relative z-20">
          {/* ── h1 — masked word-by-word reveal ─────────────────────────── */}
          <h1
            aria-label="Phantom Logistics"
            className="display leading-[0.87] text-paper"
            style={{ fontSize: "clamp(3.6rem, 12vw, 9.5rem)" }}
          >
            {/* Line 1 */}
            <span className="flex flex-wrap justify-center gap-x-[0.18em]">
              {line1Words.map((word) => (
                <span key={word} className="inline-block overflow-hidden pb-1">
                  <span className="hero-word inline-block will-change-transform">
                    {word}
                  </span>
                </span>
              ))}
            </span>
            {/* Line 2 — red accent */}
            <span className="flex flex-wrap justify-center gap-x-[0.18em]">
              {line2Words.map((word) => (
                <span key={word} className="inline-block overflow-hidden pb-1">
                  <span className="hero-word inline-block text-red will-change-transform">
                    {word}
                  </span>
                </span>
              ))}
            </span>
          </h1>

          {/* Red accent bar */}
          <div
            aria-hidden="true"
            className="hero-accent-bar mx-auto mt-4 h-[3px] w-24 origin-center bg-red"
            style={{ transform: "scaleX(0)" }}
          />

          {/* Description */}
          <p
            className="hero-desc mx-auto mt-6 max-w-[42ch] text-[15px] leading-relaxed text-paper/70 md:text-base"
            style={{ opacity: 0 }}
          >
            50+ company trucks, 48 states, 24/7 dispatch — one carrier,
            one invoice, your freight moving coast to coast while you sleep.
          </p>

          {/* CTA row */}
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
            <a
              href="#contact"
              className="hero-cta btn btn-red px-10 py-4"
              style={{ opacity: 0 }}
            >
              <span>Book a load</span>
            </a>
            <a
              href="#services"
              className="hero-cta btn btn-ghost px-10 py-4"
              style={{ opacity: 0 }}
            >
              <span>See services</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Stat pills — visible on all screens below the glass panel ──── */}
      <dl
        className="mt-5 grid w-full max-w-[820px] grid-cols-2 gap-3 sm:grid-cols-4"
        aria-label="Phantom Logistics at a glance"
      >
        {STATS.map((s) => (
          <div
            key={s.label}
            className="hero-stat glass rounded-xl p-4 text-center"
            style={{ opacity: 0 }}
          >
            {/* z-20 ensures text sits above the glass ::after noise texture */}
            <dd className="relative z-20 display text-2xl text-paper">
              <span
                className="hero-counter text-red"
                data-target={s.value}
                data-decimals={s.decimals}
              >
                0
              </span>
              <span className="text-paper">{s.suffix}</span>
            </dd>
            <dt className="relative z-20 kicker mt-0.5 text-[10px]">{s.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  );
}

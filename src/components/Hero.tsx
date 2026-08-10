"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { GradientText } from "@/components/ui/gradient-text";
import "@/styles/hero.css";


/* ══════════════════════════════════════════════════════════
   IMAGERY
══════════════════════════════════════════════════════════ */
type Card = { src: string; tag: string; h: "t" | "m" | "s" };

const COL_A: Card[] = [
  { src: "/services/photos/dry-van-highway.webp",      tag: "Dry Van",       h: "t" },
  { src: "/services/photos/long-haul-trucking.webp",    tag: "Long Haul",     h: "s" },
  { src: "/services/photos/hotshot-trucking.webp",      tag: "Hotshot",       h: "m" },
];
const COL_B: Card[] = [
  { src: "/yard.webp",                      tag: "Dedicated Fleet", h: "m" },
  { src: "/hero-bg.webp",                   tag: "Linehaul",        h: "t" },
  { src: "/services/photos/freight-shipping.webp", tag: "Freight",         h: "m" },
];
const COL_C: Card[] = [
  { src: "/services/photos/expedited-trucking.webp",    tag: "Expedited",   h: "s" },
  { src: "/services/photos/ltl-trucking.webp",          tag: "LTL",         h: "m" },
  { src: "/services/photos/freight-forwarding.webp",   tag: "Forwarding",  h: "t" },
  { src: "/services/photos/freight-transportation.webp",tag: "Transport",   h: "m" },
];

const AVATARS = [
  "/dock.webp",
  "/yard.webp",
  "/aerial.webp",
];

function Column({ cards, dir, slow }: { cards: Card[]; dir: "up" | "down"; slow?: boolean }) {
  const loop = [...cards, ...cards]; // duplicate for seamless scroll
  return (
    <div className={`h-col h-col--${dir}${slow ? " h-col--slow" : ""}`}>
      {loop.map((c, i) => (
        <figure key={i} className={`h-card h-card--tag ${c.h}`} data-tag={c.tag} data-cursor="VIEW">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.src} alt={c.tag} loading={i < 2 ? "eager" : "lazy"} />
        </figure>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════ */
export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const hero = heroRef.current; if (!hero) return;
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(".h-kicker", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .6 }, .1);
    tl.fromTo(".h-title-in", { yPercent: 118 }, { yPercent: 0, duration: 1, stagger: .08 }, .25);
    tl.fromTo(".h-col", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.1, stagger: .12, ease: "power3.out" }, .3);
    tl.fromTo(".h-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .8 }, "-=.75");
    tl.fromTo(".h-btn", { opacity: 0, y: 14, scale: .96 }, { opacity: 1, y: 0, scale: 1, stagger: .1, duration: .6, ease: "back.out(1.5)" }, "-=.6");
    tl.fromTo(".h-social", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .6 }, "-=.4");

    /* subtle scroll parallax on copy */
    gsap.to(".h-copy", { y: -50, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1 } });
  }, { scope: heroRef });

  return (
    <section ref={heroRef} id="top" className="h-section" aria-label="Phantom Logistics — freight that moves like it was never there">
        <div className="h-grid">

          {/* LEFT — copy */}
          <div className="h-copy">
            <h1 className="h-title">
              <span className="h-title-line"><span className="h-title-in">Freight that</span></span>
              <span className="h-title-line"><span className="h-title-in">moves like it was</span></span>
              <span className="h-title-line"><span className="h-title-in"><GradientText className="h-grad">never there.</GradientText></span></span>
            </h1>

            <p className="h-sub">
              50+ company trucks across all 48 states. Real-time tracking, same-day
              dispatch, one invoice — every mile owned end to end, no brokers in between.
            </p>

            <div className="h-cta-row">
              <Link href="/contact" className="h-btn h-btn--primary" data-cursor="QUOTE">
                Get a Quote
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/services" className="h-btn h-btn--ghost" data-cursor="VIEW">
                Our Services
              </Link>
            </div>

            <div className="h-social">
              <div className="h-avatars">
                {AVATARS.map((src, i) => (
                  <span key={i} className="h-avatar">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" aria-hidden="true" />
                  </span>
                ))}
              </div>
              <p className="h-social-text">
                Trusted by <b>3,000+ shippers</b> · <b>98.7%</b> on-time, door to door
              </p>
            </div>
          </div>

          {/* RIGHT — auto-scrolling gallery */}
          <div className="h-gallery" aria-hidden="true">
            <Column cards={COL_A} dir="up" />
            <Column cards={COL_B} dir="down" />
            <Column cards={COL_C} dir="up" slow />
          </div>
        </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import PageShell from "@/components/PageShell";
import ParticleField from "@/components/services/ParticleField";
import { TestimonialReel } from "@/components/ui/testimonial-reel";
import { SERVICES } from "@/data/services";

/* Portrait photos for the testimonial reel (Unsplash) */
const PORTRAITS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop",
];

/* ═══════════════════════════════════════════════════════════════════════════
   SERVICES — full rebuild
   GPU-light "wow": Canvas2D constellation hero, custom magnetic cursor,
   3D-tilt bento, scroll-scrubbed timeline, animated counters, theatrical CTA.
   No WebGL/WebGPU, no new dependencies — 60fps-safe for a live stage.
   ═══════════════════════════════════════════════════════════════════════════ */

const IMGS = {
  dock: "/hf_20260606_104556_7052f106-a0e2-4aae-a9ad-cc8f8a74266e(1).png",
  yard: "/hf_20260606_104624_2d9fc850-b40b-4e43-a8de-2f9cceecdead(1).png",
  loading: "/hf_20260606_104656_597a0532-bf54-40c9-adad-28423d0fadaa(1).png",
  sunset: "/hf_20260606_104819_db26e803-e1e6-450e-a7e3-24b2f16e33cb(1).png",
  aerial: "/hf_20260606_104850_008b5602-bfa5-40a9-a9c8-3020d070d0f2(1).png",
  fleet: "/hf_20260606_105246_4f3378c4-ef89-4fbe-8dda-c5ffff69c467(1).png",
};

const SVG = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ICONS: Record<string, ReactNode> = {
  truck: (
    <svg viewBox="0 0 24 24" width="30" height="30" {...SVG} aria-hidden="true">
      <path d="M1.5 5h12v9h-12z" />
      <path d="M13.5 8h4l3 3v3h-7z" />
      <circle cx="6" cy="17.5" r="2" />
      <circle cx="17" cy="17.5" r="2" />
    </svg>
  ),
  boxes: (
    <svg viewBox="0 0 24 24" width="30" height="30" {...SVG} aria-hidden="true">
      <path d="M3 3.5h7v7H3z" />
      <path d="M14 3.5h7v7h-7z" />
      <path d="M8.5 13h7v7h-7z" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" width="30" height="30" {...SVG} aria-hidden="true">
      <path d="M12 2l8 3v6c0 5-3.5 8.6-8 11-4.5-2.4-8-6-8-11V5z" />
      <path d="M8.5 11.5l2.4 2.4 4.6-5" />
    </svg>
  ),
  warehouse: (
    <svg viewBox="0 0 24 24" width="30" height="30" {...SVG} aria-hidden="true">
      <path d="M2 9l10-5 10 5v11H2z" />
      <path d="M7 20v-6h10v6" />
      <path d="M7 14h10" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" width="30" height="30" {...SVG} aria-hidden="true">
      <path d="M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
  signal: (
    <svg viewBox="0 0 24 24" width="30" height="30" {...SVG} aria-hidden="true">
      <circle cx="12" cy="12" r="1.6" />
      <path d="M8.6 8.6a5 5 0 0 0 0 6.8" />
      <path d="M15.4 8.6a5 5 0 0 1 0 6.8" />
      <path d="M6 6a9 9 0 0 0 0 12" />
      <path d="M18 6a9 9 0 0 1 0 12" />
    </svg>
  ),
};

type Service = {
  icon: keyof typeof ICONS;
  tag: string;
  title: string;
  copy: string;
  featured?: boolean;
  img?: string;
  slug?: string;
};

const STEPS = [
  {
    n: "01",
    title: "Quote",
    copy: "Send us your lane and freight type. A firm rate comes back fast — even at 3 a.m.",
    stat: 15,
    decimals: 0,
    suffix: " min",
    statLabel: "to a firm rate",
  },
  {
    n: "02",
    title: "Dispatch",
    copy: "We assign company iron and a driver. Same-day pickup, every load owned end to end.",
    stat: 100,
    decimals: 0,
    suffix: "%",
    statLabel: "company-owned freight",
  },
  {
    n: "03",
    title: "Deliver",
    copy: "Live GPS the whole way, photo POD on arrival. One carrier, one invoice, dock to dock.",
    stat: 98.7,
    decimals: 1,
    suffix: "%",
    statLabel: "on-time, door to door",
  },
];

const METRICS = [
  { value: 2400, decimals: 0, suffix: "", label: "company-owned trucks" },
  { value: 24, decimals: 0, suffix: "/7", label: "live dispatch & yard monitoring" },
  { value: 98.7, decimals: 1, suffix: "%", label: "on-time, door to door" },
  { value: 15, decimals: 0, suffix: " min", label: "average quote turnaround" },
];

const TESTIMONIALS = [
  {
    quote:
      "They own the truck, the driver and the outcome. We stopped chasing carriers the day we signed.",
    who: "Operations Director",
    org: "Regional grocery distributor",
  },
  {
    quote:
      "Fifteen-minute quotes are real. Same-day dispatch is real. Three years, not one missed window that mattered.",
    who: "Director of Logistics",
    org: "Industrial parts manufacturer",
  },
  {
    quote:
      "The dedicated fleet wears our brand and runs our schedule. Customers think the trucks are ours.",
    who: "VP Supply Chain",
    org: "E-commerce fulfillment group",
  },
];

const WORDMARKS = [
  "MERIDIAN FOODS",
  "ATLAS SUPPLY",
  "NORTHWIND RETAIL",
  "CASCADE MFG",
  "IRONLINE PARTS",
  "VANGUARD COLD",
];

function format(n: number, decimals: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function LearnMore({ tone = "muted" }: { tone?: "muted" | "bright" }) {
  return (
    <span
      className={`mt-7 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 group-hover:text-red ${
        tone === "bright" ? "text-paper" : "text-silver"
      }`}
    >
      Learn more
      <svg
        width="15"
        height="15"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        <path d="M2 8h11M9 4l4 4-4 4" />
      </svg>
    </span>
  );
}

export default function ServicesPage() {
  const root = useRef<HTMLDivElement>(null);
  const tiltOK = useRef(true);
  const prefersReduced = useReducedMotion();

  /* Gate the pointer-driven 3D tilt: mouse + motion-allowed only. */
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    tiltOK.current = fine && !reduce;
  }, []);

  const onTiltMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!tiltOK.current || e.pointerType !== "mouse") return;
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * 14; // max ±7deg
    const ry = (px - 0.5) * 14;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const onTiltLeave = (e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      const splits: InstanceType<typeof SplitText>[] = [];

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* ── HERO master intro timeline ── */
        const headline = el.querySelector<HTMLElement>("[data-hero-headline]");
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        if (headline) {
          const split = new SplitText(headline, { type: "chars" });
          splits.push(split);
          gsap.set(headline, { opacity: 1 });
          tl.from(split.chars, {
            yPercent: 120,
            opacity: 0,
            duration: 1,
            stagger: { each: 0.025 },
          });
        }
        tl.from(
          "[data-hero-rise]",
          { y: 26, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" },
          "-=0.6"
        );

        /* Hero parallax — content drifts up + fades, particles drift slower */
        gsap.to("[data-hero-content]", {
          yPercent: -18,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-particles]", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true },
        });

        /* ── SERVICES SECTION entrance ── */
        gsap.fromTo("[data-services-heading]",
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: "[data-services-heading]", start: "top 95%", once: true },
          }
        );

        gsap.fromTo("[data-bento-card]",
          { y: 48, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: "[data-bento]", start: "top 95%", once: true },
          }
        );

        /* ── PROCESS: scrubbed progress rail + step reveal ── */
        gsap.fromTo(
          "[data-process-fill]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-process-track]", start: "top 60%", end: "bottom 70%", scrub: true },
          }
        );
        gsap.fromTo("[data-process-step]",
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.8,
            stagger: 0.18,
            ease: "power3.out",
            scrollTrigger: { trigger: "[data-process-track]", start: "top 85%", once: true },
          }
        );

        /* ── METRICS band reveal ── */
        gsap.fromTo("[data-metric]",
          { y: 36, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: "[data-metrics]", start: "top 90%", once: true },
          }
        );

        /* ── CTA parallax + rise ── */
        gsap.fromTo(
          "[data-cta-bg]",
          { scale: 1.18 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-cta]", start: "top bottom", end: "bottom top", scrub: true },
          }
        );
        gsap.from("[data-cta-rise]", {
          y: 44,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-cta]", start: "top 72%" },
        });

        /* ── Animated counters (process stats + trust metrics) ── */
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((node) => {
          const end = Number(node.dataset.count);
          const decimals = Number(node.dataset.countDec ?? 0);
          const proxy = { n: 0 };
          gsap.to(proxy, {
            n: end,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: { trigger: node, start: "top 88%" },
            onUpdate() {
              node.textContent = format(proxy.n, decimals);
            },
          });
        });

        /* Refresh after setup so positions are correct on first load */
        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => splits.forEach((s) => s.revert());
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        const h = el.querySelector<HTMLElement>("[data-hero-headline]");
        if (h) gsap.set(h, { opacity: 1 });
        gsap.set(
          "[data-hero-rise],[data-bento-card],[data-process-step],[data-metric],[data-cta-rise]",
          { clearProps: "all", opacity: 1 }
        );
        gsap.set("[data-process-fill]", { scaleY: 1 });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <PageShell>
      <div ref={root} className="bg-coal">

        {/* ─── HERO ──────────────────────────────────────────────────────── */}
        <section
          data-hero
          aria-labelledby="services-hero-heading"
          className="relative flex min-h-[100svh] -mt-[68px] md:-mt-[76px] items-center overflow-hidden bg-coal"
        >
          {/* Cinematic background image */}
          <div className="absolute inset-0 select-none pointer-events-none z-0" aria-hidden="true">
            <img
              src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=1600"
              alt=""
              className="object-cover w-full h-full opacity-40"
            />
            {/* dark vignettes */}
            <div className="absolute inset-0 bg-linear-to-t from-coal via-coal/80 to-coal/40" />
            <div className="absolute inset-0 bg-linear-to-r from-coal/85 via-transparent to-coal/40" />
          </div>

          {/* Canvas constellation backdrop overlay */}
          <div data-hero-particles className="absolute inset-0 z-0 opacity-40" aria-hidden="true">
            <ParticleField className="absolute inset-0 h-full w-full" />
          </div>

          {/* Red/dark ambient blobs */}
          <div
            className="pointer-events-none absolute -left-40 top-1/3 z-0 h-[460px] w-[460px] rounded-full bg-red/10 blur-[140px] blob-drift-a"
            aria-hidden="true"
          />

          {/* floating accent chips (framer-motion physics; float disabled under reduced-motion).
              Always rendered so SSR markup matches the client → no hydration mismatch. */}
          <motion.span
            aria-hidden="true"
            className="absolute right-[8%] top-[22%] z-0 hidden font-mono text-[11px] uppercase tracking-[0.3em] text-silver/40 md:block"
            animate={prefersReduced ? undefined : { y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            48 states
          </motion.span>
          <motion.span
            aria-hidden="true"
            className="absolute right-[16%] bottom-[20%] z-0 hidden font-mono text-[11px] uppercase tracking-[0.3em] text-red/50 lg:block"
            animate={prefersReduced ? undefined : { y: [0, 16, 0] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
          >
            98.7% on-time
          </motion.span>

          <div data-hero-content className="relative z-10 mx-auto w-full max-w-[1380px] px-5 pt-[calc(68px+clamp(3rem,6vh,5rem))] pb-[clamp(5rem,12vh,8rem)] md:pt-[calc(76px+clamp(3rem,6vh,5rem))] md:px-10">
            <p data-hero-rise className="kicker mb-5 flex flex-wrap items-center gap-3">
              <span>What we run</span>
              <span className="h-px w-8 shrink-0 bg-red" aria-hidden="true" />
              <span className="text-red">Defence Canada · Transport Canada approved</span>
            </p>

            <h1
              id="services-hero-heading"
              data-hero-headline
              className="display leading-[0.82] text-paper"
              style={{ fontSize: "clamp(2.6rem, 9.5vw, 8rem)", opacity: 0 }}
            >
              Move anything,
              <br />
              <span className="text-red">anywhere.</span>
            </h1>

            <p
              data-hero-rise
              className="mt-6 max-w-[52ch] text-[clamp(.93rem,1.4vw,1.2rem)] leading-relaxed text-silver"
            >
              Every service on one carrier, one invoice — across all US states and Canada.
              Company iron, experienced drivers, live monitoring. No brokers.
              No handoffs. No excuses.
            </p>

            <div data-hero-rise className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/contact" className="btn btn-red px-8 py-4 sm:px-10">
                <span>Get a quote</span>
              </Link>
              <a
                href="tel:+18007428666"
                className="nav-link inline-flex items-center gap-3 py-3 text-[13px] uppercase tracking-[0.2em] text-paper hover:text-red"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-red" aria-hidden="true" />
                Talk to dispatch · 1-800-PHANTOM
              </a>
            </div>

            <ul
              data-hero-rise
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-(--glass-border) pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-silver/70 sm:gap-x-8 sm:tracking-[0.22em]"
            >
              <li><span className="text-paper">2,400</span> trucks</li>
              <li aria-hidden="true" className="text-steel">/</li>
              <li><span className="text-paper">North America</span> wide</li>
              <li aria-hidden="true" className="text-steel">/</li>
              <li><span className="text-paper">98.7%</span> on-time</li>
            </ul>

            <ul
              data-hero-rise
              className="mt-5 flex flex-wrap gap-2.5"
              aria-label="Certifications"
            >
              {["Defence Canada Approved", "Transport Canada Certified", "Secured Cargo Program", "Fully Insured"].map((b) => (
                <li
                  key={b}
                  className="rounded-full border border-paper/15 bg-paper/8 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-silver/70 backdrop-blur-sm"
                >
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* scroll cue */}
          <div
            data-hero-rise
            className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
            aria-hidden="true"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-silver/50">Scroll</span>
            <span className="h-10 w-px bg-linear-to-b from-red to-transparent" />
          </div>
        </section>

        {/* ─── SERVICES OVERLAPPING SECTION ────────────────────────────── */}
        <section
          aria-labelledby="services-grid-heading"
          className="relative bg-paper py-[clamp(5rem,11vw,9rem)] text-coal scroll-mt-24"
        >
          <div className="mx-auto max-w-[1380px] px-5 md:px-10">
            {/* Centered Heading */}
            <div className="mb-12 text-center" data-services-heading>
              <p className="kicker text-steel">Our Portfolio</p>
              <h2
                id="services-grid-heading"
                className="display mt-3 leading-none text-coal font-bold"
                style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
              >
                Our <span className="text-red">Services</span>
              </h2>
            </div>

            {/* Cards Grid */}
            <div
              data-bento
              className="relative z-10 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 mt-12 md:mt-16 px-4 md:px-8"
            >
              {SERVICES.map((s) => {
                const serviceSlug = s.slug || s.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
                return (
                  <div
                    key={s.title}
                    data-bento-card
                    className="group bg-white rounded-[20px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-500 ease-out border border-steel/10 flex flex-col h-full relative"
                  >
                    {/* Card Image at Top */}
                    <div className="relative h-48 w-full overflow-hidden bg-coal select-none">
                      {s.img && (
                        <img
                          src={s.img}
                          alt={s.title}
                          className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-linear-to-t from-coal/40 via-transparent to-transparent" />
                    </div>

                    {/* Centered Overlapping Icon Badge */}
                    <div className="absolute top-[164px] left-1/2 -translate-x-1/2 flex items-center justify-center w-14 h-14 bg-coal text-white rounded-xl shadow-md border-4 border-white transition-all duration-300 group-hover:bg-red group-hover:scale-110 z-10">
                      <span className="transition-transform duration-300 group-hover:scale-110">
                        {ICONS[s.icon as keyof typeof ICONS]}
                      </span>
                    </div>

                    {/* Content Area */}
                    <div className="pt-12 pb-8 px-6 text-center flex-1 flex flex-col justify-between">
                      <div>
                        {/* Kicker tags (split into neat inline badges to prevent messy word-wrapping) */}
                        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 mb-4 max-w-[95%] mx-auto">
                          {s.tag.split("·").map((tag, idx) => (
                            <span
                              key={idx}
                              className="inline-block px-2 py-0.5 bg-coal/[0.04] text-steel border border-coal/5 font-mono text-[8px] tracking-[0.12em] uppercase rounded-sm"
                            >
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                        {/* Service Title */}
                        <h3 className="display text-xl tracking-[0.03em] leading-tight text-coal font-bold">
                          {s.title}
                        </h3>
                        {/* Description */}
                        <p className="mt-4 text-[13.5px] leading-relaxed text-steel/90 max-w-[28ch] mx-auto">
                          {s.copy}
                        </p>
                      </div>

                      {/* MORE button with underline — now links to dedicated Awwwards-style service page */}
                      <div className="mt-8">
                        <Link
                          href={`/services/${serviceSlug}`}
                          className="inline-block font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-coal transition-all duration-300 hover:text-red relative py-1"
                        >
                          EXPLORE THIS SERVICE
                          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-6 bg-coal transition-all duration-300 group-hover:w-12 group-hover:bg-red" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── PROCESS — scroll story ────────────────────────────────────── */}
        <section
          aria-labelledby="process-heading"
          className="relative overflow-hidden bg-ink py-[clamp(5rem,11vw,9rem)]"
        >
          <div className="mx-auto max-w-[1380px] px-5 md:px-10">
            <div className="mb-[clamp(3rem,6vw,5rem)] max-w-[40ch]">
              <p className="kicker text-silver">How it works</p>
              <h2
                id="process-heading"
                className="display mt-3 leading-[0.9] text-paper"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)" }}
              >
                Three steps, <span className="text-red">dock to dock</span>
              </h2>
            </div>

            <div data-process-track className="relative">
              {/* vertical rail (mobile) + the GSAP-scrubbed fill */}
              <div className="absolute left-[27px] top-6 bottom-6 w-px bg-(--glass-border) md:hidden" aria-hidden="true" />
              <div
                data-process-fill
                className="absolute left-[27px] top-6 bottom-6 w-px origin-top bg-red md:hidden"
                aria-hidden="true"
              />
              {/* horizontal rail (desktop) */}
              <div className="absolute left-[16.667%] right-[16.667%] top-7 hidden h-px bg-(--glass-border) md:block" aria-hidden="true" />
              <div
                data-process-fill
                className="absolute left-[16.667%] top-7 hidden h-px w-[66.666%] origin-left bg-red md:block"
                aria-hidden="true"
              />

              <ol className="grid gap-12 md:grid-cols-3 md:gap-8">
                {STEPS.map((step) => (
                  <li
                    key={step.n}
                    data-process-step
                    className="relative flex items-start gap-5 md:flex-col md:items-center md:gap-6 md:text-center"
                  >
                    <span
                      className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-red bg-ink"
                      aria-hidden="true"
                    >
                      <span className="display text-xl text-red">{step.n}</span>
                    </span>
                    <div className="md:max-w-[34ch]">
                      <h3 className="display text-2xl leading-none text-paper md:text-3xl">{step.title}</h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-silver">{step.copy}</p>
                      <p className="mt-5 flex items-baseline gap-2 md:justify-center">
                        <span className="display text-3xl leading-none text-paper md:text-4xl">
                          <span data-count={step.stat} data-count-dec={step.decimals}>
                            {format(0, step.decimals)}
                          </span>
                          <span className="text-red">{step.suffix}</span>
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-silver/60">
                          {step.statLabel}
                        </span>
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ─── TRUST — metrics band ──────────────────────────────────────── */}
        <section
          aria-label="Phantom Logistics by the numbers"
          data-metrics
          className="relative overflow-hidden bg-red py-[clamp(4rem,9vw,7rem)] text-paper"
        >
          <span
            className="display pointer-events-none absolute -right-8 -top-16 select-none text-[28rem] leading-none text-coal/10"
            aria-hidden="true"
          >
            48
          </span>
          <div className="relative mx-auto grid max-w-[1380px] gap-x-8 gap-y-12 px-5 sm:grid-cols-2 md:px-10 lg:grid-cols-4">
            {METRICS.map((m) => (
              <div key={m.label} data-metric className="flex flex-col gap-3">
                <p className="display leading-none" style={{ fontSize: "clamp(3.2rem, 7vw, 5.5rem)" }}>
                  <span data-count={m.value} data-count-dec={m.decimals}>
                    {format(0, m.decimals)}
                  </span>
                  <span className="text-coal">{m.suffix}</span>
                </p>
                <p className="max-w-[20ch] border-t-2 border-coal/30 pt-3 font-mono text-[11px] uppercase tracking-[0.24em] text-paper/90">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── TRUST — testimonials + wordmark marquee ───────────────────── */}
        <section aria-labelledby="proof-heading" data-trust className="relative overflow-hidden bg-paper text-coal py-[clamp(5rem,11vw,9rem)] border-t border-coal/10">
          {/* Subtle background graphics */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-40" aria-hidden="true">
            <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-red/5 blur-[120px] blob-drift-b" />
          </div>

          <div className="mx-auto max-w-[1380px] px-5 md:px-10 relative z-10">
            {/* Asymmetric Header */}
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-[50ch]">
                <p className="kicker flex items-center gap-2 text-steel">
                  <span className="h-1.5 w-1.5 rounded-full bg-red animate-pulse" aria-hidden="true" />
                  On the record
                </p>
                <h2
                  id="proof-heading"
                  className="display mt-4 leading-none text-coal font-bold"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
                >
                  Trusted where <span className="text-red">missing isn&apos;t an option</span>
                </h2>
              </div>
              <p className="max-w-[32ch] font-mono text-[11px] uppercase tracking-[0.2em] text-steel leading-relaxed">
                Phantom Logistics moves freight for high-velocity supply chains with zero room for error.
              </p>
            </div>

            {/* Testimonials — counter-rotating scroll reel (auto-advances every 5s) */}
            <div className="flex justify-center">
              <TestimonialReel
                autoPlayMs={5000}
                className="!bg-paper"
                testimonials={TESTIMONIALS.map((t, i) => ({
                  quote: t.quote,
                  author: `${t.who} · ${t.org}`,
                  image: PORTRAITS[i % PORTRAITS.length],
                  alt: t.who,
                }))}
              />
            </div>
          </div>

          {/* infinite wordmark marquee (reuses .ticker-track; paused under reduced-motion) */}
          <div className="mt-[clamp(3rem,6vw,4.5rem)]">
            <p className="kicker mb-7 text-center text-steel/70">Freight trusted by operators nationwide</p>
            <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
              <ul className="ticker-track items-center gap-x-14" aria-hidden="true">
                {[...WORDMARKS, ...WORDMARKS].map((w, i) => (
                  <li
                    key={w + i}
                    className="display shrink-0 select-none whitespace-nowrap text-[clamp(1.1rem,2vw,1.5rem)] tracking-[0.12em] text-coal/20"
                  >
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── CTA — grand finale ────────────────────────────────────────── */}
        <section
          data-cta
          aria-labelledby="cta-heading"
          className="relative flex min-h-[80vh] items-center justify-center overflow-hidden"
        >
          <div data-cta-bg className="absolute inset-0 will-change-transform">
            <Image
              src={IMGS.fleet}
              alt="Phantom Logistics truck yard with units lined up"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-coal/82" />
            <div className="absolute inset-0 bg-linear-to-t from-coal via-coal/55 to-coal/75" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-7 px-5 text-center md:px-10">
            <p data-cta-rise className="kicker">
              LET’S GET MOVING
            </p>
            <h2
              id="cta-heading"
              data-cta-rise
              className="display leading-[0.86] text-paper font-bold"
              style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}
            >
              READY TO MOVE YOUR FREIGHT?
            </h2>
            <p data-cta-rise className="max-w-[50ch] text-[15px] leading-relaxed text-silver md:text-base">
              Tell us your requirements and we will handle the rest. From planning to delivery, your shipment stays on track.
            </p>
            <div data-cta-rise className="mt-2 flex flex-col items-center gap-5 sm:flex-row">
              <Link href="/contact" className="btn btn-red px-12 py-5">
                <span>GET FREIGHT QUOTE</span>
              </Link>
              <a
                href="tel:+18007428666"
                className="nav-link inline-flex items-center gap-3 py-3 text-[13px] uppercase tracking-[0.2em] text-paper hover:text-red"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-red" aria-hidden="true" />
                Or call dispatch · 1-800-PHANTOM
              </a>
            </div>
          </div>
        </section>

      </div>
    </PageShell>
  );
}

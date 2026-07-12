"use client";

import React from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import PageShell from "@/components/PageShell";
import ParticleField from "@/components/services/ParticleField";
import type { Service } from "@/data/services";

export default function ServiceDetailClient({ service }: { service: Service }) {
  const root = React.useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // GSAP MASTER TIMELINE — Awwwards-level intro + scroll orchestration
  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReduced) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // HERO SPLIT + RISE
        const headline = el.querySelector<HTMLElement>("[data-service-headline]");
        if (headline) {
          const split = new SplitText(headline, { type: "chars,words" });
          gsap.set(headline, { opacity: 1 });
          gsap.from(split.chars, {
            yPercent: 110,
            opacity: 0,
            duration: 0.9,
            stagger: { each: 0.018, from: "random" },
            ease: "power4.out",
            delay: 0.1,
          });
        }

        gsap.from("[data-hero-rise]", {
          y: 32,
          opacity: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.35,
        });

        // Parallax on hero image
        gsap.to("[data-hero-bg]", {
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-service-hero]",
            start: "top top",
            end: "bottom top",
            scrub: 1.4,
          },
        });

        // Benefits stagger
        gsap.fromTo(
          "[data-benefit]",
          { y: 46, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.07,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "[data-benefits]",
              start: "top 82%",
            },
          }
        );

        // Metrics counters (enhanced)
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((node) => {
          const end = Number(node.dataset.count);
          const decimals = Number(node.dataset.countDec ?? 0);
          const proxy = { n: 0 };
          gsap.to(proxy, {
            n: end,
            duration: 1.9,
            ease: "power2.out",
            scrollTrigger: { trigger: node, start: "top 86%" },
            onUpdate() {
              node.textContent = format(proxy.n, decimals);
            },
          });
        });

        // Process rail scrub
        const processTrack = el.querySelector("[data-process-track]");
        if (processTrack) {
          gsap.fromTo(
            "[data-process-fill]",
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: processTrack,
                start: "top 55%",
                end: "bottom 65%",
                scrub: 1.1,
              },
            }
          );
        }

        // Final CTA parallax
        gsap.to("[data-cta-bg]", {
          scale: 1.09,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-cta]",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        ScrollTrigger.refresh();
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  function format(n: number, decimals: number) {
    return n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }

  return (
    <PageShell>
      <div ref={root} className="bg-coal text-paper overflow-hidden">
        {/* ================ HERO — CINEMATIC ================ */}
        <section
          data-service-hero
          className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <img
              data-hero-bg
              src={service.img}
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover opacity-65 scale-[1.06]"
            />
            <div className="absolute inset-0 bg-linear-to-b from-coal/90 via-coal/85 to-coal" />
            <div className="absolute inset-0 bg-[radial-gradient(#e10600_0.6px,transparent_1px)] bg-[length:5px_5px] opacity-[0.035]" />
          </div>

          {/* Floating particles for premium feel */}
          <div className="absolute inset-0 z-10 opacity-40" aria-hidden="true">
            <ParticleField className="h-full w-full" />
          </div>

          <div className="relative z-20 mx-auto max-w-[1180px] px-6 text-center">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-5 py-1 text-[10px] tracking-[0.32em] text-silver/80 font-mono">
              PHANTOM LOGISTICS • {service.tag}
            </div>

            <h1
              data-service-headline
              className="display text-[clamp(3.8rem,9.8vw,9.5rem)] leading-[0.82] tracking-[-0.02em] text-paper"
              style={{ opacity: 0 }}
            >
              {service.title}
            </h1>

            <p className="mx-auto mt-6 max-w-[46ch] text-[19px] md:text-[22px] leading-tight text-silver">
              {service.longDescription}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact" className="btn btn-red px-14 py-5 text-base tracking-[0.18em]">
                GET A FIRM QUOTE
              </Link>
              <a
                href="tel:+19024030112"
                className="nav-link inline-flex items-center gap-3 px-4 py-4 text-[13px] uppercase tracking-[0.26em] text-paper hover:text-red"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-red" /> SPEAK TO DISPATCH • (902) 403-0112
              </a>
            </div>

            <div className="mt-16 text-[10px] tracking-[0.3em] text-silver/50 font-mono">SCROLL TO BEGIN THE MOVE</div>
          </div>

          {/* Subtle scroll cue */}
          <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-20 hidden md:block">
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-red to-transparent" />
          </div>
        </section>

        {/* ================ THE PHANTOM DIFFERENCE ================ */}
        <section className="border-t border-white/10 py-20 md:py-28" data-benefits>
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="max-w-[38ch]">
              <h2 className="display mt-4 text-[clamp(2.6rem,5.6vw,4.6rem)] leading-none">
                Built for operators who can’t afford excuses.
              </h2>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {service.benefits.map((benefit, index) => (
                <MagneticFeature key={index} data-benefit>
                  <div className="text-red font-mono text-[10px] tracking-[0.2em] mb-3">0{index + 1}</div>
                  <p className="text-[17px] leading-snug text-paper/95">{benefit}</p>
                </MagneticFeature>
              ))}
            </div>
          </div>
        </section>

        {/* ================ BY THE NUMBERS — ANIMATED METRICS ================ */}
        <section className="bg-red py-16 md:py-20 text-paper">
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-14">
              {service.metrics.map((m, i) => (
                <div key={i} className="border-l border-paper/20 pl-6">
                  <div
                    data-count={m.value}
                    data-count-dec={m.decimals}
                    className="display text-[clamp(3.8rem,7.8vw,6.8rem)] leading-none tabular-nums"
                  >
                    {format(0, m.decimals)}
                  </div>
                  <div className="text-red mt-1 text-xl font-medium">{m.suffix}</div>
                  <p className="mt-3 text-paper/80 max-w-[22ch] font-mono text-[12px] tracking-[0.14em] uppercase">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================ CUSTOM ANIMATED COMPONENT: ROUTE VISUALIZER ================ */}
        <section className="py-20 md:py-28 border-b border-white/10 bg-[#0a0a0b]">
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h3 className="display text-[clamp(2.8rem,5.4vw,4.2rem)]">See the move in real time</h3>
              </div>
              <Link href="/contact" className="hidden md:block text-xs tracking-[0.25em] hover:text-red">
                REQUEST THIS LANE →
              </Link>
            </div>

            <RouteVisualizer service={service} />
          </div>
        </section>

        {/* ================ HOW WE DELIVER — SCRUBBED PROCESS ================ */}
        <section className="py-20 md:py-28" data-process-track>
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="max-w-[42ch] mb-12">
              <h2 className="display text-[clamp(2.5rem,5.8vw,4.1rem)] leading-none mt-3">
                How Phantom runs {service.title.toLowerCase()}
              </h2>
            </div>

            <div className="relative">
              {/* Progress rail */}
              <div className="absolute left-7 top-0 bottom-0 w-[3px] bg-white/10 md:left-[88px] md:top-4 md:bottom-4" />
              <div
                data-process-fill
                className="absolute left-7 top-0 bottom-0 w-[3px] origin-top bg-red scale-y-0 md:left-[88px] md:top-4 md:bottom-4"
              />

              <div className="space-y-14 md:space-y-12 pl-16 md:pl-0">
                {service.process.map((step, index) => (
                  <div
                    key={index}
                    data-process-step
                    className="grid gap-6 md:grid-cols-[88px_1fr] md:items-start"
                  >
                    <div className="md:text-right">
                      <div className="display text-red text-6xl md:text-[5.2rem] leading-none tabular-nums">
                        {step.n}
                      </div>
                    </div>
                    <div className="-mt-2 md:mt-1">
                      <h4 className="display text-4xl tracking-[-0.01em]">{step.title}</h4>
                      <p className="mt-3 max-w-[46ch] text-[17px] text-silver leading-relaxed">{step.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================ DIFFERENTIATORS + CTA BLOCK ================ */}
        <section data-cta className="relative min-h-[72vh] flex items-center border-t border-white/10">
          <div data-cta-bg className="absolute inset-0 will-change-transform">
            <img
              src={service.img}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-coal/90" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1080px] px-6 py-24">
            <div className="max-w-3xl">
              <h2 className="display text-[clamp(3rem,6.2vw,5.6rem)] leading-[0.9] mb-8">
                We don’t just move freight.<br />We own the outcome.
              </h2>

              <div className="grid sm:grid-cols-3 gap-4 mb-12">
                {service.differentiators.map((d, i) => (
                  <div key={i} className="border border-white/15 bg-white/[0.015] p-5 rounded-2xl text-[15px]">
                    {d}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn btn-red px-12 py-6 text-base tracking-[0.18em]">
                  START THIS MOVE
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center text-sm tracking-[0.2em] text-silver hover:text-paper border-b border-silver/40 pb-1"
                >
                  ← BACK TO ALL SERVICES
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom bar — subtle reassurance */}
        <div className="bg-[#0a0a0b] py-4 text-center text-[10px] tracking-[0.34em] font-mono text-silver/50 border-t border-white/10">
          ONE CARRIER. ONE INVOICE. ZERO EXCUSES. — PHANTOM LOGISTICS
        </div>
      </div>
    </PageShell>
  );
}

/* ---------- Reusable premium animated components ---------- */

function RouteVisualizer({ service }: { service: Service }) {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const truckRef = React.useRef<SVGGElement>(null);
  const progressRef = React.useRef<SVGPathElement>(null);
  const playBtnRef = React.useRef<HTMLButtonElement>(null);
  const prefersReduced = useReducedMotion();

  React.useEffect(() => {
    const svg = svgRef.current;
    const truck = truckRef.current;
    const progressPath = progressRef.current;
    if (!svg || !truck || !progressPath || prefersReduced) return;

    const pathLength = progressPath.getTotalLength();
    gsap.set(progressPath, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

    const tl = gsap.timeline({ paused: true });

    tl.to(progressPath, {
      strokeDashoffset: 0,
      duration: 1.6,
      ease: "none",
    })
      .to(
        truck,
        {
          motionPath: {
            path: progressPath,
            align: progressPath,
            alignOrigin: [0.5, 0.5],
          },
          duration: 1.6,
          ease: "none",
        },
        0
      );

    const section = svg.closest("section");
    if (section) {
      ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        end: "bottom 30%",
        scrub: 1.2,
        onUpdate(self) {
          tl.progress(self.progress);
        },
      });
    }

    const handlePlay = () => tl.restart();
    playBtnRef.current?.addEventListener("click", handlePlay);

    return () => {
      playBtnRef.current?.removeEventListener("click", handlePlay);
      tl.kill();
    };
  }, [prefersReduced]);

  return (
    <div className="relative rounded-3xl border border-white/10 bg-coal/60 p-6 md:p-10 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="display text-3xl text-paper mt-1">See the move in real time</h4>
        </div>
        <button
          ref={playBtnRef}
          className="btn btn-ghost px-6 py-3 text-xs tracking-[0.2em] flex items-center gap-2"
        >
          PLAY ANIMATION
          <span className="text-red">▶</span>
        </button>
      </div>

      <svg
        ref={svgRef}
        viewBox="0 0 1000 280"
        className="w-full h-auto"
        style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))" }}
      >
        <path
          d="M80 160 Q 260 60 420 140 Q 620 240 780 90 Q 920 170 960 140"
          fill="none"
          stroke="rgba(246,244,239,0.15)"
          strokeWidth="18"
          strokeLinecap="round"
        />
        <path
          ref={progressRef}
          d="M80 160 Q 260 60 420 140 Q 620 240 780 90 Q 920 170 960 140"
          fill="none"
          stroke="#e10600"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M80 160 Q 260 60 420 140 Q 620 240 780 90 Q 920 170 960 140"
          fill="none"
          stroke="rgba(246,244,239,0.25)"
          strokeWidth="1.5"
          strokeDasharray="8 12"
        />
        <g ref={truckRef}>
          <rect x="-22" y="-10" width="44" height="20" rx="2" fill="#f6f4ef" />
          <rect x="-8" y="-14" width="28" height="8" rx="1" fill="#e10600" />
          <circle cx="-12" cy="12" r="5" fill="#111" />
          <circle cx="14" cy="12" r="5" fill="#111" />
          <circle cx="-12" cy="12" r="2.5" fill="#f6f4ef" />
          <circle cx="14" cy="12" r="2.5" fill="#f6f4ef" />
        </g>
        <circle cx="80" cy="160" r="7" fill="#e10600" />
        <circle cx="960" cy="140" r="7" fill="#f6f4ef" stroke="#e10600" strokeWidth="3" />
      </svg>

      <p className="text-center text-[10px] tracking-[0.2em] text-silver/60 mt-2 font-mono">
        DRAG SCROLL OR TAP PLAY — REAL PHANTOM ASSETS ON REAL LANES
      </p>
    </div>
  );
}

function MagneticFeature({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
    const rotTo = gsap.quickTo(el, "rotation", { duration: 0.8, ease: "power3.out" });

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
      const rot = ((e.clientX - rect.left) / rect.width - 0.5) * -6;
      xTo(x);
      yTo(y);
      rotTo(rot);
    };

    const reset = () => {
      xTo(0);
      yTo(0);
      rotTo(0);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", reset);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative bg-white/5 border border-white/10 rounded-2xl p-7 md:p-8 transition-colors hover:border-red/40 hover:bg-white/[0.03] ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

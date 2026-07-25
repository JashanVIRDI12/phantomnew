"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import PageShell from "@/components/PageShell";
import { MagicText } from "@/components/ui/magic-text";
import type { Service } from "@/data/services";
import "@/styles/service-page-shared.css";
import "@/styles/service-dedicated.css";

const SWATCHES = [
  { name: "Phantom Red", hex: "#e10600" },
  { name: "Brushed Gold", hex: "#a3843e" },
  { name: "Stealth Black", hex: "#26262a" },
  { name: "Fleet White", hex: "#d8d5cc" },
];

const ROSTER_SIZE = 8;

function TruckIcon() {
  return (
    <svg viewBox="0 0 48 30" aria-hidden="true">
      <path d="M2 6h22v14h2l5-7h11v7h2v4H2z" fill="currentColor" />
      <circle cx="14" cy="24" r="3.4" fill="#0b0b0c" />
      <circle cx="36" cy="24" r="3.4" fill="#0b0b0c" />
    </svg>
  );
}

export default function DedicatedFleetClient({ service }: { service: Service }) {
  const root = useRef<HTMLDivElement>(null);
  const [livery, setLivery] = useState(0);

  const fmt = (n: number, d: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-hero-fade]", { opacity: 0, y: 20, duration: 0.7, stagger: 0.08, ease: "power2.out", delay: 0.1 });
        gsap.to(".svcx-hero-bg img", { yPercent: 8, ease: "none", scrollTrigger: { trigger: ".svcx-hero", start: "top top", end: "bottom top", scrub: true } });

        gsap.from(".df-swatch", { opacity: 0, y: 10, stagger: 0.05, duration: 0.4, ease: "power2.out", scrollTrigger: { trigger: ".df-swatches", start: "top 85%", once: true } });
        gsap.from(".df-truck", { opacity: 0, scale: 0.85, stagger: 0.03, duration: 0.4, ease: "power2.out", scrollTrigger: { trigger: ".df-trucks", start: "top 85%", once: true } });

        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((node) => {
          const end = Number(node.dataset.count);
          const dec = Number(node.dataset.dec ?? 0);
          const proxy = { n: 0 };
          gsap.to(proxy, {
            n: end, duration: 1.6, ease: "power2.out",
            scrollTrigger: { trigger: node, start: "top 88%", once: true },
            onUpdate: () => { node.firstChild!.textContent = fmt(proxy.n, dec); },
          });
        });
        gsap.from(".svcx-metric", { opacity: 0, y: 20, stagger: 0.08, duration: 0.55, ease: "power2.out", scrollTrigger: { trigger: ".svcx-metrics", start: "top 85%", once: true } });
        gsap.from(".svcx-process-step", { opacity: 0, y: 18, stagger: 0.08, duration: 0.55, ease: "power2.out", scrollTrigger: { trigger: ".svcx-process-list", start: "top 85%", once: true } });
        gsap.from(".svcx-card", { opacity: 0, y: 20, stagger: 0.07, duration: 0.55, ease: "power2.out", scrollTrigger: { trigger: ".svcx-cards-grid", start: "top 85%", once: true } });
        gsap.from(".svcx-cta-inner > *", { opacity: 0, y: 20, stagger: 0.08, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: ".svcx-cta", start: "top 80%", once: true } });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <PageShell>
      <div ref={root} className="df svcx">
        {/* ══════════ HERO ══════════ */}
        <section className="svcx-hero">
          <div className="svcx-hero-bg" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={service.img} alt="" />
          </div>
          <div className="svcx-hero-inner svcx-wrap">
            <div className="svcx-hero-top" data-hero-fade>
              <span className="svcx-eyebrow on-dark"><span className="dot" />{service.tag}</span>
              <span className="svcx-hero-toptag">Private roster · Built around you</span>
            </div>
            <h1 className="svcx-hero-title" data-hero-fade>Not shared. Not outsourced. <span className="accent">Yours.</span></h1>
            <p className="svcx-hero-sub" data-hero-fade>
              Dedicated tractors, trailers, and drivers reserved exclusively for your lanes. Same crew,
              same dispatch, same reliability, every single day.
            </p>
            <div className="svcx-hero-actions" data-hero-fade>
              <Link href="/contact" className="btn btn-red px-8 py-3.5">DESIGN YOUR FLEET</Link>
              <a href="tel:+19024030112" className="svcx-phone"><span className="pulse" />(902) 403-0112</a>
            </div>
            <ul className="svcx-hero-stats" data-hero-fade>
              <li><b>100%</b> company-owned assets</li><li className="sep">/</li>
              <li><b>96%</b> driver retention</li><li className="sep">/</li>
              <li><b>1</b> dedicated dispatch team</li>
            </ul>
          </div>
        </section>

        {/* ══════════ THESIS ══════════ */}
        <section className="svcx-thesis svcx-wrap">
          <span className="svcx-eyebrow on-light"><span className="dot" />Private, not pooled</span>
          <MagicText
            className="svcx-magic"
            text="Other carriers pool their capacity across a thousand customers. We assign trucks, drivers, and a dispatch team that work for exactly one — you."
            highlightWords={["assign", "trucks", "drivers", "dispatch", "team", "one", "you"]}
            highlightClassName="svcx-magic-hl"
          />
        </section>

        {/* ══════════ CONFIGURATOR ══════════ */}
        <section className="svcx-showpiece svcx-wrap">
          <div className="svcx-showpiece-head">
            <span className="svcx-eyebrow on-light"><span className="dot" />Build your roster</span>
            <h2>Pick the livery. We'll build the fleet.</h2>
          </div>

          <div className="svcx-panel">
            <div className="df-swatches" role="radiogroup" aria-label="Livery colour">
              {SWATCHES.map((s, i) => (
                <button key={s.name} type="button" role="radio" aria-checked={livery === i} data-active={livery === i} className="df-swatch" onClick={() => setLivery(i)}>
                  <span className="chip" style={{ background: s.hex }} />
                  {s.name}
                </button>
              ))}
            </div>

            <div className="df-trucks">
              {Array.from({ length: ROSTER_SIZE }).map((_, i) => (
                <div className="df-truck" key={i} style={{ color: SWATCHES[livery].hex }}><TruckIcon /></div>
              ))}
            </div>

            <div className="df-panel-foot">
              <p className="df-panel-note">Full or partial <b>brand wraps</b> available on every unit — your colors, your logo, your customers seeing your trucks on the road.</p>
              <div className="df-poc">
                <span className="df-poc-avatar">PL</span>
                <span className="df-poc-text">Your dispatch team<b>Single point of contact</b></span>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ METRICS ══════════ */}
        <section className="svcx-metrics">
          <div className="svcx-wrap">
            <div className="svcx-metrics-grid">
              {service.metrics.map((m) => (
                <div className="svcx-metric" key={m.label}>
                  <div className="v"><span data-count={m.value} data-dec={m.decimals}>{fmt(0, m.decimals)}</span><span className="u">{m.suffix}</span></div>
                  <div className="l">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ PROCESS ══════════ */}
        <section className="svcx-process">
          <div className="svcx-wrap">
            <div className="svcx-process-head">
              <span className="svcx-eyebrow on-dark"><span className="dot" />How we build it</span>
              <h2>From proposal to your first dedicated load.</h2>
            </div>
            <div className="svcx-process-list">
              {service.process.map((step) => (
                <div className="svcx-process-step" key={step.n}>
                  <span className="n">{step.n}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ BENEFITS ══════════ */}
        <section className="svcx-cards svcx-wrap">
          <div className="svcx-cards-head">
            <span className="svcx-eyebrow on-light"><span className="dot" />Included on every roster</span>
            <h2>What "dedicated" actually gets you.</h2>
          </div>
          <div className="svcx-cards-grid">
            {service.benefits.map((b, i) => (
              <div className="svcx-card" key={i}>
                <div className="tag">INCLUDED {String(i + 1).padStart(2, "0")}</div>
                <p className="body">{b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════ CTA ══════════ */}
        <section className="svcx-cta">
          <div className="svcx-cta-bg" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={service.img} alt="" />
          </div>
          <div className="svcx-cta-inner svcx-wrap">
            <span className="svcx-eyebrow on-dark"><span className="dot" />Ready to reserve your roster</span>
            <h2>This isn't a shared truck.<br /><span className="accent">It's yours.</span></h2>
            <p>Tell us your lanes and your volume. We'll model the right roster, assign the drivers, and give you one dispatch team that only answers for you.</p>
            <div className="svcx-diffs">
              {service.differentiators.map((d) => <div className="svcx-diff" key={d}>{d}</div>)}
            </div>
            <div className="svcx-cta-actions">
              <Link href="/contact" className="btn btn-red px-10 py-4">START THIS MOVE</Link>
              <Link href="/services" className="svcx-back">← Back to all services</Link>
            </div>
          </div>
        </section>

        <div className="svcx-sign">One carrier · One invoice · One roster, reserved for you — Phantom Logistics</div>
      </div>
    </PageShell>
  );
}

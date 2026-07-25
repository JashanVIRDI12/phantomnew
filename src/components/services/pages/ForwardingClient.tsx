"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import PageShell from "@/components/PageShell";
import { MagicText } from "@/components/ui/magic-text";
import RotatingEarth from "@/components/ui/wireframe-dotted-globe";
import type { Service } from "@/data/services";
import "@/styles/service-page-shared.css";
import "@/styles/service-forwarding.css";

const LANES = [
  { route: "Toronto ↔ Chicago", badge: "DAILY" },
  { route: "Vancouver ↔ Los Angeles", badge: "5×/WEEK" },
  { route: "Montreal ↔ Mexico City", badge: "CROSS-BORDER" },
  { route: "Halifax ↔ New York", badge: "DAILY" },
  { route: "Calgary ↔ Dallas", badge: "3×/WEEK" },
];

export default function ForwardingClient({ service }: { service: Service }) {
  const root = useRef<HTMLDivElement>(null);

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

        gsap.from(".fw-globe-wrap", { opacity: 0, scale: 0.96, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: ".fw-network-grid", start: "top 82%", once: true } });
        gsap.from(".fw-lane-row", { opacity: 0, x: 16, stagger: 0.06, duration: 0.4, ease: "power2.out", scrollTrigger: { trigger: ".fw-lanes", start: "top 85%", once: true } });

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
      <div ref={root} className="fw svcx">
        {/* ══════════ HERO ══════════ */}
        <section className="svcx-hero">
          <div className="svcx-hero-bg" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={service.img} alt="" />
          </div>
          <div className="svcx-hero-inner svcx-wrap">
            <div className="svcx-hero-top" data-hero-fade>
              <span className="svcx-eyebrow on-dark"><span className="dot" />{service.tag}</span>
              <span className="svcx-hero-toptag">Domestic · Canada · Mexico</span>
            </div>
            <h1 className="svcx-hero-title" data-hero-fade>One phone call. Every <span className="accent">border.</span></h1>
            <p className="svcx-hero-sub" data-hero-fade>
              When your network is bigger than our footprint, we still run the show — optimizing carrier
              mix, negotiating rates, and managing exceptions across domestic and cross-border moves.
            </p>
            <div className="svcx-hero-actions" data-hero-fade>
              <Link href="/contact" className="btn btn-red px-8 py-3.5">MAP MY NETWORK</Link>
              <a href="tel:+19024030112" className="svcx-phone"><span className="pulse" />(902) 403-0112</a>
            </div>
            <ul className="svcx-hero-stats" data-hero-fade>
              <li><b>40+</b> active lanes</li><li className="sep">/</li>
              <li><b>120+</b> vetted partners</li><li className="sep">/</li>
              <li><b>98.3%</b> visibility score</li>
            </ul>
          </div>
        </section>

        {/* ══════════ THESIS ══════════ */}
        <section className="svcx-thesis svcx-wrap">
          <span className="svcx-eyebrow on-light"><span className="dot" />Transparent, not outsourced</span>
          <MagicText
            className="svcx-magic"
            text="When your network outgrows our trucks, we don't disappear — we become your single point of contact, with transparent margins on every mile."
            highlightWords={["network", "outgrows", "single", "point", "contact", "transparent", "margins", "every", "mile"]}
            highlightClassName="svcx-magic-hl"
          />
        </section>

        {/* ══════════ NETWORK GLOBE ══════════ */}
        <section className="svcx-showpiece svcx-wrap">
          <div className="svcx-showpiece-head">
            <span className="svcx-eyebrow on-light"><span className="dot" />The network</span>
            <h2>One relationship, mapped everywhere it matters.</h2>
          </div>
          <div className="fw-network-grid">
            <div className="fw-globe-wrap">
              <RotatingEarth width={480} height={420} highlightCountry="Canada" className="w-full h-full" />
              <span className="fw-globe-hint">DRAG TO ROTATE · SCROLL TO ZOOM</span>
            </div>
            <div className="fw-lanes">
              <div className="fw-lanes-head">
                <span className="title">Active lanes, this week</span>
                <span className="live"><span className="d" />LIVE</span>
              </div>
              {LANES.map((l) => (
                <div className="fw-lane-row" key={l.route}>
                  <span className="route">{l.route}</span>
                  <span className="badge">{l.badge}</span>
                </div>
              ))}
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
              <span className="svcx-eyebrow on-dark"><span className="dot" />How the network runs</span>
              <h2>Designed, executed, owned, improved.</h2>
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
            <span className="svcx-eyebrow on-light"><span className="dot" />What the network gets you</span>
            <h2>Every border, one accountable carrier.</h2>
          </div>
          <div className="svcx-cards-grid">
            {service.benefits.map((b, i) => (
              <div className="svcx-card" key={i}>
                <div className="tag">NETWORK {String(i + 1).padStart(2, "0")}</div>
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
            <span className="svcx-eyebrow on-dark"><span className="dot" />Ready to map it</span>
            <h2>One phone call.<br /><span className="accent">Every border.</span></h2>
            <p>Tell us your flows and your pain points. We'll design the network, tender the lanes, and own every exception until it's solved.</p>
            <div className="svcx-diffs">
              {service.differentiators.map((d) => <div className="svcx-diff" key={d}>{d}</div>)}
            </div>
            <div className="svcx-cta-actions">
              <Link href="/contact" className="btn btn-red px-10 py-4">START THIS MOVE</Link>
              <Link href="/services" className="svcx-back">← Back to all services</Link>
            </div>
          </div>
        </section>

        <div className="svcx-sign">One carrier · One invoice · One network, every border — Phantom Logistics</div>
      </div>
    </PageShell>
  );
}

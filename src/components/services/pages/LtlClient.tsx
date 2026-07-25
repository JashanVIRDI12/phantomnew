"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import PageShell from "@/components/PageShell";
import { MagicText } from "@/components/ui/magic-text";
import type { Service } from "@/data/services";
import "@/styles/service-page-shared.css";
import "@/styles/service-ltl.css";

const PALLET_COUNT = 24;
const FILLED_COUNT = 15;

export default function LtlClient({ service }: { service: Service }) {
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

        gsap.from(".ltl-pallet.is-filled", { opacity: 0, scale: 0.6, stagger: 0.02, duration: 0.35, ease: "power2.out", scrollTrigger: { trigger: ".ltl-pallets", start: "top 85%", once: true } });
        gsap.to(".ltl-compare-fill", { scaleX: 1, duration: 0.9, ease: "power2.out", stagger: 0.12, scrollTrigger: { trigger: ".ltl-compare-row", start: "top 85%", once: true } });

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
      <div ref={root} className="ltl svcx">
        {/* ══════════ HERO ══════════ */}
        <section className="svcx-hero">
          <div className="svcx-hero-bg" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={service.img} alt="" />
          </div>
          <div className="svcx-hero-inner svcx-wrap">
            <div className="svcx-hero-top" data-hero-fade>
              <span className="svcx-eyebrow on-dark"><span className="dot" />{service.tag}</span>
              <span className="svcx-hero-toptag">Consolidated · Not compromised</span>
            </div>
            <h1 className="svcx-hero-title" data-hero-fade>Ship 1 pallet. Or <span className="accent">12.</span></h1>
            <p className="svcx-hero-sub" data-hero-fade>
              We consolidate your partial loads with compatible freight on optimized routes — competitive
              rates, reliable transit, and the same Phantom visibility you'd expect from a full truckload.
            </p>
            <div className="svcx-hero-actions" data-hero-fade>
              <Link href="/contact" className="btn btn-red px-8 py-3.5">GET AN LTL RATE</Link>
              <a href="tel:+19024030112" className="svcx-phone"><span className="pulse" />(902) 403-0112</a>
            </div>
            <ul className="svcx-hero-stats" data-hero-fade>
              <li><b>1–12</b> pallet positions</li><li className="sep">/</li>
              <li><b>2–5 days</b> core-lane transit</li><li className="sep">/</li>
              <li><b>Pallet-level</b> tracking</li>
            </ul>
          </div>
        </section>

        {/* ══════════ THESIS ══════════ */}
        <section className="svcx-thesis svcx-wrap">
          <span className="svcx-eyebrow on-light"><span className="dot" />No empty air, no markup</span>
          <MagicText
            className="svcx-magic"
            text="Paying for a whole trailer of empty air is paying for nothing. Consolidate smart and ship exactly what you use."
            highlightWords={["whole", "trailer", "empty", "air", "nothing", "consolidate", "smart", "exactly"]}
            highlightClassName="svcx-magic-hl"
          />
        </section>

        {/* ══════════ CONSOLIDATION DECK ══════════ */}
        <section className="svcx-showpiece svcx-wrap">
          <div className="svcx-showpiece-head">
            <span className="svcx-eyebrow on-light"><span className="dot" />The consolidation deck</span>
            <h2>One trailer. Many shippers. Zero waste.</h2>
          </div>
          <div className="svcx-panel">
            <div className="ltl-pallets">
              {Array.from({ length: PALLET_COUNT }).map((_, i) => (
                <div key={i} className={`ltl-pallet${i < FILLED_COUNT ? " is-filled" : ""}`} style={i < FILLED_COUNT ? { background: i % 2 === 0 ? "var(--accent)" : "var(--accent-deep)" } : undefined} />
              ))}
            </div>
            <div className="ltl-compare-row">
              <span className="lbl">Full truckload</span>
              <div className="ltl-compare-track"><div className="ltl-compare-fill full" style={{ width: "100%" }} /></div>
              <span className="pct">100%</span>
            </div>
            <div className="ltl-compare-row">
              <span className="lbl">Your 3-pallet share</span>
              <div className="ltl-compare-track"><div className="ltl-compare-fill share" style={{ width: "12%" }} /></div>
              <span className="pct">~12%</span>
            </div>
            <p className="ltl-compare-note">Book <b>3 pallets</b> and you pay for 3 pallets — not the empty positions riding alongside you. No minimums, ship 1 or ship 12.</p>
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
              <span className="svcx-eyebrow on-dark"><span className="dot" />How consolidation runs</span>
              <h2>Booked, matched, hubbed, delivered.</h2>
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
            <span className="svcx-eyebrow on-light"><span className="dot" />Every shipment, every size</span>
            <h2>Small load. Same standards.</h2>
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
            <span className="svcx-eyebrow on-dark"><span className="dot" />Ready to share the ride</span>
            <h2>Small shipment.<br /><span className="accent">Full attention.</span></h2>
            <p>Tell us your pallet count and lane. We'll match you to the next compatible run and quote it firm — no minimums, no markup.</p>
            <div className="svcx-diffs">
              {service.differentiators.map((d) => <div className="svcx-diff" key={d}>{d}</div>)}
            </div>
            <div className="svcx-cta-actions">
              <Link href="/contact" className="btn btn-red px-10 py-4">START THIS MOVE</Link>
              <Link href="/services" className="svcx-back">← Back to all services</Link>
            </div>
          </div>
        </section>

        <div className="svcx-sign">One carrier · One invoice · Pay for your pallets, not the trailer — Phantom Logistics</div>
      </div>
    </PageShell>
  );
}

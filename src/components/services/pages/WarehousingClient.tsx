"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import PageShell from "@/components/PageShell";
import { MagicText } from "@/components/ui/magic-text";
import type { Service } from "@/data/services";
import "@/styles/service-page-shared.css";
import "@/styles/service-warehousing.css";

const STATS = [
  { k: "Bonded space", v: "1.2M sq ft" },
  { k: "Inventory accuracy", v: "99.2%" },
  { k: "Order cycle time", v: "6.2 hrs avg" },
  { k: "Coverage", v: "Ambient + climate" },
];

const LOG = [
  { t: "08:41", msg: "PO #4471 received — 212 units, dock 3" },
  { t: "08:47", msg: "Putaway complete — bin C-14 to C-19" },
  { t: "09:02", msg: "Pick wave #88213 released — 40 lines" },
  { t: "09:35", msg: "Order #3390 staged for LTL pickup" },
  { t: "09:41", msg: "Shipment #3390 departed, dock 7" },
];

export default function WarehousingClient({ service }: { service: Service }) {
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

        gsap.from(".wh-stat-cell", { opacity: 0, y: 14, stagger: 0.06, duration: 0.5, ease: "power2.out", scrollTrigger: { trigger: ".wh-stats-grid", start: "top 85%", once: true } });
        gsap.from(".wh-ticker-row", { opacity: 0, x: 12, stagger: 0.06, duration: 0.4, ease: "power2.out", scrollTrigger: { trigger: ".wh-ticker", start: "top 85%", once: true } });

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
      <div ref={root} className="wh svcx">
        {/* ══════════ HERO ══════════ */}
        <section className="svcx-hero">
          <div className="svcx-hero-bg" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={service.img} alt="" />
          </div>
          <div className="svcx-hero-inner svcx-wrap">
            <div className="svcx-hero-top" data-hero-fade>
              <span className="svcx-eyebrow on-dark"><span className="dot" />{service.tag}</span>
              <span className="svcx-hero-toptag">Storage · Fulfillment · Cross-dock</span>
            </div>
            <h1 className="svcx-hero-title" data-hero-fade>Under one <span className="accent">roof.</span></h1>
            <p className="svcx-hero-sub" data-hero-fade>
              Storage, fulfillment, and transportation from a single carrier — no third-party handoff.
              Real-time WMS, cycle counts, and value-added services, all under one invoice.
            </p>
            <div className="svcx-hero-actions" data-hero-fade>
              <Link href="/contact" className="btn btn-red px-8 py-3.5">GET WAREHOUSE CAPACITY</Link>
              <a href="tel:+19024030112" className="svcx-phone"><span className="pulse" />(902) 403-0112</a>
            </div>
            <ul className="svcx-hero-stats" data-hero-fade>
              <li><b>1.2M</b> sq ft bonded</li><li className="sep">/</li>
              <li><b>99.2%</b> inventory accuracy</li><li className="sep">/</li>
              <li><b>6.2 hrs</b> avg order cycle</li>
            </ul>
          </div>
        </section>

        {/* ══════════ THESIS ══════════ */}
        <section className="svcx-thesis svcx-wrap">
          <span className="svcx-eyebrow on-light"><span className="dot" />No third-party risk</span>
          <MagicText
            className="svcx-magic"
            text="A separate warehouse means a separate company, a separate system, a separate excuse. We own the racking and the trucks — one roof, one record, one call."
            highlightWords={["separate", "own", "racking", "trucks", "one", "roof", "record", "call"]}
            highlightClassName="svcx-magic-hl"
          />
        </section>

        {/* ══════════ WAREHOUSE STATUS ══════════ */}
        <section className="svcx-showpiece svcx-wrap">
          <div className="svcx-showpiece-head">
            <span className="svcx-eyebrow on-light"><span className="dot" />Live floor status</span>
            <h2>Every bin tracked. Every pallet placed.</h2>
          </div>
          <div className="wh-showpiece-grid">
            <div className="wh-stats-grid">
              {STATS.map((s) => (
                <div className="wh-stat-cell" key={s.k}>
                  <div className="k">{s.k}</div>
                  <div className="v">{s.v}</div>
                </div>
              ))}
            </div>
            <div className="wh-ticker">
              <div className="wh-ticker-head">
                <span className="title">WMS activity feed</span>
                <span className="live"><span className="d" />LIVE</span>
              </div>
              {LOG.map((row, i) => (
                <div className={`wh-ticker-row${i === LOG.length - 1 ? " is-recent" : ""}`} key={row.t}>
                  <span className="t">{row.t}</span>
                  <span className="msg">{row.msg}</span>
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
              <span className="svcx-eyebrow on-dark"><span className="dot" />Dock to dock</span>
              <h2>In. Stored. Picked. Out.</h2>
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
            <span className="svcx-eyebrow on-light"><span className="dot" />System capabilities</span>
            <h2>What's running behind every bin.</h2>
          </div>
          <div className="svcx-cards-grid">
            {service.benefits.map((b, i) => (
              <div className="svcx-card" key={i}>
                <div className="tag">CAPABILITY {String(i + 1).padStart(2, "0")}</div>
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
            <span className="svcx-eyebrow on-dark"><span className="dot" />Ready to store it right</span>
            <h2>Storage that talks<br />to your <span className="accent">trucks.</span></h2>
            <p>Tell us your volume and your SKUs. We'll model the space, wire up the WMS, and give you one invoice for storage and transportation both.</p>
            <div className="svcx-diffs">
              {service.differentiators.map((d) => <div className="svcx-diff" key={d}>{d}</div>)}
            </div>
            <div className="svcx-cta-actions">
              <Link href="/contact" className="btn btn-red px-10 py-4">START THIS MOVE</Link>
              <Link href="/services" className="svcx-back">← Back to all services</Link>
            </div>
          </div>
        </section>

        <div className="svcx-sign">One carrier · One invoice · One roof for storage and freight — Phantom Logistics</div>
      </div>
    </PageShell>
  );
}

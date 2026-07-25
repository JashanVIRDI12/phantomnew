"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import PageShell from "@/components/PageShell";
import { MagicText } from "@/components/ui/magic-text";
import type { Service } from "@/data/services";
import "@/styles/service-page-shared.css";
import "@/styles/service-govcargo.css";

const CHECKLIST = [
  { title: "Seal applied at origin", copy: "Numbered seal logged and photographed before the doors close.", tag: "T+0:00" },
  { title: "Driver & escort vetted", copy: "Only cleared, background-checked drivers touch sensitive freight.", tag: "PRE-DISPATCH" },
  { title: "GPS + geofence armed", copy: "Live tracking and route geofencing active before the truck moves.", tag: "T+0:05" },
  { title: "Secured yard, 24/7 watch", copy: "Any stop happens inside a monitored, access-controlled yard.", tag: "IN TRANSIT" },
  { title: "Signature verified on delivery", copy: "Authorized-receiver-only handoff, with a full audit trail attached.", tag: "T+FINAL" },
];

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
  );
}

export default function GovCargoClient({ service }: { service: Service }) {
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

        gsap.from(".gc-check-row", { opacity: 0, y: 16, stagger: 0.07, duration: 0.5, ease: "power2.out", scrollTrigger: { trigger: ".gc-checklist", start: "top 85%", once: true } });

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
      <div ref={root} className="gc svcx">
        {/* ══════════ HERO ══════════ */}
        <section className="svcx-hero">
          <div className="svcx-hero-bg" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={service.img} alt="" />
          </div>
          <div className="svcx-hero-inner svcx-wrap">
            <div className="svcx-hero-top" data-hero-fade>
              <span className="svcx-eyebrow on-dark"><span className="dot" />{service.tag}</span>
              <span className="svcx-hero-toptag">Defence Canada · Transport Canada</span>
            </div>
            <h1 className="svcx-hero-title" data-hero-fade>Custody never <span className="accent">breaks.</span></h1>
            <p className="svcx-hero-sub" data-hero-fade>
              Defence Canada approved. Transport Canada certified. Secured Cargo Program approved carrier.
              We hold the chain of custody — at every touchpoint, every time.
            </p>
            <div className="svcx-hero-actions" data-hero-fade>
              <Link href="/contact" className="btn btn-red px-8 py-3.5">REQUEST SECURED CAPACITY</Link>
              <a href="tel:+19024030112" className="svcx-phone"><span className="pulse" />(902) 403-0112</a>
            </div>
            <ul className="svcx-hero-stats" data-hero-fade>
              <li><b>100%</b> chain-of-custody docs</li><li className="sep">/</li>
              <li><b>24/7</b> secured yard watch</li><li className="sep">/</li>
              <li><b>0</b> security incidents</li>
            </ul>
          </div>
        </section>

        {/* ══════════ THESIS ══════════ */}
        <section className="svcx-thesis svcx-wrap">
          <span className="svcx-eyebrow on-light"><span className="dot" />Protocol, not paperwork</span>
          <MagicText
            className="svcx-magic"
            text="Most carriers hand you a tracking number. We hand you a chain of custody — signed, sealed, and accountable at every single touchpoint."
            highlightWords={["chain", "custody", "signed", "sealed", "accountable", "every", "touchpoint"]}
            highlightClassName="svcx-magic-hl"
          />
        </section>

        {/* ══════════ CHAIN OF CUSTODY ══════════ */}
        <section className="svcx-showpiece svcx-wrap">
          <div className="svcx-showpiece-head">
            <span className="svcx-eyebrow on-light"><span className="dot" />Chain of custody</span>
            <h2>Five checkpoints. One unbroken seal.</h2>
          </div>
          <div className="gc-checklist">
            {CHECKLIST.map((step) => (
              <div className="gc-check-row" key={step.title}>
                <span className="gc-check-icon" aria-hidden="true"><CheckIcon /></span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                  <span className="tag">{step.tag}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="gc-badges">
            <span>Defence Canada Approved</span>
            <span>Transport Canada Certified</span>
            <span>Secured Cargo Program</span>
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
              <span className="svcx-eyebrow on-dark"><span className="dot" />Dispatch protocol</span>
              <h2>How a secured load actually moves.</h2>
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
            <span className="svcx-eyebrow on-light"><span className="dot" />On file for every load</span>
            <h2>Cleared, documented, and ready to prove it.</h2>
          </div>
          <div className="svcx-cards-grid">
            {service.benefits.map((b, i) => (
              <div className="svcx-card" key={i}>
                <div className="tag">CLEARED {String(i + 1).padStart(2, "0")}</div>
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
            <span className="svcx-eyebrow on-dark"><span className="dot" />Ready when clearance is</span>
            <h2>Every load.<br /><span className="accent">Full custody.</span></h2>
            <p>Tell us the clearance level and the lane. We'll assign vetted drivers, seal the load, and hand you a full audit trail — zero exceptions.</p>
            <div className="svcx-diffs">
              {service.differentiators.map((d) => <div className="svcx-diff" key={d}>{d}</div>)}
            </div>
            <div className="svcx-cta-actions">
              <Link href="/contact" className="btn btn-red px-10 py-4">START THIS MOVE</Link>
              <Link href="/services" className="svcx-back">← Back to all services</Link>
            </div>
          </div>
        </section>

        <div className="svcx-sign">One carrier · One invoice · One unbroken chain of custody — Phantom Logistics</div>
      </div>
    </PageShell>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import PageShell from "@/components/PageShell";
import { MagicText } from "@/components/ui/magic-text";
import type { Service } from "@/data/services";
import "@/styles/service-page-shared.css";
import "@/styles/service-freightshipping.css";

const SVGP = { fill: "none" as const, stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const MODES = [
  { label: "Dry Van", stat: "2,400 units", blurb: "General freight, palletized or boxed — protected from weather on every one of our 53' vans.", icon: <svg viewBox="0 0 24 24" width="24" height="24" {...SVGP}><path d="M1.5 5h12v9h-12z" /><path d="M13.5 8h4l3 3v3h-7z" /><circle cx="6" cy="17.5" r="2" /><circle cx="17" cy="17.5" r="2" /></svg> },
  { label: "Reefer", stat: "870 units", blurb: "−40°F to 70°F temperature-controlled, live-monitored, for anything that can't lose its cool.", icon: <svg viewBox="0 0 24 24" width="24" height="24" {...SVGP}><path d="M12 2l8 3v6c0 5-3.5 8.6-8 11-4.5-2.4-8-6-8-11V5z" /><path d="M8.5 11.5l2.4 2.4 4.6-5" /></svg> },
  { label: "Flatbed & Step Deck", stat: "14 equipment types", blurb: "Oversized, machinery, and project freight — the right iron for loads that don't fit a box.", icon: <svg viewBox="0 0 24 24" width="24" height="24" {...SVGP}><path d="M2 16h20" /><path d="M4 16V9h9l4 4h3v3" /><circle cx="7" cy="19" r="2" /><circle cx="17" cy="19" r="2" /></svg> },
  { label: "LTL", stat: "14,200 shipments / yr", blurb: "Partial loads consolidated smart — pallet-level tracking without the broker markup.", icon: <svg viewBox="0 0 24 24" width="24" height="24" {...SVGP}><path d="M3 3.5h7v7H3z" /><path d="M14 3.5h7v7h-7z" /><path d="M8.5 13h7v7h-7z" /></svg> },
  { label: "Expedited", stat: "1,240 mi avg run", blurb: "Team drivers, non-stop, zero layovers — for freight that can't wait for the next window.", icon: <svg viewBox="0 0 24 24" width="24" height="24" {...SVGP}><circle cx="12" cy="12" r="1.6" /><path d="M8.6 8.6a5 5 0 0 0 0 6.8" /><path d="M15.4 8.6a5 5 0 0 1 0 6.8" /><path d="M6 6a9 9 0 0 0 0 12" /><path d="M18 6a9 9 0 0 1 0 12" /></svg> },
  { label: "Warehousing", stat: "1.2M sq ft bonded", blurb: "Storage, cross-dock, and fulfillment under the same roof and the same invoice as your freight.", icon: <svg viewBox="0 0 24 24" width="24" height="24" {...SVGP}><path d="M2 9l10-5 10 5v11H2z" /><path d="M7 20v-6h10v6" /><path d="M7 14h10" /></svg> },
];

export default function FreightShippingClient({ service }: { service: Service }) {
  const root = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const fmt = (n: number, d: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

  useEffect(() => {
    if (!detailRef.current) return;
    gsap.fromTo(detailRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
  }, [active]);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-hero-fade]", { opacity: 0, y: 20, duration: 0.7, stagger: 0.08, ease: "power2.out", delay: 0.1 });
        gsap.to(".svcx-hero-bg img", { yPercent: 8, ease: "none", scrollTrigger: { trigger: ".svcx-hero", start: "top top", end: "bottom top", scrub: true } });

        gsap.from(".fs-mode-btn", { opacity: 0, y: 16, stagger: 0.05, duration: 0.45, ease: "power2.out", scrollTrigger: { trigger: ".fs-modes-grid", start: "top 85%", once: true } });

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

  const mode = MODES[active];

  return (
    <PageShell>
      <div ref={root} className="fs svcx">
        {/* ══════════ HERO ══════════ */}
        <section className="svcx-hero">
          <div className="svcx-hero-bg" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={service.img} alt="" />
          </div>
          <div className="svcx-hero-inner svcx-wrap">
            <div className="svcx-hero-top" data-hero-fade>
              <span className="svcx-eyebrow on-dark"><span className="dot" />{service.tag}</span>
              <span className="svcx-hero-toptag">Every mode · One relationship</span>
            </div>
            <h1 className="svcx-hero-title" data-hero-fade>One carrier. Every <span className="accent">mode.</span></h1>
            <p className="svcx-hero-sub" data-hero-fade>
              FTL, LTL, expedited, and project freight — handled with the same attention to detail,
              consolidated onto one invoice. No handoffs, no excuses.
            </p>
            <div className="svcx-hero-actions" data-hero-fade>
              <Link href="/contact" className="btn btn-red px-8 py-3.5">GET A FIRM QUOTE</Link>
              <a href="tel:+19024030112" className="svcx-phone"><span className="pulse" />(902) 403-0112</a>
            </div>
            <ul className="svcx-hero-stats" data-hero-fade>
              <li><b>48</b> states covered</li><li className="sep">/</li>
              <li><b>3,200+</b> loads / month</li><li className="sep">/</li>
              <li><b>98.7%</b> claim-free</li>
            </ul>
          </div>
        </section>

        {/* ══════════ THESIS ══════════ */}
        <section className="svcx-thesis svcx-wrap">
          <span className="svcx-eyebrow on-light"><span className="dot" />No forwarded problems</span>
          <MagicText
            className="svcx-magic"
            text="A broker just forwards the problem to someone else's truck. We run every mode ourselves — so the answer is always us."
            highlightWords={["broker", "forwards", "someone", "else's", "every", "mode", "ourselves", "us"]}
            highlightClassName="svcx-magic-hl"
          />
        </section>

        {/* ══════════ MODE SWITCHER ══════════ */}
        <section className="svcx-showpiece svcx-wrap">
          <div className="svcx-showpiece-head">
            <span className="svcx-eyebrow on-light"><span className="dot" />Pick a mode</span>
            <h2>Whatever it takes to move it.</h2>
          </div>

          <div className="fs-modes-grid" role="tablist" aria-label="Freight modes">
            {MODES.map((m, i) => (
              <button key={m.label} type="button" role="tab" aria-selected={active === i} data-active={active === i} className="fs-mode-btn" onClick={() => setActive(i)}>
                <span className="ic">{m.icon}</span>
                <span className="lbl">{m.label}</span>
                <span className="stat">{m.stat}</span>
              </button>
            ))}
          </div>

          <div className="fs-detail" ref={detailRef}>
            <span className="fs-detail-tag">{mode.stat}</span>
            <h3>{mode.label}</h3>
            <p>{mode.blurb}</p>
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
              <span className="svcx-eyebrow on-dark"><span className="dot" />How the relay runs</span>
              <h2>One team. Every leg.</h2>
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
            <span className="svcx-eyebrow on-light"><span className="dot" />Included, every mode</span>
            <h2>What doesn't change, mode to mode.</h2>
          </div>
          <div className="svcx-cards-grid">
            {service.benefits.map((b, i) => (
              <div className="svcx-card" key={i}>
                <div className="tag">FEATURE {String(i + 1).padStart(2, "0")}</div>
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
            <span className="svcx-eyebrow on-dark"><span className="dot" />Ready to move, any mode</span>
            <h2>Every mode.<br /><span className="accent">One invoice.</span></h2>
            <p>Tell us what you're moving and how fast. We'll match the equipment, quote it firm, and run it — no handoffs, no excuses.</p>
            <div className="svcx-diffs">
              {service.differentiators.map((d) => <div className="svcx-diff" key={d}>{d}</div>)}
            </div>
            <div className="svcx-cta-actions">
              <Link href="/contact" className="btn btn-red px-10 py-4">START THIS MOVE</Link>
              <Link href="/services" className="svcx-back">← Back to all services</Link>
            </div>
          </div>
        </section>

        <div className="svcx-sign">One carrier · One invoice · Every mode you'll ever need — Phantom Logistics</div>
      </div>
    </PageShell>
  );
}

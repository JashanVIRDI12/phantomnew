"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import PageShell from "@/components/PageShell";
import { MagicText } from "@/components/ui/magic-text";
import type { Service } from "@/data/services";
import "@/styles/service-page-shared.css";
import "@/styles/service-freighttrans.css";

const WHEEL = { fill: "currentColor" };
const BODY = { fill: "none", stroke: "currentColor", strokeWidth: 2 } as const;

function Wheels({ x }: { x: number[] }) {
  return <>{x.map((cx) => <circle key={cx} cx={cx} cy={48} r={6} {...WHEEL} />)}</>;
}

const EQUIPMENT = [
  { name: "Flatbed", spec: "48'–53' · 48,000 lb", icon: <svg viewBox="0 0 140 60"><rect x="12" y="30" width="106" height="8" rx="1" {...BODY} /><Wheels x={[32, 108]} /></svg> },
  { name: "Step Deck", spec: "Lower deck · 10' legal height", icon: <svg viewBox="0 0 140 60"><path d="M10,26 h33 v8 h-33 z M45,34 h73 v8 h-73 z M43,34 v-8" {...BODY} /><Wheels x={[100, 120]} /></svg> },
  { name: "Lowboy / RGN", spec: "Deck height 18\"–24\"", icon: <svg viewBox="0 0 140 60"><path d="M10,40 L25,40 L25,20 L14,20" {...BODY} /><rect x="25" y="40" width="95" height="6" rx="1" {...BODY} /><Wheels x={[100, 120]} /></svg> },
  { name: "Double Drop", spec: "Center well · oversize height", icon: <svg viewBox="0 0 140 60"><path d="M8,32 h20 v8 h-20 z M28,40 h60 v6 h-60 z M88,32 h30 v8 h-30 z M28,40 v-8 M88,40 v-8" {...BODY} /><Wheels x={[105, 122]} /></svg> },
  { name: "Curtain-Side Van", spec: "53' · side-load access", icon: <svg viewBox="0 0 140 60"><rect x="15" y="10" width="103" height="30" rx="2" {...BODY} />{[27, 39, 51, 63, 75, 87, 99, 111].map((x) => <line key={x} x1={x} y1="10" x2={x} y2="40" stroke="currentColor" strokeWidth="1" opacity="0.5" />)}<Wheels x={[35, 98]} /></svg> },
  { name: "Tanker", spec: "Bulk liquid · up to 7,000 gal", icon: <svg viewBox="0 0 140 60"><ellipse cx="65" cy="26" rx="53" ry="16" {...BODY} /><circle cx="65" cy="10" r="3" {...BODY} /><Wheels x={[35, 95]} /></svg> },
  { name: "Conestoga", spec: "Rolling tarp · weather-tight", icon: <svg viewBox="0 0 140 60"><rect x="15" y="18" width="103" height="22" rx="2" {...BODY} /><path d="M15,18 Q65,4 118,18" {...BODY} /><Wheels x={[35, 98]} /></svg> },
];

export default function FreightTransClient({ service }: { service: Service }) {
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

        gsap.from(".ft-eq-card", { opacity: 0, y: 16, stagger: 0.06, duration: 0.5, ease: "power2.out", scrollTrigger: { trigger: ".ft-rail", start: "top 85%", once: true } });

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
      <div ref={root} className="ft svcx">
        {/* ══════════ HERO ══════════ */}
        <section className="svcx-hero">
          <div className="svcx-hero-bg" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={service.img} alt="" />
          </div>
          <div className="svcx-hero-inner svcx-wrap">
            <div className="svcx-hero-top" data-hero-fade>
              <span className="svcx-eyebrow on-dark"><span className="dot" />{service.tag}</span>
              <span className="svcx-hero-toptag">14 equipment types · One relationship</span>
            </div>
            <h1 className="svcx-hero-title" data-hero-fade>Not every load fits a <span className="accent">53' van.</span></h1>
            <p className="svcx-hero-sub" data-hero-fade>
              Flatbeds, step decks, lowboys, tankers, curtain vans, and more — the right iron for the job,
              in-house, with engineering support for the loads that don't fit a spec sheet.
            </p>
            <div className="svcx-hero-actions" data-hero-fade>
              <Link href="/contact" className="btn btn-red px-8 py-3.5">SPEC THIS LOAD</Link>
              <a href="tel:+19024030112" className="svcx-phone"><span className="pulse" />(902) 403-0112</a>
            </div>
            <ul className="svcx-hero-stats" data-hero-fade>
              <li><b>14</b> equipment types</li><li className="sep">/</li>
              <li><b>410</b> OD/permits last quarter</li><li className="sep">/</li>
              <li><b>96%</b> repeat rate</li>
            </ul>
          </div>
        </section>

        {/* ══════════ THESIS ══════════ */}
        <section className="svcx-thesis svcx-wrap">
          <span className="svcx-eyebrow on-light"><span className="dot" />One toolbox, not one tool</span>
          <MagicText
            className="svcx-magic"
            text="A dry van is one tool. We carry the whole toolbox — flatbeds, lowboys, tankers, and the engineering to match the right one to your load."
            highlightWords={["one", "tool", "toolbox", "flatbeds", "lowboys", "tankers", "engineering", "match"]}
            highlightClassName="svcx-magic-hl"
          />
        </section>

        {/* ══════════ EQUIPMENT CATALOG ══════════ */}
        <section className="svcx-showpiece svcx-wrap">
          <div className="svcx-showpiece-head" style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem" }}>
            <div>
              <span className="svcx-eyebrow on-light"><span className="dot" />The catalog</span>
              <h2>The right iron, in-house.</h2>
            </div>
            <span className="ft-catalog-hint">DRAG TO EXPLORE →</span>
          </div>

          <div className="ft-rail">
            {EQUIPMENT.map((eq) => (
              <div className="ft-eq-card" key={eq.name}>
                {eq.icon}
                <h3>{eq.name}</h3>
                <div className="spec">{eq.spec}</div>
              </div>
            ))}
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
              <span className="svcx-eyebrow on-dark"><span className="dot" />How a spec load moves</span>
              <h2>Engineered. Permitted. Delivered.</h2>
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
            <span className="svcx-eyebrow on-light"><span className="dot" />What's in the shop</span>
            <h2>Built for the loads that don't fit a box.</h2>
          </div>
          <div className="svcx-cards-grid">
            {service.benefits.map((b, i) => (
              <div className="svcx-card" key={i}>
                <div className="tag">PLATE {String(i + 1).padStart(2, "0")}</div>
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
            <span className="svcx-eyebrow on-dark"><span className="dot" />Ready to spec it</span>
            <h2>The right iron.<br /><span className="accent">Every time.</span></h2>
            <p>Send us the dimensions and the weight. Our engineering team will spec the equipment, pull the permits, and route it — done right, one invoice.</p>
            <div className="svcx-diffs">
              {service.differentiators.map((d) => <div className="svcx-diff" key={d}>{d}</div>)}
            </div>
            <div className="svcx-cta-actions">
              <Link href="/contact" className="btn btn-red px-10 py-4">START THIS MOVE</Link>
              <Link href="/services" className="svcx-back">← Back to all services</Link>
            </div>
          </div>
        </section>

        <div className="svcx-sign">One carrier · One invoice · Fourteen equipment types — Phantom Logistics</div>
      </div>
    </PageShell>
  );
}

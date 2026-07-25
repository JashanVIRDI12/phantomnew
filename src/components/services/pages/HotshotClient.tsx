"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import PageShell from "@/components/PageShell";
import { MagicText } from "@/components/ui/magic-text";
import type { Service } from "@/data/services";
import "@/styles/service-page-shared.css";
import "@/styles/service-hotshot.css";

const ZONES = [
  { label: "0–30 min", sub: "Same-metro rapid response", band: "var(--accent)" },
  { label: "30–60 min", sub: "Regional standby coverage", band: "var(--accent-deep)" },
  { label: "60–90 min", sub: "Extended-radius dispatch", band: "var(--steel)" },
];

export default function HotshotClient({ service }: { service: Service }) {
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

        gsap.from(".hs-zone-row", { opacity: 0, x: -14, stagger: 0.08, duration: 0.5, ease: "power2.out", scrollTrigger: { trigger: ".hs-zones", start: "top 85%", once: true } });
        gsap.from(".hs-ticket", { opacity: 0, y: 16, duration: 0.5, ease: "power2.out", scrollTrigger: { trigger: ".hs-ticket", start: "top 85%", once: true } });

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
      <div ref={root} className="hs svcx">
        {/* ══════════ HERO ══════════ */}
        <section className="svcx-hero">
          <div className="svcx-hero-bg" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={service.img} alt="" />
          </div>
          <div className="svcx-hero-inner svcx-wrap">
            <div className="svcx-hero-top" data-hero-fade>
              <span className="svcx-eyebrow on-dark"><span className="dot" />{service.tag}</span>
              <span className="svcx-hero-toptag">Direct to driver · No call center</span>
            </div>
            <h1 className="svcx-hero-title" data-hero-fade>Small load. Huge <span className="accent">urgency.</span></h1>
            <p className="svcx-hero-sub" data-hero-fade>
              Critical parts, emergency shipments, high-value items — moved on a moment's notice. Direct
              driver communication, zero call-center runaround.
            </p>
            <div className="svcx-hero-actions" data-hero-fade>
              <Link href="/contact" className="btn btn-red px-8 py-3.5">CALL OR BOOK NOW</Link>
              <a href="tel:+19024030112" className="svcx-phone"><span className="pulse" />(902) 403-0112</a>
            </div>
            <ul className="svcx-hero-stats" data-hero-fade>
              <li><b>68 min</b> avg dispatch time</li><li className="sep">/</li>
              <li><b>310</b> hotshot loads last quarter</li><li className="sep">/</li>
              <li><b>4.9/5</b> customer NPS</li>
            </ul>
          </div>
        </section>

        {/* ══════════ THESIS ══════════ */}
        <section className="svcx-thesis svcx-wrap">
          <span className="svcx-eyebrow on-light"><span className="dot" />No script, no hold music</span>
          <MagicText
            className="svcx-magic"
            text="A call center reads you a script and puts you on hold. Our drivers pick up the phone themselves — and start moving."
            highlightWords={["call", "center", "script", "hold", "drivers", "pick", "phone", "themselves", "moving"]}
            highlightClassName="svcx-magic-hl"
          />
        </section>

        {/* ══════════ RESPONSE ZONES + TICKET ══════════ */}
        <section className="svcx-showpiece svcx-wrap">
          <div className="svcx-showpiece-head">
            <span className="svcx-eyebrow on-light"><span className="dot" />Rapid response zone</span>
            <h2>We're already close by.</h2>
          </div>
          <div className="hs-showpiece-grid">
            <div className="hs-zones">
              {ZONES.map((z) => (
                <div className="hs-zone-row" key={z.label}>
                  <span className="band" style={{ background: z.band }}>{z.label.split(" ")[0]}</span>
                  <div>
                    <div className="label">{z.label}</div>
                    <div className="sub">{z.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="hs-ticket">
              <div className="hs-ticket-head">
                <span className="id">TICKET #H-3391</span>
                <span className="stamp">RUSH</span>
              </div>
              <div className="hs-ticket-row"><span className="k">Load type</span><span className="v">Machine part · 1 pallet</span></div>
              <div className="hs-ticket-row"><span className="k">Pickup window</span><span className="v">Within 68 min</span></div>
              <div className="hs-ticket-row"><span className="k">Asset assigned</span><span className="v">Sprinter / cutaway flat</span></div>
              <div className="hs-ticket-row"><span className="k">Contact</span><span className="v">Direct to driver</span></div>
              <div className="hs-ticket-foot">Dispatched in an average of <b>68 minutes</b> — no call center, no queue.</div>
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
              <span className="svcx-eyebrow on-dark"><span className="dot" />How the call goes</span>
              <h2>From "we need this now" to done.</h2>
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
            <span className="svcx-eyebrow on-light"><span className="dot" />What every hotshot gets</span>
            <h2>Built for the load nobody else wants to touch.</h2>
          </div>
          <div className="svcx-cards-grid">
            {service.benefits.map((b, i) => (
              <div className="svcx-card" key={i}>
                <div className="tag">READY {String(i + 1).padStart(2, "0")}</div>
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
            <span className="svcx-eyebrow on-dark"><span className="dot" />Standing by on Channel 19</span>
            <h2>Weird. Awkward. Urgent.<br /><span className="accent">We say yes.</span></h2>
            <p>Tell us what needs to move and how fast. A real person — usually the driver — answers, and we're rolling within the hour.</p>
            <div className="svcx-diffs">
              {service.differentiators.map((d) => <div className="svcx-diff" key={d}>{d}</div>)}
            </div>
            <div className="svcx-cta-actions">
              <Link href="/contact" className="btn btn-red px-10 py-4">START THIS MOVE</Link>
              <Link href="/services" className="svcx-back">← Back to all services</Link>
            </div>
          </div>
        </section>

        <div className="svcx-sign">One carrier · One invoice · Direct to the driver — Phantom Logistics</div>
      </div>
    </PageShell>
  );
}

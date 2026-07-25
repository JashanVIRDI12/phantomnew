"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import PageShell from "@/components/PageShell";
import { MagicText } from "@/components/ui/magic-text";
import type { Service } from "@/data/services";
import "@/styles/service-page-shared.css";
import "@/styles/service-expedited.css";

export default function ExpeditedClient({ service }: { service: Service }) {
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

        gsap.from(".xp-compare-card", { opacity: 0, y: 18, stagger: 0.1, duration: 0.5, ease: "power2.out", scrollTrigger: { trigger: ".xp-compare", start: "top 85%", once: true } });

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
      <div ref={root} className="xp svcx">
        {/* ══════════ HERO ══════════ */}
        <section className="svcx-hero">
          <div className="svcx-hero-bg" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={service.img} alt="" />
          </div>
          <div className="svcx-hero-inner svcx-wrap">
            <div className="svcx-hero-top" data-hero-fade>
              <span className="svcx-eyebrow on-dark"><span className="dot" />{service.tag}</span>
              <span className="svcx-hero-toptag">Team drivers · Rolling 24/7</span>
            </div>
            <h1 className="svcx-hero-title" data-hero-fade>The truck never <span className="accent">stops.</span></h1>
            <p className="svcx-hero-sub" data-hero-fade>
              Team drivers, non-stop. No drop yards, no layovers, no excuses. When a plant is down or a
              line is starving, we move heaven, earth, and trucks to get it there.
            </p>
            <div className="svcx-hero-actions" data-hero-fade>
              <Link href="/contact" className="btn btn-red px-8 py-3.5">REQUEST EMERGENCY CAPACITY</Link>
              <a href="tel:+19024030112" className="svcx-phone"><span className="pulse" />(902) 403-0112</a>
            </div>
            <ul className="svcx-hero-stats" data-hero-fade>
              <li><b>1,240 mi</b> avg expedited run</li><li className="sep">/</li>
              <li><b>19.5 hrs</b> coast-to-coast record</li><li className="sep">/</li>
              <li><b>100%</b> delivered on promised time</li>
            </ul>
          </div>
        </section>

        {/* ══════════ THESIS ══════════ */}
        <section className="svcx-thesis svcx-wrap">
          <span className="svcx-eyebrow on-light"><span className="dot" />Every hour is a number</span>
          <MagicText
            className="svcx-magic"
            text="When a plant is down, every hour is a number on someone's spreadsheet. We move heaven, earth, and trucks to keep that number small."
            highlightWords={["every", "hour", "number", "spreadsheet", "heaven", "earth", "trucks", "small"]}
            highlightClassName="svcx-magic-hl"
          />
        </section>

        {/* ══════════ STANDARD VS EXPEDITED ══════════ */}
        <section className="svcx-showpiece svcx-wrap">
          <div className="svcx-showpiece-head">
            <span className="svcx-eyebrow on-light"><span className="dot" />What changes when it's urgent</span>
            <h2>Same network. A very different clock.</h2>
          </div>
          <div className="xp-compare">
            <div className="xp-compare-card">
              <span className="tag">STANDARD FREIGHT</span>
              <h3>Next available truck</h3>
              <ul>
                <li>Scheduled pickup window</li>
                <li>Solo driver, standard hours-of-service</li>
                <li>Planned stops along the route</li>
              </ul>
            </div>
            <div className="xp-compare-card is-us">
              <span className="tag">PHANTOM EXPEDITED</span>
              <h3>Rolling within the hour</h3>
              <ul>
                <li>Priority dispatch, guaranteed capacity window</li>
                <li>Team drivers — the truck never stops</li>
                <li>Door-to-door, zero terminal stops</li>
              </ul>
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
              <span className="svcx-eyebrow on-dark"><span className="dot" />From the call to mission complete</span>
              <h2>How an emergency load actually moves.</h2>
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
            <span className="svcx-eyebrow on-light"><span className="dot" />Standing by, always</span>
            <h2>Built for the call nobody plans for.</h2>
          </div>
          <div className="svcx-cards-grid">
            {service.benefits.map((b, i) => (
              <div className="svcx-card" key={i}>
                <div className="tag">OPS {String(i + 1).padStart(2, "0")}</div>
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
            <span className="svcx-eyebrow on-dark"><span className="dot" />Ready to roll, now</span>
            <h2>Every hour counts.<br /><span className="accent">We count them too.</span></h2>
            <p>Tell us what's down and where it needs to be. We'll hold capacity, dispatch a team, and run it non-stop.</p>
            <div className="svcx-diffs">
              {service.differentiators.map((d) => <div className="svcx-diff" key={d}>{d}</div>)}
            </div>
            <div className="svcx-cta-actions">
              <Link href="/contact" className="btn btn-red px-10 py-4">START THIS MOVE</Link>
              <Link href="/services" className="svcx-back">← Back to all services</Link>
            </div>
          </div>
        </section>

        <div className="svcx-sign">One carrier · One invoice · The truck never stops — Phantom Logistics</div>
      </div>
    </PageShell>
  );
}

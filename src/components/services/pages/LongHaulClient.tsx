"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import PageShell from "@/components/PageShell";
import type { Service } from "@/data/services";
import "@/styles/service-light.css";

const EQUIPMENT = [
  "I-5 / I-10 / I-40 / I-70 / I-80 / I-95 CORRIDORS",
  "TEAM DRIVERS — 2,800+ MI IN 48–60 HRS",
  "HIGH CUBE VANS, REEFERS & FLATBEDS",
  "GPS + ELD, EVERY UNIT",
  "EXPERIENCED MOUNTAIN & WINTER DRIVERS",
  "FUEL-EFFICIENT AERODYNAMIC FLEET",
];

const FREIGHT_TYPES = [
  "CROSS-COUNTRY GENERAL FREIGHT",
  "HIGH-VOLUME CORRIDOR SHIPMENTS",
  "TEAM-DRIVEN TIME-SENSITIVE LANES",
  "MULTI-STOP LONG-HAUL ROUTES",
  "SEASONAL / WINTER-ROUTE FREIGHT",
];

const DRIVER_FACTS = ["6 YR AVERAGE DRIVER TENURE", "ELD + DASHCAM ON EVERY UNIT", "TEAM & SOLO OPTIONS AVAILABLE"];

const GUARANTEES = [
  { n: "01", v: "99.1%", k: "Load Completion Rate", d: "tracked across every long-haul lane we run, coast to coast." },
  { n: "02", v: "2.1 DAYS", k: "Avg Coast-to-Coast", d: "team driver options built specifically to hit this window." },
  { n: "03", v: "187K+", k: "Miles Driven Monthly", d: "real, current volume across our long-haul network." },
  { n: "04", v: "PREDICTABLE", k: "ETAs, Even at 2,000+ Mi", d: "tracked and communicated proactively, not estimated once at pickup." },
];

const FAQS = [
  {
    q: "Do you offer team drivers for long-haul lanes?",
    a: "Yes — team options can run 2,800+ miles in 48–60 hours where the lane calls for it.",
  },
  {
    q: "What corridors do you run most?",
    a: "I-5, I-10, I-40, I-70, I-80, and I-95 see the heaviest volume, but we're not limited to those.",
  },
  {
    q: "Can you handle winter or mountain routes?",
    a: "Yes — we staff experienced mountain and winter drivers specifically for those lanes.",
  },
  {
    q: "How predictable are ETAs on really long lanes?",
    a: "Predictable even past 2,000 miles — we track and communicate proactively rather than estimate once at pickup.",
  },
  {
    q: "Can long-haul freight stage at your warehouse first?",
    a: "Yes, our long-haul network integrates directly with our warehousing for origin or destination staging.",
  },
];

export default function LongHaulClient({ service }: { service: Service }) {
  const root = useRef<HTMLDivElement>(null);

  const fmt = (n: number, d: number) => n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-svl-fade]", { opacity: 0, y: 22, duration: 0.75, stagger: 0.09, ease: "power2.out", delay: 0.1 });
        gsap.from(".svl-stat", { opacity: 0, y: 14, duration: 0.5, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: ".svl-stats", start: "top 85%", once: true } });
        gsap.from(".svl-tag", { opacity: 0, y: 10, duration: 0.45, stagger: 0.03, ease: "power2.out", scrollTrigger: { trigger: ".svl-specs-block", start: "top 82%", once: true } });
        gsap.from(".svl-photo-band", { opacity: 0, y: 24, duration: 0.65, ease: "power2.out", scrollTrigger: { trigger: ".svl-photo-band", start: "top 85%", once: true } });
        gsap.from(".svl-step", { opacity: 0, y: 22, duration: 0.6, stagger: 0.12, ease: "power2.out", scrollTrigger: { trigger: ".svl-timeline", start: "top 82%", once: true } });
        gsap.from(".svl-drivers-fade", { opacity: 0, y: 20, duration: 0.6, stagger: 0.09, ease: "power2.out", scrollTrigger: { trigger: ".svl-drivers", start: "top 82%", once: true } });
        gsap.from(".svl-guarantee", { opacity: 0, y: 18, duration: 0.55, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: ".svl-guarantees", start: "top 85%", once: true } });
        gsap.from(".svl-faq-item", { opacity: 0, y: 16, duration: 0.5, stagger: 0.07, ease: "power2.out", scrollTrigger: { trigger: ".svl-faq", start: "top 85%", once: true } });
        gsap.from(".svl-cta-photo-inner > *", { opacity: 0, y: 20, duration: 0.6, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: ".svl-cta-photo", start: "top 80%", once: true } });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <PageShell>
      <div ref={root} className="svl">
        <div className="svl-wrap">
          <div
            className="svl-panel"
            style={{ backdropFilter: "blur(30px) saturate(1.4) brightness(1.03)", WebkitBackdropFilter: "blur(30px) saturate(1.4) brightness(1.03)" }}
          >
            <div className="svl-hero-row">
              <div className="svl-hero-col">
                <h1 className="svl-headline" data-svl-fade>
                  Long Haul
                  <br />
                  Trucking
                </h1>
                <p className="svl-positioning" data-svl-fade>
                  Coast to coast, border to border — team and solo options built for distance, not just for the easy lanes.
                </p>
                <span className="svl-rule" data-svl-fade aria-hidden="true" />
                <div className="svl-hero-actions" data-svl-fade>
                  <Link href="/contact" className="svl-cta-btn">
                    Request a Long Haul Quote
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <a href="tel:+19024030112" className="svl-phone">
                    (902) 403-0112
                  </a>
                </div>
              </div>

              <div className="svl-photo-col" data-svl-fade>
                <div className="svl-photo-frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={service.img} alt="Phantom Logistics long haul trailer on a cross-country lane" />
                </div>
                <div className="svl-visual-caption">Interstate — cross-country network</div>
              </div>
            </div>

            <div className="svl-divider" />

            <div className="svl-block">
              <h2 className="svl-block-title">By the numbers</h2>
              <div className="svl-stats">
                {service.metrics.map((m) => (
                  <div className="svl-stat" key={m.label}>
                    <div className="svl-stat-v">
                      {fmt(m.value, m.decimals)}
                      {m.suffix}
                    </div>
                    <div className="svl-stat-k">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="svl-divider" />

            <div className="svl-block svl-specs-block">
              <h2 className="svl-block-title">What&apos;s on every long-haul dispatch</h2>
              <div className="svl-tag-group">
                <div className="svl-tag-label">Equipment &amp; corridors</div>
                <div className="svl-tags">
                  {EQUIPMENT.map((tag) => (
                    <span className="svl-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="svl-tag-group">
                <div className="svl-tag-label">Freight types handled</div>
                <div className="svl-tags">
                  {FREIGHT_TYPES.map((tag) => (
                    <span className="svl-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="svl-photo-band">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={service.img} alt="Phantom Logistics long haul trailer running a lane" />
                <div className="svl-photo-band-inner">
                  <div className="svl-photo-band-title">Every mile logged. Every mile owned.</div>
                  <div className="svl-photo-band-facts">
                    <span>187,000 MI DRIVEN LAST MONTH</span>
                    <span>2.1 DAY AVG COAST-TO-COAST</span>
                    <span>99.1% LOAD COMPLETION</span>
                    <span>TEAM + SOLO OPTIONS</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="svl-divider" />

            <div className="svl-block">
              <h2 className="svl-block-title">How a long-haul lane moves</h2>
              <div className="svl-timeline">
                {service.process.map((step) => (
                  <div className="svl-step" key={step.n}>
                    <span className="svl-step-n">{step.n}</span>
                    <div className="svl-step-body">
                      <h3>{step.title}</h3>
                      <p>{step.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="svl-divider" />

            <div className="svl-block">
              <h2 className="svl-block-title">Company drivers. Not gig freight.</h2>
              <div className="svl-drivers">
                <div className="svl-driver-photo svl-drivers-fade">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/services/photos/spare-driver-portrait.webp"
                    alt="Phantom Logistics company driver standing beside his assigned tractor at the home terminal"
                  />
                </div>
                <div className="svl-drivers-copy">
                  <p className="svl-drivers-fade">
                    Every long-haul mile on this page is run by a Phantom company driver — not a leased owner-operator, not a broker&apos;s best
                    guess. High team-driver percentage on our longest runs, answerable to the same dispatch board every day.
                  </p>
                  <div className="svl-fact-list">
                    {DRIVER_FACTS.map((fact) => (
                      <div className="svl-fact svl-drivers-fade" key={fact}>
                        {fact}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="svl-divider" />

            <div className="svl-block">
              <h2 className="svl-block-title">What we guarantee</h2>
              <div className="svl-guarantees">
                {GUARANTEES.map((g) => (
                  <div className="svl-guarantee" key={g.k}>
                    <div className="svl-guarantee-n">{g.n}</div>
                    <div className="svl-guarantee-v">{g.v}</div>
                    <div className="svl-guarantee-k">{g.k}</div>
                    <p>{g.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="svl-divider" />

            <div className="svl-block">
              <h2 className="svl-block-title">Questions we get before booking</h2>
              <div className="svl-faq">
                {FAQS.map((f) => (
                  <div className="svl-faq-item" key={f.q}>
                    <div className="svl-faq-q">{f.q}</div>
                    <p className="svl-faq-a">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="svl-cta-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={service.img} alt="" aria-hidden="true" />
            <div className="svl-cta-photo-inner">
              <h2>Ready to run a long-haul lane?</h2>
              <p>Tell us the origin, destination, and timing. We&apos;ll pair the right equipment and driver option.</p>
              <div className="svl-cta-actions">
                <Link href="/contact" className="svl-cta-btn svl-cta-btn--lg svl-cta-btn--photo">
                  Request a Long Haul Quote
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link href="/services" className="svl-phone svl-phone--onphoto">
                  ← Back to all services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import PageShell from "@/components/PageShell";
import type { Service } from "@/data/services";
import "@/styles/service-light.css";

const EQUIPMENT = [
  "PALLET-LEVEL GPS TRACKING",
  "PHOTO PROOF AT EVERY TOUCH",
  "HIGHER WEIGHT LIMITS THAN STANDARD LTL",
  "GPS + ELD, EVERY UNIT",
  "NO MINIMUM — 1 TO 12+ PALLETS",
  "BOL + LABELS GENERATED INSTANTLY",
];

const FREIGHT_TYPES = [
  "PARTIAL PALLETIZED FREIGHT",
  "RETAIL / CPG LTL",
  "RETURNS & REDISTRIBUTION",
  "MIXED FREIGHT CONSOLIDATION",
  "NON-PERISHABLE GENERAL FREIGHT",
];

const DRIVER_FACTS = ["6 YR AVERAGE DRIVER TENURE", "ELD + DASHCAM ON EVERY UNIT", "DIRECT DRIVER CONTACT — NO CALL CENTER"];

const GUARANTEES = [
  { n: "01", v: "97.9%", k: "First-Attempt Delivery", d: "no repeat delivery attempts padding your transit time." },
  { n: "02", v: "2.8 DAYS", k: "Avg Transit (Core Lanes)", d: "consistent, tracked transit — not a rough estimate." },
  { n: "03", v: "14,200+", k: "LTL Shipments / Year", d: "run on our own network, not brokered out to a third party." },
  { n: "04", v: "NO MIN", k: "Pallet Count", d: "ship one pallet or twelve on the same rate structure." },
];

const FAQS = [
  {
    q: "Is there a minimum shipment size?",
    a: "No — we'll move a single pallet or a partial truckload on the same network.",
  },
  {
    q: "How is this different from a broker's LTL rate?",
    a: "Your freight rides on our own network, not a resold rate from a third-party carrier — that's why the pricing and the visibility are both better.",
  },
  {
    q: "Can I track an individual pallet, not just the whole shipment?",
    a: "Yes — pallet-level GPS and photo proof at each touchpoint, not just one tracking number for the whole load.",
  },
  {
    q: "What if my LTL freight needs to combine with a full truckload later?",
    a: "It integrates directly with our dedicated and FTL capacity — no separate vendor relationship needed.",
  },
  {
    q: "Do you handle returns or redistribution?",
    a: "Yes, that's a standard part of our LTL network, not a special request.",
  },
];

export default function LtlClient({ service }: { service: Service }) {
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
                  LTL
                  <br />
                  Trucking
                </h1>
                <p className="svl-positioning" data-svl-fade>
                  Partial loads consolidated on our own network — no broker markup, no minimum pallet count.
                </p>
                <span className="svl-rule" data-svl-fade aria-hidden="true" />
                <div className="svl-hero-actions" data-svl-fade>
                  <Link href="/contact" className="svl-cta-btn">
                    Request an LTL Quote
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
                  <img src={service.img} alt="Phantom Logistics LTL trailer on an active lane" />
                </div>
                <div className="svl-visual-caption">Partial loads — our own network</div>
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
              <h2 className="svl-block-title">What&apos;s on every dispatch</h2>
              <div className="svl-tag-group">
                <div className="svl-tag-label">Equipment &amp; tracking</div>
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
                <img src={service.img} alt="Phantom Logistics LTL trailer running a lane" />
                <div className="svl-photo-band-inner">
                  <div className="svl-photo-band-title">Your pallet, tracked the whole way</div>
                  <div className="svl-photo-band-facts">
                    <span>14,200 SHIPMENTS / YEAR</span>
                    <span>2.8 DAY AVG TRANSIT</span>
                    <span>97.9% FIRST-ATTEMPT DELIVERY</span>
                    <span>NO BROKER MARKUP</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="svl-divider" />

            <div className="svl-block">
              <h2 className="svl-block-title">How the load moves</h2>
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
                    Every pallet on this page rides on a Phantom company driver&apos;s truck — not a resold LTL network, not a broker&apos;s
                    best guess. Same drivers, same hubs, answerable to the same dispatch board every day.
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
              <h2>Ready to ship LTL?</h2>
              <p>Tell us the pallet count, the lane, and the pickup date. We&apos;ll quote it on our own network — no broker markup.</p>
              <div className="svl-cta-actions">
                <Link href="/contact" className="svl-cta-btn svl-cta-btn--lg svl-cta-btn--photo">
                  Request an LTL Quote
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

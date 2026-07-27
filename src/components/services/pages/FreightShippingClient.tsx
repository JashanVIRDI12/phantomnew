"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import PageShell from "@/components/PageShell";
import type { Service } from "@/data/services";
import "@/styles/service-light.css";

const EQUIPMENT = [
  "DRY VAN, REEFER & FLATBED IN-HOUSE",
  "HAZMAT + OVERSIZE CAPABLE",
  "GPS + ELD, EVERY UNIT",
  "CONSOLIDATED BILLING",
  "48-STATE COVERAGE",
  "PROACTIVE EXCEPTION ALERTS",
];

const FREIGHT_TYPES = [
  "GENERAL / PALLETIZED FREIGHT",
  "TEMPERATURE-CONTROLLED LOADS",
  "OVERSIZE / PERMITTED FREIGHT",
  "HAZMAT SHIPMENTS",
  "MULTI-MODE / MULTI-STOP MOVES",
];

const DRIVER_FACTS = ["6 YR AVERAGE DRIVER TENURE", "ELD + DASHCAM ON EVERY UNIT", "DIRECT DRIVER CONTACT — NO CALL CENTER"];

const GUARANTEES = [
  { n: "01", v: "98.7%", k: "Claim-Free Deliveries", d: "tracked and reported across every mode we run, monthly." },
  { n: "02", v: "3,200+", k: "Loads Moved Monthly", d: "consistent capacity across dry van, reefer, and flatbed." },
  { n: "03", v: "48", k: "States Covered", d: "full nationwide reach, one dispatch team, one point of contact." },
  { n: "04", v: "100%", k: "Company Drivers", d: "no outside carriers on core lanes — every truck and driver is ours." },
];

const FAQS = [
  {
    q: "Can you handle a shipment that needs two different equipment types?",
    a: "Yes — we coordinate multi-mode moves (van to flat, for example) under one dispatch team and one invoice.",
  },
  {
    q: "Do you handle hazmat freight?",
    a: "Yes, with certified drivers and proper placarding — tell us the class when you book.",
  },
  {
    q: "What if my freight is oversize or needs permits?",
    a: "We handle permitting and legal routing in-house before the truck ever rolls.",
  },
  {
    q: "How do you bill across multiple shipments or modes?",
    a: "One consolidated invoice, regardless of how many trucks or equipment types were involved.",
  },
  {
    q: "What happens if there's an exception mid-route?",
    a: "Dispatch calls you before you have to call us — that's the standard on every load.",
  },
];

export default function FreightShippingClient({ service }: { service: Service }) {
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
                  Freight
                  <br />
                  Shipping
                </h1>
                <p className="svl-positioning" data-svl-fade>
                  One carrier, every mode you need — dry van, reefer, flatbed, and more, on a single invoice.
                </p>
                <span className="svl-rule" data-svl-fade aria-hidden="true" />
                <div className="svl-hero-actions" data-svl-fade>
                  <Link href="/contact" className="svl-cta-btn">
                    Request a Freight Quote
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
                  <img src={service.img} alt="Phantom Logistics freight shipping trailer on an active lane" />
                </div>
                <div className="svl-visual-caption">One carrier — every mode, nationwide</div>
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
                <div className="svl-tag-label">Equipment &amp; capability</div>
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
                <img src={service.img} alt="Phantom Logistics freight shipping trailer running a lane" />
                <div className="svl-photo-band-inner">
                  <div className="svl-photo-band-title">One carrier. Every mode. One invoice.</div>
                  <div className="svl-photo-band-facts">
                    <span>48 STATES COVERED</span>
                    <span>3,200+ LOADS MONTHLY</span>
                    <span>98.7% CLAIM-FREE</span>
                    <span>100% COMPANY DRIVERS</span>
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
                    Every load on this page is run by a Phantom company driver — not a leased owner-operator, not a broker&apos;s best guess.
                    Same drivers, same equipment, answerable to the same dispatch board every day.
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
              <h2>Ready to move freight?</h2>
              <p>Tell us the freight, the equipment, and the lane. We&apos;ll quote the right mode and get it moving.</p>
              <div className="svl-cta-actions">
                <Link href="/contact" className="svl-cta-btn svl-cta-btn--lg svl-cta-btn--photo">
                  Request a Freight Quote
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

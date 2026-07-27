"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import PageShell from "@/components/PageShell";
import type { Service } from "@/data/services";
import "@/styles/service-light.css";

const EQUIPMENT = [
  "DEDICATED TRACTORS + TRAILERS",
  "BRANDED UNITS — FULL OR PARTIAL WRAP",
  "PRIORITY LOADING WINDOWS",
  "GPS + ELD, EVERY UNIT",
  "SINGLE POINT OF CONTACT",
  "WEEKLY PERFORMANCE REVIEWS",
];

const FREIGHT_TYPES = [
  "PRIVATE FLEET REPLACEMENT",
  "RECURRING / SCHEDULED LANES",
  "RETAIL REPLENISHMENT PROGRAMS",
  "MANUFACTURING SUPPLY RUNS",
  "MULTI-STOP ROUTES",
];

const DRIVER_FACTS = ["6 YR AVERAGE DRIVER TENURE", "ELD + DASHCAM ON EVERY UNIT", "SAME DRIVER, SAME ACCOUNT"];

const GUARANTEES = [
  { n: "01", v: "100%", k: "Company-Owned Assets", d: "no leased trucks, no shared capacity — every unit on your program is ours." },
  { n: "02", v: "96%", k: "Driver Retention", d: "the same drivers stay on your account, building real product and dock knowledge." },
  { n: "03", v: "4.8/5", k: "Customer Satisfaction", d: "measured every quarter across every dedicated account we run." },
  { n: "04", v: "WEEKLY", k: "Performance Reviews", d: "a standing review with your dispatch team — not a once-a-year check-in." },
];

const FAQS = [
  {
    q: "How is this different from just booking loads with you regularly?",
    a: "The trucks and drivers are reserved for you specifically — they don't run other customers' freight in between. It's capacity you can actually plan around.",
  },
  {
    q: "Can you brand the trucks with our livery?",
    a: "Yes — full or partial wrap, arranged during setup. Most dedicated accounts run branded within the first few weeks.",
  },
  {
    q: "What happens if a dedicated driver is out sick or on vacation?",
    a: "We staff a backup driver trained on your SOPs, not a random sub pulled off the board.",
  },
  {
    q: "How much lead time do you need to stand up a dedicated fleet?",
    a: "Typically 2–4 weeks depending on unit count and any branding — enough time to model your lanes properly, not rush it.",
  },
  {
    q: "Is there a minimum number of trucks to start a dedicated program?",
    a: "We'll scope it based on your volume — some programs start with a single unit and grow from there.",
  },
];

export default function DedicatedFleetClient({ service }: { service: Service }) {
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
                  Dedicated
                  <br />
                  Fleet
                </h1>
                <p className="svl-positioning" data-svl-fade>
                  Trucks and drivers reserved exclusively for your freight — same team, same schedule, every single day.
                </p>
                <span className="svl-rule" data-svl-fade aria-hidden="true" />
                <div className="svl-hero-actions" data-svl-fade>
                  <Link href="/contact" className="svl-cta-btn">
                    Request a Dedicated Fleet Quote
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
                  <img src={service.img} alt="Phantom Logistics dedicated fleet tractor on an active lane" />
                </div>
                <div className="svl-visual-caption">Reserved capacity — dedicated fleet</div>
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
              <h2 className="svl-block-title">What&apos;s on every dedicated program</h2>
              <div className="svl-tag-group">
                <div className="svl-tag-label">Equipment &amp; setup</div>
                <div className="svl-tags">
                  {EQUIPMENT.map((tag) => (
                    <span className="svl-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="svl-tag-group">
                <div className="svl-tag-label">Built for</div>
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
                <img src={service.img} alt="Phantom Logistics dedicated fleet unit running a lane" />
                <div className="svl-photo-band-inner">
                  <div className="svl-photo-band-title">Same trucks, same drivers, every single day</div>
                  <div className="svl-photo-band-facts">
                    <span>100% COMPANY-OWNED</span>
                    <span>96% DRIVER RETENTION</span>
                    <span>PRIORITY LOADING WINDOWS</span>
                    <span>BRANDED UNITS AVAILABLE</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="svl-divider" />

            <div className="svl-block">
              <h2 className="svl-block-title">How a dedicated program starts</h2>
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
                    Every dedicated unit on this page is run by a Phantom company driver — not a leased owner-operator, not a rotating sub.
                    Same driver on your account, trained on your SOPs, answerable to the same dispatch board every day.
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
              <h2>Ready to build a dedicated fleet?</h2>
              <p>Tell us your lanes, volume, and schedule. We&apos;ll model the right number of units and get your program running.</p>
              <div className="svl-cta-actions">
                <Link href="/contact" className="svl-cta-btn svl-cta-btn--lg svl-cta-btn--photo">
                  Request a Dedicated Fleet Quote
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

"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import PageShell from "@/components/PageShell";
import type { Service } from "@/data/services";
import "@/styles/service-light.css";

const EQUIPMENT = [
  "DOMESTIC + CANADA/MEXICO COVERAGE",
  "RATE SHOPPING ACROSS VETTED PARTNERS",
  "END-TO-END VISIBILITY PLATFORM",
  "CUSTOMS BROKERAGE COORDINATION",
  "WEEKLY COST + PERFORMANCE ANALYTICS",
  "TRANSPARENT CARRIER MARGINS",
];

const FREIGHT_TYPES = [
  "MULTI-CARRIER SUPPLY CHAINS",
  "CROSS-BORDER SHIPMENTS",
  "OVERFLOW / SURGE CAPACITY",
  "NETWORKS BIGGER THAN ONE FLEET",
  "COMPLEX MULTI-LEG ROUTING",
];

const DRIVER_FACTS = ["OWN ASSETS MOVED FIRST", "VETTED PARTNER CARRIERS ONLY", "ONE DISPATCH TEAM, FULL VISIBILITY"];

const GUARANTEES = [
  { n: "01", v: "98.3%", k: "Visibility Score", d: "tracked across every forwarded load, not just the ones on our own trucks." },
  { n: "02", v: "14%", k: "Avg Cost Reduction YOY", d: "measured and reported, not a one-time promotional rate." },
  { n: "03", v: "8,700+", k: "Loads Forwarded / Year", d: "real, active network volume across domestic and cross-border lanes." },
  { n: "04", v: "TRANSPARENT", k: "Margins", d: "you see what we pay carriers — no hidden markup buried in the rate." },
];

const FAQS = [
  {
    q: "If you're forwarding, why does it matter that you also own trucks?",
    a: "We move the majority of freight on our own assets first — forwarding fills the gaps your network can't cover on its own, it's not the default.",
  },
  {
    q: "Can you handle cross-border shipments into Canada or Mexico?",
    a: "Yes, including customs brokerage coordination as part of the same relationship.",
  },
  {
    q: "How do you choose which carrier moves a given load?",
    a: "Rate shopping across our network and vetted partners, with margins you can see — not a black box.",
  },
  {
    q: "What happens when something goes wrong on a forwarded load?",
    a: "We own the exception until it's resolved — you're not chasing a third-party carrier directly.",
  },
  {
    q: "How often do we get performance or cost reporting?",
    a: "Weekly analytics and actionable recommendations, not a static quarterly report.",
  },
];

export default function ForwardingClient({ service }: { service: Service }) {
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
                  Forwarding
                </h1>
                <p className="svl-positioning" data-svl-fade>
                  One point of contact managing your whole network — carrier mix, rates, and exceptions, all visible.
                </p>
                <span className="svl-rule" data-svl-fade aria-hidden="true" />
                <div className="svl-hero-actions" data-svl-fade>
                  <Link href="/contact" className="svl-cta-btn">
                    Request a Freight Forwarding Quote
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
                  <img src={service.img} alt="Phantom Logistics freight forwarding trailer on an active lane" />
                </div>
                <div className="svl-visual-caption">One relationship — full network visibility</div>
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
              <h2 className="svl-block-title">What&apos;s included on every account</h2>
              <div className="svl-tag-group">
                <div className="svl-tag-label">Network &amp; visibility</div>
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
                <img src={service.img} alt="Phantom Logistics freight forwarding trailer running a lane" />
                <div className="svl-photo-band-inner">
                  <div className="svl-photo-band-title">One relationship. Full visibility. Real savings.</div>
                  <div className="svl-photo-band-facts">
                    <span>8,700 LOADS FORWARDED / YEAR</span>
                    <span>14% AVG COST REDUCTION</span>
                    <span>98.3% VISIBILITY SCORE</span>
                    <span>OWN ASSETS MOVED FIRST</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="svl-divider" />

            <div className="svl-block">
              <h2 className="svl-block-title">How a forwarded load moves</h2>
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
              <h2 className="svl-block-title">One accountable team. Not a black box.</h2>
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
                    We move the majority of your network on our own trucks and Phantom company drivers first — forwarding only fills the gaps
                    our own fleet can&apos;t cover, with the same single point of accountability either way.
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
              <h2>Ready to simplify your network?</h2>
              <p>Tell us your lanes and volume. We&apos;ll model the mix and show you where the savings are.</p>
              <div className="svl-cta-actions">
                <Link href="/contact" className="svl-cta-btn svl-cta-btn--lg svl-cta-btn--photo">
                  Request a Freight Forwarding Quote
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

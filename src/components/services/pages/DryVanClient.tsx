"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import PageShell from "@/components/PageShell";
import type { Service } from "@/data/services";
import "@/styles/service-light.css";

const EQUIPMENT = [
  "53'-0\" TRAILER LENGTH",
  "8'-6\" INTERIOR WIDTH",
  "9'-0\" INTERIOR HEIGHT",
  "45,000 LB MAX PAYLOAD",
  "26 STANDARD PALLET POSITIONS",
  "270° REAR DOOR SWING",
  "E-TRACK + LOGISTIC POSTS",
  "GPS + ELD, EVERY UNIT",
];

const FREIGHT_TYPES = [
  "PALLETIZED FREIGHT",
  "BOXED & CARTONED GOODS",
  "RETAIL / CPG",
  "NON-PERISHABLE FOOD-GRADE",
  "FLOOR-LOADED FREIGHT",
  "MACHINE PARTS & COMPONENTS",
];

const PROCESS = [
  {
    n: "01",
    title: "Booking",
    copy: "Send the lane, pallet count, and pickup date. We confirm a firm rate and assign a trailer number the same day — no multi-day quote cycles.",
  },
  {
    n: "02",
    title: "Pickup",
    copy: "Driver arrives inside the scheduled window, counts the load at the dock, and seals the trailer before pulling off the lot.",
  },
  {
    n: "03",
    title: "Transit",
    copy: "The load runs a tracked lane with scheduled check calls. Any delay triggers a call from dispatch — not a guessing game on your end.",
  },
  {
    n: "04",
    title: "Delivery",
    copy: "Trailer stays sealed until it reaches the receiving dock. Appointment held, freight counted, signed proof of delivery collected on site.",
  },
  {
    n: "05",
    title: "Tracking",
    copy: "GPS position and delivery paperwork land in your inbox the same day the load closes out — you don't have to call and ask.",
  },
];

const DRIVER_FACTS = ["6 YR AVERAGE DRIVER TENURE", "ELD + DASHCAM ON EVERY UNIT", "DIRECT DRIVER CONTACT — NO CALL CENTER"];

const GUARANTEES = [
  { n: "01", v: "98.7%", k: "On-Time Delivery", d: "on-time performance across every dry van lane, tracked and reported monthly." },
  { n: "02", v: "SEALED", k: "Cargo Protection", d: "trailers are sealed at pickup and opened only at the delivery dock — zero weather exposure in transit." },
  { n: "03", v: "24/7", k: "Real-Time Tracking", d: "live GPS visibility with automated status pushes — no phone tag with dispatch for an update." },
  { n: "04", v: "$100K", k: "Cargo Insurance", d: "standard cargo coverage carried on every dry van load we run, no exceptions." },
];

const FAQS = [
  {
    q: "Do you drop trailers or only run live loads?",
    a: "Both. We drop-and-hook wherever the dock allows it and run live loads everywhere else — tell us which one your dock needs when you book.",
  },
  {
    q: "What's your free time and detention policy?",
    a: "Two hours free at pickup, two hours free at delivery. After that, detention runs $65/hr, billed in 15-minute increments.",
  },
  {
    q: "Can I get a certificate of insurance before the load moves?",
    a: "Yes — COIs go out same-day on request. You don't wait on underwriting to get a load booked.",
  },
  {
    q: "What happens if something's damaged in transit?",
    a: "Every load carries $100,000 in standard cargo coverage. Claims start with a call to your dispatcher, not a form buried on a website.",
  },
  {
    q: "Can dry van run as a team for long lanes?",
    a: "Yes, on request. Most dry van moves run solo, but we'll staff a team for time-sensitive long-haul lanes.",
  },
];

export default function DryVanClient({ service }: { service: Service }) {
  const root = useRef<HTMLDivElement>(null);

  const fmt = (n: number, d: number) => n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-svl-fade]", {
          opacity: 0,
          y: 22,
          duration: 0.75,
          stagger: 0.09,
          ease: "power2.out",
          delay: 0.1,
        });

        gsap.from(".svl-stat", {
          opacity: 0,
          y: 14,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ".svl-stats", start: "top 85%", once: true },
        });

        gsap.from(".svl-tag", {
          opacity: 0,
          y: 10,
          duration: 0.45,
          stagger: 0.03,
          ease: "power2.out",
          scrollTrigger: { trigger: ".svl-specs-block", start: "top 82%", once: true },
        });

        gsap.from(".svl-photo-band", {
          opacity: 0,
          y: 24,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: { trigger: ".svl-photo-band", start: "top 85%", once: true },
        });

        gsap.from(".svl-step", {
          opacity: 0,
          y: 22,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: ".svl-timeline", start: "top 82%", once: true },
        });

        gsap.from(".svl-drivers-fade", {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.09,
          ease: "power2.out",
          scrollTrigger: { trigger: ".svl-drivers", start: "top 82%", once: true },
        });

        gsap.from(".svl-guarantee", {
          opacity: 0,
          y: 18,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ".svl-guarantees", start: "top 85%", once: true },
        });

        gsap.from(".svl-faq-item", {
          opacity: 0,
          y: 16,
          duration: 0.5,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: { trigger: ".svl-faq", start: "top 85%", once: true },
        });

        gsap.from(".svl-cta-photo-inner > *", {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ".svl-cta-photo", start: "top 80%", once: true },
        });
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
            {/* ══════════ HEADLINE + POSITIONING  |  REAL FLEET PHOTO ══════════ */}
            <div className="svl-hero-row">
              <div className="svl-hero-col">
                <h1 className="svl-headline" data-svl-fade>
                  Dry Van
                  <br />
                  Trucking
                </h1>
                <p className="svl-positioning" data-svl-fade>
                  Enclosed trailers that keep freight dry, sealed, and on schedule — dispatched across all 48 states.
                </p>
                <span className="svl-rule" data-svl-fade aria-hidden="true" />
                <div className="svl-hero-actions" data-svl-fade>
                  <Link href="/contact" className="svl-cta-btn">
                    Request a Dry Van Quote
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
                  <img src={service.img} alt="Phantom Logistics branded 53-foot dry van trailer running a highway lane" />
                </div>
                <div className="svl-visual-caption">Company-owned 53&apos; dry van — active fleet</div>
              </div>
            </div>

            <div className="svl-divider" />

            {/* ══════════ FLEET STATS ══════════ */}
            <div className="svl-block">
              <h2 className="svl-block-title">Fleet at a glance</h2>
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

            {/* ══════════ WHAT'S INCLUDED — equipment / freight / capacity ══════════ */}
            <div className="svl-block svl-specs-block">
              <h2 className="svl-block-title">What&apos;s on every dispatch</h2>
              <div className="svl-tag-group">
                <div className="svl-tag-label">Equipment &amp; capacity</div>
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
                <img src="/services/photos/dry-van-dock.webp" alt="Phantom Logistics tractor and 53-foot dry van on the apron with branded trailers on the dock doors behind" />
                <div className="svl-photo-band-inner">
                  <div className="svl-photo-band-title">Same build, every trailer in the fleet</div>
                  <div className="svl-photo-band-facts">
                    <span>53&apos; TRAILER</span>
                    <span>45,000 LB PAYLOAD</span>
                    <span>270° DOOR SWING</span>
                    <span>GPS + ELD STANDARD</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="svl-divider" />

            {/* ══════════ PROCESS — numbered timeline ══════════ */}
            <div className="svl-block">
              <h2 className="svl-block-title">How the load moves</h2>
              <div className="svl-timeline">
                {PROCESS.map((step) => (
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

            {/* ══════════ COMPANY DRIVERS — real photo + facts ══════════ */}
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
                    Every dry van on this page is run by a Phantom company driver — not a leased owner-operator, not a broker&apos;s best guess.
                    Same drivers on the same lanes, trained on the same load-securement standard, answerable to the same dispatch board every day.
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

            {/* ══════════ VALUE — what we guarantee ══════════ */}
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

            {/* ══════════ FAQ ══════════ */}
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

          {/* ══════════ CTA — full-bleed fleet photo ══════════ */}
          <div className="svl-cta-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/services/photos/dry-van-rain.webp" alt="" aria-hidden="true" />
            <div className="svl-cta-photo-inner">
              <h2>Ready to book a dry van?</h2>
              <p>Send the lane, the pallet count, and the pickup date. You&apos;ll have a firm rate and a trailer number back the same day.</p>
              <div className="svl-cta-actions">
                <Link href="/contact" className="svl-cta-btn svl-cta-btn--lg svl-cta-btn--photo">
                  Request a Dry Van Quote
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

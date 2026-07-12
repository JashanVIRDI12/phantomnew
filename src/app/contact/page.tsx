"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import PageShell from "@/components/PageShell";
import { Input } from "@/components/ui/input";
import "@/styles/contact.css";

/* ── Imagery ──────────────────────────────────────────────────────────────── */
const IMG = {
  aerial: "/hf_20260606_104850_008b5602-bfa5-40a9-a9c8-3020d070d0f2(1).png",
  yard: "/hf_20260606_104624_2d9fc850-b40b-4e43-a8de-2f9cceecdead(1).png",
  dock: "/hf_20260606_104556_7052f106-a0e2-4aae-a9ad-cc8f8a74266e(1).png",
  sunset: "/hf_20260606_104819_db26e803-e1e6-450e-a7e3-24b2f16e33cb(1).png",
};

/* ── Data ─────────────────────────────────────────────────────────────────── */
const DISPATCH_TEL = "+19024030112";
const INFO_EMAIL = "info@phantomlogisticsinc.com";

const HOURS =
  "Mon – Fri: 8:00 AM – 6:00 PM\nSat: 10:00 AM – 4:00 PM\nSun: Closed";

const DIRECT_LINES = [
  {
    k: "Dispatch · ext 102",
    v: "(902) 403-0112",
    href: `tel:${DISPATCH_TEL}`,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
      </svg>
    ),
  },
  {
    k: "Customs · ext 105",
    v: "(902) 403-0112",
    href: `tel:${DISPATCH_TEL}`,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
      </svg>
    ),
  },
  {
    k: "Safety · ext 106",
    v: "(902) 403-0112",
    href: `tel:${DISPATCH_TEL}`,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
      </svg>
    ),
  },
  {
    k: "Email",
    v: INFO_EMAIL,
    href: `mailto:${INFO_EMAIL}`,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
        <path d="m3.5 6 8.5 6.5L20.5 6" />
      </svg>
    ),
  },
];

const CERTS = ["Defence Canada Approved", "Transport Canada Certified", "Secured Cargo Program", "Fully Insured"];

const FREIGHT_TYPES = ["FTL", "LTL", "Refrigerated", "Dedicated Fleet", "Expedited", "Warehousing", "Other"];

const TERMINALS = [
  {
    flag: "Home Terminal",
    tag: "Nova Scotia",
    city: "Truro, NS",
    coords: "45.37° N · 63.28° W",
    img: IMG.dock,
    rows: [
      { k: "Address", v: "415 Willow St\nTruro, NS B2N 6T2", href: undefined },
      { k: "Phone", v: "(902) 403-0112", href: `tel:${DISPATCH_TEL}` },
      { k: "Hours", v: HOURS, href: undefined },
    ],
  },
  {
    flag: "Second Location",
    tag: "Ontario",
    city: "Bolton, ON",
    coords: "43.88° N · 79.74° W",
    img: IMG.yard,
    rows: [
      { k: "Address", v: "365 Healey Rd Unit 19\nBolton, ON L7E 5C1", href: undefined },
      { k: "Phone", v: "(902) 403-0112", href: `tel:${DISPATCH_TEL}` },
      { k: "Hours", v: HOURS, href: undefined },
    ],
  },
];

const FAQS = [
  {
    q: "How fast can you dispatch?",
    a: "Firm quote in 15 minutes during business hours, dispatch confirmed the same day. For time-critical freight we can have a company driver assigned and rolling quickly — real humans on the desk, Mon–Sat.",
  },
  {
    q: "Do you run temperature-controlled and secured freight?",
    a: "Yes. Our reefers run −40°F to 70°F with live thermal monitoring, and we're a Defence Canada–approved, Secured Cargo Program carrier for sensitive and high-value loads with full chain of custody.",
  },
  {
    q: "Can I track my shipment in real time?",
    a: "Every Phantom truck runs live GPS. Your dispatcher sends a direct tracking link at pickup — no apps, no portals, no check calls. Proactive ETAs land in your inbox along the way.",
  },
  {
    q: "Do you offer dedicated fleet contracts?",
    a: "Absolutely — from short trials to multi-year agreements. We'll reserve company iron, assign your drivers, wrap the trucks in your livery if you want, and run your schedule. Ask dispatch about a fleet assessment.",
  },
  {
    q: "Where do you operate?",
    a: "Across Canada and into the US from our Truro, NS home terminal and Bolton, ON location. One carrier, one invoice — every mile on company-owned equipment, zero brokers in between.",
  },
];

const KEY_FIELDS = ["name", "phone", "email", "origin", "destination", "freight"] as const;

export default function ContactPage() {
  const root = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);
  const [freight, setFreight] = useState<string | null>(null);
  const [fields, setFields] = useState<Record<string, string>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [clock, setClock] = useState<string | null>(null);

  /* progress — share of the key fields that are filled */
  const filled = KEY_FIELDS.filter((f) => (f === "freight" ? !!freight : (fields[f] ?? "").trim().length > 0)).length;
  const progress = Math.round((filled / KEY_FIELDS.length) * 100);

  const track = (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((s) => ({ ...s, [name]: e.target.value }));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  const reset = () => {
    setSent(false);
    setFreight(null);
    setFields({});
  };

  /* live dispatch clock (Truro / Atlantic) — mounts client-side to avoid hydration drift */
  useEffect(() => {
    const tick = () =>
      setClock(
        new Intl.DateTimeFormat("en-CA", {
          timeZone: "America/Halifax",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* ── HERO intro ── */
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.from("[data-c-eyebrow]", { opacity: 0, y: 14, duration: 0.6 }, 0.1);
        tl.fromTo("[data-c-line]", { yPercent: 118 }, { yPercent: 0, duration: 1.05, stagger: 0.09 }, 0.2);
        tl.from("[data-c-sub]", { opacity: 0, y: 22, duration: 0.8 }, "-=0.65");
        tl.from("[data-c-direct]", { opacity: 0, y: 18, stagger: 0.08, duration: 0.6 }, "-=0.55");
        tl.from("[data-c-meta]", { opacity: 0, y: 16, stagger: 0.06, duration: 0.5 }, "-=0.45");
        tl.fromTo("[data-c-console]", { opacity: 0, y: 46 }, { opacity: 1, y: 0, duration: 1 }, "-=0.9");

        /* hero background parallax */
        gsap.to("[data-c-herobg] img", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: "[data-c-hero]", start: "top top", end: "bottom top", scrub: true },
        });

        /* ── TERMINALS ── */
        gsap.from("[data-c-term]", {
          opacity: 0,
          y: 48,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-c-term-grid]", start: "top 82%", once: true },
        });

        /* ── FAQ ── */
        gsap.from("[data-c-faq]", {
          opacity: 0,
          y: 28,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-c-faq-list]", start: "top 84%", once: true },
        });

        /* ── CTA ── */
        gsap.to("[data-c-cta-bg] img", {
          scale: 1.14,
          ease: "none",
          scrollTrigger: { trigger: "[data-c-cta]", start: "top bottom", end: "bottom top", scrub: true },
        });
        gsap.from("[data-c-cta-rise]", {
          opacity: 0,
          y: 40,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-c-cta]", start: "top 75%", once: true },
        });

        requestAnimationFrame(() => ScrollTrigger.refresh());
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-c-line]", { yPercent: 0 });
        gsap.set(
          "[data-c-eyebrow],[data-c-sub],[data-c-direct],[data-c-meta],[data-c-console],[data-c-term],[data-c-faq],[data-c-cta-rise]",
          { clearProps: "all", opacity: 1 }
        );
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <PageShell>
      <div ref={root} className="ct">

        {/* ══════════ HERO + CONSOLE ══════════ */}
        <section data-c-hero className="ct-hero">
          <div data-c-herobg className="ct-hero-bg" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.aerial} alt="" />
          </div>

          <div className="ct-wrap">
            <div className="ct-hero-grid">

              {/* ── lead column ── */}
              <div className="ct-lead">
                <h1 className="ct-headline" aria-label="Open a line.">
                  <span className="line"><span className="line-in" data-c-line>Open</span></span>
                  <span className="line"><span className="line-in" data-c-line>a <span className="accent">line.</span></span></span>
                </h1>

                <p data-c-sub className="ct-sub">
                  Name the lane and the freight. We&apos;ll quote it in 15 minutes and dispatch the
                  same day — every mile on company iron, across North America. No brokers in between.
                </p>

                <div className="ct-direct">
                  {DIRECT_LINES.map((d) => (
                    <a key={d.k} href={d.href} className="ct-direct-item" data-c-direct>
                      <span className="ct-direct-ic" aria-hidden="true">{d.icon}</span>
                      <span className="ct-direct-meta">
                        <span className="k">{d.k}</span>
                        <span className="v">{d.v}</span>
                      </span>
                      <span className="ct-direct-arrow" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 9h11M10 5l4 4-4 4" />
                        </svg>
                      </span>
                    </a>
                  ))}
                </div>

                <div className="ct-status-row" data-c-meta>
                  <span className="ct-clock">
                    <span className="t">{clock ?? "--:--:--"}</span>
                    <span className="z">Truro · AT</span>
                  </span>
                  <span className="ct-live">
                    <span className="pip" aria-hidden="true" />
                    Mon–Sat desk hours
                  </span>
                </div>

                <ul className="ct-certs" data-c-meta aria-label="Certifications">
                  {CERTS.map((c) => <li key={c} className="ct-cert">{c}</li>)}
                </ul>
              </div>

              {/* ── the quote console ── */}
              <div data-c-console className="ct-console">
                <span className="ct-corner tl" aria-hidden="true" />
                <span className="ct-corner tr" aria-hidden="true" />
                <span className="ct-corner bl" aria-hidden="true" />
                <span className="ct-corner br" aria-hidden="true" />

                {sent ? (
                  <div className="ct-success" role="status">
                    <span className="ct-check" aria-hidden="true">
                      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 13.5 10.5 19 21 7" />
                      </svg>
                    </span>
                    <p className="tag">// Request logged</p>
                    <h3>We&apos;ll call you back.</h3>
                    <p>Dispatch will reach out with a confirmed rate within 15 minutes during business hours. That&apos;s the job.</p>
                    <ul className="ct-next">
                      <li><span className="n">01</span> Dispatch reviews your lane &amp; freight</li>
                      <li><span className="n">02</span> Firm, all-in rate back in ~15 minutes</li>
                      <li><span className="n">03</span> Company iron assigned — same-day pickup</li>
                    </ul>
                    <button type="button" className="ct-reset" onClick={reset}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M11.5 7a4.5 4.5 0 1 1-1.3-3.2M11 1.5V4H8.5" />
                      </svg>
                      Send another request
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="ct-console-head">
                      <span className="ct-console-tag"><span className="sq" aria-hidden="true" />Quote request</span>
                      <span className="ct-console-secure">
                        <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                          <rect x="2.5" y="6" width="9" height="6" rx="1" />
                          <path d="M4.5 6V4.5a2.5 2.5 0 0 1 5 0V6" />
                        </svg>
                        Encrypted
                      </span>
                    </div>
                    <h2>Get a <span className="accent">15-min</span> quote</h2>

                    <div className="ct-progress" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
                    <div className="ct-progress-label" aria-hidden="true">
                      <span>Request detail</span>
                      <span className="pct">{progress}%</span>
                    </div>

                    <form className="ct-form" onSubmit={onSubmit}>
                      <div className="ct-row two">
                        <Input id="c-name" name="name" required autoComplete="name" label="Your name" onChange={track("name")} />
                        <Input id="c-company" name="company" autoComplete="organization" label="Company" onChange={track("company")} />
                      </div>
                      <div className="ct-row two">
                        <Input id="c-phone" name="phone" type="tel" required autoComplete="tel" label="Phone number" onChange={track("phone")} />
                        <Input id="c-email" name="email" type="email" autoComplete="email" label="Email address" onChange={track("email")} />
                      </div>
                      <div className="ct-row two">
                        <Input id="c-origin" name="origin" label="Origin city / state" onChange={track("origin")} />
                        <Input id="c-dest" name="destination" label="Destination city / state" onChange={track("destination")} />
                      </div>

                      <div>
                        <p className="ct-group-label" id="c-freight-label">Freight type</p>
                        <div className="ct-chips" role="radiogroup" aria-labelledby="c-freight-label">
                          {FREIGHT_TYPES.map((t) => (
                            <label key={t} className={`ct-chip${freight === t ? " is-active" : ""}`}>
                              <input
                                type="radio"
                                name="freight"
                                value={t}
                                checked={freight === t}
                                onChange={() => setFreight(t)}
                              />
                              <span>{t}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="ct-textarea-wrap">
                        <label className="sr-only" htmlFor="c-notes">Notes</label>
                        <textarea
                          id="c-notes"
                          name="notes"
                          rows={2}
                          className="ct-textarea"
                          placeholder="Notes — weight, hazmat, temperature, deadlines…"
                          onChange={track("notes")}
                        />
                      </div>

                      <button type="submit" className="btn btn-red ct-submit">
                        <span>Send it to dispatch</span>
                        <svg width="15" height="15" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M3 9h11M10 5l4 4-4 4" />
                        </svg>
                      </button>
                      <p className="ct-consent">
                        No spam, ever. We use your details only to quote and dispatch your freight.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ TERMINALS ══════════ */}
        <section className="ct-terminals" aria-label="Where to reach us">
          <div className="ct-wrap">
            <div className="ct-term-head">
              <div>
                <h2>Two yards, <span className="accent">one network.</span></h2>
              </div>
              <p className="note">Walk-ins welcome at both terminals. Same main line for Dispatch (102), Customs (105), and Safety (106).</p>
            </div>

            <div className="ct-term-grid" data-c-term-grid>
              {TERMINALS.map((t) => (
                <article key={t.city} className="ct-term-card" data-c-term>
                  <div className="ct-term-photo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.img} alt={`Phantom Logistics ${t.city} terminal`} />
                    <span className="ct-term-flag"><span className="pip" aria-hidden="true" />{t.flag}</span>
                    <span className="ct-term-coords">{t.coords}</span>
                  </div>
                  <div className="ct-term-body">
                    <p className="ct-term-tag">{t.tag}</p>
                    <h3>{t.city}</h3>
                    <div className="ct-term-rows">
                      {t.rows.map((r) => (
                        <div key={r.k} className="ct-term-rowx">
                          <span className="k">{r.k}</span>
                          {r.href ? (
                            <a className="v" href={r.href}>{r.v}</a>
                          ) : (
                            <span className="v">{r.v}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ FAQ ══════════ */}
        <section className="ct-faq" aria-label="Frequently asked questions">
          <div className="ct-wrap">
            <div className="ct-faq-grid">
              <div className="ct-faq-head">
                <h2>Questions, <span className="accent">answered.</span></h2>
                <p>Can&apos;t find it here? Call (902) 403-0112 — Dispatch ext 102, Customs ext 105, Safety ext 106.</p>
                <a className="cta" href={`tel:${DISPATCH_TEL}`}>
                  Call dispatch
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 9h11M10 5l4 4-4 4" />
                  </svg>
                </a>
              </div>

              <div className="ct-faq-list" data-c-faq-list>
                {FAQS.map((faq, i) => {
                  const open = openFaq === i;
                  return (
                    <div key={i} className={`ct-faq-item${open ? " open" : ""}`} data-c-faq>
                      <button
                        type="button"
                        className="ct-faq-q"
                        aria-expanded={open}
                        onClick={() => setOpenFaq(open ? null : i)}
                      >
                        <span className="ct-faq-num">{String(i + 1).padStart(2, "0")}</span>
                        <span className="q">{faq.q}</span>
                        <span className="ct-faq-toggle" aria-hidden="true">
                          <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 1v10M1 6h10" /></svg>
                        </span>
                      </button>
                      <div className="ct-faq-a-wrap">
                        <div className="ct-faq-a-inner">
                          <p className="ct-faq-a">{faq.a}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ CLOSING CTA ══════════ */}
        <section data-c-cta className="ct-cta" aria-label="Talk to dispatch">
          <div data-c-cta-bg className="ct-cta-bg" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.sunset} alt="" />
          </div>
          <div className="ct-cta-inner">
            <h2 data-c-cta-rise>Dispatch is <span className="accent">ready.</span></h2>
            <p data-c-cta-rise>
              Real humans on the desk Mon–Fri 8AM–6PM and Sat 10AM–4PM. One call and your freight
              starts moving — no hold music, no broker chain, no excuses.
            </p>
            <div className="ct-cta-row" data-c-cta-rise>
              <a href={`tel:${DISPATCH_TEL}`} className="btn btn-red px-10 py-5">
                <span>Call (902) 403-0112</span>
              </a>
              <Link href="/services" className="btn btn-ghost px-10 py-5">
                <span>See what we run</span>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </PageShell>
  );
}

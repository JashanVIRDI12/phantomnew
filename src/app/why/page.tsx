"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import PageShell from "@/components/PageShell";
import "@/styles/why.css";

/* ── Imagery ──────────────────────────────────────────────────────────────── */
const IMG = {
  aerial: "/hf_20260606_104850_008b5602-bfa5-40a9-a9c8-3020d070d0f2(1).png",
  sunset: "/hf_20260606_104819_db26e803-e1e6-450e-a7e3-24b2f16e33cb(1).png",
  dock: "/hf_20260606_104556_7052f106-a0e2-4aae-a9ad-cc8f8a74266e(1).png",
  yard: "/hf_20260606_104624_2d9fc850-b40b-4e43-a8de-2f9cceecdead(1).png",
  loading: "/hf_20260606_104656_597a0532-bf54-40c9-adad-28423d0fadaa(1).png",
  fleet: "/hf_20260606_105246_4f3378c4-ef89-4fbe-8dda-c5ffff69c467(1).png",
};

const BADGES = ["Defence Canada", "Transport Canada", "Secured Cargo Program", "North America"];

const PROBLEM_ITEMS = [
  "Brokers book loads on carriers you've never vetted",
  "The driver who shows up is unknown — until they don't",
  "When something goes wrong, blame diffuses across three parties",
  "Spot rates shift after you booked. Claims drag on for months.",
];

const EDGES = [
  { n: "01", title: "Company-Owned Fleet", copy: "Every truck is ours. 2,400 units, zero brokered loads. You always know exactly whose equipment is moving your freight.", img: IMG.fleet },
  { n: "02", title: "24/7 Live Dispatch", copy: "Human dispatchers answer at 3 a.m. Same voices, same team. No call centers, no email queues — ever.", img: IMG.dock },
  { n: "03", title: "Live Temp Monitoring", copy: "Real-time thermal watch from pickup to delivery, −40°F to 70°F. Seafood, produce, pharma — all protected.", img: IMG.loading },
  { n: "04", title: "Experienced Drivers", copy: "Company drivers with years of long-haul experience. Not owner-operators. Not strangers. Our team — vetted and committed.", img: IMG.sunset },
  { n: "05", title: "24/7 Secured Yard", copy: "Fenced, lit, and live-monitored around the clock. Your freight never sits in a dark lot between routes.", img: IMG.yard },
  { n: "06", title: "Fully Accountable", copy: "Comprehensive cargo insurance on every load. One responsible party — us — from dock to dock. No he-said-she-said.", img: IMG.aerial },
];

const STATS = [
  { value: 2400, decimals: 0, suffix: "", label: "Company-owned trucks" },
  { value: 98.7, decimals: 1, suffix: "%", label: "On-time, door to door" },
  { value: 24, decimals: 0, suffix: "/7", label: "Live human dispatch" },
  { value: 15, decimals: 0, suffix: " min", label: "Average quote turnaround" },
];

const VS_ROWS = [
  { cat: "Fleet ownership", phantom: "Company-owned, 2,400 units", broker: "Third-party carriers, unknown quality" },
  { cat: "Dispatch", phantom: "24/7 in-house human dispatchers", broker: "Email queues, offshore call centers" },
  { cat: "Visibility", phantom: "Live GPS on every truck", broker: "Carrier-reported, often delayed" },
  { cat: "Coverage", phantom: "All US states + Canada", broker: "Limited network, Canadian gaps" },
  { cat: "Temperature", phantom: "Live monitoring, −40°F to 70°F", broker: "Subcontracted reefers, no real-time watch" },
  { cat: "Security", phantom: "Defence Canada approved, 24/7 yard", broker: "Standard commercial only" },
  { cat: "Accountability", phantom: "One carrier, one contract", broker: "Blame diffuses across the chain" },
  { cat: "Price certainty", phantom: "Quoted rate is the final rate", broker: "Spot rates fluctuate after booking" },
];

const CERTS = [
  { tag: "Government Logistics", title: "Defence Canada Approved", copy: "Cleared to handle sensitive government freight. Security protocols meet Defence Canada's strict carrier requirements — chain of custody door to door.", badge: "DEF" },
  { tag: "Regulatory Compliance", title: "Transport Canada Certified", copy: "Full compliance with Transport Canada regulations. We run legal, documented, and fully accountable on every Canadian lane.", badge: "TC" },
  { tag: "High-Security Freight", title: "Secured Cargo Program", copy: "Approved carrier under the Secured Cargo Program. High-value and sensitive freight moves with protocol-grade protection.", badge: "SCP" },
  { tag: "Coverage", title: "All of North America", copy: "Every US state. Canadian provinces coast to coast. One carrier relationship, one invoice — wherever freight needs to go.", badge: "NA" },
];

const CheckIcon = () => (
  <svg className="ic" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 9.5l3.5 3.5L15 5" />
  </svg>
);
const CrossIcon = () => (
  <svg className="ic" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
    <path d="M4.5 4.5l9 9M13.5 4.5l-9 9" />
  </svg>
);

export default function WhyPage() {
  const root = useRef<HTMLDivElement>(null);

  const fmt = (n: number, d: number) => n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      const splits: InstanceType<typeof SplitText>[] = [];

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* ── HERO ── */
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.from(".why-hero .why-eyebrow", { opacity: 0, y: 14, duration: 0.6 }, 0.1);
        tl.fromTo("[data-hero-line]", { yPercent: 120 }, { yPercent: 0, duration: 1.05, stagger: 0.1 }, 0.2);
        tl.from(".why-hero-sub", { opacity: 0, y: 22, duration: 0.8 }, "-=0.65");
        tl.from(".why-badge", { opacity: 0, y: 16, stagger: 0.06, duration: 0.5 }, "-=0.55");

        gsap.to(".why-hero-bg img", {
          yPercent: 10, ease: "none",
          scrollTrigger: { trigger: ".why-hero", start: "top top", end: "bottom top", scrub: true },
        });

        /* ── PROBLEM statement word reveal ── */
        const stmt = el.querySelector<HTMLElement>(".why-problem-statement");
        if (stmt) {
          const s = new SplitText(stmt, { type: "words", wordsClass: "w" });
          splits.push(s);
          const accent = new Set(["don't", "dont", "own", "their", "trucks."]);
          s.words.forEach((w) => { if (accent.has((w.textContent || "").trim().toLowerCase())) w.classList.add("accent"); });
          ScrollTrigger.create({
            trigger: stmt, start: "top 80%", end: "bottom 55%", scrub: 0.6,
            onUpdate: (self) => {
              const n = Math.round(self.progress * s.words.length);
              s.words.forEach((w, i) => w.classList.toggle("on", i < n));
            },
          });
        }

        gsap.from(".why-prob-item", {
          opacity: 0, x: -30, stagger: 0.1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".why-prob-list", start: "top 82%", once: true },
        });
        gsap.from(".why-prob-aside > *", {
          opacity: 0, y: 36, stagger: 0.12, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".why-prob-aside", start: "top 82%", once: true },
        });
        const probStat = el.querySelector<HTMLElement>("[data-prob-count]");
        if (probStat) {
          const obj = { n: 0 };
          gsap.to(obj, {
            n: 70, duration: 1.8, ease: "power2.out",
            scrollTrigger: { trigger: probStat, start: "top 85%", once: true },
            onUpdate: () => { probStat.textContent = `~${Math.round(obj.n)}%`; },
          });
        }

        /* ── VS rows ── */
        gsap.from(".why-vs-row", {
          opacity: 0, y: 24, stagger: 0.07, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".why-vs-table", start: "top 80%", once: true },
        });

        /* ── EDGE cards reveal ── */
        gsap.from(".why-edge-card", {
          opacity: 0, y: 48, stagger: 0.1, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: ".why-edge-grid", start: "top 82%", once: true },
        });

        /* ── STATS counters ── */
        gsap.from(".why-stat", {
          opacity: 0, y: 36, stagger: 0.1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".why-stats-grid", start: "top 82%", once: true },
        });
        gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((node) => {
          const target = parseFloat(node.dataset.target ?? "0");
          const dec = parseInt(node.dataset.decimals ?? "0");
          const obj = { n: 0 };
          gsap.to(obj, {
            n: target, duration: 1.9, ease: "power2.out",
            scrollTrigger: { trigger: node, start: "top 88%", once: true },
            onUpdate: () => { node.textContent = fmt(obj.n, dec); },
          });
        });

        /* ── CERTS ── */
        gsap.from(".why-cert", {
          opacity: 0, y: 40, stagger: 0.1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".why-certs-grid", start: "top 84%", once: true },
        });

        /* ── CTA ── */
        gsap.to(".why-cta-bg img", {
          scale: 1.12, ease: "none",
          scrollTrigger: { trigger: ".why-cta", start: "top bottom", end: "bottom top", scrub: true },
        });
        gsap.from(".why-cta-inner > *", {
          opacity: 0, y: 40, stagger: 0.1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".why-cta", start: "top 75%", once: true },
        });

        requestAnimationFrame(() => ScrollTrigger.refresh());
      });

      /* generic section-heading reveal (runs in both motion modes-safe blocks below) */
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((node) => {
          gsap.from(node, {
            opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: node, start: "top 86%", once: true },
          });
        });
      });

      return () => {
        splits.forEach((s) => s.revert());
        mm.revert();
      };
    },
    { scope: root }
  );

  return (
    <PageShell>
      <div ref={root} className="why">

        {/* ══════════ HERO ══════════ */}
        <section className="why-hero">
          <div className="why-hero-bg" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.aerial} alt="" />
          </div>
          <div className="why-hero-inner why-wrap">
            <span className="why-eyebrow"><span className="dot" />Why Phantom <span className="accent">/ the full story</span></span>
            <h1 className="why-hero-title">
              <span className="line"><span className="line-in" data-hero-line>We own</span></span>
              <span className="line"><span className="line-in" data-hero-line>every</span></span>
              <span className="line"><span className="line-in" data-hero-line><span className="accent">truck.</span></span></span>
            </h1>
            <p className="why-hero-sub">
              2,400 company-owned units. Defence Canada approved. Transport Canada certified.
              Secured Cargo Program carrier. One call — North America wide.
            </p>
            <ul className="why-badges" aria-label="Certifications">
              {BADGES.map((b) => <li key={b} className="why-badge">{b}</li>)}
            </ul>
          </div>
        </section>

        {/* ══════════ THE PROBLEM ══════════ */}
        <section className="why-problem">
          <div className="why-wrap">
            <span className="why-eyebrow" data-rise><span className="dot" />Chapter 01 <span className="accent">/ the problem</span></span>
            <p className="why-problem-statement">Most carriers don&apos;t own their trucks.</p>

            <div className="why-problem-grid">
              <ul className="why-prob-list">
                {PROBLEM_ITEMS.map((item) => (
                  <li key={item} className="why-prob-item">
                    <span className="x"><CrossIcon /></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="why-prob-aside">
                <div className="why-prob-stat">
                  <p className="k">Industry average</p>
                  <p className="big" data-prob-count>~70%</p>
                  <p>of loads booked through brokers are moved by carriers the shipper has never approved, audited, or met.</p>
                </div>
                <div className="why-prob-result">
                  <p className="k">The result</p>
                  <p>Unexpected carriers. Unknown drivers. Cargo in the wrong hands. That&apos;s what the broker model delivers.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ VS COMPARISON ══════════ */}
        <section className="why-vs why-section--light">
          <div className="why-wrap">
            <div className="why-vs-head">
              <span className="why-eyebrow" data-rise><span className="dot" />Chapter 02 <span className="accent">/ the comparison</span></span>
              <h2 className="why-section-h" data-rise>Phantom vs. <span className="accent">the broker market</span></h2>
            </div>

            <div className="why-vs-table">
              <div className="why-vs-hrow" aria-hidden="true">
                <div className="cat">Category</div>
                <div className="ph">Phantom</div>
                <div className="br">Broker</div>
              </div>
              {VS_ROWS.map((r) => (
                <div className="why-vs-row" key={r.cat}>
                  <div className="why-vs-cat">{r.cat}</div>
                  <div className="why-vs-cell yes"><CheckIcon /><span className="why-vs-tag">Phantom</span>{r.phantom}</div>
                  <div className="why-vs-cell no"><CrossIcon /><span className="why-vs-tag">Broker</span>{r.broker}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ THE EDGE (6 reasons) ══════════ */}
        <section className="why-edge">
          <div className="why-wrap why-edge-head">
            <span className="why-eyebrow" data-rise><span className="dot" />Chapter 03 <span className="accent">/ the edge</span></span>
            <h2 className="why-section-h" data-rise>Six reasons we <span className="accent">run better.</span></h2>
            <p className="why-edge-dek" data-rise>
              Own the truck, own the outcome. Here&apos;s what running 100% company iron actually
              buys you — on every load, every lane.
            </p>
          </div>

          <div className="why-wrap">
            <div className="why-edge-grid">
              {EDGES.map((e) => (
                <article className="why-edge-card" key={e.n}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="why-edge-img" src={e.img} alt={`${e.n} — ${e.title}`} loading="lazy" />
                  <span className="why-edge-ghost" aria-hidden="true">{e.n}</span>
                  <span className="why-edge-n">Reason {e.n}</span>
                  <div className="why-edge-body">
                    <h3>{e.title}</h3>
                    <span className="why-edge-rule" aria-hidden="true" />
                    <p>{e.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ THE NUMBERS ══════════ */}
        <section className="why-stats">
          <div className="why-stats-bg" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.sunset} alt="" />
          </div>
          <div className="why-stats-inner why-wrap">
            <span className="why-eyebrow" data-rise><span className="dot" />Chapter 04 <span className="accent">/ the scale</span></span>
            <h2 className="why-section-h" data-rise>Numbers that <span className="accent">prove it.</span></h2>
            <div className="why-stats-grid">
              {STATS.map((s) => (
                <div className="why-stat" key={s.label}>
                  <div className="v">
                    <span data-counter data-target={s.value} data-decimals={s.decimals}>{fmt(0, s.decimals)}</span>
                    {s.suffix && <span className="u">{s.suffix}</span>}
                  </div>
                  <div className="l">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ CERTIFICATIONS ══════════ */}
        <section className="why-certs why-section--light">
          <div className="why-wrap">
            <div className="why-certs-head">
              <span className="why-eyebrow" data-rise><span className="dot" />Chapter 05 <span className="accent">/ the proof</span></span>
              <h2 className="why-section-h" data-rise>Approved. Certified. <span className="accent">Trusted.</span></h2>
            </div>
            <div className="why-certs-grid">
              {CERTS.map((c) => (
                <article className="why-cert" key={c.title}>
                  <span className="ghost" aria-hidden="true">{c.badge}</span>
                  <p className="tag">{c.tag}</p>
                  <h3>{c.title}</h3>
                  <p>{c.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ CTA ══════════ */}
        <section className="why-cta">
          <div className="why-cta-bg" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.dock} alt="" />
          </div>
          <div className="why-cta-inner why-wrap">
            <span className="why-eyebrow"><span className="dot" />Ship with confidence</span>
            <h2>Ship it and <span className="accent">forget it.</span></h2>
            <p>One carrier. One invoice. North America wide. That&apos;s the Phantom promise — every time, every lane.</p>
            <Link href="/contact" className="btn btn-red px-12 py-5">GET A FREE QUOTE</Link>
          </div>
        </section>

        <div className="why-sign">One carrier · One invoice · Zero excuses — Phantom Logistics</div>
      </div>
    </PageShell>
  );
}

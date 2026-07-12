"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import PageShell from "@/components/PageShell";
import { RevealText } from "@/components/ui/reveal-text";
import { MagicText } from "@/components/ui/magic-text";
import type { Service } from "@/data/services";
import "@/styles/service-reefer.css";

/* Real Phantom lanes — one photo per letter of FROZEN (hover reveal) */
const REVEAL_IMGS = [
  "/hf_20260606_104556_7052f106-a0e2-4aae-a9ad-cc8f8a74266e(1).png", // F
  "/hf_20260606_104624_2d9fc850-b40b-4e43-a8de-2f9cceecdead(1).png", // R
  "/hf_20260606_104656_597a0532-bf54-40c9-adad-28423d0fadaa(1).png", // O
  "/hf_20260606_104819_db26e803-e1e6-450e-a7e3-24b2f16e33cb(1).png", // Z
  "/hf_20260606_104850_008b5602-bfa5-40a9-a9c8-3020d070d0f2(1).png", // E
  "/hf_20260606_105246_4f3378c4-ef89-4fbe-8dda-c5ffff69c467(1).png", // N
];

/* ── Cold-chain domain data (presentation-only, page-specific) ────────────── */
const TEMP_MIN = -40;
const TEMP_MAX = 70;
const tempToPct = (t: number) => ((t - TEMP_MIN) / (TEMP_MAX - TEMP_MIN)) * 100;

type Marker = { t: number; label: string; side: "up" | "down" };
const MARKERS: Marker[] = [
  { t: -20, label: "Deep Frozen", side: "down" },
  { t: 0, label: "Frozen Protein", side: "up" },
  { t: 30, label: "Live Seafood", side: "down" },
  { t: 38, label: "Fresh Produce", side: "up" },
  { t: 46, label: "Pharma 2–8°C", side: "down" },
  { t: 60, label: "Chocolate", side: "up" },
];

const ZONES: Array<{ max: number; name: string }> = [
  { max: -10, name: "Deep Frozen Zone" },
  { max: 12, name: "Frozen Zone" },
  { max: 34, name: "Chilled Zone" },
  { max: 50, name: "Fresh Zone" },
  { max: 999, name: "Cool-Ambient Zone" },
];

/* spec chip per checkpoint (presentation detail, indexed by step order) */
const PROCESS_TAGS = ["T−2:00 HRS", "FIRST READ ≤ 15 MIN", "24/7 · ±2°F ALERT", "FULL THERMAL AUDIT"];

const CARGO = [
  { temp: "−10°F to −20°F", title: "Frozen & Ice Cream", copy: "Hard-frozen product held rock-solid edge to edge — no soft spots, no refreeze rings." },
  { temp: "28°F to 34°F", title: "Live Seafood", copy: "Aerated, oxygen-monitored tanks. Lobster, crab and shellfish delivered alive and lively." },
  { temp: "34°F to 40°F", title: "Fresh Produce", copy: "Field-fresh humidity control. Greens, berries and vegetables that arrive looking picked today." },
  { temp: "33°F to 39°F", title: "Dairy & Protein", copy: "Tight chilled band for milk, cheese and fresh meat — shelf life protected, brand protected." },
  { temp: "36°F to 46°F", title: "Pharmaceuticals", copy: "Validated 2–8°C lanes with downloadable audit trails for compliance-critical loads." },
  { temp: "55°F to 65°F", title: "Chocolate & Confection", copy: "Bloom-free temperature holds that keep premium confection glossy and intact." },
];

export default function RefrigeratedClient({ service }: { service: Service }) {
  const root = useRef<HTMLDivElement>(null);

  const fmt = (n: number, d: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* ── HERO ── */
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.from(".rf-hero .rf-eyebrow", { opacity: 0, y: 14, duration: 0.6 }, 0.1);
        tl.fromTo("[data-hero-line]", { yPercent: 120 }, { yPercent: 0, duration: 1.05, stagger: 0.09 }, 0.2);
        tl.from(".rf-hero-sub", { opacity: 0, y: 22, duration: 0.8 }, "-=0.7");
        tl.from(".rf-hero-actions", { opacity: 0, y: 18, duration: 0.7 }, "-=0.6");
        tl.from(".rf-readout", { opacity: 0, y: 40, scale: 0.96, duration: 0.9, ease: "power3.out" }, "-=0.8");

        // parallax hero image
        gsap.to(".rf-hero-bg img", {
          yPercent: 12, ease: "none",
          scrollTrigger: { trigger: ".rf-hero", start: "top top", end: "bottom top", scrub: true },
        });

        // live readout jitter — feels like a real sensor breathing around setpoint
        const readoutEl = el.querySelector<HTMLElement>("[data-readout]");
        if (readoutEl) {
          const p = { n: 34.2 };
          const tick = () => {
            gsap.to(p, {
              n: 33.9 + Math.random() * 0.5,
              duration: 1.1 + Math.random() * 0.6,
              ease: "sine.inOut",
              onUpdate: () => { readoutEl.textContent = p.n.toFixed(1); },
              onComplete: tick,
            });
          };
          tick();
        }

        /* ── THESIS / PRINCIPLE reveal handled by <MagicText> (framer-motion) ── */

        /* ── TEMPERATURE SPECTRUM — scroll-driven sweep ── */
        const cursor = el.querySelector<HTMLElement>("[data-spec-cursor]");
        const bigNum = el.querySelector<HTMLElement>("[data-spec-temp]");
        const cargoLbl = el.querySelector<HTMLElement>("[data-spec-cargo]");
        const flagNum = el.querySelector<HTMLElement>("[data-spec-flagtemp]");
        const markEls = gsap.utils.toArray<HTMLElement>(".rf-spec-mark");
        if (cursor && bigNum) {
          // reset to the cold-start defaults on every (re)mount so stale
          // imperative DOM state (e.g. from dev hot-reloads) can't linger
          cursor.style.left = "0%";
          if (bigNum.childNodes[0]) bigNum.childNodes[0].textContent = "−40";
          if (flagNum) flagNum.textContent = "−40";
          if (cargoLbl) cargoLbl.textContent = "Deep Frozen Zone";
          markEls.forEach((m) => m.classList.remove("is-active"));

          const sweep = { p: 0 };
          gsap.to(sweep, {
            p: 1, ease: "none",
            scrollTrigger: { trigger: ".rf-spectrum", start: "top 65%", end: "bottom 70%", scrub: 1 },
            onUpdate: () => {
              const pct = sweep.p * 100;
              cursor.style.left = `${pct}%`;
              const temp = TEMP_MIN + sweep.p * (TEMP_MAX - TEMP_MIN);
              const label = `${temp >= 0 ? "" : "−"}${Math.abs(temp).toFixed(0)}`;
              bigNum.childNodes[0].textContent = label;
              if (flagNum) flagNum.textContent = label;

              // activate nearest marker within 4°F, else show zone name
              let near: Marker | null = null;
              let best = 4;
              for (const m of MARKERS) {
                const d = Math.abs(m.t - temp);
                if (d < best) { best = d; near = m; }
              }
              markEls.forEach((mEl, i) => mEl.classList.toggle("is-active", near === MARKERS[i]));
              if (cargoLbl) {
                if (near) cargoLbl.textContent = near.label;
                else cargoLbl.textContent = (ZONES.find((z) => temp <= z.max) ?? ZONES[ZONES.length - 1]).name;
              }
            },
          });
        }

        /* ── THERMAL WATCH — trace draw-on + readouts ── */
        const trace = el.querySelector<SVGPathElement>("[data-trace]");
        const traceDot = el.querySelector<SVGCircleElement>("[data-trace-dot]");
        if (trace) {
          const len = trace.getTotalLength();
          gsap.set(trace, { strokeDasharray: len, strokeDashoffset: len });
          gsap.to(trace, {
            strokeDashoffset: 0, ease: "none",
            scrollTrigger: { trigger: ".rf-console", start: "top 78%", end: "bottom 70%", scrub: 1,
              onUpdate: (self) => {
                if (traceDot) {
                  const pt = trace.getPointAtLength(len * self.progress);
                  traceDot.setAttribute("cx", String(pt.x));
                  traceDot.setAttribute("cy", String(pt.y));
                }
              },
            },
          });
        }
        gsap.from(".rf-watch-copy > *", {
          opacity: 0, y: 30, duration: 0.7, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: ".rf-watch", start: "top 75%", once: true },
        });

        /* ── METRICS counters ── */
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((node) => {
          const end = Number(node.dataset.count);
          const dec = Number(node.dataset.dec ?? 0);
          const proxy = { n: 0 };
          gsap.to(proxy, {
            n: end, duration: 2, ease: "power2.out",
            scrollTrigger: { trigger: node, start: "top 88%", once: true },
            onUpdate: () => { node.firstChild!.textContent = fmt(proxy.n, dec); },
          });
        });
        gsap.from(".rf-metric", {
          opacity: 0, y: 36, stagger: 0.1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".rf-metrics", start: "top 82%", once: true },
        });

        /* ── PROCESS rail ── */
        gsap.fromTo(".rf-rail-fill", { scaleY: 0 }, {
          scaleY: 1, ease: "none",
          scrollTrigger: { trigger: ".rf-rail", start: "top 60%", end: "bottom 75%", scrub: 1 },
        });
        gsap.utils.toArray<HTMLElement>(".rf-step").forEach((step) => {
          ScrollTrigger.create({
            trigger: step, start: "top 65%", end: "bottom 55%",
            onEnter: () => step.classList.add("is-active"),
            onEnterBack: () => step.classList.add("is-active"),
            onLeaveBack: () => step.classList.remove("is-active"),
          });
        });
        gsap.from(".rf-step", {
          opacity: 0, x: -28, stagger: 0.12, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".rf-rail", start: "top 70%", once: true },
        });

        /* ── CARGO cards ── */
        gsap.from(".rf-cargo-card", {
          opacity: 0, y: 40, stagger: 0.08, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".rf-cargo-grid", start: "top 82%", once: true },
        });

        /* ── CTA ── */
        gsap.to(".rf-cta-bg img", {
          scale: 1.12, ease: "none",
          scrollTrigger: { trigger: ".rf-cta", start: "top bottom", end: "bottom top", scrub: true },
        });
        gsap.from(".rf-cta-inner > *", {
          opacity: 0, y: 40, stagger: 0.1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".rf-cta", start: "top 72%", once: true },
        });

        requestAnimationFrame(() => ScrollTrigger.refresh());
      });

      return () => {
        mm.revert();
      };
    },
    { scope: root }
  );

  return (
    <PageShell>
      <div ref={root} className="rf">
        <div className="rf-atmos" aria-hidden="true" />

        {/* ══════════ HERO ══════════ */}
        <section className="rf-hero">
          <div className="rf-hero-bg" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={service.img} alt="" />
          </div>

          <div className="rf-hero-inner rf-wrap">
            {/* top meta line */}
            <div className="rf-hero-top">
              <span className="rf-hero-toptag">North America · 48 States</span>
            </div>

            {/* headline */}
            <h1 className="rf-hero-title">
              <span className="rf-line"><span className="rf-line-in" data-hero-line>The cold</span></span>
              <span className="rf-line"><span className="rf-line-in" data-hero-line><span className="ice">chain,</span></span></span>
              <span className="rf-line"><span className="rf-line-in" data-hero-line>unbroken.</span></span>
            </h1>

            {/* bottom bar: lead copy + telemetry card */}
            <div className="rf-hero-bottom">
              <div className="rf-hero-lead">
                <p className="rf-hero-sub">
                  Temperature integrity is non-negotiable. Carrier-owned reefers, redundant
                  cooling, and a 24/7 thermal watch that protects your product — and your
                  brand — on every lane across North America.
                </p>
                <div className="rf-hero-actions">
                  <Link href="/contact" className="btn btn-red px-10 py-4">GET A FIRM QUOTE</Link>
                  <a href="tel:+19024030112" className="rf-phone"><span className="pulse" />(902) 403-0112</a>
                </div>
              </div>

              {/* live readout widget */}
              <div className="rf-readout">
                <div className="rf-readout-top">
                  <span className="rf-readout-label">Trailer 4471 · Reefer</span>
                  <span className="rf-readout-live"><span className="d" />LIVE</span>
                </div>
                <div className="rf-readout-temp"><span data-readout>34.2</span><span className="u">°F</span></div>
                <div className="rf-readout-foot">
                  <div>Setpoint<b>34.0°F</b></div>
                  <div>Status<b style={{ color: "var(--ice)" }}>In Spec</b></div>
                  <div>Lane<b>YYZ → LAX</b></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ THESIS / PRINCIPLE ══════════ */}
        <section className="rf-thesis rf-wrap">
          <MagicText
            className="rf-magic"
            text="Most carriers move freight. We hold a temperature — exact, unbroken, every degree of the way."
            highlightWords={["temperature", "exact", "unbroken", "every", "degree"]}
            highlightClassName="rf-magic-hl"
          />
        </section>

        {/* ══════════ TEMPERATURE SPECTRUM ══════════ */}
        <section className="rf-spectrum rf-wrap">
          <div className="rf-spec-head">
            <h2>One fleet. The entire temperature spectrum.</h2>
            <div className="rf-spec-readout">
              <div className="rf-spec-readout-k">Live setpoint</div>
              <div className="big" data-spec-temp>{"−40"}<span className="u">°F</span></div>
              <div className="cargo" data-spec-cargo>Deep Frozen Zone</div>
            </div>
          </div>

          <div className="rf-spec-gauge">
            <div className="rf-spec-bar" role="img" aria-label="Temperature range from -40 to 70 degrees Fahrenheit with cargo types positioned by ideal temperature">
              {/* graduation ruler */}
              <div className="rf-spec-ticks" aria-hidden="true">
                {Array.from({ length: 21 }).map((_, i) => (
                  <span key={i} className={`rf-tick${i % 5 === 0 ? " maj" : ""}`} />
                ))}
              </div>

              {/* moving needle + readout flag */}
              <div className="rf-spec-cursor" data-spec-cursor style={{ left: "0%" }}>
                <div className="rf-spec-flag"><span data-spec-flagtemp>−40</span><span className="u">°F</span></div>
              </div>

              {MARKERS.map((m) => (
                <div key={m.label} className={`rf-spec-mark ${m.side}`} style={{ left: `${tempToPct(m.t)}%` }}>
                  {m.side === "up" && <span className="lbl">{m.label}</span>}
                  <span className="pin" />
                  {m.side === "down" && <span className="lbl">{m.label}</span>}
                </div>
              ))}
            </div>
            <div className="rf-spec-scale">
              <span>−40°F</span><span>−12°F</span><span>15°F</span><span>42°F</span><span>70°F</span>
            </div>
          </div>

          <p className="rf-spec-note">
            From <b>deep-frozen −40°F</b> to <b>cool-ambient 70°F</b> — multi-temp zones in a single
            trailer, so mixed loads each ride at their own ideal temperature.
          </p>
        </section>

        {/* ══════════ THERMAL WATCH CONSOLE ══════════ */}
        <section className="rf-watch rf-wrap">
          <div className="rf-watch-grid">
            <div className="rf-watch-copy">
              <h2>We don’t hope it stayed cold. We watch it.</h2>
              <p>
                Every reefer streams temperature to a 24/7 monitoring center. Cross the
                safe band by even ±2°F and our team is alerted — and moving — before the
                product ever notices.
              </p>
              <div className="rf-watch-stats">
                <div>
                  <div className="v"><span data-count="99.4" data-dec="1">0.0</span>%</div>
                  <div className="l">temp compliance rate</div>
                </div>
                <div>
                  <div className="v"><span data-count="42" data-dec="0">0</span></div>
                  <div className="l">min mean time to recovery</div>
                </div>
              </div>
            </div>

            {/* the console */}
            <div className="rf-console">
              <div className="rf-console-bar">
                <span className="title">Reefer 4471 · 24h thermal trace</span>
                <span className="live"><span className="d" />MONITORING</span>
              </div>
              <div className="rf-console-body">
                <svg className="rf-chart" viewBox="0 0 600 240" preserveAspectRatio="none" aria-hidden="true">
                  {/* gridlines */}
                  <line className="grid-line" x1="0" y1="60" x2="600" y2="60" />
                  <line className="grid-line" x1="0" y1="180" x2="600" y2="180" />
                  {/* safe band (setpoint ±2°F) */}
                  <rect className="band" x="0" y="100" width="600" height="40" />
                  <line className="set-line" x1="0" y1="120" x2="600" y2="120" />
                  {/* the live trace */}
                  <path className="trace" data-trace
                    d="M0,122 L40,118 L80,124 L120,116 L160,121 L200,128 L240,119 L280,123 L320,115 L360,125 L400,120 L440,117 L480,126 L520,121 L560,118 L600,122" />
                  <circle className="dot" data-trace-dot cx="0" cy="122" r="4" />
                  {/* axis labels */}
                  <text className="axis-l" x="6" y="56">+2°F</text>
                  <text className="axis-l" x="6" y="116">SET</text>
                  <text className="axis-l" x="6" y="176">−2°F</text>
                </svg>
              </div>
              <div className="rf-console-foot">
                <div className="cell"><div className="k">Current</div><div className="val ok">33.9°F</div></div>
                <div className="cell"><div className="k">24h Range</div><div className="val">33.6–34.4°F</div></div>
                <div className="cell"><div className="k">Excursions</div><div className="val ok">0</div></div>
                <div className="cell"><div className="k">Door Events</div><div className="val">3</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ METRICS ══════════ */}
        <section className="rf-metrics">
          <div className="rf-wrap">
            <div className="rf-metrics-grid">
              <div className="rf-metric">
                <div className="v"><span data-count="870" data-dec="0">0</span></div>
                <div className="l">carrier-owned reefers on the road</div>
              </div>
              <div className="rf-metric">
                <div className="v"><span data-count="99.4" data-dec="1">0.0</span><span className="u">%</span></div>
                <div className="l">temperature compliance rate</div>
              </div>
              <div className="rf-metric">
                <div className="v"><span data-count="42" data-dec="0">0</span><span className="u"> min</span></div>
                <div className="l">mean time to thermal recovery</div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ PROCESS ══════════ */}
        <section className="rf-process rf-wrap">
          <div className="rf-process-grid">
            {/* sticky heading + framing */}
            <div className="rf-process-aside">
              <h2>Four checkpoints.<br />Zero broken links.</h2>
              <p className="rf-process-lead">
                Every Phantom reefer load clears four control gates. Miss none, break
                nothing — the chain stays sealed from dock to door.
              </p>
              <div className="rf-process-stat">
                <span className="v">±2<span className="u">°F</span></span>
                <span className="l">alert threshold, watched around the clock</span>
              </div>
            </div>

            {/* timeline */}
            <div className="rf-rail">
              <div className="rf-rail-track" aria-hidden="true" />
              <div className="rf-rail-fill" aria-hidden="true" />
              {service.process.map((step, i) => (
                <div className="rf-step" key={step.n}>
                  <div className="rf-step-head">
                    <span className="rf-step-dot" aria-hidden="true" />
                    <span className="rf-step-num">{step.n}</span>
                    <span className="rf-step-tag">{PROCESS_TAGS[i]}</span>
                  </div>
                  <div className="rf-step-body">
                    <h3>{step.title}</h3>
                    <p>{step.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ CARGO SPECIALTIES ══════════ */}
        <section className="rf-cargo rf-wrap">
          <div className="rf-cargo-head">
            <h2>Specialists in the product that can’t wait.</h2>
          </div>
          <div className="rf-cargo-grid">
            {CARGO.map((c) => (
              <article className="rf-cargo-card" key={c.title}>
                <div className="temp">{c.temp}</div>
                <h3>{c.title}</h3>
                <p>{c.copy}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ══════════ INTERACTIVE WORD ══════════ */}
        <section className="rf-reveal rf-wrap">
          <div className="rf-reveal-stage">
            <RevealText
              text="FROZEN"
              textColor="text-paper"
              overlayColor="text-red"
              fontSize="text-[clamp(3.4rem,17vw,15rem)]"
              letterDelay={0.09}
              overlayDelay={0.06}
              overlayDuration={0.45}
              letterImages={REVEAL_IMGS}
            />
          </div>
          <p className="rf-reveal-note">Frozen, chilled, or fresh — moved on company-owned, live-monitored reefers.</p>
        </section>

        {/* ══════════ CTA ══════════ */}
        <section className="rf-cta">
          <div className="rf-cta-bg" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={service.img} alt="" />
          </div>
          <div className="rf-cta-inner rf-wrap">
            <h2>Your cold chain,<br /><span className="ice">never broken.</span></h2>
            <p>Tell us your lanes, your product, and your temperature spec. A firm rate comes back fast — and every mile after runs on company-owned, live-monitored reefers.</p>

            <div className="rf-diffs">
              {service.differentiators.map((d) => (
                <div className="rf-diff" key={d}>{d}</div>
              ))}
            </div>

            <div className="rf-cta-actions">
              <Link href="/contact" className="btn btn-red px-12 py-5">START THIS MOVE</Link>
              <Link href="/services" className="rf-back">← Back to all services</Link>
            </div>
          </div>
        </section>

        <div className="rf-sign">One carrier · One invoice · One unbroken cold chain — Phantom Logistics</div>
      </div>
    </PageShell>
  );
}

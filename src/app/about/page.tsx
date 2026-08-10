"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import PageShell from "@/components/PageShell";
import "@/styles/about.css";

/* ── Imagery ──────────────────────────────────────────────────────────────── */
const IMG = {
  dock:    "/dock.webp",
  yard:    "/yard.webp",
  sunset:  "/sunset.webp",
  aerial:  "/aerial.webp",
  fleet:   "/fleet.webp",
};

const HERO_LINES = [
  [{ t: "Built", a: false }, { t: "for", a: false }],
  [{ t: "the", a: false }, { t: "long", a: false }],
  [{ t: "haul.", a: true }],
];

const META = [
  { v: "2017", l: "Founded", em: false },
  { v: "50+", l: "Company Trucks", em: false },
  { v: "48", l: "States", em: false },
  { v: "98.7%", l: "On-Time", em: true },
];

const MANIFESTO =
  "We started with twelve trucks and one promise: if we say it moves, it moves. No brokers. No handoffs. No excuses. Every mile, ours.";
const MANIFESTO_ACCENT = ["it", "moves,", "it", "moves."]; // emphasised cluster

const TIMELINE = [
  { year: "2017", img: IMG.yard,    h: "Twelve trucks, one promise", c: "Founded in Truro, NS with a dozen units and a refusal to broker a single load." },
  { year: "2019", img: IMG.dock,    h: "Twenty-five strong",         c: "Crossed 25 company-owned units and pushed our first lanes across Atlantic Canada." },
  { year: "2021", img: IMG.fleet,   h: "East coast, owned",           c: "40 tractors running the Maritimes and beyond — every driver an employee, every truck ours." },
  { year: "2022", img: IMG.sunset,  h: "Ontario terminal",            c: "The Bolton, ON location opens. Phantom freight now moves coast to coast across Canada." },
  { year: "2024", img: IMG.aerial,  h: "50+ units, 48 states",        c: "The fastest organic fleet growth in the industry — without a single brokered mile." },
  { year: "2025", img: IMG.fleet,   h: "Intelligence on every lane",  c: "AI-driven dispatch and live tracking roll out across the entire fleet." },
];

const STATS = [
  { v: "50", u: "+", l: "Company-owned trucks", dec: 0 },
  { v: "48",    u: "", l: "States covered", dec: 0 },
  { v: "98.7",  u: "%", l: "On-time, door to door", dec: 1 },
  { v: "9",     u: "+", l: "Years asset-based", dec: 0 },
];

const VALUES = [
  { n: "01", t: "Ownership",     c: "We own every truck, every trailer, every mile. No pass-through, no excuses — the outcome is always in our hands.", img: IMG.fleet },
  { n: "02", t: "Transparency",  c: "One dot on the map. One invoice. Nothing hidden between the quote you accept and the freight we deliver.", img: IMG.aerial },
  { n: "03", t: "Reliability",   c: "98.7% on-time isn't luck. It's discipline, driver culture, and the control that only company assets allow.", img: IMG.sunset },
  { n: "04", t: "Partnership",   c: "Your freight moves like it's the only load we have. Because to the rep who owns your account, it is.", img: IMG.fleet },
];

const FLEET = [
  { src: "/services/photos/dry-van-trucking.webp", t: "Dry Van" },
  { src: "/services/photos/dedicated-fleet.webp", t: "Dedicated Fleet" },
  { src: "/services/photos/long-haul-trucking.webp", t: "Long Haul" },
  { src: "/services/photos/expedited-trucking.webp", t: "Expedited" },
  { src: "/services/photos/ltl-trucking.webp", t: "LTL" },
  { src: "/services/photos/hotshot-trucking.webp", t: "Hotshot" },
];

const LOCATIONS = [
  { tag: "Home Terminal", city: "Truro, NS", addr: "415 Willow St\nTruro, NS B2N 6T2", phone: "(902) 403-0112" },
  { tag: "Second Location", city: "Bolton, ON", addr: "365 Healey Rd Unit 19\nBolton, ON L7E 5C1", phone: "(902) 403-0112" },
];

function fmt(n: number, d: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
}

export default function AboutPage() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    html.style.background = "#fbfaf7";
    body.style.background = "#fbfaf7";
    return () => {
      html.style.background = "";
      body.style.background = "";
    };
  }, []);

  const onTilt = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const c = e.currentTarget, r = c.getBoundingClientRect();
    const rx = (0.5 - (e.clientY - r.top) / r.height) * 10;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 10;
    c.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  };
  const onTiltOut = (e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "perspective(800px) rotateX(0) rotateY(0)";
  };

  useGSAP(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    const splits: InstanceType<typeof SplitText>[] = [];

    /* ── TIMELINE horizontal pin — desktop only (≥960px) ──
       Registered before the rest of the page's ScrollTriggers on purpose:
       this section sits above VALUES/STATS/etc. in the DOM and pins with a
       large spacer. If its trigger were created *after* theirs, GSAP would
       measure their positions before that spacer exists, then never
       correct them on refresh — the exact bug that made the VALUES
       scrollytelling latch onto its last item immediately. */
    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 960px)", () => {
      const track = el.querySelector<HTMLElement>(".ab-tl-track");
      const tlSection = el.querySelector<HTMLElement>(".ab-timeline");
      const fill = el.querySelector<HTMLElement>(".ab-tl-progress span");
      if (track && tlSection) {
        const getScroll = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -getScroll(),
          ease: "none",
          scrollTrigger: {
            trigger: tlSection,
            start: "top top",
            end: () => "+=" + getScroll(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => { if (fill) fill.style.width = (self.progress * 100).toFixed(1) + "%"; },
          },
        });
      }
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      /* ── HERO ── */
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".ab-kicker-hero", { opacity: 0, y: 16, duration: .6 }, .1);
      tl.fromTo(".ab-line-in", { yPercent: 118 }, { yPercent: 0, duration: 1.05, stagger: .08 }, .2);
      tl.fromTo(".ab-hero-strip", { clipPath: "inset(0 0 100% 0 round 22px)" }, { clipPath: "inset(0 0 0% 0 round 22px)", duration: 1.3, ease: "expo.inOut" }, .35);
      tl.fromTo(".ab-hero-sub", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: .8 }, "-=.7");
      tl.fromTo(".ab-meta", { opacity: 0, y: 18 }, { opacity: 1, y: 0, stagger: .08, duration: .6 }, "-=.6");

      gsap.to(".ab-hero-strip img", { yPercent: 14, ease: "none", scrollTrigger: { trigger: ".ab-hero-strip", start: "top bottom", end: "bottom top", scrub: true } });

      /* ── MANIFESTO word reveal ── */
      const mani = el.querySelector<HTMLElement>(".ab-manifesto p");
      if (mani) {
        const split = new SplitText(mani, { type: "words", wordsClass: "ab-word" });
        splits.push(split);
        // tag accent words
        split.words.forEach((w) => {
          if (MANIFESTO_ACCENT.includes((w.textContent || "").trim())) w.classList.add("accent");
        });
        gsap.fromTo(split.words, { opacity: .16 }, {
          opacity: 1, ease: "none", stagger: .25,
          scrollTrigger: { trigger: mani, start: "top 78%", end: "bottom 55%", scrub: true },
        });
      }

      /* ── STATS counters ── */
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((node) => {
        const end = Number(node.dataset.count);
        const dec = Number(node.dataset.dec ?? 0);
        const proxy = { n: 0 };
        gsap.to(proxy, {
          n: end, duration: 1.8, ease: "power2.out",
          scrollTrigger: { trigger: node, start: "top 88%" },
          onUpdate() { node.textContent = fmt(proxy.n, dec); },
        });
      });
      gsap.fromTo(".ab-stat",
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, stagger: .1, duration: .7, ease: "power3.out",
          scrollTrigger: { trigger: ".ab-stats", start: "top 85%", once: true } });

      /* ── VALUES scrollytelling ── */
      const imgs = gsap.utils.toArray<HTMLElement>(".ab-vx-img");
      const items = gsap.utils.toArray<HTMLElement>(".ab-vitem");
      const numEl = el.querySelector<HTMLElement>(".ab-sticky-num .cur");
      const setActive = (i: number) => {
        imgs.forEach((im, idx) => im.classList.toggle("is-active", idx === i));
        items.forEach((it, idx) => {
          it.classList.toggle("is-active", idx === i);
          it.classList.toggle("is-dim", idx !== i);
        });
        if (numEl) numEl.textContent = String(i + 1).padStart(2, "0");
      };
      setActive(0);
      items.forEach((it, i) => {
        ScrollTrigger.create({
          trigger: it,
          start: "top 55%",
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        });
      });

      /* ── LOCATIONS ── */
      gsap.fromTo(".ab-loc-card",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: .12, duration: .8, ease: "power3.out",
          scrollTrigger: { trigger: ".ab-loc-grid", start: "top 85%", once: true } });

      /* ── CTA finale ── */
      gsap.fromTo(".ab-cta-bg img", { scale: 1.18 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".ab-cta", start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(".ab-cta-inner > *",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: .1, duration: .9, ease: "power3.out",
          scrollTrigger: { trigger: ".ab-cta", start: "top 75%", once: true } });

      /* Images loading after this point (common on a page this image-heavy) shift
         layout height, leaving every ScrollTrigger position computed here stale —
         that's what made the VALUES scrollytelling latch onto the last item
         immediately. Refresh again once everything has actually finished loading. */
      const refreshAll = () => ScrollTrigger.refresh();
      requestAnimationFrame(refreshAll);
      window.addEventListener("load", refreshAll);
      const pageImages = Array.from(el.querySelectorAll("img"));
      let pendingImages = pageImages.filter((im) => !im.complete).length;
      pageImages.forEach((im) => {
        if (!im.complete) {
          im.addEventListener(
            "load",
            () => {
              pendingImages -= 1;
              if (pendingImages === 0) refreshAll();
            },
            { once: true }
          );
        }
      });

      return () => {
        splits.forEach((s) => s.revert());
        window.removeEventListener("load", refreshAll);
      };
    });

    /* reduced motion — everything visible, no pin */
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".ab-line-in", { yPercent: 0 });
      gsap.set(".ab-hero-strip", { clipPath: "inset(0 0 0% 0 round 22px)" });
      gsap.set(".ab-hero-sub,.ab-meta,.ab-stat,.ab-vitem,.ab-loc-card,.ab-cta-inner > *", { clearProps: "all", opacity: 1 });
      el.querySelectorAll(".ab-vx-img").forEach((im, i) => { if (i === 0) im.classList.add("is-active"); });
      document.querySelectorAll<HTMLElement>("[data-count]").forEach((n) => { n.textContent = n.dataset.count + ""; });
    });

    return () => mm.revert();
  }, { scope: root });

  return (
    <PageShell>
      <div ref={root} className="ab">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <header className="ab-hero">
          <h1 className="ab-hero-head ab-display" aria-label="Built for the long haul.">
            {HERO_LINES.map((line, i) => (
              <span className="ab-line" key={i}>
                <span className="ab-line-in">
                  {line.map((w, j) => (
                    <span key={j} className={w.a ? "accent" : undefined}>{w.t}{j < line.length - 1 ? " " : ""}</span>
                  ))}
                </span>
              </span>
            ))}
          </h1>

          <div className="ab-hero-bottom">
            <p className="ab-hero-sub">
              One carrier. Company-owned iron. Zero brokers. For over a decade we&apos;ve moved
              freight the same way — fast, accountable, and always in our hands.
            </p>
            <div className="ab-hero-meta">
              {META.map((m) => (
                <div className="ab-meta" key={m.l}>
                  <span className="ab-meta-v">{m.em ? <em>{m.v}</em> : m.v}</span>
                  <span className="ab-meta-l">{m.l}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ab-hero-strip">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.fleet} alt="Phantom Logistics fleet lined up at the company yard" />
            <div className="shade" aria-hidden="true" />
            <span className="badge">Phantom fleet · Truro, NS</span>
          </div>
        </header>

        {/* ── MANIFESTO ────────────────────────────────────────── */}
        <section className="ab-manifesto" aria-label="Our promise">
          <p>{MANIFESTO}</p>
        </section>

        {/* ── TIMELINE ─────────────────────────────────────────── */}
        <section className="ab-timeline" aria-label="Company milestones">
          <div className="ab-tl-head">
            <div>
              <h2 className="ab-tl-title ab-display">Built mile by <span className="accent">mile</span></h2>
            </div>
            <span className="ab-tl-hint">
              Scroll to travel
              <svg width="22" height="10" viewBox="0 0 22 10" fill="none" aria-hidden="true">
                <path d="M0 5h20M16 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          <div className="ab-tl-viewport">
            <div className="ab-tl-track">
              {TIMELINE.map((t) => (
                <article className="ab-tl-panel" key={t.year}>
                  <div className="ab-tl-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.img} alt={`${t.year} — ${t.h}`} />
                    <span className="ab-tl-year">{t.year.slice(0, 2)}<span>{t.year.slice(2)}</span></span>
                  </div>
                  <div className="ab-tl-body">
                    <h3 className="ab-tl-h">{t.h}</h3>
                    <p className="ab-tl-c">{t.c}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="ab-tl-progress" aria-hidden="true"><span /></div>
        </section>

        {/* ── STATS ────────────────────────────────────────────── */}
        <section className="ab-stats" aria-label="By the numbers">
          <div className="ab-stats-grid">
            {STATS.map((s) => (
              <div className="ab-stat" key={s.l}>
                <p className="ab-stat-v">
                  <span data-count={s.v} data-dec={s.dec}>{fmt(0, s.dec)}</span>
                  <span className="u">{s.u}</span>
                </p>
                <p className="ab-stat-l">{s.l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── VALUES ───────────────────────────────────────────── */}
        <section className="ab-values" aria-label="Our values">
          <div className="ab-values-grid">
            <div className="ab-sticky">
              <div className="ab-sticky-frame">
                {VALUES.map((v, i) => (
                  <div className={`ab-vx-img${i === 0 ? " is-active" : ""}`} key={v.t} aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={v.img} alt="" />
                  </div>
                ))}
                <div className="ab-sticky-num" aria-hidden="true">
                  <span className="cur">01</span>
                  <span className="of">/ {String(VALUES.length).padStart(2, "0")}</span>
                </div>
              </div>
            </div>

            <div className="ab-vlist">
              <div className="ab-vlist-head">
                <h2 className="ab-display">The principles<br />that move us</h2>
              </div>
              {VALUES.map((v) => (
                <div className="ab-vitem" key={v.t}>
                  <span className="ab-vitem-n">{v.n}</span>
                  <h3>{v.t}</h3>
                  <p>{v.c}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FLEET MARQUEE ────────────────────────────────────── */}
        <section className="ab-marquee" aria-label="What we run">
          <div className="ab-marquee-row">
            <div className="ab-marquee-track">
              {[...FLEET, ...FLEET].map((f, i) => (
                <figure className="ab-marquee-card" key={i}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.src} alt={f.t} loading="lazy" />
                  <span>{f.t}</span>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── LOCATIONS ────────────────────────────────────────── */}
        <section className="ab-loc" aria-label="Where we operate">
          <div className="ab-loc-head">
            <h2 className="ab-display">Coast to coast, <span className="accent">always on</span></h2>
          </div>
          <div className="ab-loc-grid">
            {LOCATIONS.map((l) => (
              <div className="ab-loc-card" key={l.tag} onPointerMove={onTilt} onPointerLeave={onTiltOut}>
                <div>
                  <span className="tag">{l.tag}</span>
                  <h3>{l.city}</h3>
                  <p className="addr">{l.addr}</p>
                </div>
                <a href={`tel:${l.phone.replace(/[^0-9+]/g, "")}`} className="phone">{l.phone}</a>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="ab-cta" aria-label="Get started">
          <div className="ab-cta-bg" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.sunset} alt="" />
            <div className="v" />
          </div>
          <div className="ab-cta-inner">
            <h2>Join 3,000+ shippers who <span className="accent">trust Phantom.</span></h2>
            <p>Tell us your lanes and freight type. A firm rate comes back fast — and every mile after runs on company iron.</p>
            <div className="ab-cta-row">
              <Link href="/contact" className="ab-btn ab-btn--red">
                Get a Quote
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <path d="M3 7.5h8M7.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/services" className="ab-btn ab-btn--ghost">Our Services</Link>
            </div>
          </div>
        </section>

      </div>
    </PageShell>
  );
}

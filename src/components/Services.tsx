"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";

const SERVICES = [
  {
    num: "01",
    title: "Full Truckload",
    copy: "Dry van, reefer and flatbed — one shipper, one trailer, zero touches from dock to dock.",
    tags: ["Dry Van", "Reefer", "Flatbed"],
    src: "/hf_20260606_104819_db26e803-e1e6-450e-a7e3-24b2f16e33cb(1).png",
    alt: "Phantom Logistics truck running a highway at sunset",
  },
  {
    num: "02",
    title: "Less-Than-Truckload",
    copy: "Palletized freight on scheduled lanes with cross-dock at every hub. Pay for the space, not the trailer.",
    tags: ["Palletized", "Scheduled Lanes", "Cross-dock"],
    src: "/hf_20260606_104850_008b5602-bfa5-40a9-a9c8-3020d070d0f2(1).png",
    alt: "Phantom Logistics truck on scenic mountain highway aerial view",
  },
  {
    num: "03",
    title: "Dedicated Fleet",
    copy: "Contract trucks and drivers assigned to your lanes — wrapped in your livery, run on your schedule.",
    tags: ["Contract", "Your Livery", "Priority Dispatch"],
    src: "/hf_20260606_105246_4f3378c4-ef89-4fbe-8dda-c5ffff69c467(1).png",
    alt: "Phantom Logistics yard with multiple truck and trailer types",
  },
  {
    num: "04",
    title: "Warehousing & Cross-dock",
    copy: "1.2M sq ft of bonded, climate-controlled space positioned at the hubs your freight already passes through.",
    tags: ["1.2M sq ft", "Bonded", "Climate-controlled"],
    src: "/hf_20260606_104624_2d9fc850-b40b-4e43-a8de-2f9cceecdead(1).png",
    alt: "Phantom Logistics fleet lineup at company yard",
  },
  {
    num: "05",
    title: "Final Mile",
    copy: "Box trucks and sprinters for the last leg — liftgate, inside delivery, photo proof on every stop.",
    tags: ["Liftgate", "Inside Delivery", "Photo POD"],
    src: "/hf_20260606_104556_7052f106-a0e2-4aae-a9ad-cc8f8a74266e(1).png",
    alt: "Phantom Logistics dry van backed to loading dock in winter",
  },
];

export default function Services() {
  const scope = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-svc-head]",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: "[data-svc-head]", start: "top 85%" } }
        );
        gsap.fromTo(
          "[data-svc-media]",
          { opacity: 0, scale: 1.04 },
          { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out",
            scrollTrigger: { trigger: "[data-svc-main]", start: "top 80%" } }
        );
        gsap.fromTo(
          "[data-svc-row]",
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.09, ease: "power3.out",
            scrollTrigger: { trigger: "[data-svc-list]", start: "top 82%" } }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-svc-head], [data-svc-row], [data-svc-media]", { clearProps: "all", opacity: 1 });
      });
    },
    { scope }
  );

  const cur = SERVICES[active];

  return (
    <section
      ref={scope}
      id="services"
      className="relative scroll-mt-24 overflow-hidden bg-paper py-[clamp(5rem,11vw,9rem)] text-coal"
    >
      {/* faint engineering grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(11,11,12,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(11,11,12,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 70% 60% at 70% 30%, #000, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 70% 30%, #000, transparent 78%)",
        }}
      />

      <div className="relative mx-auto max-w-[1380px] px-5 md:px-10">
        {/* ── header ── */}
        <div
          data-svc-head
          data-reveal
          className="flex flex-col gap-7 border-b border-coal/12 pb-[clamp(2rem,4vw,3rem)] md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-steel">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-red" aria-hidden="true" />
              What we run <span className="text-red">/ 01 – 05</span>
            </p>
            <h2
              className="display mt-4 max-w-[14ch] leading-[0.88]"
              style={{ fontSize: "clamp(2.6rem, 7vw, 5.5rem)" }}
            >
              Every lane, <span className="text-red">one carrier</span>
            </h2>
          </div>

          <div className="md:max-w-[34ch] md:text-right">
            <p className="text-[15px] leading-relaxed text-steel">
              One asset-based carrier for every mode — company iron, company drivers,
              dock to dock. No brokers in the middle.
            </p>
            <Link
              href="/services"
              className="group mt-5 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.2em] text-coal transition-colors hover:text-red"
            >
              View all services
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M2 8h11M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ── main: sticky image + list ── */}
        <div
          data-svc-main
          className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-[clamp(1.5rem,4vw,3.5rem)] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]"
        >
          {/* LEFT — sticky crossfading image (desktop) */}
          <div className="hidden lg:block">
            <div
              data-svc-media
              data-reveal
              className="sticky top-28 aspect-[4/5] overflow-hidden rounded-[20px] bg-coal ring-1 ring-coal/10 shadow-[0_40px_90px_-40px_rgba(40,30,30,0.55)]"
            >
              {SERVICES.map((s, i) => (
                <Image
                  key={s.num}
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(min-width:1024px) 46vw, 100vw"
                  className={`object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] ${
                    active === i ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
                  }`}
                  priority={i === 0}
                />
              ))}

              {/* gradient + framing */}
              <div className="absolute inset-0 bg-gradient-to-t from-coal/92 via-coal/15 to-transparent" aria-hidden="true" />
              <span className="absolute left-6 top-6 bottom-6 w-[3px] bg-red" aria-hidden="true" />

              {/* oversized index */}
              <span
                className="display absolute right-5 top-2 leading-none text-paper/15"
                style={{ fontSize: "9rem" }}
                aria-hidden="true"
              >
                {cur.num}
              </span>

              {/* caption */}
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-red">
                  Service {cur.num} / 05
                </p>
                <h3 className="display mt-2 text-4xl leading-[0.92] text-paper">{cur.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {cur.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-paper/25 bg-paper/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/80 backdrop-blur-sm"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT — the index list */}
          <ul data-svc-list>
            {SERVICES.map((s, i) => {
              const on = active === i;
              return (
                <li
                  key={s.num}
                  data-svc-row
                  data-reveal
                  className="relative border-t border-coal/12 last:border-b"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  {/* red marker bar */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-0 bottom-0 w-[3px] origin-center bg-red transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.3,1)] ${
                      on ? "scale-y-100" : "scale-y-0"
                    }`}
                  />
                  <Link
                    href="#contact"
                    className="grid grid-cols-[auto_1fr_auto] items-start gap-x-5 py-7 pl-3 transition-[padding] duration-500 md:py-8 lg:pl-5"
                  >
                    <span
                      className={`font-display text-[1.5rem] leading-none transition-colors duration-300 md:text-[1.75rem] ${
                        on ? "text-red" : "text-coal/30"
                      }`}
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {s.num}
                    </span>

                    <div className="min-w-0">
                      <h3
                        className={`display text-[2rem] leading-[0.95] transition-[color,transform] duration-400 ease-out sm:text-4xl md:text-5xl ${
                          on ? "translate-x-1.5 text-red lg:translate-x-2.5" : "text-coal"
                        }`}
                      >
                        {s.title}
                      </h3>

                      <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1.5">
                        {s.tags.map((t) => (
                          <li
                            key={t}
                            className={`rounded-full border px-2.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.12em] transition-colors duration-300 ${
                              on ? "border-red/35 bg-red/[0.06] text-red" : "border-coal/15 text-steel"
                            }`}
                          >
                            {t}
                          </li>
                        ))}
                      </ul>

                      {/* inline image — mobile / tablet only */}
                      <div className="relative mt-4 h-44 w-full overflow-hidden rounded-xl ring-1 ring-coal/10 lg:hidden">
                        <Image src={s.src} alt={s.alt} fill sizes="100vw" className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-coal/40 to-transparent" aria-hidden="true" />
                      </div>

                      <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-steel">{s.copy}</p>
                    </div>

                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
                        on
                          ? "border-red bg-red text-paper rotate-0"
                          : "border-coal/20 text-coal"
                      }`}
                      aria-hidden="true"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 13 13 3M5.5 3H13v7.5" />
                      </svg>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

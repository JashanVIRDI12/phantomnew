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
    src: "/sunset.webp",
    alt: "Phantom Logistics truck running a highway at sunset",
  },
  {
    num: "02",
    title: "Less-Than-Truckload",
    copy: "Palletized freight on scheduled lanes with cross-dock at every hub. Pay for the space, not the trailer.",
    tags: ["Palletized", "Scheduled Lanes", "Cross-dock"],
    src: "/aerial.webp",
    alt: "Phantom Logistics truck on scenic mountain highway aerial view",
  },
  {
    num: "03",
    title: "Dedicated Fleet",
    copy: "Contract trucks and drivers assigned to your lanes — wrapped in your livery, run on your schedule.",
    tags: ["Contract", "Your Livery", "Priority Dispatch"],
    src: "/fleet.webp",
    alt: "Phantom Logistics yard with multiple truck and trailer types",
  },
  {
    num: "04",
    title: "Warehousing & Cross-dock",
    copy: "1.2M sq ft of bonded, climate-controlled space positioned at the hubs your freight already passes through.",
    tags: ["1.2M sq ft", "Bonded", "Climate-controlled"],
    src: "/yard.webp",
    alt: "Phantom Logistics fleet lineup at company yard",
  },
  {
    num: "05",
    title: "Final Mile",
    copy: "Box trucks and sprinters for the last leg — liftgate, inside delivery, photo proof on every stop.",
    tags: ["Liftgate", "Inside Delivery", "Photo POD"],
    src: "/dock.webp",
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
          "[data-svc-panel]",
          { opacity: 0, y: 60, clipPath: "inset(0 0 12% 0 round 16px)" },
          { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 16px)", duration: 1, stagger: 0.1, ease: "power4.out",
            scrollTrigger: { trigger: "[data-svc-rack]", start: "top 80%" } }
        );
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-svc-head], [data-svc-panel]", { clearProps: "all", opacity: 1 });
      });
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      id="services"
      className="relative scroll-mt-24 overflow-hidden bg-paper py-[clamp(5rem,11vw,9rem)] text-coal"
    >
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
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

        {/* ── expanding image accordion ── */}
        <div
          data-svc-rack
          className="mt-[clamp(2.5rem,5vw,4rem)] flex flex-col gap-3 lg:h-[clamp(440px,64vh,640px)] lg:flex-row"
        >
          {SERVICES.map((s, i) => {
            const on = active === i;
            return (
              <article
                key={s.num}
                data-svc-panel
                data-reveal
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`group relative h-[300px] min-w-0 cursor-pointer overflow-hidden rounded-2xl ring-1 ring-coal/10 transition-[flex-grow] duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none lg:h-full lg:basis-0 ${
                  on ? "lg:grow-[5]" : "lg:grow"
                }`}
              >
                {/* clickable surface */}
                <Link href="#contact" className="absolute inset-0 z-30" aria-label={`${s.title} — get a quote`} />

                {/* photo */}
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(min-width:1024px) 55vw, 100vw"
                  className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] group-hover:scale-[1.04]"
                  priority={i === 0}
                />

                {/* tint — active panel reads brighter */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 transition-colors duration-[650ms] ${on ? "bg-coal/15" : "bg-coal/45"}`}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-coal via-coal/45 to-transparent"
                />
                <span className="absolute left-0 top-0 z-10 h-full w-[3px] bg-red" aria-hidden="true" />

                {/* index — always visible */}
                <span
                  className="display absolute left-5 top-5 z-10 text-2xl leading-none text-paper md:text-3xl"
                  aria-hidden="true"
                >
                  {s.num}
                </span>

                {/* vertical label — desktop, only while collapsed */}
                <span
                  aria-hidden="true"
                  className={`absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap text-paper transition-opacity duration-300 lg:block ${
                    on ? "opacity-0" : "opacity-100"
                  }`}
                  style={{ writingMode: "vertical-rl" as const, rotate: "180deg" }}
                >
                  <span className="display text-[1.55rem] tracking-[0.02em]">{s.title}</span>
                </span>

                {/* expanded content — mobile: always · desktop: when active */}
                <div
                  className={`absolute inset-x-0 bottom-0 z-20 p-6 transition-[opacity,transform] duration-500 md:p-8 ${
                    on
                      ? "lg:translate-y-0 lg:opacity-100"
                      : "lg:pointer-events-none lg:translate-y-4 lg:opacity-0"
                  }`}
                >
                  <h3 className="display text-3xl leading-[0.95] text-paper md:text-[2.75rem]">{s.title}</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-paper/25 bg-paper/10 px-2.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-paper/85 backdrop-blur-sm"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 max-w-[42ch] text-[13.5px] leading-relaxed text-paper/80">{s.copy}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper">
                    Get a quote
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red text-paper">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 13 13 3M5.5 3H13v7.5" />
                      </svg>
                    </span>
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

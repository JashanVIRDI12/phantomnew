"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

const UNITS = [
  {
    idx: "01",
    name: "Dry Vans",
    spec: "53' air-ride · 1,800 units",
    src: "/sunset.webp",
    alt: "Phantom Logistics truck running a highway at sunset",
  },
  {
    idx: "02",
    name: "Sleeper Linehaul",
    spec: "Team drivers · coast-to-coast",
    src: "/aerial.webp",
    alt: "Phantom Logistics truck on scenic mountain highway aerial view",
  },
  {
    idx: "03",
    name: "Regional Day Cabs",
    spec: "Sub-300mi lanes · same-day turns",
    src: "/fleet.webp",
    alt: "Phantom Logistics yard with multiple truck and trailer types",
  },
  {
    idx: "04",
    name: "Drayage & Containers",
    spec: "Port pickups · bonded chassis",
    src: "/yard.webp",
    alt: "Phantom Logistics fleet lineup at company yard",
  },
  {
    idx: "05",
    name: "Port & Intermodal",
    spec: "Rail + sea + road · one waybill",
    src: "/dock.webp",
    alt: "Phantom Logistics dry van backed to loading dock in winter",
  },
];

export default function Fleet() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-fleet-head]",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: scope.current, start: "top 75%" },
          }
        );

        gsap.fromTo(
          "[data-fleet-card]",
          { opacity: 0, y: 56 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: "[data-fleet-track]", start: "top 85%" },
          }
        );
      });

      // pinned horizontal scrub — desktop only; mobile keeps native snap scroll
      mm.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 1024px)",
        () => {
          const track = scope.current!.querySelector<HTMLElement>("[data-fleet-track]");
          const pinBox = scope.current!.querySelector<HTMLElement>("[data-fleet-pin]");
          if (!track || !pinBox) return;

          const distance = () => track.scrollWidth - pinBox.clientWidth;

          gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: scope.current,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          gsap.fromTo(
            "[data-fleet-progress]",
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              transformOrigin: "left center",
              scrollTrigger: {
                trigger: scope.current,
                start: "top top",
                end: () => `+=${distance()}`,
                scrub: 1,
              },
            }
          );
        }
      );

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-fleet-head], [data-fleet-card]", {
          clearProps: "all",
          opacity: 1,
        });
      });
    },
    { scope }
  );

  return (
    <section ref={scope} id="fleet" className="relative scroll-mt-24 bg-coal">
      <div
        data-fleet-pin
        className="flex min-h-[100svh] flex-col justify-center gap-10 overflow-hidden py-[clamp(4rem,8vh,6rem)]"
      >
        <div
          data-fleet-head
          data-reveal
          className="mx-auto w-full max-w-[1380px] px-5 md:px-10"
        >
          <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
            <h2
              className="display leading-[0.9] text-paper"
              style={{ fontSize: "clamp(2.6rem, 7vw, 5.5rem)" }}
            >
              Built for the <span className="text-red">long haul</span>
            </h2>
            <div className="flex flex-col items-end gap-3">
              <p className="mb-2 hidden max-w-[34ch] text-sm leading-relaxed text-silver lg:block">
                Every unit company-owned, telematics-fitted, and available wrapped
                edge-to-edge in your livery.
              </p>
              {/* mobile swipe hint — hidden on desktop via CSS */}
              <span className="scroll-hint lg:hidden" aria-hidden="true">
                Swipe fleet
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 8h12M9 4l4 4-4 4" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:px-10 lg:overflow-x-visible lg:overflow-y-clip">
          <ul
            data-fleet-track
            className="flex w-max snap-x snap-mandatory gap-5 will-change-transform lg:snap-none lg:gap-7 lg:pl-[max(0px,calc((100vw-1380px)/2))]"
            aria-label="Redline equipment types"
          >
            {UNITS.map((u) => (
              <li
                key={u.idx}
                data-fleet-card
                data-reveal
                className="group relative h-[54svh] w-[82vw] shrink-0 snap-start overflow-hidden rounded-2xl border border-(--glass-border) sm:h-[56svh] sm:w-[380px] lg:h-[58vh] lg:w-[460px]"
              >
                <Image
                  src={u.src}
                  alt={u.alt}
                  fill
                  sizes="(min-width: 1024px) 460px, 78vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-coal/85 via-transparent to-coal/20" />
                <span className="display absolute right-4 top-3 text-5xl text-paper/25">
                  {u.idx}
                </span>
                <div className="glass absolute inset-x-4 bottom-4 rounded-xl p-4 md:p-5">
                  <h3 className="display text-2xl text-paper md:text-[1.65rem]">
                    {u.name}
                  </h3>
                  <p className="mt-1 font-mono text-[13px] uppercase tracking-[0.15em] text-silver">
                    {u.spec}
                  </p>
                </div>
              </li>
            ))}

            {/* fleet-branding end card */}
            <li
              data-fleet-card
              data-reveal
              className="relative flex h-[54svh] w-[82vw] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-2xl bg-red p-6 sm:h-[56svh] sm:w-[380px] lg:h-[58vh] lg:w-[460px] lg:p-8"
            >
              <p className="kicker text-paper/80">Fleet wraps & graphics</p>
              <p
                className="display leading-[0.9] text-paper"
                style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)" }}
              >
                Your livery
                <br />
                <span className="text-coal">on 50+</span>
                <br />
                rolling boards
              </p>
              <a
                href="#contact"
                className="btn btn-solid w-full py-4 lg:w-auto lg:self-start lg:px-10"
              >
                <span>Brand the fleet</span>
              </a>
            </li>
          </ul>
        </div>

        {/* scrub progress — desktop pin only */}
        <div
          className="mx-auto hidden h-px w-full max-w-[1380px] px-5 md:px-10 lg:block"
          aria-hidden="true"
        >
          <div className="h-px w-full bg-paper/15">
            <div data-fleet-progress className="h-px w-full bg-red" />
          </div>
        </div>
      </div>
    </section>
  );
}

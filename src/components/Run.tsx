"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

const STOPS = [
  {
    time: "Hour 0",
    place: "Pickup",
    copy: "A tractor backs into your dock inside the appointment window. Bills signed, load secured, photos on file before the doors close.",
    images: [
      {
        src: "/hf_20260606_104656_597a0532-bf54-40c9-adad-28423d0fadaa(1).png",
        alt: "Phantom Logistics facility with trucks loading at docks",
      },
      {
        src: "/hf_20260606_104556_7052f106-a0e2-4aae-a9ad-cc8f8a74266e(1).png",
        alt: "Phantom Logistics dry van backed to loading dock in winter",
      },
    ],
    align: "left" as const,
  },
  {
    time: "Hour 12",
    place: "Linehaul",
    copy: "Team drivers swap seats; the truck never sleeps. You watch the dot cross the map in real time — no check calls needed.",
    images: [
      {
        src: "/hf_20260606_104819_db26e803-e1e6-450e-a7e3-24b2f16e33cb(1).png",
        alt: "Phantom Logistics truck running a highway at sunset",
      },
      {
        src: "/hf_20260606_104850_008b5602-bfa5-40a9-a9c8-3020d070d0f2(1).png",
        alt: "Phantom Logistics truck on scenic mountain highway aerial view",
      },
    ],
    align: "right" as const,
  },
  {
    time: "Hour 48",
    place: "Delivered",
    copy: "Coast to coast in two days. Proof of delivery, timestamps, and a clean claims record hit your inbox before the trailer is empty.",
    images: [
      {
        src: "/hf_20260606_105246_4f3378c4-ef89-4fbe-8dda-c5ffff69c467(1).png",
        alt: "Phantom Logistics yard with multiple truck and trailer types",
      },
    ],
    align: "left" as const,
  },
];

export default function Run() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-run-head]",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: "[data-run-head]", start: "top 85%" },
          }
        );

        gsap.utils.toArray<HTMLElement>("[data-run-copy]").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 85%" },
            }
          );
        });

        // the route line draws itself as you scroll
        gsap.fromTo(
          "[data-route-line]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: "[data-route]",
              start: "top 70%",
              end: "bottom 55%",
              scrub: 0.6,
            },
          }
        );

        gsap.utils.toArray<HTMLElement>("[data-stop]").forEach((stop) => {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: stop, start: "top 78%" },
          });
          tl.fromTo(
            stop.querySelector("[data-stop-dot]"),
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2.5)" }
          )
            .fromTo(
              stop.querySelector("[data-stop-label]"),
              { opacity: 0, x: stop.dataset.align === "right" ? 32 : -32 },
              { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
              "-=0.25"
            )
            .fromTo(
              stop.querySelectorAll("[data-stop-img]"),
              { opacity: 0, y: 44, rotate: (i) => (i % 2 ? 3 : -3) },
              {
                opacity: 1,
                y: 0,
                rotate: (i) => (i % 2 ? 1.5 : -1.5),
                duration: 0.9,
                stagger: 0.12,
                ease: "power3.out",
              },
              "-=0.4"
            );

          // gentle float parallax on the photos
          stop.querySelectorAll("[data-stop-img]").forEach((img, i) => {
            gsap.to(img, {
              yPercent: i % 2 ? -8 : -16,
              ease: "none",
              scrollTrigger: {
                trigger: stop,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          });
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          "[data-run-head], [data-run-copy], [data-stop-dot], [data-stop-label], [data-stop-img], [data-route-line]",
          { clearProps: "all", opacity: 1 }
        );
      });
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      id="run"
      className="relative mx-auto max-w-[1380px] scroll-mt-24 overflow-hidden px-5 py-[clamp(4rem,10vw,8rem)] md:px-10"
    >
      <div data-run-head data-reveal>
        <h2
          className="rule-heading display mt-3 text-center text-paper"
          style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}
        >
          <span>
            Watch it <span className="text-red">move</span>
          </span>
        </h2>
      </div>

      <div className="mt-[clamp(2.5rem,6vw,5rem)] grid gap-10 lg:grid-cols-[minmax(280px,420px)_1fr] lg:gap-20">
        {/* copy column */}
        <div className="flex flex-col justify-between gap-8 lg:gap-14">
          <p data-run-copy data-reveal className="text-[15px] leading-relaxed text-silver">
            We&apos;ve built one brutal promise into every load: pick it up on
            time, run it through the night, hand it over spotless. One carrier,
            one invoice, one dot on a map —{" "}
            <span className="text-red">pickup, linehaul, delivered.</span>
          </p>
          <p data-run-copy data-reveal className="text-[15px] leading-relaxed text-silver lg:mb-16">
            No brokers playing telephone, no mystery trucks, no &ldquo;driver
            isn&apos;t answering.&rdquo; Our fleet, our drivers, our dispatch —
            so you can <span className="text-red">ship it and forget it.</span>
          </p>
        </div>

        {/* route timeline */}
        <div data-route className="relative">
          <div className="absolute left-[14px] top-2 bottom-2 w-px bg-(--glass-border) md:left-1/2" />
          <div
            data-route-line
            className="absolute left-[14px] top-2 bottom-2 w-px origin-top bg-red md:left-1/2"
          />

          <ol className="flex flex-col gap-[clamp(3rem,7vw,5.5rem)]">
            {STOPS.map((stop) => (
              <li
                key={stop.place}
                data-stop
                data-align={stop.align}
                className="relative grid grid-cols-[28px_1fr] gap-x-5 md:grid-cols-2 md:gap-x-0"
              >
                <span
                  data-stop-dot
                  data-reveal
                  className="absolute left-[14px] top-2 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-coal bg-paper shadow-[0_0_0_4px_rgba(225,6,0,0.3)] md:left-1/2"
                />

                <div
                  data-stop-label
                  data-reveal
                  className={`col-start-2 md:col-auto ${
                    stop.align === "left"
                      ? "md:col-start-1 md:pr-14 md:text-right"
                      : "md:col-start-2 md:row-start-1 md:pl-14"
                  }`}
                >
                  <p className="font-mono text-[13px] uppercase tracking-[0.18em] text-red">
                    {stop.time}
                  </p>
                  <h3 className="display mt-1 text-3xl text-paper md:text-4xl">
                    {stop.place}
                  </h3>
                  <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-silver md:ml-auto md:max-w-[30ch]">
                    {stop.copy}
                  </p>
                </div>

                <div
                  className={`col-start-2 mt-5 flex gap-3 md:col-auto md:mt-0 ${
                    stop.align === "left"
                      ? "md:col-start-2 md:row-start-1 md:pl-14"
                      : "md:col-start-1 md:justify-end md:pr-14"
                  }`}
                >
                  {stop.images.map((img, i) => (
                    <div
                      key={img.src}
                      data-stop-img
                      data-reveal
                      className={`relative overflow-hidden rounded-xl border border-(--glass-border) will-change-transform ${
                        i === 0
                          ? "h-[100px] w-[130px] sm:h-[120px] sm:w-[160px] md:h-[150px] md:w-[200px]"
                          : "mt-6 h-[84px] w-[110px] sm:mt-8 sm:h-[100px] sm:w-[130px] md:h-[120px] md:w-[160px]"
                      }`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(min-width: 768px) 200px, 160px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

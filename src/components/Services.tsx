"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

const SERVICES = [
  {
    num: "01",
    title: "Full Truckload",
    copy: "Dry van, reefer and flatbed — one shipper, one trailer, zero touches from dock to dock.",
    src: "/hf_20260606_104819_db26e803-e1e6-450e-a7e3-24b2f16e33cb(1).png",
    alt: "Phantom Logistics truck running a highway at sunset",
  },
  {
    num: "02",
    title: "Less-Than-Truckload",
    copy: "Palletized freight on scheduled lanes with cross-dock at every hub. Pay for the space, not the trailer.",
    src: "/hf_20260606_104850_008b5602-bfa5-40a9-a9c8-3020d070d0f2(1).png",
    alt: "Phantom Logistics truck on scenic mountain highway aerial view",
  },
  {
    num: "03",
    title: "Dedicated Fleet",
    copy: "Contract trucks and drivers assigned to your lanes — wrapped in your livery, run on your schedule.",
    src: "/hf_20260606_105246_4f3378c4-ef89-4fbe-8dda-c5ffff69c467(1).png",
    alt: "Phantom Logistics yard with multiple truck and trailer types",
  },
  {
    num: "04",
    title: "Warehousing & Cross-dock",
    copy: "1.2M sq ft of bonded, climate-controlled space positioned at the hubs your freight already passes through.",
    src: "/hf_20260606_104624_2d9fc850-b40b-4e43-a8de-2f9cceecdead(1).png",
    alt: "Phantom Logistics fleet lineup at company yard",
  },
  {
    num: "05",
    title: "Final Mile",
    copy: "Box trucks and sprinters for the last leg — liftgate, inside delivery, photo proof on every stop.",
    src: "/hf_20260606_104556_7052f106-a0e2-4aae-a9ad-cc8f8a74266e(1).png",
    alt: "Phantom Logistics dry van backed to loading dock in winter",
  },
];

export default function Services() {
  const scope = useRef<HTMLElement>(null);
  const activeIdx = useRef(-1);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-svc-head]",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: "[data-svc-head]", start: "top 85%" },
          }
        );

        gsap.fromTo(
          "[data-svc-row]",
          { opacity: 0, y: 44 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: "[data-svc-list]", start: "top 82%" },
          }
        );
      });

      // floating image that chases the cursor — desktop pointers only
      mm.add(
        "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
        () => {
          const section = scope.current!;
          const ghost = section.querySelector<HTMLElement>("[data-svc-ghost]");
          const list = section.querySelector<HTMLElement>("[data-svc-list]");
          const imgs = gsap.utils.toArray<HTMLElement>("[data-svc-ghost-img]");
          if (!ghost || !list) return;

          gsap.set(ghost, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.85 });
          const xTo = gsap.quickTo(ghost, "x", { duration: 0.5, ease: "power3.out" });
          const yTo = gsap.quickTo(ghost, "y", { duration: 0.5, ease: "power3.out" });

          const onMove = (e: MouseEvent) => {
            const r = section.getBoundingClientRect();
            xTo(e.clientX - r.left);
            yTo(e.clientY - r.top);
          };

          const show = (idx: number) => {
            if (activeIdx.current === idx) return;
            activeIdx.current = idx;
            imgs.forEach((img, i) =>
              gsap.to(img, { opacity: i === idx ? 1 : 0, duration: 0.35 })
            );
            gsap.to(ghost, {
              opacity: 1,
              scale: 1,
              rotate: idx % 2 ? 3 : -3,
              duration: 0.45,
              ease: "power3.out",
            });
          };

          const hide = () => {
            activeIdx.current = -1;
            gsap.to(ghost, { opacity: 0, scale: 0.85, duration: 0.35 });
          };

          const rows = gsap.utils.toArray<HTMLElement>("[data-svc-row]");
          const enterHandlers = rows.map((_, i) => () => show(i));
          section.addEventListener("mousemove", onMove);
          rows.forEach((row, i) => row.addEventListener("mouseenter", enterHandlers[i]));
          list.addEventListener("mouseleave", hide);

          return () => {
            section.removeEventListener("mousemove", onMove);
            rows.forEach((row, i) =>
              row.removeEventListener("mouseenter", enterHandlers[i])
            );
            list.removeEventListener("mouseleave", hide);
          };
        }
      );

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-svc-head], [data-svc-row]", {
          clearProps: "all",
          opacity: 1,
        });
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
      <div className="mx-auto max-w-[1380px] px-5 md:px-10">
        <div data-svc-head data-reveal>
          <p className="kicker text-steel">
            What we run <span className="text-red">/ 01–05</span>
          </p>
          <h2
            className="display mt-3 max-w-[14ch] leading-[0.9]"
            style={{ fontSize: "clamp(2.6rem, 7vw, 5.5rem)" }}
          >
            Every lane, <span className="text-red">one carrier</span>
          </h2>
        </div>

        <ul data-svc-list className="mt-[clamp(2.5rem,6vw,4.5rem)]">
          {SERVICES.map((s) => (
            <li key={s.num} data-svc-row data-reveal className="service-row">
              <a
                href="#contact"
                className="group grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-4 py-7 sm:grid-cols-[64px_minmax(0,1.1fr)_minmax(0,1fr)_auto] sm:gap-x-8 md:py-9"
              >
                <span className="font-mono text-sm text-red">{s.num}</span>

                <h3 className="display text-3xl leading-none transition-transform duration-400 ease-out group-hover:translate-x-2 md:text-5xl">
                  {s.title}
                </h3>

                {/* thumbnail shown where there is no hover pointer */}
                <div className="col-span-2 flex items-center gap-5 sm:col-span-1 sm:col-start-3">
                  <div className="relative h-[72px] w-[104px] shrink-0 overflow-hidden rounded-lg sm:hidden">
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      sizes="104px"
                      className="object-cover"
                    />
                  </div>
                  <p className="max-w-[44ch] text-sm leading-relaxed text-steel">
                    {s.copy}
                  </p>
                </div>

                <span
                  className="hidden h-11 w-11 items-center justify-center rounded-full border border-coal/20 text-coal transition-colors duration-300 group-hover:border-red group-hover:bg-red group-hover:text-paper sm:flex"
                  aria-hidden="true"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 14 14 2M5 2h9v9" />
                  </svg>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* cursor-chasing preview image (desktop only) */}
      <div
        data-svc-ghost
        className="pointer-events-none absolute left-0 top-0 z-10 hidden h-[220px] w-[320px] opacity-0 sm:block"
        aria-hidden="true"
      >
        {SERVICES.map((s) => (
          <Image
            key={s.num}
            data-svc-ghost-img
            src={s.src}
            alt=""
            fill
            sizes="320px"
            className="rounded-xl object-cover opacity-0 shadow-2xl"
          />
        ))}
      </div>
    </section>
  );
}

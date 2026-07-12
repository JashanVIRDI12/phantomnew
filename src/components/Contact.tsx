"use client";

import { useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { Input } from "@/components/ui/input";

const DETAILS = [
  { label: "Dispatch", value: "(902) 403-0112 · ext 102", href: "tel:+19024030112" },
  { label: "Email", value: "info@phantomlogisticsinc.com", href: "mailto:info@phantomlogisticsinc.com" },
  { label: "Home Terminal", value: "415 Willow St, Truro, NS", href: undefined },
];

export default function Contact() {
  const scope = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-contact-bg]",
          { scale: 1.12 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: scope.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          "[data-contact-card]",
          { opacity: 0, y: 64 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: scope.current, start: "top 70%" },
          }
        );

        gsap.fromTo(
          "[data-contact-detail]",
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: scope.current, start: "top 65%" },
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-contact-bg], [data-contact-card], [data-contact-detail]", {
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
      id="contact"
      className="relative scroll-mt-24 overflow-hidden py-[clamp(5rem,12vw,10rem)]"
    >
      <div data-contact-bg className="absolute inset-0 will-change-transform">
        <Image
          src="/hf_20260606_104624_2d9fc850-b40b-4e43-a8de-2f9cceecdead(1).png"
          alt="Phantom Logistics fleet lineup at company yard"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-coal/60" />
        <div className="absolute inset-0 bg-linear-to-b from-coal via-transparent to-coal" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1380px] items-end gap-10 px-5 md:px-10 lg:grid-cols-[minmax(0,460px)_1fr]">
        <div
          data-contact-card
          data-reveal
          className="glass w-full rounded-2xl p-7 md:p-10"
        >
          <p className="kicker">
            Contact <span className="text-red">/ 15-min callback</span>
          </p>
          <h2
            className="display mt-3 leading-[0.95] text-paper"
            style={{ fontSize: "clamp(1.9rem, 4.5vw, 2.8rem)" }}
          >
            Got freight to move?
            <br />
            <span className="text-red">Name the lane.</span>
          </h2>

          {sent ? (
            <div className="mt-8" role="status">
              <p className="font-mono text-sm uppercase tracking-[0.14em] text-red">
                // Request logged
              </p>
              <p className="mt-3 text-sm leading-relaxed text-silver">
                Dispatch will call you back within 15 minutes during business hours.
                That&apos;s the job.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-7">
              <Input id="contact-name" name="name" required autoComplete="name" label="Your name" />
              <Input id="contact-phone" name="phone" type="tel" required autoComplete="tel" label="Phone number" />
              <Input id="contact-lane" name="lane" label="What are we hauling, and where?" />
              <button type="submit" className="btn btn-red mt-4 w-full py-3.5">
                <span>Send it</span>
              </button>
            </form>
          )}
        </div>

        {/* direct lines */}
        <dl className="grid gap-5 grid-cols-1 sm:grid-cols-3 lg:pb-2">
          {DETAILS.map((d) => (
            <div
              key={d.label}
              data-contact-detail
              data-reveal
              className="border-t border-(--glass-border) pt-4"
            >
              <dt className="kicker">{d.label}</dt>
              <dd className="mt-2 text-sm text-paper">
                {d.href ? (
                  <a href={d.href} className="nav-link hover:text-red">
                    {d.value}
                  </a>
                ) : (
                  d.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

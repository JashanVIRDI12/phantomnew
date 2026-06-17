"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import StaggeredMenu, {
  StaggeredMenuItem,
  StaggeredMenuSocialItem,
} from "./StaggeredMenu";
import "@/styles/nav.css";

const LINKS = [
  { label: "Services", href: "/services" },
  { label: "Why Us",   href: "/why" },
  { label: "About",    href: "/about" },
  { label: "Contact",  href: "/contact" },
];

const MENU_ITEMS: StaggeredMenuItem[] = [
  { label: "Services", ariaLabel: "View our services",  link: "/services" },
  { label: "Why Us",   ariaLabel: "Learn why choose us", link: "/why" },
  { label: "About",    ariaLabel: "Learn about us",      link: "/about" },
  { label: "Contact",  ariaLabel: "Get in touch",        link: "/contact" },
];

const SOCIAL_ITEMS: StaggeredMenuSocialItem[] = [
  { label: "Instagram", link: "#" },
  { label: "LinkedIn",  link: "#" },
  { label: "X",         link: "#" },
];

/* ── Desktop logo ─────────────────────────────────────────────────────────── */
function Logo() {
  const pathname = usePathname();
  return (
    <Link
      href={pathname === "/" ? "#top" : "/"}
      className="navx-logo"
      aria-label="Phantom Logistics — home"
    >
      <svg
        width="27"
        height="27"
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden="true"
        className="navx-logo-mark"
      >
        <path
          d="M13 2 L23 8 V18 L13 24 L3 18 V8 Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M8 15.5 V11 h6 l2 2.2 h2.5 v2.3 h-1.2 a1.8 1.8 0 1 0-3.6 0 h-2 a1.8 1.8 0 1 0-3.6 0 Z"
          fill="currentColor"
        />
      </svg>
      <span className="navx-logo-text">
        Phantom&nbsp;Logistics<span className="dot">.</span>
      </span>
    </Link>
  );
}

/* ── Mobile logo (rendered inside StaggeredMenu header) ──────────────────── */
function MobileLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5"
      aria-label="Phantom Logistics — home"
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden="true"
        style={{ color: "#e10600" }}
      >
        <path
          d="M13 2 L23 8 V18 L13 24 L3 18 V8 Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M8 15.5 V11 h6 l2 2.2 h2.5 v2.3 h-1.2 a1.8 1.8 0 1 0-3.6 0 h-2 a1.8 1.8 0 1 0-3.6 0 Z"
          fill="currentColor"
        />
      </svg>
      <span
        className="sm-mobile-logo-text"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "14px",
          letterSpacing: "0.22em",
          textTransform: "uppercase" as const,
        }}
      >
        Phantom&nbsp;Logistics
      </span>
    </Link>
  );
}

/* ── Navbar ───────────────────────────────────────────────────────────────── */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [ind, setInd] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  /* Scroll listener — pill tightens after 48px */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Move the sliding highlight to a given link element */
  const moveTo = (el: HTMLElement | null) => {
    const group = linksRef.current;
    if (!el || !group) return;
    setInd({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
  };

  /* Snap highlight to the active route link (or hide) */
  const snapToActive = () => {
    const group = linksRef.current;
    if (!group) return setInd((s) => ({ ...s, opacity: 0 }));
    const active = group.querySelector<HTMLElement>(".navx-link--active");
    if (active) moveTo(active);
    else setInd((s) => ({ ...s, opacity: 0 }));
  };

  /* Keep the highlight parked on the active route on load / route change */
  useEffect(() => {
    snapToActive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  /* GSAP entrance — desktop pill drops in */
  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.35 });
      tl.from(".navx-bar", {
        yPercent: -140,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });
      tl.from(".navx-link, .navx-status", {
        opacity: 0,
        y: -10,
        stagger: 0.05,
        duration: 0.45,
        ease: "power3.out",
      }, "-=0.45");
      tl.from(".navx-cta", {
        opacity: 0,
        scale: 0.85,
        duration: 0.5,
        ease: "back.out(1.8)",
      }, "-=0.25");
    },
    { scope: headerRef }
  );

  return (
    <>
      {/* ── Desktop header — hidden on mobile ─────────────────────────────── */}
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50 will-change-transform hidden md:block"
      >
        <div className="navx-wrap">
          <div className={`navx-bar${scrolled ? " navx-bar--scrolled" : ""}`}>
            <Logo />

            <nav
              ref={linksRef}
              className="navx-links"
              aria-label="Primary"
              onMouseLeave={snapToActive}
            >
              {/* sliding highlight */}
              <span
                className="navx-ind"
                aria-hidden="true"
                style={{ left: ind.left, width: ind.width, opacity: ind.opacity }}
              />
              {LINKS.map((l) => {
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`navx-link${active ? " navx-link--active" : ""}`}
                    onMouseEnter={(e) => moveTo(e.currentTarget)}
                    onFocus={(e) => moveTo(e.currentTarget)}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>

            <div className="navx-right">
              <span className="navx-status">
                <span className="navx-status-dot" aria-hidden="true" />
                24/7 Dispatch
              </span>
              <span className="navx-divider" aria-hidden="true" />
              <Link href="/contact" className="navx-cta">
                Get a Quote
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M3 7h8M7 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile nav — StaggeredMenu (hidden on md+) ────────────────────── */}
      <div className="md:hidden fixed inset-0 z-[50] pointer-events-none">
        <StaggeredMenu
          position="right"
          items={MENU_ITEMS}
          socialItems={SOCIAL_ITEMS}
          displaySocials={true}
          displayItemNumbering={true}
          colors={["#e10600", "#e8e4dc"]}
          logoNode={<MobileLogo />}
          menuButtonColor="#f6f4ef"
          openMenuButtonColor="#0b0b0c"
          changeMenuColorOnOpen={true}
          accentColor="#e10600"
          onMenuOpen={() => {
            document.documentElement.style.overflow = "hidden";
          }}
          onMenuClose={() => {
            document.documentElement.style.overflow = "";
          }}
        />
      </div>
    </>
  );
}

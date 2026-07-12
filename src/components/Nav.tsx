"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import StaggeredMenu, {
  StaggeredMenuItem,
  StaggeredMenuSocialItem,
} from "./StaggeredMenu";
import BrandLogo from "./BrandLogo";
import "@/styles/nav.css";

const LINKS: { label: string; href: string; mega?: boolean }[] = [
  { label: "Services", href: "/services", mega: true },
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

/* ── Services mega-menu content ───────────────────────────────────────────── */
type NavService = { slug: string; label: string; desc: string; icon: keyof typeof SVC_ICON };

const SERVICE_GROUPS: { heading: string; items: NavService[] }[] = [
  {
    heading: "Truckload & Fleet",
    items: [
      { slug: "dry-van-trucking",      label: "Dry Van",           desc: "Everyday 53′ freight",        icon: "truck" },
      { slug: "dedicated-fleet",       label: "Dedicated Fleet",   desc: "Your private fleet",          icon: "truck" },
      { slug: "long-haul-trucking",    label: "Long Haul",         desc: "Coast to coast",              icon: "truck" },
      { slug: "freight-transportation",label: "Specialized Freight",desc: "Flatbed & step deck",         icon: "truck" },
    ],
  },
  {
    heading: "Time-Critical",
    items: [
      { slug: "expedited-trucking",    label: "Expedited",         desc: "Team drivers, non-stop",      icon: "signal" },
      { slug: "hotshot-trucking",      label: "Hotshot",           desc: "Urgent small loads",          icon: "pin" },
      { slug: "ltl-trucking",          label: "LTL",               desc: "Share the load, save",        icon: "boxes" },
      { slug: "freight-shipping",      label: "Freight Shipping",  desc: "One carrier, all modes",      icon: "boxes" },
    ],
  },
  {
    heading: "Specialized & Supply Chain",
    items: [
      { slug: "refrigerated-transport",   label: "Refrigerated",   desc: "−40°F to 70°F, live",         icon: "shield" },
      { slug: "government-secured-cargo", label: "Gov & Secured",  desc: "Secured & high-value",        icon: "shield" },
      { slug: "warehousing",              label: "Warehousing",    desc: "Storage + fulfillment",       icon: "warehouse" },
      { slug: "freight-forwarding",       label: "Freight Forwarding", desc: "Managed supply chain",    icon: "signal" },
    ],
  },
];

const ICON_SVG = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const SVC_ICON = {
  truck: (
    <svg viewBox="0 0 24 24" width="20" height="20" {...ICON_SVG} aria-hidden="true">
      <path d="M1.5 5h12v9h-12z" /><path d="M13.5 8h4l3 3v3h-7z" />
      <circle cx="6" cy="17.5" r="2" /><circle cx="17" cy="17.5" r="2" />
    </svg>
  ),
  boxes: (
    <svg viewBox="0 0 24 24" width="20" height="20" {...ICON_SVG} aria-hidden="true">
      <path d="M3 3.5h7v7H3z" /><path d="M14 3.5h7v7h-7z" /><path d="M8.5 13h7v7h-7z" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" width="20" height="20" {...ICON_SVG} aria-hidden="true">
      <path d="M12 2l8 3v6c0 5-3.5 8.6-8 11-4.5-2.4-8-6-8-11V5z" /><path d="M8.5 11.5l2.4 2.4 4.6-5" />
    </svg>
  ),
  warehouse: (
    <svg viewBox="0 0 24 24" width="20" height="20" {...ICON_SVG} aria-hidden="true">
      <path d="M2 9l10-5 10 5v11H2z" /><path d="M7 20v-6h10v6" /><path d="M7 14h10" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" width="20" height="20" {...ICON_SVG} aria-hidden="true">
      <path d="M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
  signal: (
    <svg viewBox="0 0 24 24" width="20" height="20" {...ICON_SVG} aria-hidden="true">
      <circle cx="12" cy="12" r="1.6" /><path d="M8.6 8.6a5 5 0 0 0 0 6.8" /><path d="M15.4 8.6a5 5 0 0 1 0 6.8" />
      <path d="M6 6a9 9 0 0 0 0 12" /><path d="M18 6a9 9 0 0 1 0 12" />
    </svg>
  ),
};

/* ── Desktop logo ─────────────────────────────────────────────────────────── */
function Logo() {
  const pathname = usePathname();
  return (
    <BrandLogo
      href={pathname === "/" ? "#top" : "/"}
      height={52}
      priority
      className="navx-logo"
    />
  );
}

/* ── Mobile logo — compact horizontal lockup (mark + wordmark) ───────────── */
function MobileLogo() {
  return (
    <Link href="/" className="sm-brand" aria-label="Phantom Logistics — home">
      <Image
        src="/phantom-mark.png"
        alt=""
        width={2275}
        height={1888}
        priority
        className="sm-brand-mark"
        style={{ height: 38, width: "auto" }}
      />
      <Image
        src="/phantom-word.png"
        alt="Phantom Logistics"
        width={4507}
        height={647}
        priority
        className="sm-brand-word"
        style={{ height: 15, width: "auto" }}
      />
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

  /* Services mega-menu open state (hover-intent with close delay) */
  const [megaOpen, setMegaOpen] = useState(false);
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openMega = () => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    setMegaOpen(true);
  };
  const closeMega = (delay = 150) => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    megaTimer.current = setTimeout(() => setMegaOpen(false), delay);
  };
  useEffect(() => () => { if (megaTimer.current) clearTimeout(megaTimer.current); }, []);

  /* Close the mega-menu on Escape */
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMegaOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [megaOpen]);

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
    setMegaOpen(false);
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
        className="fixed inset-x-0 top-0 z-50 hidden md:block"
      >
        <div className="navx-wrap">
          <div
            className={`navx-bar${scrolled ? " navx-bar--scrolled" : ""}`}
            style={{
              backdropFilter: "blur(24px) saturate(1.6)",
              WebkitBackdropFilter: "blur(24px) saturate(1.6)",
            }}
          >
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
                const active =
                  l.href === "/"
                    ? pathname === "/"
                    : pathname === l.href || pathname.startsWith(l.href + "/");
                if (l.mega) {
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={`navx-link navx-link--mega${active ? " navx-link--active" : ""}${megaOpen ? " navx-link--open" : ""}`}
                      aria-haspopup="true"
                      aria-expanded={megaOpen}
                      onMouseEnter={(e) => { moveTo(e.currentTarget); openMega(); }}
                      onFocus={(e) => { moveTo(e.currentTarget); openMega(); }}
                    >
                      {l.label}
                      <svg className="navx-chev" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                        <path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  );
                }
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`navx-link${active ? " navx-link--active" : ""}`}
                    onMouseEnter={(e) => { moveTo(e.currentTarget); closeMega(0); }}
                    onFocus={(e) => { moveTo(e.currentTarget); closeMega(0); }}
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

          {/* ── Services mega-menu ─────────────────────────────────────────── */}
          <div
            className={`navx-mega${megaOpen ? " navx-mega--open" : ""}`}
            role="region"
            aria-label="Services"
            style={{
              backdropFilter: "blur(34px) saturate(1.8)",
              WebkitBackdropFilter: "blur(34px) saturate(1.8)",
            }}
            onMouseEnter={openMega}
            onMouseLeave={() => closeMega()}
          >
            <div className="navx-mega-inner">
              <div className="navx-mega-groups">
                {SERVICE_GROUPS.map((g) => (
                  <div className="navx-mega-col" key={g.heading}>
                    <p className="navx-mega-colhead">{g.heading}</p>
                    <ul className="navx-mega-list">
                      {g.items.map((it) => (
                        <li key={it.slug}>
                          <Link
                            href={`/services/${it.slug}`}
                            className="navx-mega-item"
                            onClick={() => setMegaOpen(false)}
                          >
                            <span className="navx-mega-ico">{SVC_ICON[it.icon]}</span>
                            <span className="navx-mega-txt">
                              <span className="navx-mega-title">{it.label}</span>
                              <span className="navx-mega-desc">{it.desc}</span>
                            </span>
                            <svg className="navx-mega-arrow" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                              <path d="M3 7h8M7 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <aside className="navx-mega-feature">
                <img src="/phantom-mark.png" alt="" className="navx-feat-mark" aria-hidden="true" />
                <span className="navx-feat-badge">
                  <span className="navx-feat-dot" aria-hidden="true" />
                  24/7 Dispatch
                </span>
                <h3 className="navx-feat-title">Not sure which service?</h3>
                <p className="navx-feat-copy">
                  Tell us your lane and freight — we&apos;ll spec the right equipment and send a firm rate, fast.
                </p>
                <Link href="/contact" className="navx-feat-cta" onClick={() => setMegaOpen(false)}>
                  Get a quote
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <a href="tel:+19024030112" className="navx-feat-phone">
                  Talk to dispatch · <span className="navx-feat-num">(902) 403-0112</span>
                </a>
              </aside>
            </div>

            <div className="navx-mega-foot">
              <Link href="/services" className="navx-mega-all" onClick={() => setMegaOpen(false)}>
                Browse all services
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <span className="navx-mega-note">Company iron · 48 states + Canada · No brokers</span>
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
          openMenuButtonColor="#f6f4ef"
          changeMenuColorOnOpen={false}
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

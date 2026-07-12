import Link from "next/link";
import BrandLogo from "./BrandLogo";

const EXPLORE_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Why Phantom", href: "/why" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Get a Quote", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-2 border-red bg-coal pt-16 text-paper">
      {/* Upper Grid Layout */}
      <div className="mx-auto max-w-[1380px] px-5 md:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
        
        {/* Column 1 & 2: Brand & Bio */}
        <div className="md:col-span-2 flex flex-col items-start gap-6">
          <BrandLogo href="/" height={72} />
          
          <p className="max-w-[44ch] text-[14.5px] leading-[1.7] text-silver">
            From local deliveries to long-haul freight, we move your cargo efficiently without delays or uncertainty. Every load is tracked, managed, and delivered with full control.
          </p>
          
          <p className="display text-red font-bold text-sm tracking-[0.3em] uppercase mt-2">
            NO DELAYS. NO GUESSWORK.
          </p>
        </div>

        {/* Column 3: Explore Links */}
        <div>
          <h3 className="display text-[13px] font-bold text-red tracking-[0.15em] uppercase mb-6">
            EXPLORE
          </h3>
          <ul className="flex flex-col gap-3.5">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="font-sans text-[13px] uppercase tracking-[0.15em] text-silver hover:text-paper transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Terminals */}
        <div>
          <h3 className="display text-[13px] font-bold text-red tracking-[0.15em] uppercase mb-6">
            TERMINALS
          </h3>
          <div className="flex flex-col gap-5">
            <div>
              <p className="font-sans text-[13px] uppercase tracking-[0.15em] text-paper font-bold leading-normal">
                Truro, NS
              </p>
              <p className="font-sans text-[12px] uppercase tracking-[0.14em] text-silver mt-1 leading-normal">
                415 Willow St · Home Terminal
              </p>
            </div>
            <div>
              <p className="font-sans text-[13px] uppercase tracking-[0.15em] text-paper font-bold leading-normal">
                Bolton, ON
              </p>
              <p className="font-sans text-[12px] uppercase tracking-[0.14em] text-silver mt-1 leading-normal">
                365 Healey Rd Unit 19
              </p>
            </div>
          </div>
        </div>

        {/* Column 5: Communications */}
        <div>
          <h3 className="display text-[13px] font-bold text-red tracking-[0.15em] uppercase mb-6">
            COMMUNICATIONS
          </h3>
          <div className="flex flex-col gap-4">
            <div>
              <p className="font-sans text-[12px] uppercase tracking-[0.15em] text-silver leading-normal">
                DISPATCH · EXT 102
              </p>
              <a
                href="tel:+19024030112"
                className="font-sans text-[13px] uppercase tracking-[0.2em] text-paper hover:text-red transition-colors duration-200 block mt-1 font-bold"
              >
                (902) 403-0112
              </a>
            </div>
            <div>
              <p className="font-sans text-[12px] uppercase tracking-[0.15em] text-silver leading-normal">
                EMAIL
              </p>
              <a
                href="mailto:info@phantomlogisticsinc.com"
                className="font-sans text-[12px] lowercase tracking-[0.04em] text-paper hover:text-red transition-colors duration-200 block mt-1 break-all"
              >
                info@phantomlogisticsinc.com
              </a>
            </div>
            <div>
              <p className="font-sans text-[12px] uppercase tracking-[0.15em] text-silver leading-normal">
                HOURS
              </p>
              <p className="font-sans text-[11px] uppercase tracking-[0.1em] text-paper mt-1 leading-relaxed">
                Mon–Fri 8AM–6PM
                <br />
                Sat 10AM–4PM · Sun Closed
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Footer Bar */}
      <div className="relative border-t border-(--glass-border) mt-10 pt-6">
        <div className="mx-auto max-w-[1380px] px-5 md:px-10 flex flex-col md:flex-row justify-between items-center text-[12px] font-sans uppercase tracking-[0.16em] text-steel gap-4">
          <p className="text-center md:text-left">
            © 2026 PHANTOM LOGISTICS INC. ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" aria-hidden="true" />
            <span>SYSTEM SECURE</span>
          </div>

          <p className="text-center md:text-right">
            EST. 2017
          </p>
        </div>

        {/* safe-area spacer for iOS home-indicator bar */}
        <div
          aria-hidden="true"
          className="mt-6"
          style={{ height: "env(safe-area-inset-bottom, 0px)" }}
        />
      </div>
    </footer>
  );
}

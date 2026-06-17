import Link from "next/link";

const OPERATIONS_LINKS = [
  { label: "Company Bio", href: "/about" },
  { label: "Fleet Roster", href: "/why" },
  { label: "Deployments", href: "/why" },
  { label: "Capabilities", href: "/services" },
  { label: "FAQ", href: "/why" },
  { label: "Safety Protocols", href: "/why" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-2 border-red bg-coal pt-16 text-paper">
      {/* Upper Grid Layout */}
      <div className="mx-auto max-w-[1380px] px-5 md:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
        
        {/* Column 1 & 2: Brand & Bio */}
        <div className="md:col-span-2 flex flex-col items-start gap-6">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Back to home">
            <svg
              width="28"
              height="28"
              viewBox="0 0 26 26"
              fill="none"
              aria-hidden="true"
              className="text-red"
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
            <span className="display text-base tracking-[0.25em] text-paper font-bold">
              PHANTOM LOGISTICS
            </span>
          </Link>
          
          <p className="max-w-[44ch] text-[14.5px] leading-[1.7] text-silver">
            From local deliveries to long-haul freight, we move your cargo efficiently without delays or uncertainty. Every load is tracked, managed, and delivered with full control.
          </p>
          
          <p className="display text-red font-bold text-sm tracking-[0.3em] uppercase mt-2">
            NO DELAYS. NO GUESSWORK.
          </p>
        </div>

        {/* Column 3: Operations Links */}
        <div>
          <h3 className="display text-[13px] font-bold text-red tracking-[0.15em] uppercase mb-6">
            OPERATIONS
          </h3>
          <ul className="flex flex-col gap-3.5">
            {OPERATIONS_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="font-mono text-[13px] uppercase tracking-[0.15em] text-silver hover:text-paper transition-colors duration-200"
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
              <p className="font-mono text-[13px] uppercase tracking-[0.15em] text-paper font-bold leading-normal">
                Toronto, ON
              </p>
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-silver mt-1 leading-normal">
                HQ TERMINAL
              </p>
            </div>
            <div>
              <p className="font-mono text-[13px] uppercase tracking-[0.15em] text-paper font-bold leading-normal">
                Truro, NS
              </p>
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-silver mt-1 leading-normal">
                FACILITY TERMINAL
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
              <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-silver leading-normal">
                DISPATCH
              </p>
              <a
                href="tel:+19024030112"
                className="font-mono text-[13px] uppercase tracking-[0.2em] text-paper hover:text-red transition-colors duration-200 block mt-1 font-bold"
              >
                (902) 403-0112
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Footer Bar */}
      <div className="relative border-t border-(--glass-border) mt-10 pt-6">
        <div className="mx-auto max-w-[1380px] px-5 md:px-10 flex flex-col md:flex-row justify-between items-center text-[12px] font-mono uppercase tracking-[0.16em] text-steel gap-4">
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

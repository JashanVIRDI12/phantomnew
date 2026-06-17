const ITEMS = [
  "FTL & LTL",
  "Dedicated fleets",
  "48 states",
  "2,400 trucks",
  "98.7% on-time",
  "24/7 dispatch",
  "Live GPS tracking",
  "Wrapped in your livery",
  "Door to door",
];

export default function Ticker() {
  return (
    <div className="relative z-20 -my-4" aria-hidden="true">
      <div className="-mx-2 -rotate-[1.2deg] overflow-hidden bg-red py-3 shadow-[0_12px_40px_rgba(225,6,0,0.35)]">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {ITEMS.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="display flex items-center gap-5 pr-5 text-lg tracking-[0.12em] text-paper"
                >
                  {item}
                  <span className="font-mono text-[11px] text-coal">//</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

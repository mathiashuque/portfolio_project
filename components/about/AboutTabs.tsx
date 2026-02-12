import type { AboutTab, TabKey } from "./types";

export default function AboutTabs({
  tabs,
  active,
  onSelect,
  rotateMs,
}: {
  tabs: readonly AboutTab[];
  active: TabKey;
  onSelect: (key: TabKey) => void;
  rotateMs: number;
}) {
  return (
    <div
      className="mt-6 flex items-center justify-center gap-6"
      role="tablist"
      aria-label="About tabs"
    >
      {tabs.map((t) => {
        const isActive = t.key === active;

        return (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(t.key)}
            className={[
              "relative text-sm font-medium transition",
              "text-slate-500 hover:text-slate-900",
              "dark:text-white/60 dark:hover:text-white",
              isActive ? "text-slate-900 dark:text-white" : "",
            ].join(" ")}
          >
            <span className="relative inline-flex items-center gap-2">
              <span
                className={[
                  "h-1.5 w-1.5 rounded-full transition-opacity",
                  isActive ? "opacity-100 bg-orange-500" : "opacity-0",
                ].join(" ")}
              />
              {t.label}
            </span>

            {/* ✅ Gauge under active tab */}
            <span
              className={[
                "pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-1",
                "h-0.5 w-full rounded-full",
                isActive ? "opacity-100" : "opacity-0",
              ].join(" ")}
            >
              {/* track */}
              <span className="absolute inset-0 rounded-full bg-orange-500/25 dark:bg-orange-500/20" />

              {/* fill (animated) */}
              <span
                key={active} // reset when active tab changes
                className="absolute inset-0 rounded-full bg-orange-500 origin-left"
                style={{ animation: `aboutTabGauge ${rotateMs}ms linear` }}
              />
            </span>

            {/* keep keyframes local */}
            <style>{`
              @keyframes aboutTabGauge {
                from { transform: scaleX(0); }
                to   { transform: scaleX(1); }
              }
            `}</style>
          </button>
        );
      })}
    </div>
  );
}

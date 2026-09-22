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
    <div className="flex justify-center">
      <div className="inline-flex flex-col items-center">
        {/* tabs */}
        <div
          className="flex items-center justify-center gap-6"
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
              </button>
            );
          })}
        </div>

        <div className="relative mt-3 h-1.5 w-[260px] sm:w-[320px] rounded-full">
          {/* track */}
          <div className="absolute inset-0 rounded-full bg-slate-900/10 dark:bg-white/10" />

          {/* track-wide animated fill (always starts at left of track) */}
          <div
            key={active} // restart when tab changes
            className="absolute inset-0 rounded-full bg-orange-500 origin-left"
            style={{ animation: `aboutTabTrackFill ${rotateMs}ms linear` }}
          />
        </div>

        <style>{`
  @keyframes aboutTabTrackFill {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
`}</style>
      </div>
    </div>
  );
}

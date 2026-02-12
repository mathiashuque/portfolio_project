import type { Tab, TabKey } from "./types";

export default function AboutTabs({
  tabs,
  active,
  onSelect,
}: {
  tabs: readonly Tab[];
  active: TabKey;
  onSelect: (key: TabKey) => void;
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
            <span className="inline-flex items-center gap-2">
              <span
                className={[
                  "h-1.5 w-1.5 rounded-full transition-opacity",
                  isActive ? "opacity-100 bg-orange-500" : "opacity-0",
                ].join(" ")}
              />
              {t.label}
            </span>

            <span
              className={[
                "pointer-events-none absolute -bottom-2 left-1/2 h-0.5 w-10 -translate-x-1/2 rounded-full transition-opacity",
                isActive ? "opacity-100 bg-orange-500" : "opacity-0",
              ].join(" ")}
            />
          </button>
        );
      })}
    </div>
  );
}

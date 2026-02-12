import React, { useLayoutEffect, useRef, useState } from "react";
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
  const btnRefs = useRef(new Map<TabKey, HTMLButtonElement>());
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [seg, setSeg] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const update = () => {
      const btnEl = btnRefs.current.get(active);
      const trackEl = trackRef.current;
      if (!btnEl || !trackEl) return;

      const btnRect = btnEl.getBoundingClientRect();
      const trackRect = trackEl.getBoundingClientRect();

      const btnCenter = btnRect.left + btnRect.width / 2;

      // segment width: based on track width (clean + consistent)
      const segWidth = Math.max(36, Math.min(trackRect.width / 3, 80));

      const left = btnCenter - trackRect.left - segWidth / 2;

      setSeg({
        left: Math.max(0, Math.min(left, trackRect.width - segWidth)),
        width: segWidth,
      });
    };

    update();

    const ro = new ResizeObserver(update);
    if (trackRef.current) ro.observe(trackRef.current);
    btnRefs.current.forEach((el) => ro.observe(el));

    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [active, tabs]);

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
                ref={(el) => {
                  if (el) btnRefs.current.set(t.key, el);
                  else btnRefs.current.delete(t.key);
                }}
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

        {/* ✅ single gauge (shorter + spaced) */}
        <div
          ref={trackRef}
          className="relative mt-3 h-1.5 w-[260px] sm:w-[320px] rounded-full"
        >
          {/* track */}
          <div className="absolute inset-0 rounded-full bg-slate-900/10 dark:bg-white/10" />

          {/* track-wide animated fill (always starts at left of track) */}
          <div
            key={active} // restart when tab changes
            className="absolute inset-0 rounded-full bg-orange-500 origin-left"
            style={{ animation: `aboutTabTrackFill ${rotateMs}ms linear` }}
          />

          {/* active segment mask (slides) */}
          <div
            className="absolute top-0 h-full rounded-full overflow-hidden"
            style={{
              left: seg.left,
              width: seg.width,
              transition: "left 250ms ease, width 250ms ease",
            }}
          >
           
          </div>
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

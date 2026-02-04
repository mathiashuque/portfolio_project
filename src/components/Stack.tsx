import TechIcon from "./TechIcon";
import { STACK } from "../data/stackData";
import type { TechColor } from "../theme/tech";

import React, { useLayoutEffect, useRef, useState } from "react";



function MarqueeRow({
  items,
  reverse = false,
  durationSec = 26,
}: {
  items: readonly { name: string; logo: string; color?: string }[];
  reverse?: boolean;
  durationSec?: number;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const g1Ref = useRef<HTMLDivElement | null>(null);
  const g2Ref = useRef<HTMLDivElement | null>(null);

  const [shiftPx, setShiftPx] = useState(0);
  const [ready, setReady] = useState(false);

  const seamPx = 24; // 1.5rem

  const animClass =
    ready && shiftPx > 0
      ? reverse
        ? "animate-marquee-px-reverse"
        : "animate-marquee-px"
      : "";

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const g1 = g1Ref.current;
    const g2 = g2Ref.current;
    if (!wrap || !g1 || !g2) return;

    const measure = () => {
      const d =
        g2.getBoundingClientRect().left -
        g1.getBoundingClientRect().left;

      const rounded = Math.round(d);
      if (rounded > 0) {
        setShiftPx(rounded);
        setReady(true);
      }
    };

    measure();
    requestAnimationFrame(measure);

    // only help before ready
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            if (!ready) measure();
          })
        : null;

    ro?.observe(wrap);
    return () => ro?.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <div className="relative overflow-x-clip overflow-y-visible px-16">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-panel to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-panel to-transparent z-10" />

      <div
        ref={wrapRef}
        className={[
          "flex w-max flex-nowrap items-center",
          "will-change-transform transform-gpu",
          "hover:[animation-play-state:paused]",
          "motion-reduce:animate-none",
          animClass,
        ].join(" ")}
        style={
          {
            "--marquee-duration": `${durationSec}s`,
            "--marquee-shift": `${shiftPx}px`,
          } as React.CSSProperties & Record<string, string>
        }
      >
        {/* g1 */}
        <div ref={g1Ref} className="flex flex-nowrap gap-6 py-1">
          {items.map((item) => (
            <TechIcon key={`a-${item.name}`} name={item.name} logo={item.logo} color={item.color as TechColor | undefined} />
          ))}
        </div>

        <div className="shrink-0" style={{ width: seamPx }} />

        {/* g2 */}
        <div ref={g2Ref} className="flex flex-nowrap gap-6 py-1" aria-hidden="true">
          {items.map((item) => (
            <TechIcon key={`b-${item.name}`} name={item.name} logo={item.logo} color={item.color as TechColor | undefined} />
          ))}
        </div>

        <div className="shrink-0" style={{ width: seamPx }} />

        {/* g3 (extra runway copy) */}
        <div className="flex flex-nowrap gap-6 py-1" aria-hidden="true">
          {items.map((item) => (
            <TechIcon key={`c-${item.name}`} name={item.name} logo={item.logo} color={item.color as TechColor | undefined} />
          ))}
        </div>
      </div>
    </div>
  );
}


export default function Stack() {
  return (
    <section
      id="stack"
      className="px-6 mb-20 max-w-7xl 2xl:max-w-360 mx-auto scroll-mt-32 min-h-[min(calc(100svh-80px),900px)]"
    >
      <div className="mb-5 text-center">
        <p className="text-xs font-semibold tracking-[0.22em] text-faint/90">
          STACK
        </p>

        <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-text">
          Skills &amp; Technologies
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-muted/90">
          Explore the stacks I rely on to ship production-ready software.
        </p>
      </div>

      <div className="space-y-5">
        {Object.entries(STACK).map(([category, items], i) => (
          <div key={category}>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-muted/90 tracking-tight">
              {category}
            </h3>

            <div className="rounded-2xl border border-border/10 bg-panel px-6 py-1 pt-1 shadow-sm">
              <MarqueeRow
                items={items}
                reverse={i % 2 === 1}
                durationSec={24 + i * 4}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

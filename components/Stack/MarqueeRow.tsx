"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import TechIcon from "../TechIcon";
import type { StackCategoryItems } from "./types";

export default function MarqueeRow({
  items,
  reverse = false,
  durationSec = 26,
}: {
  items: StackCategoryItems;
  reverse?: boolean;
  durationSec?: number;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const g1Ref = useRef<HTMLDivElement | null>(null);
  const g2Ref = useRef<HTMLDivElement | null>(null);

  const [paused, setPaused] = useState(false);
  const [shiftPx, setShiftPx] = useState(0);
  const [ready, setReady] = useState(false);

  const readyRef = useRef(false);
  useLayoutEffect(() => {
    readyRef.current = ready;
  }, [ready]);

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
        g2.getBoundingClientRect().left - g1.getBoundingClientRect().left;

      const rounded = Math.round(d);
      if (rounded > 0) {
        setShiftPx(rounded);
        setReady(true);
      }
    };

    measure();
    requestAnimationFrame(measure);

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            if (!readyRef.current) measure();
          })
        : null;

    ro?.observe(wrap);
    return () => ro?.disconnect();
  }, [items]);

  return (
    <div className="relative overflow-x-clip overflow-y-visible px-16">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-linear-to-r from-panel to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-linear-to-l from-panel to-transparent" />

      <div
        ref={wrapRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onClickCapture={() => setPaused((p) => !p)}
        className={[
          "flex w-max flex-nowrap items-center",
          "will-change-transform transform-gpu",
          "motion-reduce:animate-none",
          "select-none",
          "cursor-pointer",
          "touch-pan-y",
          animClass,
        ].join(" ")}
        style={
          {
            "--marquee-duration": `${durationSec}s`,
            "--marquee-shift": `${shiftPx}px`,
            animationPlayState: paused ? "paused" : "running",
          } as React.CSSProperties & Record<string, string>
        }
      >
        {/* g1 */}
        <div ref={g1Ref} className="flex flex-nowrap gap-6 py-1">
          {items.map((item) => (
            <TechIcon
              key={`a-${item.name}`}
              name={item.name}
              logo={item.logo}
              color={item.color}
            />
          ))}
        </div>

        <div className="shrink-0" style={{ width: seamPx }} />

        {/* g2 */}
        <div
          ref={g2Ref}
          className="flex flex-nowrap gap-6 py-1"
          aria-hidden="true"
        >
          {items.map((item) => (
            <TechIcon
              key={`b-${item.name}`}
              name={item.name}
              logo={item.logo}
              color={item.color}
            />
          ))}
        </div>

        <div className="shrink-0" style={{ width: seamPx }} />

        {/* g3 */}
        <div className="flex flex-nowrap gap-6 py-1" aria-hidden="true">
          {items.map((item) => (
            <TechIcon
              key={`c-${item.name}`}
              name={item.name}
              logo={item.logo}
              color={item.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

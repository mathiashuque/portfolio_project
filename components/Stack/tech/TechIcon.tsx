import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  palette,
  rgba,
  techIconRadius,
  techIconTileSize,
  type TechColor,
} from "@/components/Stack/tech";
import { StaticImageData } from "next/image";

type TechIconProps = {
  name: string;
  logo: StaticImageData;
  color?: TechColor;
  size?: "default" | "lg";
  showLabel?: boolean;
};

export default function TechIcon({
  name,
  logo,
  color = "html",
  size = "default",
  showLabel = false,
}: TechIconProps) {
  const c = palette[color];
  const tileSizeClass =
    size === "lg" ? "w-20 h-20 sm:w-24 sm:h-24" : techIconTileSize;
  const iconSizeClass = size === "lg" ? "w-10 h-10 sm:w-12 sm:h-12" : "w-8 h-8";

  // "tap = hover" state (for mobile)
  const [active, setActive] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // close when tapping outside
  useEffect(() => {
    if (!active) return;

    const onDocPointerDown = (e: PointerEvent) => {
      const root = rootRef.current;
      if (!root) return;
      if (!root.contains(e.target as Node)) setActive(false);
    };

    document.addEventListener("pointerdown", onDocPointerDown, {
      capture: true,
    });
    return () => {
      document.removeEventListener("pointerdown", onDocPointerDown, {
        capture: true,
      } as EventListenerOptions);
    };
  }, [active]);

  // gradients are derived from the RGB in the palette (so it works for all techs)
  const outerGlow = `radial-gradient(circle,
    ${rgba(c.rgb, c.outerHoverA1)} 0%,
    ${rgba(c.rgb, c.outerHoverA2)} 45%,
    ${rgba(c.rgb, 0)} 72%
  )`;

  const innerIdleGlow = `radial-gradient(circle at 50% 45%,
    ${rgba(c.rgb, 0.95)} 0%,
    ${rgba(c.rgb, 0.45)} 35%,
    ${rgba(c.rgb, 0)} 75%
  )`;

  const innerHoverGlow = `radial-gradient(circle at 50% 45%,
    ${rgba(c.rgb, 1)} 0%,
    ${rgba(c.rgb, 0.65)} 40%,
    ${rgba(c.rgb, 0)} 80%
  )`;

  const showHover = active; // used to mimic hover on touch devices

  return (
    <div
      ref={rootRef}
      className="relative group select-none touch-manipulation"
      // desktop hover stays as-is
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      // mobile tap toggles the same visuals
      onClickCapture={() => setActive((v) => !v)}
    >
      {/* Outer ethereal glow (hover/tap) */}
      <div
        className={[
          "pointer-events-none absolute -inset-2",
          "rounded-3xl blur-lg",
          "opacity-0 transition-opacity duration-700 ease-out",
          "z-0",
          // keep group-hover for desktop, add active for mobile
          "group-hover:opacity-100",
        ].join(" ")}
        style={{
          background: outerGlow,
          opacity: showHover ? 1 : undefined,
        }}
      />

      {/* Tooltip (hover/tap) */}
      <div
        className={[
          "pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2",
          "opacity-0 transition-opacity duration-300",
          "px-4 py-2 rounded-full",
          "border-2  bg-black/70",
          "font-semibold whitespace-nowrap shadow-lg",
          "z-20",
          c.text,
          c.border,
          "group-hover:opacity-100",
        ].join(" ")}
        style={{
          opacity: showHover ? 1 : undefined,
        }}
      >
        {name}
      </div>

      {/* Icon tile */}
      <div className="relative z-10">
        <div
          className={[
            "relative",
            tileSizeClass,
            techIconRadius,
            "overflow-hidden flex items-center justify-center",
          ].join(" ")}
        >
          {/* Base tile (idle background, no visible border) */}
          <div
            className="absolute inset-0 transition-all duration-700 ease-out"
            style={{ backgroundColor: rgba(c.rgb, c.tileIdleBgA) }}
          />

          {/* Inner glow (idle) */}
          <div
            className="absolute inset-0 blur-2xl transition-all duration-700 ease-out"
            style={{
              background: innerIdleGlow,
              opacity: c.innerIdleA,
            }}
          />

          {/* Inner glow boost (hover/tap) */}
          <div
            className={[
              "absolute inset-0 blur-2xl opacity-0 transition-opacity duration-700 ease-out",
              "group-hover:opacity-100",
            ].join(" ")}
            style={{
              background: innerHoverGlow,
              // keep palette-based intensity when shown
              opacity: showHover ? c.innerHoverA : undefined,
            }}
          />

          {/* Hover border (hover/tap) */}
          <div
            className={[
              "absolute inset-0",
              techIconRadius,
              "opacity-0 transition-opacity duration-700 ease-out",
              "pointer-events-none",
              "z-20",
              "group-hover:opacity-100",
            ].join(" ")}
            style={{
              border: `1px solid rgba(${c.rgb}, ${c.hoverBorderA})`,
              opacity: showHover ? 1 : undefined,
            }}
          />

          {/* Icon */}
          <Image
            src={logo}
            alt={name}
            draggable={false}
            className={[
              "relative z-10 object-contain transition-transform duration-700 ease-out",
              iconSizeClass,
              "group-hover:scale-105",
            ].join(" ")}
            style={{
              transform: showHover ? "scale(1.05)" : undefined,
            }}
          />
        </div>
      </div>

      {showLabel && (
        <p className="mt-2 text-center text-xs sm:text-sm font-medium text-muted/90">
          {name}
        </p>
      )}
    </div>
  );
}

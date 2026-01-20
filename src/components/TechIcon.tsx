import {
  palette,
  rgba,
  techIconRadius,
  techIconTileSize,
  type TechColor,
} from "../theme/tech";

type TechIconProps = {
  name: string;
  logo: string;
  color?: TechColor;
};

export default function TechIcon({
  name,
  logo,
  color = "tool",
}: TechIconProps) {
  const c = palette[color];

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

  return (
    <div className="relative group">
      {/* Outer ethereal glow (hover only) */}
      <div
        className={[
          "pointer-events-none absolute -inset-2",
          "rounded-3xl blur-lg",
          "opacity-0 group-hover:opacity-100",
          "transition-opacity duration-700 ease-out",
          "z-0",
        ].join(" ")}
        style={{ background: outerGlow }}
      />

      {/* Tooltip */}
      <div
        className={[
          "pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          "px-4 py-2 rounded-full",
          "border-2 backdrop-blur-sm bg-transparent",
          "font-semibold whitespace-nowrap shadow-lg",
          "z-20",
          c.text,
          c.border,
        ].join(" ")}
      >
        {name}
      </div>

      {/* Icon tile */}
      <div className="relative z-10">
        <div
          className={[
            "relative",
            techIconTileSize,
            techIconRadius,
            "overflow-hidden flex items-center justify-center",
          ].join(" ")}
        >
          {/* Base tile (idle background, no visible border) */}
          <div
            className="absolute inset-0 transition-all duration-700 ease-out"
            style={{
              backgroundColor: rgba(c.rgb, c.tileIdleBgA),
            }}
          />

          {/* Inner glow (idle) */}
          <div
            className="absolute inset-0 blur-2xl transition-all duration-700 ease-out"
            style={{
              background: innerIdleGlow,
              opacity: c.innerIdleA,
            }}
          />

          {/* Inner glow boost (hover) */}
          <div
            className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
            style={{ background: innerHoverGlow, opacity: c.innerHoverA }}
          />

          {/* Hover border (only on hover) */}
          <div
            className={[
              "absolute inset-0",
              techIconRadius, // ✅ match the tile
              "opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out",
              "pointer-events-none",
              "z-20",
            ].join(" ")}
            style={{
              border: `1px solid rgba(${c.rgb}, ${c.hoverBorderA})`,
            }}
          />

          {/* Icon */}
          <img
            src={logo}
            alt={name}
            className="relative z-10 w-8 h-8 object-contain transition-transform duration-700 ease-out group-hover:scale-105"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}

export type TechColor =
  | "js"
  | "ts"
  | "react"
  | "node"
  | "dotnet"
  | "python"
  | "java"
  | "tool";

export type PaletteEntry = {
  text: string;
  border: string;
  rgb: string;

  tileIdleBgA: number;
  innerIdleA: number;
  innerHoverA: number;
  outerHoverA1: number;
  outerHoverA2: number;
  hoverBorderA: number;
};

export const palette: Record<TechColor, PaletteEntry> = {
  js: {
    text: "text-yellow-300",
    border: "border-yellow-400/60",
    rgb: "240, 218, 79",
    tileIdleBgA: 0.1,
    innerIdleA: 0.55,
    innerHoverA: 0.75,
    outerHoverA1: 0.6,
    outerHoverA2: 0.3,
    hoverBorderA: 0.65,
  },
  ts: {
    text: "text-blue-300",
    border: "border-blue-400/60",
    rgb: "96, 165, 250",
    tileIdleBgA: 0.07,
    innerIdleA: 0.4,
    innerHoverA: 0.6,
    outerHoverA1: 0.45,
    outerHoverA2: 0.22,
    hoverBorderA: 0.55,
  },
  react: {
    text: "text-cyan-300",
    border: "border-cyan-400/60",
    rgb: "34, 211, 238",
    tileIdleBgA: 0.07,
    innerIdleA: 0.4,
    innerHoverA: 0.6,
    outerHoverA1: 0.45,
    outerHoverA2: 0.22,
    hoverBorderA: 0.55,
  },
  node: {
    text: "text-emerald-300",
    border: "border-emerald-400/60",
    rgb: "52, 211, 153",
    tileIdleBgA: 0.07,
    innerIdleA: 0.38,
    innerHoverA: 0.58,
    outerHoverA1: 0.42,
    outerHoverA2: 0.2,
    hoverBorderA: 0.55,
  },
  dotnet: {
    text: "text-violet-300",
    border: "border-violet-400/60",
    rgb: "167, 139, 250",
    tileIdleBgA: 0.07,
    innerIdleA: 0.38,
    innerHoverA: 0.58,
    outerHoverA1: 0.42,
    outerHoverA2: 0.2,
    hoverBorderA: 0.55,
  },
  python: {
    text: "text-sky-300",
    border: "border-sky-400/60",
    rgb: "56, 189, 248",
    tileIdleBgA: 0.07,
    innerIdleA: 0.38,
    innerHoverA: 0.58,
    outerHoverA1: 0.42,
    outerHoverA2: 0.2,
    hoverBorderA: 0.55,
  },
  java: {
    text: "text-orange-300",
    border: "border-orange-400/60",
    rgb: "251, 146, 60",
    tileIdleBgA: 0.07,
    innerIdleA: 0.38,
    innerHoverA: 0.58,
    outerHoverA1: 0.42,
    outerHoverA2: 0.2,
    hoverBorderA: 0.55,
  },
  tool: {
    text: "text-gray-200",
    border: "border-white/15",
    rgb: "255, 255, 255",
    tileIdleBgA: 0.04,
    innerIdleA: 0.1,
    innerHoverA: 0.18,
    outerHoverA1: 0.18,
    outerHoverA2: 0.08,
    hoverBorderA: 0.25,
  },
} as const;

// tech.ts
export const techIconTileSize = "w-[66px] h-[66px]";
export const techIconRadius = "rounded-3xl";


export function rgba(rgb: string, a: number) {
  return `rgba(${rgb}, ${a})`;
}

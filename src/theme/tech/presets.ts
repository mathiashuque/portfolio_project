import type { PaletteEntry } from "./types";

export type AlphaPreset = Pick<
  PaletteEntry,
  | "tileIdleBgA"
  | "innerIdleA"
  | "innerHoverA"
  | "outerHoverA1"
  | "outerHoverA2"
  | "hoverBorderA"
>;

export const PRESETS = {
  strong: {
    tileIdleBgA: 0.1,
    innerIdleA: 0.55,
    innerHoverA: 0.75,
    outerHoverA1: 0.6,
    outerHoverA2: 0.3,
    hoverBorderA: 0.65,
  },
  soft: {
    tileIdleBgA: 0.07,
    innerIdleA: 0.4,
    innerHoverA: 0.6,
    outerHoverA1: 0.45,
    outerHoverA2: 0.22,
    hoverBorderA: 0.55,
  },
  mid: {
    tileIdleBgA: 0.07,
    innerIdleA: 0.38,
    innerHoverA: 0.58,
    outerHoverA1: 0.42,
    outerHoverA2: 0.2,
    hoverBorderA: 0.55,
  },
} as const satisfies Record<string, AlphaPreset>;

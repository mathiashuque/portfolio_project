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
    tileIdleBgA: 0.3,
    innerIdleA: 0.55,
    innerHoverA: 0.75,
    outerHoverA1: 0.6,
    outerHoverA2: 0.3,
    hoverBorderA: 0.65,
  },

} as const satisfies Record<string, AlphaPreset>;

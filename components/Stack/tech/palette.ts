import type { PaletteEntry, TechColor } from "./types";
import { PRESETS, type AlphaPreset } from "./presets";

type EntryCore = Pick<PaletteEntry, "text" | "border" | "rgb">;

function makeEntry(
  core: EntryCore,
  preset: AlphaPreset,
  overrides?: Partial<AlphaPreset>,
): PaletteEntry {
  return {
    ...core,
    ...preset,
    ...overrides,
  };
}

export const palette = {
  html: makeEntry(
    {
      text: "text-orange-400",
      border: "border-orange-500/60",
      rgb: "227, 79, 38",
    },
    PRESETS.strong,
  ),
  css: makeEntry(
    {
      text: "text-blue-400",
      border: "border-blue-500/60",
      rgb: "38, 132, 227",
    },
    PRESETS.strong,
  ),
  js: makeEntry(
    {
      text: "text-yellow-300",
      border: "border-yellow-400/60",
      rgb: "240, 218, 79",
    },
    PRESETS.strong,
  ),

  ts: makeEntry(
    {
      text: "text-blue-300",
      border: "border-blue-400/60",
      rgb: "96, 165, 250",
    },
    PRESETS.strong,
  ),
  tailwind: makeEntry(
    { text: "text-sky-300", border: "border-sky-400/60", rgb: "8, 166, 194" },
    PRESETS.strong,
  ),
  react: makeEntry(
    {
      text: "text-cyan-300",
      border: "border-cyan-400/60",
      rgb: "34, 211, 238",
    },
    PRESETS.strong,
  ),
  angular: makeEntry(
    { text: "text-red-300", border: "border-red-400/60", rgb: "239, 68, 68" },
    PRESETS.strong,
  ),

  nextjs: makeEntry(
    {
      text: "text-gray-300",
      border: "border-gray-400/60",
      rgb: "156, 163, 175",
    },
    PRESETS.strong,
  ),
  github: makeEntry(
    {
      text: "text-gray-300",
      border: "border-gray-400/60",
      rgb: "156, 163, 175",
    },
    PRESETS.strong,
  ),
  vercel: makeEntry(
    {
      text: "text-gray-300",
      border: "border-gray-400/60",
      rgb: "156, 163, 175",
    },
    PRESETS.strong,
  ),
  express: makeEntry(
    {
      text: "text-gray-300",
      border: "border-gray-400/60",
      rgb: "156, 163, 175",
    },
    PRESETS.strong,
  ),

  node: makeEntry(
    {
      text: "text-emerald-300",
      border: "border-emerald-400/60",
      rgb: "52, 211, 153",
    },
    PRESETS.strong,
  ),
  shopify: makeEntry(
    {
      text: "text-green-300",
      border: "border-green-400/60",
      rgb: "74, 222, 128",
    },
    PRESETS.strong,
  ),
  dotnet: makeEntry(
    {
      text: "text-violet-300",
      border: "border-violet-400/60",
      rgb: "167, 139, 250",
    },
    PRESETS.strong,
  ),
  python: makeEntry(
    { text: "text-sky-300", border: "border-sky-400/60", rgb: "56, 189, 248" },
    PRESETS.strong,
  ),
  java: makeEntry(
    {
      text: "text-orange-300",
      border: "border-orange-400/60",
      rgb: "251, 146, 60",
    },
    PRESETS.strong,
  ),
  docker: makeEntry(
    {
      text: "text-blue-300",
      border: "border-blue-400/60",
      rgb: "96, 165, 250",
    },
    PRESETS.strong,
  ),
  postman: makeEntry(
    {
      text: "text-orange-300",
      border: "border-orange-400/60",
      rgb: "251, 146, 60",
    },
    PRESETS.strong,
  ),
  figma: makeEntry(
    {
      text: "text-pink-300",
      border: "border-pink-400/60",
      rgb: "236, 72, 153",
    },
    PRESETS.strong,
  ),
  git: makeEntry(
    { text: "text-red-300", border: "border-red-400/60", rgb: "239, 68, 68" },
    PRESETS.strong,
  ),

  aws: makeEntry(
    {
      text: "text-yellow-400",
      border: "border-yellow-500/60",
      rgb: "255, 199, 44",
    },
    PRESETS.strong,
  ),
  linux: makeEntry(
    {
      text: "text-orange-400",
      border: "border-orange-500/60",
      rgb: "227, 79, 38",
    },
    PRESETS.strong,
  ),
  firebase: makeEntry(
    {
      text: "text-yellow-400",
      border: "border-yellow-500/60",
      rgb: "255, 199, 44",
    },
    PRESETS.strong,
  ),
  cplusplus: makeEntry(
    {
      text: "text-blue-400",
      border: "border-blue-500/60",
      rgb: "38, 132, 227",
    },
    PRESETS.strong,
  ),
  csharp: makeEntry(
    {
      text: "text-purple-400",
      border: "border-purple-500/60",
      rgb: "139, 92, 246",
    },
    PRESETS.strong,
  ),

  
  flutter: makeEntry(
    {
      text: "text-blue-300",
      border: "border-blue-400/60",
      rgb: "96, 165, 250",
    },
    PRESETS.strong,
  ),
  sequelize: makeEntry(
    {
      text: "text-blue-300",
      border: "border-blue-400/60",
      rgb: "96, 165, 250",
    },
    PRESETS.strong,
  ),
  prisma: makeEntry(
    {
      text: "text-blue-300",
      border: "border-blue-400/60",
      rgb: "96, 165, 250",
    },
    PRESETS.strong,
  ),
  efcore: makeEntry(
    // Entity Framework Core
    {
      text: "text-violet-300",
      border: "border-violet-400/60",
      rgb: "167, 139, 250",
    },
    PRESETS.strong,
  ),
  mongoose: makeEntry(
    // Mongoose ODM
    {
      text: "text-red-300",
      border: "border-red-400/60",
      rgb: "239, 68, 68",
    },
    PRESETS.strong,
  ),
  jest: makeEntry(
    {
      text: "text-pink-300",
      border: "border-pink-400/60",
      rgb: "236, 72, 153",
    },
    PRESETS.strong,
  ),
  jasmine: makeEntry(
    {
      text: "text-purple-300",
      border: "border-purple-400/60",
      rgb: "192, 132, 252",
    },
    PRESETS.strong,
  ),
  cucumber: makeEntry(
    {
      text: "text-green-300",
      border: "border-green-400/60",
      rgb: "74, 222, 128",
    },
    PRESETS.strong,
  ),
  cypress: makeEntry(
    {
      text: "text-green-300",
      border: "border-green-400/60",
      rgb: "74, 222, 128",
    },
    PRESETS.strong,
  ),
  mysql: makeEntry(
    {
      text: "text-blue-400",
      border: "border-blue-500/60",
      rgb: "38, 132, 227",
    },
    PRESETS.strong,
  ),
  postgresql: makeEntry(
    {
      text: "text-blue-400",
      border: "border-blue-500/60",
      rgb: "38, 132, 227",
    },
    PRESETS.strong,
  ),
  mongodb: makeEntry(
    {
      text: "text-green-400",
      border: "border-green-500/60",
      rgb: "34, 197, 94",
    },
    PRESETS.strong,
  ),
  "sql server": makeEntry( 
    {
      text: "text-red-400",
      border: "border-red-500/60",
      rgb: "239, 68, 68",
    },
    PRESETS.strong,
  ),


} as const satisfies Record<TechColor, PaletteEntry>;

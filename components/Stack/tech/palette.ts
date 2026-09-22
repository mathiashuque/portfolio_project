import type { PaletteEntry, TechColor } from "./types";

/** Todas las tecnologías comparten las mismas alfas; lo único que cambia es el color. */
const ALPHAS = {
  tileIdleBgA: 0.3,
  innerIdleA: 0.55,
  innerHoverA: 0.75,
  outerHoverA1: 0.6,
  outerHoverA2: 0.3,
  hoverBorderA: 0.65,
} as const satisfies Omit<PaletteEntry, "text" | "border" | "rgb">;

/** `rgba()` a partir del triplete rgb de una entrada de la paleta. */
export function rgba(rgb: string, a: number) {
  return `rgba(${rgb}, ${a})`;
}

/** [clase de texto, clase de borde, triplete rgb] */
type Row = readonly [text: string, border: string, rgb: string];

const entry = ([text, border, rgb]: Row): PaletteEntry => ({
  ...ALPHAS,
  text,
  border,
  rgb,
});

/**
 * Color de cada tecnología. Las clases viven aquí como literales para que
 * Tailwind las detecte al escanear el archivo.
 */
export const palette = {
  html: entry(["text-orange-400", "border-orange-500/60", "227, 79, 38"]),
  css: entry(["text-blue-400", "border-blue-500/60", "38, 132, 227"]),
  js: entry(["text-yellow-300", "border-yellow-400/60", "240, 218, 79"]),
  ts: entry(["text-blue-300", "border-blue-400/60", "96, 165, 250"]),
  tailwind: entry(["text-sky-300", "border-sky-400/60", "8, 166, 194"]),
  react: entry(["text-cyan-300", "border-cyan-400/60", "34, 211, 238"]),
  angular: entry(["text-red-300", "border-red-400/60", "239, 68, 68"]),
  nextjs: entry(["text-gray-300", "border-gray-400/60", "156, 163, 175"]),
  github: entry(["text-gray-300", "border-gray-400/60", "156, 163, 175"]),
  vercel: entry(["text-gray-300", "border-gray-400/60", "156, 163, 175"]),
  express: entry(["text-gray-300", "border-gray-400/60", "156, 163, 175"]),
  node: entry(["text-emerald-300", "border-emerald-400/60", "52, 211, 153"]),
  shopify: entry(["text-green-300", "border-green-400/60", "74, 222, 128"]),
  dotnet: entry(["text-violet-300", "border-violet-400/60", "167, 139, 250"]),
  python: entry(["text-sky-300", "border-sky-400/60", "56, 189, 248"]),
  java: entry(["text-orange-300", "border-orange-400/60", "251, 146, 60"]),
  docker: entry(["text-blue-300", "border-blue-400/60", "96, 165, 250"]),
  postman: entry(["text-orange-300", "border-orange-400/60", "251, 146, 60"]),
  figma: entry(["text-pink-300", "border-pink-400/60", "236, 72, 153"]),
  git: entry(["text-red-300", "border-red-400/60", "239, 68, 68"]),
  aws: entry(["text-yellow-400", "border-yellow-500/60", "255, 199, 44"]),
  linux: entry(["text-orange-400", "border-orange-500/60", "227, 79, 38"]),
  firebase: entry(["text-yellow-400", "border-yellow-500/60", "255, 199, 44"]),
  cplusplus: entry(["text-blue-400", "border-blue-500/60", "38, 132, 227"]),
  csharp: entry(["text-purple-400", "border-purple-500/60", "139, 92, 246"]),
  flutter: entry(["text-blue-300", "border-blue-400/60", "96, 165, 250"]),
  sequelize: entry(["text-blue-300", "border-blue-400/60", "96, 165, 250"]),
  prisma: entry(["text-blue-300", "border-blue-400/60", "96, 165, 250"]),
  efcore: entry(["text-violet-300", "border-violet-400/60", "167, 139, 250"]),
  mongoose: entry(["text-red-300", "border-red-400/60", "239, 68, 68"]),
  jest: entry(["text-pink-300", "border-pink-400/60", "236, 72, 153"]),
  jasmine: entry(["text-purple-300", "border-purple-400/60", "192, 132, 252"]),
  cucumber: entry(["text-green-300", "border-green-400/60", "74, 222, 128"]),
  cypress: entry(["text-green-300", "border-green-400/60", "74, 222, 128"]),
  mysql: entry(["text-blue-400", "border-blue-500/60", "38, 132, 227"]),
  postgresql: entry(["text-blue-400", "border-blue-500/60", "38, 132, 227"]),
  mongodb: entry(["text-green-400", "border-green-500/60", "34, 197, 94"]),
  "sql server": entry(["text-red-400", "border-red-500/60", "239, 68, 68"]),
} as const satisfies Record<TechColor, PaletteEntry>;

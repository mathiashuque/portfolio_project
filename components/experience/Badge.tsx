import React from "react";
import { cn } from "./cn";
import type { BadgeVariant } from "./types";

export default function Badge({
  label,
  variant = "slate",
  icon,
}: {
  label: string;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
}) {
  const styles =
    variant === "orange"
      ? "bg-orange-500 text-white shadow-[0_10px_30px_-18px_rgba(249,115,22,0.65)]"
      : variant === "pink"
        ? "bg-pink-500 text-white shadow-[0_10px_30px_-18px_rgba(236,72,153,0.65)]"
        : "bg-slate-700/90 text-white shadow-[0_10px_30px_-18px_rgba(15,23,42,0.60)]";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold",
        "tracking-wide",
        styles,
      )}
    >
      <span className="text-sm leading-none">{icon ?? "🎓"}</span>
      {label}
    </span>
  );
}

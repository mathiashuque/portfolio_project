"use client";

import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { iconClass } from "./constants";

export default function ThemeToggle({
  dark,
  onToggle,
  variant = "icon",
}: {
  dark: boolean;
  onToggle: () => void;
  variant?: "icon" | "mobile";
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    if (variant === "mobile") {
      return (
        <button
          type="button"
          aria-label="Toggle theme"
          className="
            flex items-center gap-2
  px-3 py-2 rounded-lg
  transition-all duration-200
  hover:bg-slate-900/10 hover:scale-[1.04]
  dark:hover:bg-white/10
          "
          disabled
        >
          <span className="text-xl" aria-hidden>
            <FaSun />
          </span>
          <span className="text-sm text-muted">Theme</span>
        </button>
      );
    }

    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={iconClass}
        disabled
      >
        <FaSun aria-hidden />
      </button>
    );
  }

  if (variant === "mobile") {
    return (
      <button
        type="button"
        onClick={onToggle}
        className="
         flex items-center gap-2
  px-3 py-2 rounded-lg
  transition-all duration-200
  hover:bg-slate-900/10 hover:scale-[1.04]
  dark:hover:bg-white/10
        "
        aria-label="Toggle theme"
      >
        <span className="text-xl">{dark ? <FaSun /> : <FaMoon />}</span>
        <span className="text-sm text-muted">
          {dark ? "Light mode" : "Dark mode"}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle theme"
      className={iconClass}
    >
      {dark ? <FaMoon /> : <FaSun />}
    </button>
  );
}

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
  if (variant === "mobile") {
    return (
      <button
        type="button"
        onClick={onToggle}
        className="
          ml-auto flex items-center gap-2
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

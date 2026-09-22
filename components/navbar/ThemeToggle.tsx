"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { iconClass } from "./constants";
import { useTheme } from "@/components/useTheme";

/**
 * El ícono y el texto los elige CSS (`dark:`), no el estado de React: la clase
 * ya está puesta antes del primer paint, así que lo que renderiza el server y lo
 * que hidrata el cliente coinciden siempre. Antes eso se resolvía con un estado
 * `mounted` que mostraba un botón deshabilitado hasta hidratar.
 */
export default function ThemeToggle({
  variant = "icon",
}: {
  variant?: "icon" | "mobile";
}) {
  const { toggle } = useTheme();
  const t = useTranslations("Theme");

  if (variant === "mobile") {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={t("aria.toggle")}
        className="
         flex items-center gap-2
  px-3 py-2 rounded-lg
  transition-all duration-200
  hover:bg-slate-900/10 hover:scale-[1.04]
  dark:hover:bg-white/10
        "
      >
        <Moon className="h-5 w-5 dark:hidden" aria-hidden />
        <Sun className="h-5 w-5 hidden dark:block" aria-hidden />
        <span className="text-sm text-muted dark:hidden">{t("darkMode")}</span>
        <span className="text-sm text-muted hidden dark:block">
          {t("lightMode")}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t("aria.toggle")}
      className={iconClass}
    >
      <Moon className="dark:hidden" aria-hidden />
      <Sun className="hidden dark:block" aria-hidden />
    </button>
  );
}

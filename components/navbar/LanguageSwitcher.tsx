"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const nextLocale = locale === "en" ? "es" : "en";

  const onSwitch = () => {
    // Preserve hash (#home, etc.)
    const hash =
      typeof window !== "undefined" ? window.location.hash : "";

    // pathname looks like: /en or /en/something
    const parts = pathname.split("/");
    // parts[0] = "", parts[1] = "en"
    parts[1] = nextLocale;

    router.push(parts.join("/") + hash);
  };

  return (
    <button
      type="button"
      onClick={onSwitch}
      className="
        text-sm font-semibold
        rounded-md px-2 py-1
        border border-border/20
        hover:bg-slate-900/10 dark:hover:bg-white/10
        transition-colors
      "
      aria-label={t("aria.switchLanguage", { locale: nextLocale.toUpperCase() })}
    >
      {nextLocale.toUpperCase()}
    </button>
  );
}

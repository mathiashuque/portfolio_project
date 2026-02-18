"use client";

import { useTranslations } from "next-intl";

export default function ProjectsHeader() {
  const t = useTranslations("Projects.header");

  return (
    <div className="mb-10 text-center">
      <p className="text-xs font-semibold tracking-[0.22em] text-faint/90">
        {t("kicker")}
      </p>

      <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-text">
        {t("title")}
      </h2>

      <p className="mt-3 text-sm text-muted/80 max-w-2xl mx-auto leading-relaxed">
        {t("subtitle")}
      </p>
    </div>
  );
}

"use client";

import { useTranslations } from "next-intl";

export default function StackHeader() {
  const t = useTranslations("Stack.header");

  return (
    <div className="mb-5 text-center">
      <p className="text-xs font-semibold tracking-[0.22em] text-faint/90">
        {t("kicker")}
      </p>

      <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-text">
        {t("title")}
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-muted/90">
        {t("subtitle")}
      </p>
    </div>
  );
}

"use client";

import React, { useMemo } from "react";
import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import ExperienceTimeline from "./ExperienceTimeline";
import type { Experience } from "./types";
import { mapExperienceMessages } from "./getExperiences";

export default function ExperienceSection() {
  const t = useTranslations("Experience");

  const experiences = useMemo<Experience[]>(() => {
    const items = t.raw("items");
    // runtime safety
    if (!Array.isArray(items)) return [];
    return mapExperienceMessages(items);
  }, [t]);

  return (
    <section
      id="experience"
      className="min-h-dvh snap-start px-6 max-w-7xl 2xl:max-w-360 mx-auto scroll-mt-32 mb-30"
      aria-label="Experience"
    >
      {/* Header */}
      <Reveal className="mb-14 text-center" duration={0.9} offset={50}>
        <p className="text-xs font-semibold tracking-[0.22em] text-faint/90">
          {t("eyebrow")}
        </p>

        <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-text">
          {t("title")}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-muted/90">
          {t("subtitle")}
        </p>
      </Reveal>

      {/* Timeline */}
      <Reveal delay={0.15}>
        <ExperienceTimeline experiences={experiences} />
      </Reveal>
    </section>
  );
}

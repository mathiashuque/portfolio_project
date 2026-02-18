"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import ExperienceTimeline from "./ExperienceTimeline";
import type { Experience } from "./types";
import { mapExperienceMessages } from "./getExperiences";

export default function ExperienceSection() {
  const [inView, setInView] = useState(false);
  const t = useTranslations("Experience");

  const experiences = useMemo<Experience[]>(() => {
    const items = t.raw("items");
    // runtime safety
    if (!Array.isArray(items)) return [];
    return mapExperienceMessages(items);
  }, [t]);

  return (
    <motion.section
      id="experience"
      className="px-6 max-w-7xl 2xl:max-w-360 mx-auto scroll-mt-32 mb-30"
      aria-label="Experience"
      onViewportEnter={() => setInView(true)}
      onViewportLeave={() => setInView(false)}
      viewport={{ amount: 0.3 }}
    >
      {/* Header */}
      <motion.div
        className="mb-14 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs font-semibold tracking-[0.22em] text-faint/90">
          {t("eyebrow")}
        </p>

        <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-text">
          {t("title")}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-muted/90">
          {t("subtitle")}
        </p>
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{
          duration: 1,
          delay: inView ? 0.15 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <ExperienceTimeline experiences={experiences} />
      </motion.div>
    </motion.section>
  );
}

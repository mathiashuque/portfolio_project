"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { PRIMARY_STACK, STACK } from "@/components/Stack/tech/stackData";
import MarqueeRow from "./MarqueeRow";
import StackHeader from "./StackHeader";
import TechIcon from "./tech/TechIcon";
import { StackCategoryItems } from "./types";
import { useTranslations } from "next-intl";

export default function StackSection() {
  const [inView, setInView] = useState(false);
  const t = useTranslations("Stack");
  const tCategories = useTranslations("Stack.categories");
  return (
    <motion.section
      id="stack"
      className="min-h-dvh snap-start snap-always px-6 mb-20 max-w-7xl 2xl:max-w-360 mx-auto scroll-mt-32"
      onViewportEnter={() => setInView(true)}
      onViewportLeave={() => setInView(false)}
      viewport={{ amount: 0.1 }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <StackHeader />
      </motion.div>

      {/* Primary stack */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{
          duration: 1,
          delay: inView ? 0.1 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-muted/90 tracking-tight">
          {t("primaryTitle")}
        </h3>

        <div className="rounded-2xl bg-panel px-6 py-8 shadow-sm">
          <div className="flex flex-wrap items-start justify-center gap-x-8 gap-y-6 sm:gap-x-10">
            {PRIMARY_STACK.map((item) => (
              <TechIcon
                key={item.name}
                name={item.name}
                logo={item.logo}
                color={item.color}
                size="lg"
                showLabel
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Secondary stack */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{
          duration: 1,
          delay: inView ? 0.12 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-muted/90 tracking-tight">
          {t("secondaryTitle")}
        </h3>

        <div className="space-y-5">
          {Object.entries(STACK).map(([category, items], i) => (
            <div key={category}>
              <h4 className="text-sm sm:text-base font-medium mb-3 text-muted/70 tracking-tight">
                {tCategories(category)}
              </h4>

              <div className="rounded-2xl bg-panel px-6 py-1 pt-1 shadow-sm">
                <MarqueeRow
                  items={items as StackCategoryItems}
                  reverse={i % 2 === 1}
                  durationSec={24 + i * 4}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}

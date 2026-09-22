"use client";

import { PRIMARY_STACK, STACK } from "@/components/Stack/tech/stackData";
import Reveal from "@/components/Reveal";
import MarqueeRow from "./MarqueeRow";
import StackHeader from "./StackHeader";
import TechIcon from "./tech/TechIcon";
import { StackCategoryItems } from "./types";
import { useTranslations } from "next-intl";

export default function StackSection() {
  const t = useTranslations("Stack");
  const tCategories = useTranslations("Stack.categories");
  return (
    <section
      id="stack"
      className="min-h-dvh snap-start snap-always px-6 mb-20 max-w-7xl 2xl:max-w-360 mx-auto scroll-mt-32"
    >
      {/* Header */}
      <Reveal duration={0.9} offset={50}>
        <StackHeader />
      </Reveal>

      {/* Primary stack */}
      <Reveal className="mb-10" delay={0.1}>
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
      </Reveal>

      {/* Secondary stack */}
      <Reveal delay={0.12}>
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
      </Reveal>
    </section>
  );
}

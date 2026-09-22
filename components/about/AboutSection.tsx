"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import AboutTabs from "./AboutTabs";
import AboutTabContent from "./AboutTabContent";
import { useAboutTabs } from "./useAboutTabs";
import { buildAboutTabs } from "./getAboutTabs";

/** Cada cuánto rota sola la pestaña activa. */
const ROTATE_MS = 15_000;

export default function AboutSection() {
  const t = useTranslations("About");

  const tabs = useMemo(() => buildAboutTabs(t), [t]);
  const { active, setActive, activeTab } = useAboutTabs(tabs, ROTATE_MS);

  return (
    <section
      id="about"
      className="min-h-dvh snap-start snap-always scroll-mt-32 mb-20"
      aria-label="About"
    >
      <div className="mx-auto w-full max-w-7xl 2xl:max-w-360 px-6">
        <div className="relative isolate overflow-hidden rounded-3xl">
          <Reveal
            duration={1}
            offset={50}
            className="mx-auto max-w-4xl text-center"
          >
            <AboutTabs
              tabs={tabs}
              active={active}
              onSelect={setActive}
              rotateMs={ROTATE_MS}
            />

            <AboutTabContent tab={activeTab} activeKey={active} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

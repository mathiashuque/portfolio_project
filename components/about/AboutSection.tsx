"use client";

import React, { useMemo } from "react";
import AboutLayout from "./AboutLayout";
import AboutTabs from "./AboutTabs";
import AboutStyles from "./AboutStyles";
import AboutTabContent from "./AboutTabContent";
import { useAboutTabs } from "./useAboutTabs";
import { useTranslations } from "next-intl";
import { buildAboutTabs } from "./getAboutTabs";

export default function AboutSection() {
  const t = useTranslations("About");

  const tabs = useMemo(() => buildAboutTabs(t), [t]);
  const ROTATE_MS = 15000;

  const { active, setActive, activeTab } = useAboutTabs(tabs, ROTATE_MS);

  return (
    <AboutLayout>
      <AboutTabs
        tabs={tabs}
        active={active}
        onSelect={setActive}
        rotateMs={ROTATE_MS}
      />

      <AboutTabContent tab={activeTab} activeKey={active} />
      <AboutStyles />
    </AboutLayout>
  );
}

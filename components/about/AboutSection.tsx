"use client";

import React, { useMemo } from "react";
import AboutLayout from "./AboutLayout";
import AboutTabs from "./AboutTabs";
import AboutProgress from "./AboutProgress";
import AboutStyles from "./AboutStyles";
import AboutTabContent from "./AboutTabContent";
import { ABOUT_TABS } from "./data";
import { useAboutTabs } from "./useAboutTabs";

export default function AboutSection() {
  const tabs = useMemo(() => ABOUT_TABS, []);
  const ROTATE_MS = 15000; // Rotate every 10 seconds

  const { active, setActive, activeTab } = useAboutTabs(tabs, ROTATE_MS);

  return (
    <AboutLayout>
      {/* If you want to remove the old header, you can delete AboutHeader usage entirely */}
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

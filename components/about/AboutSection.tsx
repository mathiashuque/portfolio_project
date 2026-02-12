"use client";

import React, { useMemo } from "react";
import AboutContent from "./AboutContent";
import AboutHeader from "./AboutHeader";
import AboutLayout from "./AboutLayout";
import AboutProgress from "./AboutProgress";
import AboutStyles from "./AboutStyles";
import AboutTabs from "./AboutTabs";
import { ABOUT_TABS } from "./data";
import { useAboutTabs } from "./useAboutTabs";

export default function AboutSection() {
  const tabs = useMemo(() => ABOUT_TABS, []);
  const ROTATE_MS = 6000;

  const { active, setActive, activeTab } = useAboutTabs(tabs, ROTATE_MS);

  return (
    <AboutLayout>
      <AboutHeader />
      <AboutTabs tabs={tabs} active={active} onSelect={setActive} />
      <AboutContent tab={activeTab} activeKey={active} />
      <AboutProgress activeKey={active} rotateMs={ROTATE_MS} />
      <AboutStyles />
    </AboutLayout>
  );
}

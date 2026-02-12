"use client";

import { useEffect, useMemo, useState } from "react";
import type { Tab, TabKey } from "./types";

export function useAboutTabs(tabs: readonly Tab[], rotateMs: number) {
  const [active, setActive] = useState<TabKey>(tabs[0]?.key ?? "principles");

  const activeIndex = useMemo(
    () => tabs.findIndex((t) => t.key === active),
    [tabs, active],
  );

  const activeTab = useMemo(() => tabs[activeIndex] ?? tabs[0], [tabs, activeIndex]);

  // Auto-rotate (resets on manual click because `active` changes)
  useEffect(() => {
    if (!tabs.length) return;

    const id = window.setTimeout(() => {
      const next = (activeIndex + 1) % tabs.length;
      setActive(tabs[next].key);
    }, rotateMs);

    return () => window.clearTimeout(id);
  }, [activeIndex, tabs, rotateMs]);

  return { active, setActive, activeIndex, activeTab };
}

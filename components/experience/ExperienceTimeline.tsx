import React, { useCallback, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import ExperienceItem from "./ExperienceItem";
import type { Experience } from "./types";

function TimelineRow({
  exp,
  index,
  active,
  onActiveChange,
}: {
  exp: Experience;
  index: number;
  active: boolean;
  onActiveChange: (idx: number, active: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  // Progress for THIS ROW relative to viewport:
  // 0 when row enters from bottom, 1 when it exits at top
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Optional: keep a subtle parallax. Remove if you want totally static items.
  const direction = index % 2 === 0 ? 1 : -1;
  const magnitude = direction * (10 + Math.min(index * 6, 24));
  const input = [0, 0.5, 1];

  const y = useTransform(scrollYProgress, input, [magnitude, 0, -magnitude], {
    clamp: true,
  });

  // Activate whenever the row is near the center band.
  // Tune these numbers to make the band wider/narrower.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const isActive = v > 0.42 && v < 0.58;
    onActiveChange(index, isActive);
  });

  return (
    <motion.div ref={ref} style={{ y }}>
      <ExperienceItem exp={exp} active={active} />
    </motion.div>
  );
}

export default function ExperienceTimeline({
  experiences,
}: {
  experiences: Experience[];
}) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Stable handler
  const handleActiveChange = useCallback((idx: number, isActive: boolean) => {
    if (isActive) setActiveIndex(idx);
  }, []);

  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Continuous vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />

      <div className="space-y-24">
        {experiences.map((exp, index) => (
          <TimelineRow
            key={`${exp.role}-${exp.period}-${index}`}
            exp={exp}
            index={index}
            active={index === activeIndex}
            onActiveChange={handleActiveChange}
          />
        ))}
      </div>
    </div>
  );
}

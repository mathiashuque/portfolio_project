"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ExperienceTimeline from "./ExperienceTimeline";
import type { Experience } from "./types";

export default function ExperienceSection() {
  const [inView, setInView] = useState(false);

  const experiences = useMemo<Experience[]>(
    () => [
      {
        role: "Professor",
        focus: "Fundamentals Of Computing",
        organization: "Universidad ORT Uruguay",
        organizationHref: "https://www.ort.edu.uy/",
        period: "March 2026 – Present",
        duration: "Ongoing",
        location: "Montevideo, Uruguay",
        modality: "Hybrid",
        description: [
          "Teach fundamental computing concepts through the lens of mathematics and formal reasoning",
          "Present programming as a mathematical activity, emphasizing functions, abstraction, and correctness",
          "Introduce computational models derived from mathematical structures and theory",
          "Help students build strong mental models that connect code, logic, and computation",
        ],
        badge: { label: "Part-time", variant: "orange", icon: "🎓" },
      },
      {
        role: "Assistant Professor",
        focus: "Data Structures and Algorithms",
        organization: "Universidad ORT Uruguay",
        organizationHref: "https://www.ort.edu.uy/",
        period: "March 2025 – December 2025",
        duration: "9 months",
        location: "Montevideo, Uruguay",
        modality: "Hybrid",
        description: [
          "Guide students through core data structures and algorithmic techniques",
          "Design hands-on language implementation projects to reinforce theory",
          "Help students translate abstract concepts into practical problem-solving skills",
        ],
        badge: { label: "Temporary", variant: "pink", icon: "🎓" },
      },
    ],
    [],
  );

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
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <p className="text-xs font-semibold tracking-[0.22em] text-faint/90">
          EXPERIENCE
        </p>

        <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-text">
          My Experience RoadMap
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-muted/90">
          Journey through academia and industry, highlighting key roles and
          contributions along the way.
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

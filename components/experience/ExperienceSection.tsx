import React, { useMemo } from "react";
import ExperienceTimeline from "./ExperienceTimeline";
import type { Experience } from "./types";

export default function ExperienceSection() {
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
    <section
      id="experience"
      className="px-6 max-w-7xl 2xl:max-w-360 mx-auto scroll-mt-32 mb-20"
      aria-label="Experience"
    >
      <div className="mb-14 text-center">
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
      </div>

      <ExperienceTimeline experiences={experiences} />
    </section>
  );
}

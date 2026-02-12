"use client";

import React from "react";
import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import { cn } from "./cn";
import { springWobble } from "./constants";
import type { Experience } from "./types";

export default function ExperienceTimeline({
  experiences,
}: {
  experiences: Experience[];
}) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="relative">
        {/* Vertical line */}
        <div
          aria-hidden
          className={cn(
            "absolute left-4 top-0 bottom-0 w-px",
            "bg-border/25",
            "hidden sm:block",
          )}
        />

        <ul className="space-y-12 sm:space-y-16">
          {experiences.map((exp) => (
            <li
              key={`${exp.role}-${exp.period}`}
              className="relative pl-0 sm:pl-16"
            >
              {/* Dot */}
              <motion.div
                aria-hidden
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.15 }}
                transition={springWobble}
                className={cn(
                  "absolute left-2.5 top-10 h-3 w-3 rounded-full",
                  "bg-accent/80",
                  "ring-4 ring-bg",
                  "hidden sm:block",
                )}
              />

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="will-change-transform"
              >
                <ExperienceCard
                  exp={exp}
                  className={cn(
                    "motion-safe:transition-shadow motion-safe:duration-300",
                    "hover:shadow-[0_30px_90px_-55px_rgba(0,0,0,0.45)]",
                    "focus-within:shadow-[0_30px_90px_-55px_rgba(0,0,0,0.45)]",
                  )}
                />
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

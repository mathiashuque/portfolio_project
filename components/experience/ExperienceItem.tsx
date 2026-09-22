"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import type { Experience } from "./types";

export default function ExperienceItem({
  exp,
  className,
  children,
  active = false,
}: {
  exp: Experience;
  className?: string;
  children?: React.ReactNode;
  active?: boolean;
}) {
  return (
    <motion.article
      className={cn("relative pl-12 sm:pl-14", className)}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.1 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* timeline dot */}
      <div
        className={cn(
          "absolute left-3.25 top-3 h-4 w-4 rounded-full",
          "transition-[transform,background-color,box-shadow] duration-300",
          active
            ? "bg-zinc-900 dark:bg-zinc-100 scale-110 shadow-[0_0_0_6px_rgba(24,24,27,0.10)] dark:shadow-[0_0_0_6px_rgba(244,244,245,0.10)]"
            : "bg-zinc-400 dark:bg-zinc-600",
        )}
      />

      <div className="space-y-4">
        <h3 className="text-2xl sm:text-3xl font-semibold text-text leading-tight">
          {exp.role}
          {exp.focus && <span className="text-text/70"> — {exp.focus}</span>}
        </h3>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-base text-muted/90">
          <a
            href={exp.organizationHref ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-text hover:opacity-80 transition-opacity"
          >
            {exp.organization}
          </a>

          <span className="text-muted/50">·</span>
          <span>{exp.period}</span>

          {exp.duration && (
            <>
              <span className="text-muted/50">·</span>
              <span>{exp.duration}</span>
            </>
          )}

          {exp.badge?.label && (
            <>
              <span className="text-muted/50">·</span>
              <span className="italic text-muted/80">{exp.badge.label}</span>
            </>
          )}
        </div>

        {(exp.location || exp.modality) && (
          <div className="text-base text-muted/75">
            {exp.location ?? null}
            {exp.location && exp.modality ? <span> · </span> : null}
            {exp.modality ?? null}
          </div>
        )}

        {Array.isArray(exp.description) ? (
          <ul className="mt-4 space-y-2 list-disc pl-6 text-base sm:text-lg text-muted/90 max-w-3xl">
            {exp.description.map((item, i) => (
              <li key={i} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 leading-relaxed text-base sm:text-lg text-muted/90 max-w-3xl">
            {exp.description}
          </p>
        )}

        {children}
      </div>
    </motion.article>
  );
}

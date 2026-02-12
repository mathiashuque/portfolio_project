import React from "react";
import Badge from "./Badge";
import { cn } from "./cn";
import type { Experience } from "./types";

export default function ExperienceCard({
  exp,
  className,
  children,
}: {
  exp: Experience;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-3xl p-8 sm:p-10",
        "bg-[#fbf6ef] dark:bg-panel",
        "shadow-[0_24px_70px_-55px_rgba(0,0,0,0.35)] dark:shadow-[0_26px_80px_-60px_rgba(0,0,0,0.50)]",
        className,
      )}
    >
      {/* subtle corner tint */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-orange-400/10 blur-3xl dark:bg-accent/10" />
      <div className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-pink-400/10 blur-3xl dark:bg-accent/10" />

      {exp.badge && (
        <div className="mb-4">
          <Badge
            label={exp.badge.label}
            variant={exp.badge.variant}
            icon={exp.badge.icon}
          />
        </div>
      )}

      <div className="relative">
        <h3 className="text-2xl sm:text-3xl font-semibold leading-tight text-text">
          {exp.role}
          {exp.focus && <span className="text-text/80"> — {exp.focus}</span>}
        </h3>

        <div className="mt-3">
          <a
            href={exp.organizationHref ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 font-semibold",
              "text-orange-500 hover:text-orange-600 transition-colors",
            )}
          >
            {exp.organization}
            <span aria-hidden className="text-lg leading-none">
              ›
            </span>
          </a>
        </div>

        <div className="mt-3 space-y-1 text-sm text-muted/90">
          <p>
            {exp.period}
            {exp.duration ? <span> · {exp.duration}</span> : null}
          </p>
          {(exp.location || exp.modality) && (
            <p className="text-muted/80">
              {exp.location ?? null}
              {exp.location && exp.modality ? <span> · </span> : null}
              {exp.modality ?? null}
            </p>
          )}
        </div>

        {Array.isArray(exp.description) ? (
          <ul className="mt-4 space-y-1 text-muted/95 sm:max-w-2xl list-disc pl-5">
            {exp.description.map((item, i) => (
              <li key={i} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 leading-relaxed text-muted/95 sm:max-w-2xl">
            {exp.description}
          </p>
        )}

        {children}
      </div>
    </article>
  );
}

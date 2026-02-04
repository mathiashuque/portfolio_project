import React, { useMemo } from "react";
import { motion } from "framer-motion";

type BadgeVariant = "orange" | "pink" | "slate";

type Experience = {
  role: string;
  focus?: string;
  organization: string;
  organizationHref?: string;
  period: string;
  duration?: string;
  location?: string;
  modality?: string;
  description: string;
  badge?: {
    label: string;
    variant?: BadgeVariant;
    icon?: React.ReactNode;
  };
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Badge({
  label,
  variant = "slate",
  icon,
}: {
  label: string;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
}) {
  const styles =
    variant === "orange"
      ? "bg-orange-500 text-white shadow-[0_10px_30px_-18px_rgba(249,115,22,0.65)]"
      : variant === "pink"
        ? "bg-pink-500 text-white shadow-[0_10px_30px_-18px_rgba(236,72,153,0.65)]"
        : "bg-slate-700/90 text-white shadow-[0_10px_30px_-18px_rgba(15,23,42,0.60)]";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold",
        "tracking-wide",
        styles,
      )}
    >
      <span className="text-sm leading-none">{icon ?? "🎓"}</span>
      {label}
    </span>
  );
}

function ExperienceCard({
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
        <div className="absolute right-6 top-6 sm:right-8 sm:top-8">
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

        <p className="mt-8 leading-relaxed text-muted/95 max-w-prose">
          {exp.description}
        </p>

        {children}
      </div>
    </article>
  );
}

const springWobble = {
  type: "spring" as const,
  stiffness: 320,
  damping: 14,
  mass: 0.8,
};


export default function ExperienceSection() {
  const experiences = useMemo<Experience[]>(
    () => [
      {
        role: "Professor",
        focus: "Fundamentals Of Computing",
        organization: "Universidad ORT Uruguay",
        organizationHref: "#",
        period: "July 2025 – Present",
        duration: "4 months",
        location: "Montevideo, Uruguay",
        modality: "Hybrid",
        description:
          "Teaching how to explore the deep connection between mathematics and programming, emphasizing two key perspectives. Programming as a mathematical activity, where writing code resembles defining computable functions and proving their properties; and mathematics as a source of computational models, where functions can be implemented as programs.",
        badge: { label: "Part-time", variant: "orange", icon: "🎓" },
      },
      {
        role: "Assistant Professor",
        focus: "Theory Of Computation",
        organization: "Universidad ORT Uruguay",
        organizationHref: "#",
        period: "March 2025 – August 2025",
        duration: "6 months",
        location: "Montevideo, Uruguay",
        modality: "Hybrid",
        description:
          "I guide students in understanding fundamental concepts of Theory of Computation through hands-on language implementation projects. This teaching approach fosters deep engagement with topics such as operational semantics.",
        badge: { label: "Temporary", variant: "pink", icon: "🎓" },
      },
    ],
    [],
  );

  return (
    <section
      id="experience"
      className="px-6 max-w-7xl 2xl:max-w-360 mx-auto scroll-mt-32 mb-10"
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

      {/* Timeline */}
      <div className="mx-auto max-w-4xl">
        <div className="relative">
          {/* Vertical line */}
          <div
            aria-hidden
            className={cn(
              "absolute left-4 top-0 bottom-0 w-px",
              "bg-border/25",
            )}
          />

          <ul className="space-y-12 sm:space-y-16">
            {experiences.map((exp) => (
              <li
                key={`${exp.role}-${exp.period}`}
                className="relative pl-14 sm:pl-16"
              >
                {/* Dot — fixed to the timeline */}
                <motion.div
                  aria-hidden
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.15 }}
                  transition={springWobble}
                  className={cn(
                    "absolute left-2.5 top-10 h-3 w-3 rounded-full",
                    "bg-accent/80",
                    "ring-4 ring-bg",
                  )}
                />

                {/* Card — wobbles independently */}
                <motion.div
                  initial={{ y: 0, rotate: 0 }}
                  whileHover={{ y: -10, rotate: -0.35 }}
                  transition={springWobble}
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
    </section>
  );
}

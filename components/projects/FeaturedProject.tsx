"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "./cn";
import type { FeaturedProject as FeaturedProjectData } from "./types";

export default function FeaturedProject({
  project,
}: {
  project: FeaturedProjectData;
}) {
  const t = useTranslations("Projects");

  return (
    <div className="mb-10 sm:mb-12">
      <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-faint/90">
        {t("siloKicker")}
      </p>

      <article
        className={cn(
          "group overflow-hidden rounded-2xl border border-border/10 bg-panel",
          "transition-colors duration-300 hover:border-border/20",
        )}
      >
        <div className={cn("flex flex-col", project.image && "lg:flex-row")}>
          {project.image && (
            <div className="flex w-full shrink-0 items-center p-4 sm:p-5 lg:w-[44%] lg:p-6">
              <div className="relative aspect-8/5 w-full overflow-hidden rounded-xl bg-bg-elev ring-1 ring-border/10">
                <Image
                  src={project.image}
                  alt={project.altKey ? t(project.altKey) : project.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 44vw"
                  className={cn(
                    "object-cover text-left",
                    "transition-transform duration-500 group-hover:scale-[1.02]",
                  )}
                />
              </div>
            </div>
          )}

          <div className="flex flex-1 flex-col gap-3 p-5 pt-0 sm:p-6 sm:pt-0 lg:p-8 lg:pl-2">
            {project.statusKey && (
              <div className="flex items-center gap-2 text-left">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <p className="text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-faint/80">
                  {t(project.statusKey)}
                </p>
              </div>
            )}

            <div className="text-left">
              <h3 className="text-left text-2xl font-bold tracking-tight text-text sm:text-3xl">
                {project.name}
              </h3>

              {project.secondaryTitleKey && (
                <p className="mt-1.5 text-left text-sm text-muted/80">
                  {t(project.secondaryTitleKey)}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <p className="max-w-xl text-left text-sm leading-relaxed text-muted">
                {t(project.descriptionKey)}
              </p>

              {project.descriptionSecondaryKey && (
                <p className="max-w-xl text-left text-xs leading-relaxed text-muted/70">
                  {t(project.descriptionSecondaryKey)}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    "rounded-full border border-border/10 bg-bg-elev px-2.5 py-0.5",
                    "text-[11px] font-medium text-faint",
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>

            {project.partnershipKey && (
              <div className="mt-1 flex flex-wrap items-center gap-2.5 border-t border-border/10 pt-3">
                <p className="text-left text-xs text-muted/60">
                  {t(project.partnershipKey)}
                </p>

                {project.partnerLogo && (
                  <a
                    href={project.partnerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={project.partnerName}
                    className={cn(
                      "inline-flex items-center rounded-lg bg-white px-2.5 py-1.5",
                      "shadow-[0_1px_2px_rgba(0,0,0,0.12),0_4px_10px_rgba(0,0,0,0.12)]",
                      "ring-1 ring-[#005AF9]/15",
                      "transition-transform duration-300 hover:-translate-y-0.5 group-hover:-translate-y-0.5",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
                    )}
                  >
                    <Image
                      src={project.partnerLogo}
                      alt={project.partnerName ?? ""}
                      width={352}
                      height={120}
                      className="h-3.5 w-auto sm:h-4"
                    />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

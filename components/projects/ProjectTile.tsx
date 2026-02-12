import Image from "next/image";
import { cn } from "./cn";
import type { Project } from "./types";

export default function ProjectTile({ project }: { project: Project }) {
  return (
    <a
      href={project.link}
      className={cn(
        "group relative block h-full w-full overflow-hidden rounded-2xl",
        "border border-border/10 bg-panel",
        "transition-transform duration-300 hover:-translate-y-1",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
      )}
    >
      <Image
        src={project.image}
        alt={project.name}
        fill
        loading="eager"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 33vw"
        className={cn(
          "absolute inset-0 object-cover",
          "transition-transform duration-500 group-hover:scale-[1.03]",
        )}
      />

      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(500px_circle_at_30%_-10%,rgba(56,189,248,0.18),transparent_55%)]" />
      </div>

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 p-4",
          "bg-linear-to-t from-black/70 via-black/30 to-transparent",
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              {project.name}
            </p>
            <p className="mt-1 text-[11px] tracking-[0.18em] text-white/70">
              {project.category.toUpperCase()}
            </p>
          </div>

          <span
            className={cn(
              "shrink-0 rounded-full border border-white/15 bg-white/10 px-3 py-1",
              "text-[11px] font-medium text-white/85",
              "opacity-90 transition-opacity group-hover:opacity-100",
            )}
          >
            View →
          </span>
        </div>
      </div>

      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300",
          "group-hover:opacity-100",
          "ring-1 ring-inset ring-accent/15",
        )}
      />
    </a>
  );
}

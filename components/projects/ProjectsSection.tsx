import { cn } from "./cn";
import ProjectGrid from "./ProjectGrid";
import ProjectsHeader from "./ProjectsHeader";
import { PROJECTS } from "./data";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="px-6 max-w-7xl 2xl:max-w-360 mx-auto scroll-mt-32 mb-50"
    >
      <ProjectsHeader />

      <ProjectGrid projects={PROJECTS} />

      <div className="mt-10 flex justify-center">
        <a
          href="#"
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold",
            "border border-border/10 bg-panel text-text/90",
            "transition-colors hover:border-border/20 hover:text-text",
          )}
        >
          See more
          <span className="text-accent">→</span>
        </a>
      </div>
    </section>
  );
}

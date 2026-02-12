import { cn } from "./cn";
import ProjectTile from "./ProjectTile";
import type { Project } from "./types";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className={cn("grid gap-10", "grid-cols-1 sm:grid-cols-3")}>
      {projects.map((project) => (
        <div key={project.name} className="aspect-square w-full">
          <ProjectTile project={project} />
        </div>
      ))}
    </div>
  );
}

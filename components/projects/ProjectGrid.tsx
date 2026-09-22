import { cn } from "@/lib/cn";
import ProjectTile from "./ProjectTile";
import type { Project } from "./types";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className={cn("grid gap-x-10 gap-y-6", "grid-cols-1 sm:grid-cols-3")}>
      {projects.map((project) => (
        <div key={project.name} className="aspect-4/3 w-full">
          <ProjectTile project={project} />
        </div>
      ))}
    </div>
  );
}

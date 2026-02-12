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

      
    </section>
  );
}

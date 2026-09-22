"use client";

import Reveal from "@/components/Reveal";
import ProjectGrid from "./ProjectGrid";
import ProjectsHeader from "./ProjectsHeader";
import FeaturedProject from "./FeaturedProject";
import { FEATURED_PROJECT, PROJECTS } from "./data";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="min-h-dvh snap-start snap-always px-6 max-w-7xl 2xl:max-w-360 mx-auto scroll-mt-32 mb-10"
    >
      {/* Header */}
      <Reveal duration={0.9} offset={50}>
        <ProjectsHeader />
      </Reveal>

      {/* Featured project */}
      <Reveal delay={0.12}>
        <FeaturedProject project={FEATURED_PROJECT} />
      </Reveal>

      {/* Grid */}
      <Reveal delay={0.18}>
        <ProjectGrid projects={PROJECTS} />
      </Reveal>
    </section>
  );
}

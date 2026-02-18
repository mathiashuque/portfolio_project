"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectGrid from "./ProjectGrid";
import ProjectsHeader from "./ProjectsHeader";
import { PROJECTS } from "./data";

export default function ProjectsSection() {
  const [inView, setInView] = useState(false);

  return (
    <motion.section
      id="projects"
      className="px-6 max-w-7xl 2xl:max-w-360 mx-auto scroll-mt-32 mb-10"
      onViewportEnter={() => setInView(true)}
      onViewportLeave={() => setInView(false)}
      viewport={{ amount: 0.1 }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <ProjectsHeader />
      </motion.div>

      {/* Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{
          duration: 1,
          delay: inView ? 0.12 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <ProjectGrid projects={PROJECTS} />
      </motion.div>
    </motion.section>
  );
}

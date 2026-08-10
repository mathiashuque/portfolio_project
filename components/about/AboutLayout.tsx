"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [inView, setInView] = useState(false);

  return (
    <section
      id="about"
      className="min-h-dvh snap-start snap-always scroll-mt-32 mb-20"
      aria-label="About"
    >
      <div className="mx-auto w-full max-w-7xl 2xl:max-w-360 px-6">
        <div className="relative isolate overflow-hidden rounded-3xl">
          <motion.div
            // start hidden
            initial={{ opacity: 0, y: 50 }}
            // animate based on viewport state
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{
              duration: 1.0,
              ease: [0.22, 1, 0.36, 1],
            }}
            // toggle state when entering/leaving viewport
            onViewportEnter={() => setInView(true)}
            //onViewportLeave={() => setInView(false)}
            viewport={{ amount: 0.1 }}
            className="mx-auto max-w-4xl text-center"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

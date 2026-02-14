"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { STACK } from "@/components/Stack/tech/stackData";
import MarqueeRow from "./MarqueeRow";
import StackHeader from "./StackHeader";
import { StackCategoryItems } from "./types";

export default function StackSection() {
  const [inView, setInView] = useState(false);

  return (
    <motion.section
      id="stack"
      className="px-6 mb-20 max-w-7xl 2xl:max-w-360 mx-auto scroll-mt-32"
      onViewportEnter={() => setInView(true)}
      onViewportLeave={() => setInView(false)}
      viewport={{ amount: 0.3 }}
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
        <StackHeader />
      </motion.div>

      {/* Categories */}
      <motion.div
        className="space-y-5"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{
          duration: 1,
          delay: inView ? 0.12 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {Object.entries(STACK).map(([category, items], i) => (
          <div key={category}>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-muted/90 tracking-tight">
              {category}
            </h3>

            <div className="rounded-2xl bg-panel px-6 py-1 pt-1 shadow-sm">
              <MarqueeRow
                items={items as StackCategoryItems}
                reverse={i % 2 === 1}
                durationSec={24 + i * 4}
              />
            </div>
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
}

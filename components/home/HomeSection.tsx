"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import TraitsMarquee from "./TraitsMarquee";
import Hero from "./Hero";

export default function HomeSection() {
  const homeRef = useRef<HTMLElement | null>(null);
  const constraintsRef = useRef<HTMLDivElement | null>(null);

  const dragKeyRef = useRef(0);
  const [dragKey, setDragKey] = useState(0);

  const [inView, setInView] = useState(false);

  // Reset drag position when breakpoint flips AND when resize/zoom happens
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");

    const reset = () => {
      dragKeyRef.current += 1;
      setDragKey(dragKeyRef.current);
    };

    const onMQChange = () => reset();
    const onResize = () => reset();

    if (mq.addEventListener) mq.addEventListener("change", onMQChange);
    else mq.addListener(onMQChange);

    window.addEventListener("resize", onResize);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onMQChange);
      else mq.removeListener(onMQChange);

      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <motion.section
      ref={homeRef}
      id="home"
      className="
        bg-bg text-text
        flex flex-col
        lg:pt-5
        overflow-x-hidden
        scroll-mt-32
        mb-10
        relative
        overflow-hidden
      "
      onViewportEnter={() => setInView(true)}
      onViewportLeave={() => setInView(false)}
      viewport={{ amount: 0.35 }}
    >
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      >
        <Hero constraintsRef={constraintsRef} dragKey={dragKey} />
      </motion.div>

      {/* Marquee */}
      <motion.div
        className="mt-5"
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
        transition={{
          duration: 0.9,
          delay: inView ? 0.1 : 0, // small delay only when entering
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <TraitsMarquee />
      </motion.div>
    </motion.section>
  );
}

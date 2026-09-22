"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import TraitsMarquee from "./TraitsMarquee";
import Hero from "./Hero";

export default function HomeSection() {
  const constraintsRef = useRef<HTMLDivElement | null>(null);

  const dragKeyRef = useRef(0);
  const [dragKey, setDragKey] = useState(0);

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
    <section
      id="home"
      className="
        bg-bg text-text
        flex flex-col
        lg:pt-5
        min-h-dvh snap-start snap-always
        overflow-x-hidden
        scroll-mt-32
        mb-10
        relative
        overflow-hidden
      "
    >
      {/* Hero */}
      <Reveal duration={1} offset={50}>
        <Hero constraintsRef={constraintsRef} dragKey={dragKey} />
      </Reveal>

      {/* Marquee */}
      <Reveal className="mt-5" duration={0.9} delay={0.1} axis="x">
        <TraitsMarquee />
      </Reveal>
    </section>
  );
}

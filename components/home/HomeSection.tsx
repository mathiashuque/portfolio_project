import { useEffect, useRef, useState } from "react";
import TraitsMarquee from "./TraitsMarquee";
import Hero from "./Hero";

export default function HomeSection() {
  const homeRef = useRef<HTMLElement | null>(null);
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
      ref={homeRef}
      id="home"
      className="
        bg-bg text-text
        flex flex-col
        lg:pt-5
        overflow-x-hidden
        scroll-mt-32
        mb-20
        relative
        overflow-hidden
      "
    >
      <Hero constraintsRef={constraintsRef} dragKey={dragKey} />

      <div className="mt-auto animate-fade-left animate-duration-1000">
        <TraitsMarquee />
      </div>
    </section>
  );
}

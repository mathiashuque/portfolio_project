import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
} from "motion/react";
import Image from "next/image";
import TraitsMarquee from "./TraitsMarquee";

export default function Home() {
  const homeRef = useRef<HTMLElement | null>(null);

  // Start typing when LEFT content is in view
  const leftRef = useRef<HTMLDivElement | null>(null);
  const leftInView = useInView(leftRef, { amount: 0.6, once: true });

  const dragKeyRef = useRef(0);
  const [dragKey, setDragKey] = useState(0);

  const fullText = useMemo(
    () =>
      "I design and build clean, performant web applications with a strong focus on usability, maintainability, and modern UI.",
    [],
  );

  // MotionValue animates 0 -> fullText.length
  const count = useMotionValue(0);

  // React state for displayed substring
  const [displayed, setDisplayed] = useState("");
  const [, setDone] = useState(false);

  // Guard so we only start typing once (also handles React StrictMode double effects)
  const startedRef = useRef(false);

  // Update displayed text as count changes
  useMotionValueEvent(count, "change", (latest) => {
    const n = Math.floor(latest);
    setDisplayed(fullText.slice(0, n));
    if (n >= fullText.length) setDone(true);
  });

  useEffect(() => {
    if (!leftInView) return;
    if (startedRef.current) return;

    startedRef.current = true;
    count.set(0);

    const charsPerSecond = 30;
    const duration = fullText.length / charsPerSecond;

    const controls = animate(count, fullText.length, {
      duration,
      ease: "linear",
    });

    return () => controls.stop();
  }, [leftInView, count, fullText.length]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)"); // Tailwind lg

    const reset = () => {
      dragKeyRef.current += 1;
      setDragKey(dragKeyRef.current);
    };

    // reset once when breakpoint flips
    const onChange = () => reset();

    // initial (optional): if you want a reset on first mount too, call reset() here
    // reset();

    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  // Portrait block extracted so we can place it between title and paragraph on mobile
  const Portrait = (
    <div className="relative flex justify-center lg:justify-end my-6 sm:my-7 lg:my-0">
      <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-96 md:h-96">
        {/* back rotated card */}
        <div
          className="
            absolute left-2 top-3 sm:left-3 sm:top-4 md:left-4 md:top-5
            w-52 h-52 sm:w-64 sm:h-64 md:w-96 md:h-96
            bg-text
            rounded-2xl
            rotate-3 sm:rotate-5 md:rotate-6
            animate-flip-up
            animate-duration-600
          "
        />
        {/* front card */}
        <div
          className="
            absolute left-0 top-0
            w-52 h-52 sm:w-64 sm:h-64 md:w-96 md:h-96
            bg-panel
            rounded-2xl
            shadow-[0_20px_55px_-28px_rgba(0,0,0,0.65)]
            overflow-hidden
            animate-flip-up
            animate-duration-600
          "
        >
          <div className="w-full h-full grid place-items-center p-4 sm:p-5 md:p-7">
            <div className="relative w-full h-full rounded-full overflow-hidden bg-bg">
              <Image
                src="/avatar.png"
                alt="Portrait"
                fill
                sizes="(max-width: 640px) 208px, (max-width: 768px) 256px, 384px"
                className="object-cover animate-jump-in animate-duration-800"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Drag badge extracted so we can place it differently on mobile vs desktop
  const DragBadge = (
    <div className="relative h-13">
      <motion.div
        key={dragKey}
        className="
          absolute left-1/2 -translate-x-1/2 top-0
          lg:left-0 lg:translate-x-0
          z-40 cursor-grab active:cursor-grabbing
        "
        drag
        dragConstraints={homeRef}
        dragMomentum
        dragElastic={0.1}
        whileDrag={{ scale: 1.02 }}
        style={{ touchAction: "none" }}
        initial={{ x: 0, y: 0 }}
      >
        {/* wider on mobile */}
        <div className="relative rounded-md border border-border bg-bg px-6 sm:px-5 py-3 text-sm sm:text-base font-medium animate-fade-down animate-duration-1000 whitespace-nowrap">
          Hello, World! 👋 I’m Mathias!
          <span className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-accent border border-border rounded-xs" />
          <span className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-accent border border-border rounded-xs" />
          <span className="absolute -left-1.5 -bottom-1.5 h-3 w-3 bg-accent border border-border rounded-xs" />
          <span className="absolute -right-1.5 -bottom-1.5 h-3 w-3 bg-accent border border-border rounded-xs" />
        </div>
      </motion.div>
    </div>
  );

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
      {/*h-[min(calc(100svh-80px),900px)]*/}

      {/* HERO fills remaining height */}
      <div className="flex-1 flex items-center lg:pb-6">
        <div className="max-w-7xl 2xl:max-w-360 mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* LEFT (contains mobile ordering) */}
          <div ref={leftRef} className="order-1 text-center lg:text-left">
            {/* Desktop: drag badge on top (original vibe) */}
            <div className="hidden lg:block mb-6 sm:mb-8">{DragBadge}</div>

            {/* 2) Title */}
            <h1 className="text-6xl md:text-7xl font-extrabold leading-tight animate-fade-up">
              Software Developer
            </h1>

            {/* Mobile: Portrait first */}
            <div className="lg:hidden">{Portrait}</div>

            {/* Mobile: drag badge BELOW portrait */}
            <div className="lg:hidden mb-6">{DragBadge}</div>

            {/* Typing paragraph with reserved final height */}
            <div className="mt-5 sm:mt-6 max-w-2xl mx-auto lg:mx-0 relative">
              {/* This reserves the full height */}
              <p className="text-muted text-base sm:text-xl opacity-0 select-none">
                {fullText}
              </p>

              {/* This is the visible typing text, positioned on top */}
              <p className="absolute inset-0 text-muted text-base sm:text-xl">
                {displayed}
                <motion.span
                  aria-hidden="true"
                  className="
        inline-block
        w-0.5
        h-[1.05em]
        bg-current
        align-[-0.12em]
        ml-2
        rounded-sm
      "
                  animate={{ opacity: [1, 1, 0, 0] }}
                  transition={{
                    duration: 1.25,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.55, 0.56, 1],
                  }}
                />
              </p>
            </div>

            {/* 5) Buttons (centered + constrained width on mobile) */}
            <div className="mt-8 sm:mt-10 flex flex-col items-stretch gap-4 max-w-sm mx-auto lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:gap-7">
              <a
                href="#contact"
                className="inline-flex justify-center items-center px-7 py-3.5 rounded-md bg-accent text-white text-base sm:text-lg font-semibold hover:bg-accent-2 transition"
              >
                Get In Touch →
              </a>

              <a
                href="/Mathias_Huque_CV.pdf"
                className="inline-flex justify-center lg:justify-start items-center gap-2 text-base sm:text-lg font-medium text-text hover:underline"
              >
                Download CV ↓
              </a>
            </div>
          </div>

          {/* RIGHT (portrait on desktop only) */}
          <div className="hidden lg:flex relative justify-center lg:justify-end order-2">
            {Portrait}
          </div>
        </div>
      </div>

      {/* 6) Marquee pinned to bottom */}
      <div className="mt-auto animate-fade-left animate-duration-1000">
        <TraitsMarquee />
      </div>
    </section>
  );
}

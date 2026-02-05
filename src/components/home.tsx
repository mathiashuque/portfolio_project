import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
} from "motion/react";
import TraitsMarquee from "./TraitsMarquee";

export default function Home() {
  const homeRef = useRef<HTMLElement | null>(null);

  // Start typing when LEFT content is in view
  const leftRef = useRef<HTMLDivElement | null>(null);
  const leftInView = useInView(leftRef, { amount: 0.6, once: true });

  const fullText = useMemo(
    () =>
      "I design and build clean, performant web applications with a strong focus on usability, maintainability, and modern UI.",
    [],
  );

  // MotionValue animates 0 -> fullText.length
  const count = useMotionValue(0);

  // React state for displayed substring
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

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
      duration: duration,
      ease: "linear",
    });

    return () => controls.stop();
  }, [leftInView, count, fullText.length]);

  return (
    <section
      ref={homeRef}
      id="home"
      className="
        bg-bg text-text
        flex flex-col
        pt-5
        overflow-hidden
        h-[min(calc(100svh-80px),900px)]
        scroll-mt-32
        mb-20
        relative
      "
    >
      {/* HERO fills remaining height */}
      <div className="flex-1 flex items-center">
        <div className="max-w-7xl 2xl:max-w-360 mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div ref={leftRef}>
            {/* Reserve layout space for where it should spawn */}
            <div className="relative mb-8 h-13">
              <motion.div
                className="absolute left-0 top-0 z-[999] cursor-grab active:cursor-grabbing"
                drag
                dragConstraints={homeRef}
                dragMomentum
                dragElastic={0.1}
                whileDrag={{ scale: 1.02 }}
                style={{ touchAction: "none" }}
                initial={{ x: 0, y: 0 }}
              >
                {/* Selection box */}
                <div className="relative rounded-md border border-border bg-bg px-5 py-3 text-base font-medium animate-fade-down animate-duration-[1000ms]">
                  Hello, World! 👋 I’m Mathias!
                  <span className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-accent border border-border rounded-xs" />
                  <span className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-accent border border-border rounded-xs" />
                  <span className="absolute -left-1.5 -bottom-1.5 h-3 w-3 bg-accent border border-border rounded-xs" />
                  <span className="absolute -right-1.5 -bottom-1.5 h-3 w-3 bg-accent border border-border rounded-xs" />
                </div>
              </motion.div>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight animate-fade-up">
              Software Developer
            </h1>

            {/* Typing paragraph + classic blinking caret */}
            <p className="mt-6 max-w-2xl text-muted text-xl">
              {displayed}
              <motion.span
                aria-hidden="true"
                className="
    inline-block
    w-0.5              /* thin caret */
    h-[1.05em]           /* matches text height */
    bg-current           /* uses current text color */
    align-[-0.12em]      /* nudge down/up to sit on baseline */
    ml-2
    rounded-sm
  "
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{
                  duration: 1.25 /* slower blink */,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.55, 0.56, 1] /* stays on a bit longer */,
                }}
              />
            </p>

            <div className="mt-10 flex items-center gap-7">
              <a
                href="#contact"
                className="inline-flex items-center px-7 py-3.5 rounded-md bg-accent text-white text-lg font-semibold hover:bg-accent-2 transition"
              >
                Get In Touch →
              </a>

              <a
                href="/Mathias_Huque_CV.pdf"
                className="inline-flex items-center gap-2 text-lg font-medium text-text hover:underline"
              >
                Download CV ↓
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-96 h-96 sm:w-104 sm:h-104">
              <div
                className="
                  absolute left-6 top-7
                  w-96 h-96
                  bg-text
                  rounded-2xl
                  rotate-5
                  animate-flip-up
                  animate-duration-[600ms]
                "
              />
              <div
                className="
                  absolute left-0 top-0
                  w-96 h-96
                  bg-panel
                  rounded-2xl
                  shadow-[0_20px_55px_-28px_rgba(0,0,0,0.65)]
                  overflow-hidden
                  animate-flip-up
                  animate-duration-[600ms]
                  
                "
              >
                <div className="w-full h-full grid place-items-center p-7">
                  <div className="w-full h-full rounded-full overflow-hidden bg-bg">
                    <img
                      src="/avatar.png"
                      alt="Portrait"
                      className="w-full h-full object-cover animate-jump-in animate-duration-800"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MARQUEE pinned to bottom */}
      <div className="mt-auto animate-fade-left animate-duration-[1000ms]">
        <TraitsMarquee />
      </div>
    </section>
  );
}

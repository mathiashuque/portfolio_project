import { useMemo, useRef } from "react";
import { useInView } from "motion/react";
import Portrait from "./Portrait";
import DragBadge from "./DragBadge";
import TypingParagraph from "./TypingParagraph";

type HeroProps = {
  constraintsRef: React.RefObject<HTMLDivElement | null>;
  dragKey: number;
};

export default function Hero({ constraintsRef, dragKey }: HeroProps) {
  const leftRef = useRef<HTMLDivElement | null>(null);
  const leftInView = useInView(leftRef, { amount: 0.6, once: true });

  const fullText = useMemo(
    () =>
      "I design and build clean, performant web applications with a strong focus on usability, maintainability, and modern UI.",
    [],
  );

  return (
    <div className="flex-1 flex items-center lg:pb-6">
      {/* OUTER: purely for centering and max width */}
      <div className="max-w-7xl 2xl:max-w-360 mx-auto px-6 w-full">
        {/* INNER: this is the drag constraint box and contains EVERYTHING */}
        <div
          ref={constraintsRef}
          className="relative w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
        >
          {/* LEFT */}
          <div ref={leftRef} className="order-1 text-center lg:text-left">
            {/* Desktop: drag badge on top */}
            <div className="hidden lg:block mb-6 sm:mb-8">
              <DragBadge dragKey={dragKey} constraintsRef={constraintsRef} />
            </div>

            <h1 className="text-6xl md:text-7xl font-extrabold leading-tight animate-fade-up">
              Software Developer
            </h1>

            {/* Mobile: Portrait first */}
            <div className="lg:hidden">
              <Portrait />
            </div>

            {/* Mobile: drag badge below portrait */}
            <div className="lg:hidden mb-6">
              <DragBadge dragKey={dragKey} constraintsRef={constraintsRef} />
            </div>

            <TypingParagraph text={fullText} start={leftInView} />

            {/* Buttons */}
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

          {/* RIGHT (portrait on desktop) */}
          <div className="hidden lg:flex relative justify-center lg:justify-end order-2 pr-12 xl:pr-14">
            <Portrait />
          </div>
        </div>
      </div>
    </div>
  );
}

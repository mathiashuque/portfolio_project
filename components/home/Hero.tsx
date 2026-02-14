import { useMemo, useRef } from "react";
import { useInView } from "motion/react";
import DragBadge from "./DragBadge";
import TypingParagraph from "./TypingParagraph";

type HeroProps = {
  constraintsRef: React.RefObject<HTMLDivElement | null>;
  dragKey: number;
};

export default function Hero({ constraintsRef, dragKey }: HeroProps) {
  const leftRef = useRef<HTMLDivElement | null>(null);
  const leftInView = useInView(leftRef, { amount: 0.35, once: true });

  const fullText = useMemo(
    () =>
      "I build software apps and complete digital products from start to finish, helping ideas turn into real, working solutions.",
    [],
  );

  return (
    <div className="flex-1 flex items-center justify-center max-w-9xl">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div
          ref={constraintsRef}
          className="relative w-full flex flex-col items-center text-center"
        >
          <div
            ref={leftRef}
            className="w-full flex flex-col items-center text-center gap-3"
          >
            <DragBadge dragKey={dragKey} constraintsRef={constraintsRef} />

            <h1 className="max-w-4xl text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight animate-fade-up">
              I Build Software Apps That Turn{" "}
              <span className="bg-linear-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">
                Ideas Into Reality
              </span>
              .
            </h1>

            <div className="max-w-3xl">
              <TypingParagraph text={fullText} start={leftInView} />
            </div>

            <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-5">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full bg-accent text-white text-lg font-semibold hover:bg-accent-2 transition min-w-50"
              >
                Contact →
              </a>

              <a
                href="/Mathias_Huque_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full bg-panel border border-white/10 text-lg font-semibold hover:bg-white/10 transition min-w-50"
              >
                Open CV ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

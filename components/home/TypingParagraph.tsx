import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent } from "motion/react";

type TypingParagraphProps = {
  text: string;
  start: boolean;
};

export default function TypingParagraph({ text, start }: TypingParagraphProps) {
  const count = useMotionValue(0);
  const [displayed, setDisplayed] = useState("");
  const startedRef = useRef(false);

  useMotionValueEvent(count, "change", (latest) => {
    const n = Math.floor(latest);
    setDisplayed(text.slice(0, n));
  });

  useEffect(() => {
    if (!start || startedRef.current) return;

    startedRef.current = true;
    count.set(0);

    const charsPerSecond = 30;
    const duration = text.length / charsPerSecond;

    const controls = animate(count, text.length, {
      duration,
      ease: "linear",
    });

    return () => controls.stop();
  }, [start, count, text.length]);

  return (
    <div className="mt-5 sm:mt-6 max-w-2xl mx-auto lg:mx-0 relative">
      {/* SEO + accessibility: real text present without relying on JS */}
      <p className="text-muted text-base sm:text-xl">
        <span className="sr-only">{text}</span>

        {/* Visual typing overlay */}
        <span aria-hidden="true" className="relative block">
          <span className="invisible">{text}</span>
          <span className="absolute inset-0">
            {displayed}
            <motion.span
              aria-hidden="true"
              className="inline-block w-0.5 h-[1.05em] bg-current align-[-0.12em] ml-2 rounded-sm"
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{
                duration: 1.25,
                repeat: Infinity,
                ease: "linear",
                times: [0, 0.55, 0.56, 1],
              }}
            />
          </span>
        </span>
      </p>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";

type TypewriterProps = {
  text: string;
  /** Start/restart typing when true */
  start?: boolean;
  /** Typing speed */
  charsPerSecond?: number;
  /** Bubble styling */
  className?: string;
  /** Optional callback when typing finishes */
  onDone?: () => void;
};

/**
 * Typewriter bubble that reveals `text` character-by-character.
 * Drop this inside your assistant message bubble instead of rendering the full string.
 */
export default function Typewriter({
  text,
  start = true,
  charsPerSecond = 35,
  className = "",
  onDone,
}: TypewriterProps) {
  const [shown, setShown] = useState(start ? "" : text);
  const iRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const doneRef = useRef(false);

  const stepMs = useMemo(
    () => Math.max(10, Math.floor(1000 / charsPerSecond)),
    [charsPerSecond],
  );

  useEffect(() => {
    // ✅ If we're not typing, just show the full text and do nothing else.
    if (!start) {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      doneRef.current = true;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShown(text);
      return;
    }

    // reset typing
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }

    doneRef.current = false;
    iRef.current = 0;
    setShown("");

    timerRef.current = window.setInterval(() => {
      iRef.current += 1;
      const next = text.slice(0, iRef.current);
      setShown(next);

      if (iRef.current >= text.length) {
        if (timerRef.current) {
          window.clearInterval(timerRef.current);
          timerRef.current = null;
        }
        if (!doneRef.current) {
          doneRef.current = true;
          onDone?.();
        }
      }
    }, stepMs);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [start, text, stepMs, onDone]);

  const isDone = shown.length >= text.length;

  return (
    <div className={className}>
      <span className="sr-only">{text}</span>

      <span aria-hidden="true" className="whitespace-pre-wrap wrap-anywhere">
        {shown}
        {start && !isDone && (
          <motion.span
            aria-hidden="true"
            className="inline-block w-0.5 h-[1.05em] bg-white/70 align-[-0.12em] ml-2 rounded-sm"
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.55, 0.56, 1],
            }}
          />
        )}
      </span>
    </div>
  );
}

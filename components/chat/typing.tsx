import { motion } from "motion/react";

export function TypingIndicator() {
  const dotTransition = {
    duration: 0.9,
    repeat: Infinity,
    ease: "easeInOut",
  } as const;

  return (
    <div className="flex items-center gap-1">
      <motion.span
        className="h-2 w-2 rounded-full bg-white/60"
        animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
        transition={dotTransition}
      />
      <motion.span
        className="h-2 w-2 rounded-full bg-white/60"
        animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
        transition={{ ...dotTransition, delay: 0.15 }}
      />
      <motion.span
        className="h-2 w-2 rounded-full bg-white/60"
        animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
        transition={{ ...dotTransition, delay: 0.3 }}
      />
    </div>
  );
}
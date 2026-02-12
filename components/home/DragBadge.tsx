import { motion } from "motion/react";

type DragBadgeProps = {
  dragKey: number;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
};

export default function DragBadge({ dragKey, constraintsRef }: DragBadgeProps) {
  return (
    <div className="relative h-13">
      <motion.div
        key={dragKey}
        className="
          absolute left-1/2 -translate-x-1/2 top-0
          lg:left-0 lg:translate-x-0
          z-40 cursor-grab active:cursor-grabbing
        "
        drag
        dragConstraints={constraintsRef}
        dragMomentum
        dragElastic={0.1}
        whileDrag={{ scale: 1.02 }}
        style={{ touchAction: "none" }}
        initial={{ x: 0, y: 0 }}
      >
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
}

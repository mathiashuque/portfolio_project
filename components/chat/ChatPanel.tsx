"use client";

import { motion } from "motion/react";
import React from "react";

export function ChatPanel({
  panelRef,
  onClickInside,
  children,
}: {
  panelRef: React.RefObject<HTMLDivElement | null>;
  onClickInside: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-4">
      <motion.div
        ref={panelRef}
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
        className="
          relative
          w-[min(640px,92vw)] h-[min(85vh,800px)]
          flex flex-col overflow-hidden
          rounded-2xl border border-white/10 bg-zinc-950 text-white
          shadow-2xl shadow-black/40
        "
        role="dialog"
        aria-modal="true"
        aria-label="Chat widget"
        onClick={onClickInside}
      >
        {children}
      </motion.div>
    </div>
  );
}

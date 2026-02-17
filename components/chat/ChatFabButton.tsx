"use client";

import { motion } from "motion/react";
import { MessageCircle, X } from "lucide-react";

export function ChatFabButton({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      type="button"
      aria-label={open ? "Close chat" : "Open chat"}
      onClick={onToggle}
      className="
        fixed bottom-6 right-6 z-30
        inline-flex items-center gap-2
        rounded-full border border-white/10
        bg-zinc-900 text-white
        px-4 py-3
        shadow-xl shadow-black/40
        transition hover:bg-zinc-800
        focus:outline-none focus:ring-2 focus:ring-white/30
      "
      whileTap={{ scale: 0.95 }}
    >
      {open ? (
        <>
          <X className="h-5 w-5" />
          <span className="text-sm font-medium">Close</span>
        </>
      ) : (
        <>
          <MessageCircle className="h-5 w-5" />
          <span className="text-sm font-medium">Chat</span>
        </>
      )}
    </motion.button>
  );
}

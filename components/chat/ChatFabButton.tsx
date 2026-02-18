"use client";

import { motion } from "motion/react";
import { MessageCircle, X } from "lucide-react";
import { useTranslations } from "next-intl";

export function ChatFabButton({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  const t = useTranslations("ChatWidget");

  return (
    <motion.button
      type="button"
      aria-label={open ? t("aria.closeChat") : t("aria.openChat")}
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
          <span className="text-sm font-medium">{t("fab.close")}</span>
        </>
      ) : (
        <>
          <MessageCircle className="h-5 w-5" />
          <span className="text-sm font-medium">{t("fab.open")}</span>
        </>
      )}
    </motion.button>
  );
}

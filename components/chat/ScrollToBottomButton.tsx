"use client";

import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";

export function ScrollToBottomButton({
  show,
  onClick,
}: {
  show: boolean;
  onClick: () => void;
}) {
  const t = useTranslations("ChatWidget");

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={onClick}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.18 }}
          className="
            absolute left-1/2 -translate-x-1/2
            bottom-28 z-20
            w-fit rounded-full border border-white/10
            bg-white/10 px-5 py-2.5 text-sm font-medium text-white
            shadow-xl backdrop-blur hover:bg-white/15
          "
          aria-label={t("aria.scrollLatest")}
        >
          {t("scrollToBottom.label")}
        </motion.button>
      )}
    </AnimatePresence>
  );
}

"use client";

import type { MouseEvent, ReactNode, RefObject } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles, X } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * Chrome del panel de chat: contenedor, fondo, cabecera y el atajo para
 * volver al final de la conversación.
 */

export function ChatBackdrop({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-60 bg-white/5 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    />
  );
}

export function ChatPanel({
  panelRef,
  onClickInside,
  children,
  ariaLabel,
}: {
  panelRef: RefObject<HTMLDivElement | null>;
  onClickInside: (e: MouseEvent) => void;
  children: ReactNode;
  ariaLabel: string;
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
        aria-label={ariaLabel}
        onClick={onClickInside}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function ChatHeader({
  title,
  subtitle,
  onClose,
}: {
  title: string;
  subtitle: string;
  onClose: () => void;
}) {
  const t = useTranslations("ChatWidget");

  return (
    <div className="flex items-start justify-between gap-3 border-b border-white/10 bg-zinc-950/80 px-4 py-3 backdrop-blur">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-white/80" />
          <p className="truncate text-base font-semibold">{title}</p>
        </div>
        <p className="mt-0.5 line-clamp-2 text-xs text-white/60">{subtitle}</p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="rounded-lg p-1 text-white/70 transition hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20"
        aria-label={t("aria.close")}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

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

import { Send } from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";

export function ChatInputBar({
  inputRef,
  value,
  onChange,
  onSubmit,
  canSend,
  disabled,
}: {
  inputRef: React.RefObject<HTMLInputElement | null>;
  value: string;
  onChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  canSend: boolean;
  disabled: boolean;
}) {
  const t = useTranslations("ChatWidget");

  return (
    <form
      onSubmit={onSubmit}
      className="border-t border-white/10 bg-zinc-950/80 px-3 py-3 backdrop-blur"
    >
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, 150))}
          placeholder={t("input.placeholder")}
          className="h-10 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 text-base text-white placeholder:text-white/40 outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/10"
          maxLength={100}
          disabled={disabled}
        />
        <button
          type="submit"
          disabled={!canSend || disabled}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={t("aria.send")}
        >
          <Send className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-1 text-[11px] text-white/40">{value.length}/100</p>

      <p className="mt-2 text-[11px] leading-snug text-white/45">
        {t("input.tipPrefix")}{" "}
        <span className="rounded bg-white/10 px-1">Esc</span>{" "}
        {t("input.tipSuffix")}
      </p>
    </form>
  );
}

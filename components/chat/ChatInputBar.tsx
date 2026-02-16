import { Send } from "lucide-react";
import React from "react";

export function ChatInputBar({
  inputRef,
  value,
  onChange,
  onSubmit,
  canSend,
}: {
  inputRef: React.RefObject<HTMLInputElement | null>;
  value: string;
  onChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  canSend: boolean;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="border-t border-white/10 bg-zinc-950/80 px-3 py-3 backdrop-blur"
    >
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ask a question…"
          className="h-10 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 text-base text-white placeholder:text-white/40 outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/10"
          maxLength={600}
        />
        <button
          type="submit"
          disabled={!canSend}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Send"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-2 text-[11px] leading-snug text-white/45">
        Tip: Press <span className="rounded bg-white/10 px-1">Esc</span> to
        close.
      </p>
    </form>
  );
}

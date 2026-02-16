import { Sparkles, X } from "lucide-react";

export function ChatHeader({
  title,
  subtitle,
  onClose,
}: {
  title: string;
  subtitle: string;
  onClose: () => void;
}) {
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
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

type ChatRole = "assistant" | "user";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
};

type ChatWidgetProps = {
  /** Optional title shown in the header */
  title?: string;
  /** Optional subtitle shown below the title */
  subtitle?: string;
  /** Initial assistant message */
  greeting?: string;
  /** Suggested quick questions */
  suggestions?: string[];
  /** If provided, called when the user sends a message (for API integration later) */
};

function uid() {
  // Good enough for UI ids (not crypto)
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function ChatWidget({
  title = "Ask Mathias",
  subtitle = "Quick questions about my work, projects, or availability.",
  greeting = "Hey! 👋 Ask me anything about my projects, stack, or experience.",
  suggestions = [
    "What’s your tech stack?",
    "Tell me about your most recent project.",
    "What kind of roles are you looking for?",
    "How can I contact you?",
  ],
}: ChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: uid(),
      role: "assistant",
      content: greeting,
      createdAt: Date.now(),
    },
  ]);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const canSend = useMemo(
    () => input.trim().length > 0 && !loading,
    [input, loading],
  );

  useEffect(() => {
    if (!open) return;

    // Focus input when opened
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    // Scroll to bottom when messages change (only when open)
    if (!open) return;
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: ChatMessage = {
      id: uid(),
      role: "user",
      content: trimmed,
      createdAt: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
        cache: "no-store",
      });

      if (!res.ok) {
        let errText = "Chat API error";
        try {
          const data = (await res.json()) as { error?: string };
          if (data?.error) errText = data.error;
        } catch {}
        throw new Error(errText);
      }

      const data = (await res.json()) as { reply: string };
      const reply =
        data.reply ?? "Sorry — I didn’t get a response. Please try again.";

      const assistantMsg: ChatMessage = {
        id: uid(),
        role: "assistant",
        content: reply,
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const assistantMsg: ChatMessage = {
        id: uid(),
        role: "assistant",
        content:
          "Sorry — something went wrong on my side. Please try again, or reach out via the Contact section.",
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend) return;
    void sendMessage(input);
  }

  function handleSuggestion(s: string) {
    if (loading) return;
    void sendMessage(s);
    if (!open) setOpen(true);
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        type="button"
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-zinc-900 text-white shadow-lg shadow-black/30 transition hover:scale-[1.02] hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-white/30 dark:border-white/10"
        whileTap={{ scale: 0.95 }}
      >
        {open ? (
          <X className="h-5 w-5" />
        ) : (
          <MessageCircle className="h-5 w-5" />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 text-white shadow-2xl shadow-black/40"
            role="dialog"
            aria-modal="false"
            aria-label="Chat widget"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-white/10 bg-zinc-950/80 px-4 py-3 backdrop-blur">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-white/80" />
                  <p className="truncate text-sm font-semibold">{title}</p>
                </div>
                <p className="mt-0.5 line-clamp-2 text-xs text-white/60">
                  {subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-white/70 transition hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={listRef}
              className="max-h-105 space-y-3 overflow-y-auto px-4 py-3"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={
                    m.role === "user"
                      ? "flex justify-end"
                      : "flex justify-start"
                  }
                >
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[85%] rounded-2xl rounded-br-md bg-white/10 px-3 py-2 text-sm text-white"
                        : "max-w-[85%] rounded-2xl rounded-bl-md bg-white/5 px-3 py-2 text-sm text-white/90"
                    }
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {/* Suggestions (only show when there's basically just the greeting) */}
              {messages.length <= 1 && (
                <div className="pt-1">
                  <p className="mb-2 text-xs text-white/60">
                    Try one of these:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleSuggestion(s)}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md bg-white/5 px-3 py-2 text-sm text-white/70">
                    Typing…
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-white/10 bg-zinc-950/80 px-3 py-3 backdrop-blur"
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question…"
                  className="h-10 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/10"
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
                Tip: Press <span className="rounded bg-white/10 px-1">Esc</span>{" "}
                to close.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

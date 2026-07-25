"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import { ChatFabButton } from "./ChatFabButton";
import { ChatBackdrop } from "./ChatBackdrop";
import { ChatPanel } from "./ChatPanel";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ScrollToBottomButton } from "./ScrollToBottomButton";
import { ChatInputBar } from "./ChatInputBar";
import { ChatMessage, ChatWidgetProps, uid } from "./types";
import { useTranslations } from "next-intl";
import { ChatSuggestions } from "./ChatSuggestions";

export default function ChatWidget(props: ChatWidgetProps) {
  const t = useTranslations("ChatWidget");

  const title = props.title ?? t("header.title");
  const subtitle = props.subtitle ?? t("header.subtitle");
  const greeting = props.greeting ?? t("greeting");

  const suggestions =
    props.suggestions ??
    (() => {
      const raw = t.raw("suggestions.items");
      return Array.isArray(raw) ? (raw as string[]) : [];
    })();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { id: uid(), role: "assistant", content: greeting, createdAt: Date.now() },
  ]);

  const [typedDoneIds, setTypedDoneIds] = useState<Set<string>>(
    () => new Set([messages[0].id]),
  );

  const panelRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const assistantTyping = useMemo(() => {
    return messages.some(
      (m) => m.role === "assistant" && !typedDoneIds.has(m.id),
    );
  }, [messages, typedDoneIds]);

  const canSend = useMemo(
    () => input.trim().length > 0 && !loading && !assistantTyping,
    [input, loading, assistantTyping],
  );

  function markTypedDone(id: string) {
    setTypedDoneIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [open]);

  function scrollToBottom(behavior: ScrollBehavior = "smooth") {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
  }

  function scrollNextFrame(behavior: ScrollBehavior = "smooth") {
    requestAnimationFrame(() => scrollToBottom(behavior));
  }

  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (!el) return;

    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    if (distanceFromBottom < 80) scrollToBottom("smooth");
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

    setMessages((prev) => [
      ...prev,
      { id: uid(), role: "user", content: trimmed, createdAt: Date.now() },
    ]);
    scrollNextFrame("smooth");
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ message: trimmed }),
        cache: "no-store",
      });

      // ✅ Handle rate limit (429) with a friendly message
      if (res.status === 429) {
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: "assistant",
            content:
              "You’ve reached the question limit for now. Please contact Mathias if you have any more questions.",
            createdAt: Date.now(),
          },
        ]);
        //scrollNextFrame("smooth");
        return; // stop here, skip normal parsing
      }

      if (!res.ok) {
        let errText = "Chat API error";
        try {
          const data = (await res.json()) as { error?: string };
          if (data?.error) errText = data.error;
        } catch {}
        throw new Error(errText);
      }

      const data = (await res.json()) as { answer?: string; reply?: string };
      const reply =
        data.answer ??
        data.reply ??
        "Sorry — I didn’t get a response. Please try again.";

      setMessages((prev) => [
        ...prev,
        { id: uid(), role: "assistant", content: reply, createdAt: Date.now() },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "assistant",
          content:
            "Sorry — something went wrong on my side. Please try again, or reach out via the Contact section.",
          createdAt: Date.now(),
        },
      ]);
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

  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const THRESHOLD = 60;
    const onScroll = () => {
      const distanceFromBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight;
      setShowScrollToBottom(distanceFromBottom > THRESHOLD);
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <>
      <ChatFabButton open={open} onToggle={() => setOpen((v) => !v)} />

      <AnimatePresence>
        {open && (
          <>
            <ChatBackdrop onClose={() => setOpen(false)} />

            <ChatPanel
              panelRef={panelRef}
              onClickInside={(e) => e.stopPropagation()}
            >
              <ChatHeader
                title={title}
                subtitle={subtitle}
                onClose={() => setOpen(false)}
              />

              <ChatMessages
                messages={messages}
                typedDoneIds={typedDoneIds}
                onMarkTypedDone={markTypedDone}
                loading={loading}
                listRef={listRef}
              />

              {/* ✅ sugerencias abajo, arriba del input */}
              {messages.length <= 1 && (
                <div className="border-t border-white/10 bg-zinc-950/80 px-4 py-3 backdrop-blur">
                  <ChatSuggestions
                    suggestions={suggestions}
                    onPick={handleSuggestion}
                    disabled={loading || assistantTyping}
                  />
                </div>
              )}

              <ScrollToBottomButton
                show={showScrollToBottom}
                onClick={() => scrollToBottom("smooth")}
              />

              <ChatInputBar
                inputRef={inputRef}
                value={input}
                onChange={setInput}
                onSubmit={handleSubmit}
                canSend={canSend}
                disabled={assistantTyping}
              />
            </ChatPanel>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

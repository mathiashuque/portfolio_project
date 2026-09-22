"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { ChatFabButton } from "./ChatFabButton";
import {
  ChatBackdrop,
  ChatHeader,
  ChatPanel,
  ScrollToBottomButton,
} from "./ChatPanel";
import { ChatMessages } from "./ChatMessages";
import { ChatSuggestions } from "./ChatSuggestions";
import { ChatInputBar } from "./ChatInputBar";
import { useChat } from "./useChat";
import type { ChatWidgetProps } from "./types";

const SCROLL_FOLLOW_THRESHOLD = 80;
const SHOW_BUTTON_THRESHOLD = 60;

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

  const chat = useChat({ greeting });

  const [open, setOpen] = useState(false);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  function scrollToBottom(behavior: ScrollBehavior = "smooth") {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
  }

  // Al abrir, enfocar el input.
  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(id);
  }, [open]);

  // Escape cierra el panel.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Si el usuario ya está al final, seguir la conversación.
  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (!el) return;

    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    if (distanceFromBottom < SCROLL_FOLLOW_THRESHOLD) scrollToBottom("smooth");
  }, [chat.messages, open]);

  // Mostrar el atajo de "ir al final" solo cuando se aleja del fondo.
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const onScroll = () => {
      const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
      setShowScrollToBottom(distanceFromBottom > SHOW_BUTTON_THRESHOLD);
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [open]);

  function submit(text: string) {
    requestAnimationFrame(() => scrollToBottom("smooth"));
    void chat.send(text).finally(() => setTimeout(() => inputRef.current?.focus(), 0));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!chat.canSend) return;
    submit(chat.input);
  }

  function handleSuggestion(s: string) {
    if (chat.loading) return;
    submit(s);
    if (!open) setOpen(true);
  }

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
              ariaLabel={t("aria.dialog")}
            >
              <ChatHeader
                title={title}
                subtitle={subtitle}
                onClose={() => setOpen(false)}
              />

              <ChatMessages
                messages={chat.messages}
                typedDoneIds={chat.typedDoneIds}
                onMarkTypedDone={chat.markTypedDone}
                loading={chat.loading}
                listRef={listRef}
              />

              {chat.messages.length <= 1 && (
                <div className="border-t border-white/10 bg-zinc-950/80 px-4 py-3 backdrop-blur">
                  <ChatSuggestions
                    suggestions={suggestions}
                    onPick={handleSuggestion}
                    disabled={chat.loading || chat.assistantTyping}
                  />
                </div>
              )}

              <ScrollToBottomButton
                show={showScrollToBottom}
                onClick={() => scrollToBottom("smooth")}
              />

              <ChatInputBar
                inputRef={inputRef}
                value={chat.input}
                onChange={chat.setInput}
                onSubmit={handleSubmit}
                canSend={chat.canSend}
                disabled={chat.assistantTyping}
              />
            </ChatPanel>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { requestChatReply } from "./api";
import { uid, type ChatMessage, type ChatRole } from "./types";

/**
 * Conversación del chat: mensajes, estado de escritura, input y envío
 * (incluidos el 429 y los errores). El componente se queda solo con la UI.
 */
export function useChat({ greeting }: { greeting: string }) {
  const t = useTranslations("ChatWidget");

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { id: uid(), role: "assistant", content: greeting, createdAt: Date.now() },
  ]);
  const [typedDoneIds, setTypedDoneIds] = useState<Set<string>>(
    () => new Set(messages.map((m) => m.id)),
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  /** Hay una respuesta del asistente que todavía se está "tipeando". */
  const assistantTyping = useMemo(
    () =>
      messages.some((m) => m.role === "assistant" && !typedDoneIds.has(m.id)),
    [messages, typedDoneIds],
  );

  const canSend = useMemo(
    () => input.trim().length > 0 && !loading && !assistantTyping,
    [input, loading, assistantTyping],
  );

  const markTypedDone = useCallback((id: string) => {
    setTypedDoneIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const append = useCallback((role: ChatRole, content: string) => {
    setMessages((prev) => [
      ...prev,
      { id: uid(), role, content, createdAt: Date.now() },
    ]);
  }, []);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      append("user", trimmed);
      setInput("");
      setLoading(true);

      try {
        const reply = await requestChatReply(trimmed);

        if (reply.kind === "answer") append("assistant", reply.text);
        else if (reply.kind === "empty")
          append("assistant", t("errors.noResponse"));
        else if (reply.kind === "rate_limited")
          append("assistant", t("rateLimit"));
        else append("assistant", t("errors.generic"));
      } finally {
        setLoading(false);
      }
    },
    [append, loading, t],
  );

  return {
    messages,
    typedDoneIds,
    markTypedDone,
    assistantTyping,
    input,
    setInput,
    loading,
    canSend,
    send,
  };
}

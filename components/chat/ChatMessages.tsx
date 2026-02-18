"use client";

import { TypingIndicator } from "./typing";
import { ChatMessage } from "./types";
import { ChatMessageBubble } from "./ChatMessageBubble";

export function ChatMessages({
  messages,
  typedDoneIds,
  onMarkTypedDone,
  loading,
  listRef,
}: {
  messages: ChatMessage[];
  typedDoneIds: Set<string>;
  onMarkTypedDone: (id: string) => void;
  loading: boolean;
  listRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={listRef}
      className="flex-1 space-y-3 overflow-y-auto px-4 py-3 chat-scroll"
    >
      {messages.map((m) => (
        <ChatMessageBubble
          key={m.id}
          m={m}
          typedDone={typedDoneIds.has(m.id)}
          onTypedDone={() => onMarkTypedDone(m.id)}
        />
      ))}

      {loading && (
        <div className="flex justify-start">
          <div className="rounded-2xl rounded-bl-md bg-white/5 px-4 py-2.5">
            <TypingIndicator />
          </div>
        </div>
      )}
    </div>
  );
}

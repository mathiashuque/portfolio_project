"use client";

import Typewriter from "./typewriter";
import { ChatMessage } from "./types";
import { renderWithLinks } from "./linkify";

export function ChatMessageBubble({
  m,
  typedDone,
  onTypedDone,
}: {
  m: ChatMessage;
  typedDone: boolean;
  onTypedDone: () => void;
}) {
  const isUser = m.role === "user";

  return (
    <div className={isUser ? "flex justify-end" : "flex justify-start"}>
      <div
        className={
          isUser
            ? "max-w-[85%] rounded-2xl rounded-br-md bg-white/10 px-4 py-2.5 text-base text-white whitespace-pre-wrap wrap-anywhere"
            : "max-w-[85%] rounded-2xl rounded-bl-md bg-white/5 px-4 py-2.5 text-base text-white/90 whitespace-pre-wrap wrap-anywhere"
        }
      >
        {m.role === "assistant" ? (
          <Typewriter
            text={m.content}
            start={!typedDone}
            charsPerSecond={40}
            onDone={onTypedDone}
          />
        ) : (
          renderWithLinks(m.content)
        )}
      </div>
    </div>
  );
}

// history.ts
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

export type StoredMsg = { role: "user" | "assistant"; content: string };

export function clampToLast3Pairs(msgs: StoredMsg[]) {
  // 3 pairs = 6 messages (user/assistant alternating)
  return msgs.slice(-6);
}

export function toAgentMessages(msgs: StoredMsg[]): ChatCompletionMessageParam[] {
  return msgs.map((m) => ({ role: m.role, content: m.content }));
}

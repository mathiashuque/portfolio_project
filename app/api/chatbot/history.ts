export type StoredMsg = { role: "user" | "assistant"; content: string };

export function clampToLast3Pairs(msgs: StoredMsg[]) {
  // 3 pairs = 6 messages (user/assistant alternating)
  return msgs.slice(-6);
}

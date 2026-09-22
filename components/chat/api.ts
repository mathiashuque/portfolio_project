export type ChatReply =
  | { kind: "answer"; text: string }
  | { kind: "empty" }
  | { kind: "rate_limited" }
  | { kind: "error" };

/**
 * Manda el mensaje al endpoint del chatbot y clasifica la respuesta.
 *
 * A propósito no sabe nada de React ni de i18n: devuelve el *caso*, y cada
 * caso lo traduce la UI con su propio texto (`rateLimit`, `errors.*`).
 */
export async function requestChatReply(message: string): Promise<ChatReply> {
  try {
    const res = await fetch("/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      cache: "no-store",
      body: JSON.stringify({ message }),
    });

    if (res.status === 429) return { kind: "rate_limited" };
    if (!res.ok) return { kind: "error" };

    const data = (await res.json()) as { answer?: string; reply?: string };
    const text = data?.answer ?? data?.reply;

    return text ? { kind: "answer", text } : { kind: "empty" };
  } catch {
    // Red caída, JSON inválido o cualquier otro fallo: un solo caso.
    return { kind: "error" };
  }
}

export type ChatRole = "assistant" | "user";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
};

export type ChatWidgetProps = {
  title?: string;
  subtitle?: string;
  greeting?: string;
  suggestions?: string[];
};

export function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

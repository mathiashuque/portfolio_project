export type TabKey = "principles" | "process" | "direction";

export type Card = {
  title: string;
  description: string;
  tag?: string;
};

export type Tab = {
  key: TabKey;
  label: string;
  lead: string;
  cards: readonly Card[];
};

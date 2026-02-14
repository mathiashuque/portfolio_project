export type TabKey = "bio" | "services" | "impact";

export type BioTab = {
  kind: "bio";
  key: TabKey;
  label: string;
  title: string;
  paragraphs: string[];
};

export type Service = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

export type ServicesTab = {
  kind: "services";
  key: TabKey;
  label: string;
  title: string;
  subtitle?: string;
  services: readonly Service[];
};

export type ImpactItem = {
  left: string;        // problem text
  right: string;       // solution text
};

export type ImpactTab = {
  kind: "impact";
  key: TabKey;
  label: string;
  title: string;
  subtitle?: string;
  items: readonly ImpactItem[];
};

export type AboutTab = BioTab | ServicesTab | ImpactTab;

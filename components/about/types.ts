export type TabKey = "bio" | "services" | "impact";

export type BioTab = {
  kind: "bio";
  key: TabKey;
  label: string;
  title: string;
  paragraphs: string[];
};

export type ServiceIconKey =
  "layoutGrid" | "gauge" | "database" | "binary" | "code2" | "graduationCap";

export type Service = {
  title: string;
  description: string;
  iconKey?: ServiceIconKey;
};

export type ServicesTab = {
  kind: "services";
  key: TabKey;
  label: string;
  title: string;
  subtitle?: string;
  services: readonly Service[];
};

export type ImpactTab = {
  kind: "impact";
  key: TabKey;
  label: string;
  title: string;
  subtitle?: string;
  items: readonly string[];
};

export type AboutTab = BioTab | ServicesTab | ImpactTab;

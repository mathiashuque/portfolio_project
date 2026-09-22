import type { AboutTab, Service } from "./types";

type ServicesMsgItem = {
  iconKey?: Service["iconKey"];
  title: string;
  description: string;
};

export function buildAboutTabs(t: {
  (key: string): string;
  raw: (key: string) => unknown;
}): readonly AboutTab[] {
  const servicesItems = t.raw("services.items");
  const impactItems = t.raw("impact.items");
  const bioParagraphs = t.raw("bio.paragraphs");

  return [
    {
      kind: "bio",
      key: "bio",
      label: t("tabs.bio.label"),
      title: t("bio.title"),
      paragraphs: Array.isArray(bioParagraphs)
        ? (bioParagraphs as string[])
        : [],
    },
    {
      kind: "services",
      key: "services",
      label: t("tabs.services.label"),
      title: t("services.title"),
      subtitle: t("services.subtitle"),
      services: Array.isArray(servicesItems)
        ? (servicesItems as ServicesMsgItem[]).map((s) => ({
            title: s.title,
            description: s.description,
            iconKey: s.iconKey,
          }))
        : [],
    },
    {
      kind: "impact",
      key: "impact",
      label: t("tabs.impact.label"),
      title: t("impact.title"),
      subtitle: t("impact.subtitle"),
      items: Array.isArray(impactItems) ? (impactItems as string[]) : [],
    },
  ] as const;
}

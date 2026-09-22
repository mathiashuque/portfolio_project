import type { Experience } from "./types";

type ExperienceMessageItem = {
  role: string;
  focus?: string;
  organization: string;
  organizationHref?: string;
  period: string;
  duration?: string;
  location?: string;
  modality?: string;
  badgeLabel?: string;
  badgeIcon?: string;
  description: string[] | string;
};

export function mapExperienceMessages(
  items: ExperienceMessageItem[],
): Experience[] {
  return items.map((item) => ({
    role: item.role,
    focus: item.focus,
    organization: item.organization,
    organizationHref: item.organizationHref ?? "https://www.ort.edu.uy/",
    period: item.period,
    duration: item.duration,
    location: item.location,
    modality: item.modality,
    description: item.description,
    badge: item.badgeLabel
      ? {
          label: item.badgeLabel,
          variant: "orange",
          icon: item.badgeIcon ?? "✨",
        }
      : undefined,
  }));
}

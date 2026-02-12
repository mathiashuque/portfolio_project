import React from "react";

export type BadgeVariant = "orange" | "pink" | "slate";

export type Experience = {
  role: string;
  focus?: string;
  organization: string;
  organizationHref?: string;
  period: string;
  duration?: string;
  location?: string;
  modality?: string;
  description: string | string[];
  badge?: {
    label: string;
    variant?: BadgeVariant;
    icon?: React.ReactNode;
  };
};

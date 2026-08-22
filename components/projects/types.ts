export type Project = {
  name: string;
  descriptionKey: string;
  tech: string[];
  link: string;
  image: string;
};

export type FeaturedProject = {
  name: string;
  descriptionKey: string;
  descriptionSecondaryKey?: string;
  tech: string[];
  image?: string;
  secondaryTitleKey?: string;
  statusKey?: string;
  altKey?: string;
  partnershipKey?: string;
  partnerLogo?: string;
  partnerName?: string;
  partnerUrl?: string;
  highlightsKey?: string;
};

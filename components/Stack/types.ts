import type { StaticImageData } from "next/image";
import type { TechColor } from "@/components/Stack/tech";

type StackItem = {
  name: string;
  logo: StaticImageData;
  color?: TechColor;
};

export type StackCategoryItems = readonly StackItem[];

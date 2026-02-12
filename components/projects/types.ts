export type Category = "All" | "Web" | "UI" | "Apps" | "CMS";

export type Project = {
  name: string;
  description: string;
  tech: string[];
  link: string;
  category: Exclude<Category, "All">;
  image: string;
};

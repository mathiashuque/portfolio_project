export const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
] as const;

export const linkBase =
  "relative px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 " +
  "hover:text-slate-900 hover:bg-slate-900/10 hover:scale-[1.06] active:scale-[0.98] " +
  "dark:hover:text-white dark:hover:bg-white/10";

export const linkInactive = "text-muted";

export const linkActive =
  "text-slate-900 bg-slate-900/15 ring-1 ring-slate-900/20 " +
  "dark:text-white dark:bg-white/15 dark:ring-white/20";

export const iconClass =
  "text-muted transition-all duration-200 " +
  "hover:text-slate-900 hover:scale-110 hover:drop-shadow-sm " +
  "active:scale-100 dark:hover:text-white";

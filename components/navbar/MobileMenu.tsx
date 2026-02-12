import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import type { NavLink } from "./types";

export default function MobileMenu({
  open,
  links,
  active,
  onNavigate,
  dark,
  onToggleTheme,
}: {
  open: boolean;
  links: readonly NavLink[];
  active: string;
  onNavigate: (href: string) => void;
  dark: boolean;
  onToggleTheme: () => void;
}) {
  return (
    <div
      className={`
        md:hidden overflow-hidden transition-[max-height,opacity] duration-200
        ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
      `}
    >
      <div className="px-6 pb-5 pt-3 border-t border-slate-900/10 dark:border-white/10">
        <NavLinks
          links={links}
          active={active}
          direction="col"
          onNavigate={(href) => onNavigate(href)}
        />

        <div className="mt-5 flex items-center gap-4 text-2xl">
          <ThemeToggle dark={dark} onToggle={onToggleTheme} variant="mobile" />

          
        </div>
      </div>
    </div>
  );
}

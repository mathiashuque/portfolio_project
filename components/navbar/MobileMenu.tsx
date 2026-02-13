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
        lg:hidden absolute left-0 right-0 top-full z-50
        transition-[opacity,transform] duration-200 origin-top
        ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}
      `}
    >
      <div className="bg-bg/95 backdrop-blur-md border-b border-slate-900/10 dark:border-white/10">
        <div className="px-6 pb-5 pt-3">
          <NavLinks
            links={links}
            active={active}
            direction="col"
            onNavigate={(href) => onNavigate(href)}
          />

          <div className="mt-6 pt-5 border-t border-slate-900/10 dark:border-white/10">
            <div className="flex items-center text-2xl">
              <ThemeToggle
                dark={dark}
                onToggle={onToggleTheme}
                variant="mobile"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

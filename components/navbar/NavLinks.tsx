import { linkActive, linkBase, linkInactive } from "./constants";
import type { NavLink } from "./types";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

export default function NavLinks({
  links,
  active,
  onNavigate,
  direction = "row",
}: {
  links: readonly NavLink[];
  active: string;
  onNavigate: (href: string) => void;
  direction?: "row" | "col";
}) {
  const t = useTranslations("Nav");
  const locale = useLocale();
  console.log("NavLinks locale:", locale);
  return (
    <div
      className={
        direction === "row" ? "flex items-center gap-2" : "flex flex-col gap-2"
      }
    >
      {links.map((l) => {
        const isActive = active === l.href;
        return (
          <a
            key={l.href}
            href={l.href}
            className={`${linkBase} ${isActive ? linkActive : linkInactive}`}
            aria-current={isActive ? "page" : undefined}
            onClick={() => onNavigate(l.href)}
          >
            {t(l.key)}
          </a>
        );
      })}
    </div>
  );
}

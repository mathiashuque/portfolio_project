import { useTranslations } from "next-intl";
import { ContactLink } from "./types";

type ContactLinksProps = {
  links: ContactLink[];
};

export default function ContactLinks({ links }: ContactLinksProps) {
  const t = useTranslations("Contact");

  return (
    <div className="rounded-2xl bg-panel p-5 shadow-sm ring-1 ring-border/10 sm:p-6">
      <h3 className="text-xl font-semibold text-text">{t("cardTitle")}</h3>
      <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted/90">
        {t("cardBody")}
      </p>

      <div className="mt-6 space-y-3">
        {links.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noreferrer" : undefined}
            className="
              group flex items-center gap-5 rounded-xl border border-border/10
              bg-input px-5 py-4 transition
              hover:border-border/20 hover:shadow-sm
            "
          >
            <div
              className="
                flex h-12 w-12 items-center justify-center rounded-xl
                bg-linear-to-br from-accent to-pink-500 text-white shadow-sm
              "
            >
              {item.icon}
            </div>

            <div className="min-w-0">
              <p className="text-base font-semibold text-text">{item.label}</p>
              <p className="truncate text-sm text-muted/90 group-hover:text-text">
                {item.value}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

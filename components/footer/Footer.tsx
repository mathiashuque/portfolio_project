import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { SITE } from "@/lib/site";

export default function Footer() {
  const t = useTranslations("Footer");
  const iconClass = "text-muted hover:text-text transition";

  return (
    <footer className="snap-start snap-always py-14 bg-panel text-text border-t border-border/10">
      <div className="mx-auto max-w-5xl px-4 text-center">
        {/* Name */}
        <h3 className="text-lg font-semibold">Mathias Huque</h3>

        {/* Subtitle */}
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
          {t("subtitle")}
        </p>

        {/* Social icons */}
        <div className="mt-6 flex justify-center gap-6">
          <SocialLink
            href={SITE.githubUrl}
            label={t("social.github")}
            className={iconClass}
          >
            <Github className="h-5 w-5" />
          </SocialLink>

          <SocialLink
            href={SITE.linkedInUrl}
            label={t("social.linkedin")}
            className={iconClass}
          >
            <Linkedin className="h-5 w-5" />
          </SocialLink>

          <SocialLink
            href={`mailto:${SITE.contactEmail}`}
            label={t("social.email")}
            className={iconClass}
          >
            <Mail className="h-5 w-5" />
          </SocialLink>
        </div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-border" />

        {/* Copyright */}
        <p className="text-xs text-faint">{t("credits")}</p>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  className,
  children,
}: {
  href: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  const isHttp = href.startsWith("http");

  return (
    <a
      href={href}
      aria-label={label}
      target={isHttp ? "_blank" : undefined}
      rel={isHttp ? "noopener noreferrer" : undefined}
      className={className}
    >
      {children}
    </a>
  );
}

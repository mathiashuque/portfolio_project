import { Github, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";
import { iconClass } from "./constants";
import { SITE } from "@/lib/site";

/** Los dos enlaces sociales, compartidos por el navbar de escritorio y el menú mobile. */
export default function SocialLinks() {
  const t = useTranslations("Nav");

  return (
    <>
      <a
        href={SITE.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("aria.github")}
        className={iconClass}
      >
        <Github className="h-5 w-5" />
      </a>
      <a
        href={SITE.linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("aria.linkedin")}
        className={iconClass}
      >
        <Linkedin className="h-5 w-5" />
      </a>
    </>
  );
}

import { useTranslations } from "next-intl";

export default function AboutHeader() {
  const t = useTranslations("About.header");
  return (
    <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-5xl leading-tight">
      {t("title")}
    </h2>
  );
}

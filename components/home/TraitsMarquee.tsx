import { useTranslations } from "next-intl";

function Star() {
  return (
    <span className="mx-10 inline-block text-text/80 text-lg leading-none select-none">
      ✦
    </span>
  );
}

function Track({ items }: { items: string[] }) {
  return (
    <div className="flex items-center whitespace-nowrap ">
      {items.map((t, i) => (
        <div key={`${t}-${i}`} className="flex items-center">
          <span className="text-xl md:text-2xl font-semibold tracking-tight">
            {t}
          </span>
          <Star />
        </div>
      ))}
    </div>
  );
}

export default function TraitsMarquee() {
  const t = useTranslations("Home.traits");

  const traits = [
    t("cleanCode"),
    t("dataStructures"),
    t("systemDesign"),
    t("backend"),
    t("apiDesign"),
    t("testing"),
    t("fullStack"),
    t("problemSolving"),
    t("accessibility"),
    t("technicalCommunication"),
  ];
  const items = [...traits, ...traits, ...traits];

  return (
    <div className="py-2">
      {/* Same container width as Home */}
      <div className="mx-auto w-full max-w-9xl 2xl:max-w-360 px-6">
        {/* Frame clips background + fades to boxed width */}
        <div className="relative overflow-hidden rounded-2xl bg-panel">
          <div className="marquee py-6">
            <div className="marquee__inner">
              <Track items={items} />
              <Track items={items} />
            </div>
          </div>

          {/* fade edges (now aligned with the frame) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-bg-panel to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-bg-panel to-transparent" />
        </div>
      </div>
    </div>
  );
}

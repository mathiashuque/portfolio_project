import type { ReactNode } from "react";
import {
  Binary,
  Code2,
  Database,
  Gauge,
  GraduationCap,
  LayoutGrid,
} from "lucide-react";
import type {
  AboutTab,
  BioTab,
  ImpactTab,
  ServiceIconKey,
  ServicesTab,
} from "./types";

const serviceIcons: Record<ServiceIconKey, ReactNode> = {
  layoutGrid: <LayoutGrid className="h-5 w-5" />,
  gauge: <Gauge className="h-5 w-5" />,
  database: <Database className="h-5 w-5" />,
  binary: <Binary className="h-5 w-5" />,
  code2: <Code2 className="h-5 w-5" />,
  graduationCap: <GraduationCap className="h-5 w-5" />,
};

export default function AboutTabContent({
  tab,
  activeKey,
}: {
  tab: AboutTab;
  activeKey: string;
}) {
  return (
    <div className="mt-5 min-h-75 sm:min-h-90 lg:min-h-100 flex items-start">
      {/* key = reinicia la animación de entrada al cambiar de pestaña */}
      <div key={activeKey} className="w-full animate-[fadeSlide_1000ms_ease-out]">
        {tab.kind === "bio" ? (
          <Bio tab={tab} />
        ) : tab.kind === "services" ? (
          <Services tab={tab} />
        ) : (
          <Impact tab={tab} />
        )}
      </div>
    </div>
  );
}

function Bio({ tab }: { tab: BioTab }) {
  return (
    <div className="text-center">
      <h3 className="text-4xl sm:text-5xl font-bold tracking-tight text-text">
        {tab.title}
      </h3>

      {tab.paragraphs.map((p, i) => (
        <p
          key={i}
          className="mx-auto mt-6 max-w-4xl text-base sm:text-lg leading-relaxed text-muted/85"
        >
          {p}
        </p>
      ))}
    </div>
  );
}

function Services({ tab }: { tab: ServicesTab }) {
  return (
    <div>
      <div className="text-center">
        <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">
          {tab.title}
        </h3>
        {tab.subtitle ? (
          <p className="mt-2 text-sm sm:text-base text-muted/80">
            {tab.subtitle}
          </p>
        ) : null}
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tab.services.map((s) => (
          <article
            key={s.title}
            className="
              rounded-xl bg-panel border border-border/10
              p-4
              transition-all duration-200
              hover:-translate-y-0.5 hover:border-border/20
              text-center
            "
          >
            <div
              className="
                mx-auto mb-3
                grid place-items-center
                h-9 w-9 rounded-lg
                bg-white/5 border border-white/10
                text-accent
              "
            >
              {s.iconKey ? serviceIcons[s.iconKey] : <span className="text-sm">■</span>}
            </div>

            <h4 className="text-base font-semibold text-text">{s.title}</h4>

            <p className="mt-1.5 text-sm leading-relaxed text-muted/80">
              {s.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

function Impact({ tab }: { tab: ImpactTab }) {
  return (
    <div>
      <div className="text-center">
        <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">
          {tab.title}
        </h3>
        {tab.subtitle ? (
          <p className="mt-2 text-sm sm:text-base text-muted/80">
            {tab.subtitle}
          </p>
        ) : null}
      </div>

      <div className="mt-6 mx-auto max-w-2xl space-y-3">
        {tab.items.map((text, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-xl border border-border/10 bg-panel px-4 py-3.5 text-left"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <p className="text-sm sm:text-base leading-relaxed text-muted/90">
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

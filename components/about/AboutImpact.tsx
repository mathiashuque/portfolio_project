import type { ImpactTab } from "./types";

export default function AboutImpact({ tab }: { tab: ImpactTab }) {
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

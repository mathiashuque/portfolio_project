import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import type { ImpactTab } from "./types";

export default function AboutImpact({ tab }: { tab: ImpactTab }) {
  return (
    <div>
      <div className="text-center">
        <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">
          {tab.title}
        </h3>
        {tab.subtitle ? (
          <p className="mt-2 text-sm sm:text-base text-muted/80">{tab.subtitle}</p>
        ) : null}
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tab.items.map((it) => (
          <article
            key={it.left}
            className="
              rounded-2xl bg-panel border border-border/10
              p-5 shadow-sm
            "
          >
            <div className="flex items-center justify-between gap-4">
              {/* Left (problem) */}
              <div className="flex items-center gap-3 min-w-0">
                <XCircle className="h-5 w-5 shrink-0 text-rose-500/90" />
                <p className="text-sm text-muted/85 leading-snug truncate">
                  {it.left}
                </p>
              </div>

              <ArrowRight className="h-4 w-4 shrink-0 text-muted/50" />

              {/* Right (solution) */}
              <div className="flex items-center gap-3 min-w-0 justify-end text-right">
                <p className="text-sm font-semibold text-text leading-snug truncate">
                  {it.right}
                </p>
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500/90" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

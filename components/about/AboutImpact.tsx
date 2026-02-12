import { CheckCircle2, XCircle } from "lucide-react";
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

      <div className="mt-6 mx-auto max-w-5xl">
        {/* Header row */}
        <div className="hidden sm:grid grid-cols-2 gap-3 px-4 pb-2 text-xs font-semibold tracking-[0.18em] text-muted/70">
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4 text-rose-500/80" />
            BEFORE
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500/80" />
            AFTER
          </div>
        </div>

        {/* Table-like body */}
        <div className="overflow-hidden rounded-lg border border-border/20 bg-panel">
          {tab.items.map((it, idx) => (
            <div
              key={it.left}
              className={[
                "grid grid-cols-1 sm:grid-cols-2",
                idx !== 0 ? "border-t border-border/20" : "",
              ].join(" ")}
            >
              {/* Left cell */}
              <div className="px-4 py-3 sm:px-5 sm:py-3.5 flex items-center">
                <div className="sm:hidden mr-3 flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-muted/70">
                  <XCircle className="h-4 w-4 text-rose-500/80" />
                  BEFORE
                </div>

                <div className="flex items-center gap-2.5">
                  <XCircle className="h-4 w-4 shrink-0 text-rose-500/90" />
                  <p className="text-base sm:text-lg leading-snug text-muted/90">
                    {it.left}
                  </p>
                </div>
              </div>

              {/* Right cell */}
              <div className="px-4 py-3 sm:px-5 sm:py-3.5 sm:border-l border-border/20 flex items-center">
                <div className="sm:hidden mr-3 flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-muted/70">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500/80" />
                  AFTER
                </div>

                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500/90" />
                  <p className="text-base sm:text-lg leading-snug text-text">
                    {it.right}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Small note */}
        <p className="mt-3 text-center text-xs text-muted/60">
          Before → After outcomes across operations, product, and growth.
        </p>
      </div>
    </div>
  );
}

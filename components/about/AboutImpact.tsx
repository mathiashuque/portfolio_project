import { CheckCircle2, XCircle } from "lucide-react";
import type { ImpactTab } from "./types";
import { useTranslations } from "next-intl";

export default function AboutImpact({ tab }: { tab: ImpactTab }) {
  const t = useTranslations("About.impact");

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
        {/* MOBILE */}
        <div className="sm:hidden space-y-3">
          {tab.items.map((it, i) => (
            <div
              key={it.left}
              className="rounded-2xl border border-border/20 bg-panel/70 overflow-hidden"
            >
              <div className="px-4 pt-4 pb-3">
                <div className="text-xs text-muted/50 font-medium tracking-[0.18em]">
                  {(i + 1).toString().padStart(2, "0")}
                </div>
              </div>

              <div className="px-4 pb-4 space-y-3">
                <div className="rounded-xl border border-border/15 bg-black/10">
                  <div className="flex items-start gap-3 px-3 py-3">
                    <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-500/90" />
                    <div className="min-w-0 text-left">
                      <span className="inline-flex items-center rounded-full border border-border/20 bg-black/10 px-2 py-0.5 text-[11px] font-semibold tracking-[0.16em] text-muted/70">
                        {t("before")}
                      </span>
                      <p className="mt-1 text-sm leading-snug text-muted/90">
                        {it.left}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border/15 bg-emerald-500/5">
                  <div className="flex items-start gap-3 px-3 py-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500/90" />
                    <div className="min-w-0 text-left">
                      <span className="inline-flex items-center rounded-full border border-border/20 bg-black/10 px-2 py-0.5 text-[11px] font-semibold tracking-[0.16em] text-muted/70">
                        {t("after")}
                      </span>
                      <p className="mt-1 text-sm leading-snug text-text">
                        {it.right}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-2 gap-3 px-4 pb-2 text-xs font-semibold tracking-[0.18em] text-muted/70">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-rose-500/80" />
              {t("before")}
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500/80" />
              {t("after")}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-border/20 bg-panel">
            {tab.items.map((it, idx) => (
              <div
                key={it.left}
                className={[
                  "grid grid-cols-2",
                  idx !== 0 ? "border-t border-border/20" : "",
                ].join(" ")}
              >
                <div className="px-5 py-3.5 flex items-center">
                  <div className="flex items-start gap-2.5">
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500/90" />
                    <p className="text-lg leading-snug text-muted/90">{it.left}</p>
                  </div>
                </div>

                <div className="px-5 py-3.5 border-l border-border/20 flex items-center">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500/90" />
                    <p className="text-lg leading-snug text-text">{it.right}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-3 text-center text-xs text-muted/60">
          {t("footnote")}
        </p>
      </div>
    </div>
  );
}

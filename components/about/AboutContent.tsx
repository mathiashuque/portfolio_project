import type { Tab } from "./types";

export default function AboutContent({ tab, activeKey }: { tab: Tab; activeKey: string }) {
  return (
    <div className="mt-8">
      <div key={activeKey} className="animate-[fadeSlide_320ms_ease-out]">
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-white/60">
          {tab.lead}
        </p>

        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-4 text-left sm:grid-cols-3">
          {tab.cards.map((c) => (
            <article
              key={c.title}
              className={[
                "rounded-2xl border border-slate-200/70 bg-white/60 p-5",
                "shadow-sm shadow-slate-900/5",
                "dark:border-white/10 dark:bg-white/5 dark:shadow-none",
                "transition-transform will-change-transform",
                "hover:-translate-y-0.5",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {c.title}
                </h3>
                {c.tag ? (
                  <span className="shrink-0 rounded-full border border-slate-200/70 bg-white px-2 py-0.5 text-[11px] text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-white/60">
                    {c.tag}
                  </span>
                ) : null}
              </div>

              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-white/70">
                {c.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

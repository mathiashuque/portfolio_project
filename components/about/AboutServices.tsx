import type { ServicesTab } from "./types";

export default function AboutServices({ tab }: { tab: ServicesTab }) {
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
        {tab.services.map((s) => (
          <article
            key={s.title}
            className="
              rounded-2xl bg-panel border border-border/10
              p-6 shadow-sm
              transition-transform duration-200
              hover:-translate-y-0.5 hover:border-border/20
            "
          >
            <div className="flex items-start gap-4">
              <div
                className="
                  grid place-items-center
                  h-11 w-11 rounded-xl
                  bg-white/5 border border-white/10
                  text-accent
                "
              >
                {s.icon ?? <span className="text-sm">■</span>}
              </div>

              <div className="min-w-0">
                <h4 className="text-sm sm:text-base font-semibold text-text">
                  {s.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted/80">
                  {s.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

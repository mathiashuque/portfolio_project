import type { ServicesTab } from "./types";

export default function AboutServices({ tab }: { tab: ServicesTab }) {
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
              rounded-2xl bg-panel border border-border/10
              p-6 shadow-sm
              transition-all duration-200
              hover:-translate-y-0.5 hover:border-border/20
              text-center
            "
          >
            {/* Icon */}
            <div
              className="
                mx-auto mb-4
                grid place-items-center
                h-12 w-12 rounded-xl
                bg-white/5 border border-white/10
                text-accent
              "
            >
              {s.icon ?? <span className="text-sm">■</span>}
            </div>

            {/* Title */}
            <h4 className="text-base font-semibold text-text">
              {s.title}
            </h4>

            {/* Description */}
            <p className="mt-2 text-sm leading-relaxed text-muted/80">
              {s.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

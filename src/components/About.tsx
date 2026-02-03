import { useEffect, useMemo, useState } from "react";

type TabKey = "principles" | "process" | "direction";

type Card = {
  title: string;
  description: string;
  tag?: string;
};

type Tab = {
  key: TabKey;
  label: string;
  lead: string;
  cards: readonly Card[];
};

export default function About() {
  const tabs = useMemo(
    () =>
      [
        {
          key: "principles",
          label: "Principles",
          lead: "The defaults I optimize for when designing and building software.",
          cards: [
            {
              title: "Clarity over cleverness",
              description:
                "Readable code scales better than smart tricks. I optimize for understanding first.",
              tag: "Readability",
            },
            {
              title: "Design for change",
              description:
                "Requirements evolve. I prefer composable structure that adapts without rewrites.",
              tag: "Maintainability",
            },
            {
              title: "Quality is a feature",
              description:
                "Performance and accessibility are part of the design—not polish work at the end.",
              tag: "UX & Perf",
            },
          ] as const,
        },
        {
          key: "process",
          label: "Process",
          lead: "How I go from vague problem → reliable solution without overengineering.",
          cards: [
            {
              title: "Start with constraints",
              description:
                "I clarify goals, users, failure modes, and trade-offs before choosing tools or patterns.",
              tag: "Discovery",
            },
            {
              title: "Ship small, iterate",
              description:
                "I build the thinnest useful slice first, then iterate based on what breaks and what matters.",
              tag: "Iteration",
            },
            {
              title: "Introduce structure when needed",
              description:
                "Abstractions earn their place. I add layers only when complexity justifies it.",
              tag: "Architecture",
            },
          ] as const,
        },
        {
          key: "direction",
          label: "Direction",
          lead: "What I’m aiming to get better at next, beyond just shipping features.",
          cards: [
            {
              title: "Systems that stay understandable",
              description:
                "I’m focused on designing larger codebases that remain predictable and easy to reason about.",
              tag: "Systems",
            },
            {
              title: "Developer experience",
              description:
                "I care about fast feedback loops: tooling, tests, docs, and conventions that reduce friction.",
              tag: "DX",
            },
            {
              title: "Pragmatic engineering",
              description:
                "I want to get better at choosing the simplest solution that meets the real constraints.",
              tag: "Trade-offs",
            },
          ] as const,
        },
      ] as const satisfies readonly Tab[],
    []
  );

  const [active, setActive] = useState<TabKey>("principles");

  const ROTATE_MS = 6000;

  const activeIndex = tabs.findIndex((t) => t.key === active);
  const activeTab = tabs[activeIndex] ?? tabs[0];

  // Auto-rotate: timeout that resets whenever `active` changes
  useEffect(() => {
    const id = window.setTimeout(() => {
      const next = (activeIndex + 1) % tabs.length;
      setActive(tabs[next].key);
    }, ROTATE_MS);

    return () => window.clearTimeout(id);
  }, [activeIndex, tabs]);

  return (
    <section
      id="about"
      className="scroll-mt-32 h-[min(calc(100svh-80px),900px)] mb-20"
      aria-label="About"
    >
      <div className="mx-auto w-full max-w-7xl 2xl:max-w-360 px-6">
        <div className="relative isolate overflow-hidden rounded-3xl">
          <div className="py-10 md:py-14">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-5xl leading-tight">
                I focus on building software that stays understandable as it grows.
              </h2>

              <div
                className="mt-6 flex items-center justify-center gap-6"
                role="tablist"
                aria-label="About tabs"
              >
                {tabs.map((t) => {
                  const isActive = t.key === active;
                  return (
                    <button
                      key={t.key}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setActive(t.key)}
                      className={[
                        "relative text-sm font-medium transition",
                        "text-slate-500 hover:text-slate-900",
                        "dark:text-white/60 dark:hover:text-white",
                        isActive ? "text-slate-900 dark:text-white" : "",
                      ].join(" ")}
                    >
                      <span className="inline-flex items-center gap-2">
                        <span
                          className={[
                            "h-1.5 w-1.5 rounded-full transition-opacity",
                            isActive ? "opacity-100 bg-orange-500" : "opacity-0",
                          ].join(" ")}
                        />
                        {t.label}
                      </span>

                      <span
                        className={[
                          "pointer-events-none absolute -bottom-2 left-1/2 h-0.5 w-10 -translate-x-1/2 rounded-full transition-opacity",
                          isActive ? "opacity-100 bg-orange-500" : "opacity-0",
                        ].join(" ")}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Lead + Cards (animated on tab change) */}
              <div className="mt-8">
                <div key={active} className="animate-[fadeSlide_320ms_ease-out]">
                  <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-white/60">
                    {activeTab.lead}
                  </p>

                  <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-4 text-left sm:grid-cols-3">
                    {activeTab.cards.map((c) => (
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

              {/* Progress indicator (syncs with timer + resets on manual click) */}
              <div className="mx-auto mt-8 h-1 w-44 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                <div
                  key={active}
                  className="h-full w-full origin-left bg-orange-500 animate-[aboutbar_6000ms_linear]"
                />
              </div>

              <style>{`
                @keyframes aboutbar {
                  from { transform: scaleX(0); }
                  to   { transform: scaleX(1); }
                }

                @keyframes fadeSlide {
                  from {
                    opacity: 0;
                    transform: translateY(6px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useMemo, useState } from "react";

export default function About() {
  const tabs = useMemo(
    () =>
      [
        {
          key: "principles",
          label: "Principles",
          text: "I value clarity over cleverness. Code should be easy to read, reason about, and modify—especially months after it was written. Maintainability, performance, and accessibility are design goals, not afterthoughts.",
        },
        {
          key: "process",
          label: "Process",
          text: "I start by understanding constraints and trade-offs before choosing tools or abstractions. I prefer simple, composable solutions and introduce structure only when complexity is justified.",
        },
        {
          key: "direction",
          label: "Direction",
          text: "I’m working toward designing larger systems that remain predictable and easy to reason about, with a particular interest in architecture, developer experience, and software that ages well.",
        },
      ] as const,
    [],
  );

  const [active, setActive] =
    useState<(typeof tabs)[number]["key"]>("principles");

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
      className="scroll-mt-32 h-[min(calc(100svh-80px),900px)]"
      aria-label="About"
    >
      <div className="mx-auto w-full max-w-7xl 2xl:max-w-360 px-6">
        <div className="relative isolate overflow-hidden rounded-3xl">
          <div className="py-10 md:py-14">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-5xl leading-tight">
                I focus on building software that stays understandable as it
                grows.
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
                      onClick={() => setActive(t.key)} // resets timer via `active` change
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
                            isActive
                              ? "opacity-100 bg-orange-500"
                              : "opacity-0",
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

              <div className="relative mt-8 min-h-18">
                <p
                  key={active}
                  className="
      text-sm leading-relaxed text-slate-500 dark:text-white/60
      animate-[fadeSlide_300ms_ease-out]
    "
                  role="tabpanel"
                  aria-live="polite"
                >
                  {activeTab.text}
                </p>
              </div>

              {/* Subtle progress indicator (syncs with timer + resets on manual click) */}
              <div className="mx-auto mt-6 h-1 w-40 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                <div
                  key={active} // restart animation on every tab change
                  className="h-full w-full origin-left bg-orange-500 animate-[aboutbar_6000ms_linear]"
                />
              </div>

              {/* Custom keyframes for the progress bar */}
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

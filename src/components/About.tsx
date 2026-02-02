import { useState } from "react";

export default function About() {
  const tabs = [
    {
      key: "education",
      label: "Education",
      text: "Software Engineering student focused on strong fundamentals, problem solving, and building systems that last.",
    },
    {
      key: "skills",
      label: "Skills",
      text: "Full-stack mindset with an emphasis on clean architecture, DX, and pragmatic, maintainable solutions.",
    },
    {
      key: "work",
      label: "Work Experience",
      text: "Teaching and support roles that sharpen communication, mentorship, and the ability to explain complex ideas clearly.",
    },
  ] as const;

  const [active, setActive] =
    useState<(typeof tabs)[number]["key"]>("education");
  const activeTab = tabs.find((t) => t.key === active)!;

  return (
    <section id="about" className="scroll-mt-32 mb-30">
      <div className="mx-auto w-full max-w-7xl 2xl:max-w-360 px-6">
        <div className="relative isolate overflow-hidden rounded-3xl">
          <div className="py-10 md:py-14">
            {/* Headline + tabs block (like your image) */}
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-5xl leading-tight">
                Design and build a user-friendly experience that stays fast,
                clean, and maintainable.
              </h2>

              {/* Tabs */}
              <div className="mt-6 flex items-center justify-center gap-6">
                {tabs.map((t) => {
                  const isActive = t.key === active;
                  return (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setActive(t.key)}
                      className={[
                        "relative text-sm font-medium transition",
                        "text-slate-500 hover:text-slate-900",
                        "dark:text-white/60 dark:hover:text-white",
                        isActive ? "text-slate-900 dark:text-white" : "",
                      ].join(" ")}
                    >
                      <span className="inline-flex items-center gap-2">
                        {/* little dot for active (green-ish accent) */}
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

                      {/* underline for active */}
                      <span
                        className={[
                          "pointer-events-none absolute -bottom-2 left-1/2 h-[2px] w-10 -translate-x-1/2 rounded-full transition-opacity",
                          isActive ? "opacity-100 bg-orange-500" : "opacity-0",
                        ].join(" ")}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Small description under tabs */}
              <p className="mt-8 text-sm leading-relaxed text-slate-500 dark:text-white/60">
                {activeTab.text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

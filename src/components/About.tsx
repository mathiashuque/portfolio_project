export default function About() {
  const traits = [
    "Clean Code",
    "UX-Aware Development",
    "Full-Stack Mindset",
    "API-Centered Design",
  ];

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden py-20 md:py-28 scroll-mt-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Base */}
        <div className="absolute inset-0 bg-slate-100 dark:bg-slate-950" />

        {/* Soft vignette */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-slate-50/40 dark:to-slate-950/60" />

        {/* Glows (warm in light, subtle in dark) */}
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl opacity-40 bg-orange-200 dark:bg-orange-500/10" />
        <div className="absolute -bottom-28 right-10 h-80 w-80 rounded-full blur-3xl opacity-30 bg-rose-200 dark:bg-rose-500/10" />

        {/* Network-ish pattern (simple approximation, performant) */}
        <div
          className="
            absolute inset-0 opacity-[0.18] dark:opacity-[0.14]
            [background-image:
              radial-gradient(circle_at_20%_30%,rgba(249,115,22,0.35)_1px,transparent_1px),
              radial-gradient(circle_at_70%_20%,rgba(249,115,22,0.25)_1px,transparent_1px),
              radial-gradient(circle_at_40%_80%,rgba(249,115,22,0.20)_1px,transparent_1px),
              linear-gradient(120deg,transparent_0%,rgba(15,23,42,0.10)_45%,transparent_55%),
              linear-gradient(30deg,transparent_0%,rgba(15,23,42,0.08)_45%,transparent_55%)
            ]
            dark:[background-image:
              radial-gradient(circle_at_20%_30%,rgba(249,115,22,0.35)_1px,transparent_1px),
              radial-gradient(circle_at_70%_20%,rgba(249,115,22,0.25)_1px,transparent_1px),
              radial-gradient(circle_at_40%_80%,rgba(249,115,22,0.20)_1px,transparent_1px),
              linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.08)_45%,transparent_55%),
              linear-gradient(30deg,transparent_0%,rgba(255,255,255,0.06)_45%,transparent_55%)
            ]
            bg-size-[220px_220px,260px_260px,300px_300px,520px_520px,560px_560px]
          "
        />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Title */}
        <div className="text-center">
          <p className="text-xs tracking-[0.35em] text-slate-500 dark:text-white/60">
            ABOUT
          </p>

          <div className="relative mt-3 inline-block">
            {/* small accent bar like your friend’s */}
            <span className="absolute -left-6 top-1/2 hidden h-7 w-1 -translate-y-1/2 rounded-full bg-orange-500 md:block" />
            <h2 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-6xl">
              About Me
            </h2>
          </div>
        </div>

        {/* Layout */}
        <div className="mt-12 grid items-center gap-12 md:mt-16 md:grid-cols-[420px_1fr]">
          {/* Left: circular anchor (no photo) */}
          <div className="flex justify-center md:justify-start">
            <div className="relative">
              {/* ring */}
              <div className="absolute -inset-2 rounded-full border-4 border-orange-500/70" />
              {/* “portrait” placeholder */}
              <div className="grid h-64 w-64 place-items-center rounded-full bg-linear-to-br from-slate-900/3 to-slate-900/8 text-slate-900 shadow-sm dark:from-white/[0.06] dark:to-white/[0.02] dark:text-white">
                <div className="text-center">
                  <div className="text-4xl font-semibold tracking-tight">
                    MH
                  </div>
                  <div className="mt-2 text-sm text-slate-600 dark:text-white/70">
                    Software Developer
                  </div>
                </div>
              </div>

              {/* subtle “node” dots around */}
              <span className="absolute -right-6 top-10 h-2 w-2 rounded-full bg-orange-500/70" />
              <span className="absolute -left-4 bottom-14 h-1.5 w-1.5 rounded-full bg-orange-500/60" />
              <span className="absolute right-10 -bottom-5 h-1.5 w-1.5 rounded-full bg-orange-500/50" />
            </div>
          </div>

          {/* Right: copy + pills (no block container) */}
          <div className="text-left">
            <p className="text-lg leading-relaxed text-slate-700 dark:text-white/80 md:text-xl">
              I build software with a focus on clarity and long-term
              maintainability: strong fundamentals, clean architecture, and
              pragmatic trade-offs.
            </p>

            <p className="mt-6 leading-relaxed text-slate-600 dark:text-white/70">
              Lately I’ve been sharpening my full-stack skills, exploring better
              ways to design systems, and staying curious about tools that
              improve developer experience and performance.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {traits.map((t) => (
                <span
                  key={t}
                  className="
                    rounded-full px-4 py-2 text-sm
                    border border-slate-900/10 text-slate-700
                    bg-white/40 backdrop-blur
                    hover:bg-white/70 transition
                    dark:border-white/10 dark:text-white/80 dark:bg-white/3 dark:hover:bg-white/6
                  "
                >
                  {t}
                </span>
              ))}
            </div>

            {/* optional: small scroll hint like your friend's arrow */}
            <div className="mt-10 flex items-center gap-3 text-slate-500 dark:text-white/50">
              <span className="h-px w-10 bg-slate-900/10 dark:bg-white/10" />
              <span className="text-xs tracking-wide">Scroll</span>
              <span className="text-lg leading-none">↓</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

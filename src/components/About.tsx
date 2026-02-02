export default function About() {
  const traits = [
    "Clean Code",
    "UX-Aware Development",
    "Full-Stack Mindset",
    "API-Centered Design",
  ];

  return (
    <section id="about" className="scroll-mt-32 mb-30">
      {/* Same container width as Home */}
      <div className="mx-auto w-full max-w-7xl 2xl:max-w-360 px-6">
        {/* This frame clips the background to the container width */}
        <div className="relative isolate overflow-hidden rounded-3xl">
          {/* Content padding inside the boxed frame */}
          <div className="py-5">
            {/* Title */}
            <div className="text-center">
              <p className="text-xs tracking-[0.35em] text-slate-500 dark:text-white/60">
                ABOUT
              </p>

              <div className="relative mt-3 inline-block">
                <span className="absolute -left-6 top-1/2 hidden h-7 w-1 -translate-y-1/2 rounded-full bg-orange-500 md:block" />
                <h2 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-6xl">
                  About Me
                </h2>
              </div>
            </div>

            {/* Layout */}
            <div className="mt-12 grid items-center gap-12 md:mt-16 md:grid-cols-[420px_1fr]">
              {/* Left */}
              <div className="flex justify-center md:justify-start">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full border-4 border-orange-500/70" />

                  <div className="grid h-64 w-64 place-items-center rounded-full bg-linear-to-br from-slate-900/3 to-slate-900/8 text-slate-900 shadow-sm dark:from-white/6 dark:to-white/[0.02] dark:text-white">
                    <div className="text-center">
                      <div className="text-4xl font-semibold tracking-tight">
                        MH
                      </div>
                      <div className="mt-2 text-sm text-slate-600 dark:text-white/70">
                        Software Developer
                      </div>
                    </div>
                  </div>

                  <span className="absolute -right-6 top-10 h-2 w-2 rounded-full bg-orange-500/70" />
                  <span className="absolute -left-4 bottom-14 h-1.5 w-1.5 rounded-full bg-orange-500/60" />
                  <span className="absolute right-10 -bottom-5 h-1.5 w-1.5 rounded-full bg-orange-500/50" />
                </div>
              </div>

              {/* Right */}
              <div className="text-left">
                <p className="text-lg leading-relaxed text-slate-700 dark:text-white/80 md:text-xl">
                  I build software with a focus on clarity and long-term
                  maintainability: strong fundamentals, clean architecture, and
                  pragmatic trade-offs.
                </p>

                <p className="mt-6 leading-relaxed text-slate-600 dark:text-white/70">
                  Lately I’ve been sharpening my full-stack skills, exploring
                  better ways to design systems, and staying curious about tools
                  that improve developer experience and performance.
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

                <div className="mt-10 flex items-center gap-3 text-slate-500 dark:text-white/50">
                  <span className="h-px w-10 bg-slate-900/10 dark:bg-white/10" />
                  <span className="text-xs tracking-wide">Scroll</span>
                  <span className="text-lg leading-none">↓</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* If you want the section to breathe away from next one */}
        {/* <div className="h-10" /> */}
      </div>
    </section>
  );
}

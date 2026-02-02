import TraitsMarquee from "./TraitsMarquee";

export default function Home() {
  return (
    <section
      id="home"
      className="
        bg-bg text-text
        flex flex-col
        pt-10
        overflow-hidden
        mb-20  
      "
    >
      {/* HERO fills remaining height */}
      <div className="flex-1 flex items-center pb-5 md:pt-20  md:pb-20">
        <div className="max-w-7xl 2xl:max-w-360 mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div>
            <div className="relative inline-block mb-6">
              {/* Selection box */}
              <div className="relative rounded-md border border-border bg-bg px-4 py-2 text-sm font-medium">
                Hello, World! 👋 I’m Mathias!
                {/* Corner handles */}
                <span className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-accent border border-border rounded-xs" />
                <span className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-accent border border-border rounded-xs" />
                <span className="absolute -left-1.5 -bottom-1.5 h-3 w-3 bg-accent border border-border rounded-xs" />
                <span className="absolute -right-1.5 -bottom-1.5 h-3 w-3 bg-accent border border-border rounded-xs" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Software Developer
            </h1>

            <p className="mt-6 max-w-xl text-muted text-lg">
              I design and build clean, performant web applications with a
              strong focus on usability, maintainability, and modern UI.
            </p>

            <div className="mt-8 flex items-center gap-6">
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 rounded-md bg-accent text-white font-semibold hover:bg-accent-2 transition"
              >
                Get In Touch →
              </a>

              <a
                href="/Mathias_Huque_CV.pdf"
                className="inline-flex items-center gap-2 font-medium text-text hover:underline"
              >
                Download CV ↓
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 sm:w-92 sm:h-92 lg:-translate-x-6">
              {/* Black shadow slab behind the card */}
              <div
                className="
        absolute left-6 top-7
        w-68 h-68
        bg-text
        rounded-2xl
        rotate-5
      "
              />

              {/* Portrait card */}
              <div
                className="
        absolute left-0 top-0
        w-68 h-68
        bg-panel
        rounded-2xl
        shadow-[0_18px_45px_-28px_rgba(0,0,0,0.65)]
        overflow-hidden
        relative
      "
              >
                <div className="w-full h-full grid place-items-center p-6">
                  <div className="w-full h-full rounded-full overflow-hidden bg-bg">
                    <img
                      src="/avatar.png"
                      alt="Portrait"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MARQUEE pinned to bottom */}
      <div className="mt-auto">
        <TraitsMarquee />
      </div>
    </section>
  );
}

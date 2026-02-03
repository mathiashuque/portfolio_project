import TraitsMarquee from "./TraitsMarquee";

export default function Home() {
  return (
    <section
      id="home"
      className="
    bg-bg text-text
    flex flex-col
    pt-5
    overflow-hidden
    h-[min(calc(100svh-80px),900px)]
    scroll-mt-32
  "
    >
      {/* HERO fills remaining height */}
      <div className="flex-1 flex items-center">
        <div className="max-w-7xl 2xl:max-w-360 mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div>
            <div className="relative inline-block mb-8">
              {/* Selection box */}
              <div className="relative rounded-md border border-border bg-bg px-5 py-3 text-base font-medium">
                Hello, World! 👋 I’m Mathias!
                {/* Corner handles */}
                <span className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-accent border border-border rounded-xs" />
                <span className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-accent border border-border rounded-xs" />
                <span className="absolute -left-1.5 -bottom-1.5 h-3 w-3 bg-accent border border-border rounded-xs" />
                <span className="absolute -right-1.5 -bottom-1.5 h-3 w-3 bg-accent border border-border rounded-xs" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Software Developer
            </h1>

            <p className="mt-6 max-w-2xl text-muted text-xl">
              I design and build clean, performant web applications with a
              strong focus on usability, maintainability, and modern UI.
            </p>

            <div className="mt-10 flex items-center gap-7">
              <a
                href="#contact"
                className="inline-flex items-center px-7 py-3.5 rounded-md bg-accent text-white text-lg font-semibold hover:bg-accent-2 transition"
              >
                Get In Touch →
              </a>

              <a
                href="/Mathias_Huque_CV.pdf"
                className="inline-flex items-center gap-2 text-lg font-medium text-text hover:underline"
              >
                Download CV ↓
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative flex justify-center lg:justify-end ">
            <div className="relative w-96 h-96 sm:w-104 sm:h-104">
              {/* Black shadow slab behind the card */}
              <div
                className="
                  absolute left-6 top-7
                  w-96 h-96
                  bg-text
                  rounded-2xl
                  rotate-5
                "
              />

              {/* Portrait card */}
              <div
                className="
                  absolute left-0 top-0
                  w-96 h-96
                  bg-panel
                  rounded-2xl
                  shadow-[0_20px_55px_-28px_rgba(0,0,0,0.65)]
                  overflow-hidden
                "
              >
                <div className="w-full h-full grid place-items-center p-7">
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

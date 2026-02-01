import TraitsMarquee from "./TraitsMarquee";

export default function Home() {
  return (
    <section
      id="home"
      className="bg-bg text-text flex flex-col h-[calc(100vh-var(--nav-h,0px))]"
    >
      {/* HERO should fill leftover height */}
      <div className="flex items-center flex-1">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-border text-sm font-medium mb-6">
              Hello, World! 👋 I’m Mathias!
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Software Developer & Student
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

            <div className="mt-10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center">
                GH
              </div>
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center">
                IN
              </div>
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center">
                LI
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative flex justify-center">
            <div className="absolute right-6 top-6 h-full w-3 bg-black rounded-lg" />

            <div className="relative bg-panel p-6 rounded-xl shadow-xl">
              <div className="w-72 h-72 rounded-full overflow-hidden bg-bg-elev flex items-center justify-center">
                <img
                  src="/avatar.png"
                  alt="Portrait"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="absolute -bottom-8 -right-8 w-40 h-20 bg-green-400 rounded-full rotate-[-15deg]" />
          </div>
        </div>
      </div>

      {/* MARQUEE pinned to bottom */}
      <TraitsMarquee />
    </section>
  );
}

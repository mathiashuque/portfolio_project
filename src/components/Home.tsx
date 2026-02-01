export default function Home() {
  return (
    <section
      id="home"
      className="relative isolate min-h-[90vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 scanlines opacity-20" />
        <div className="absolute inset-0 animated-gradient opacity-80" />
        <div className="absolute inset-0 bg-grid opacity-[0.18]" />
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-40 -right-32 h-112 w-md rounded-full bg-cyan-400/20 blur-[140px] animate-pulse" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.65)_100%)]" />

        {/* Floating shapes */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Starfield */}
          <div className="starfield" />
        </div>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold mb-3 tracking-tight">
        Mathias Huque
      </h1>

      <h2 className="text-xl md:text-2xl text-gray-300/80 mb-6">
        Software Developer & University Student
      </h2>

      <p className="max-w-2xl text-gray-200/80 leading-relaxed">
        Always learning about new paradigms and technologies to apply the right
        solution in the right place.
      </p>
    </section>
  );
}

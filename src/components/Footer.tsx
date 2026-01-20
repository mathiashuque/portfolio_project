export default function Footer() {
  return (
    <footer className="mt-24 px-6 pb-10 relative">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/5 to-transparent" />

      <div className="max-w-5xl mx-auto pt-8 border-t border-white/10 relative">
        <p className="text-center text-sm text-white/60 leading-relaxed">
          Loosely designed in Figma and coded in Visual Studio Code by yours
          truly. Built with Vite and Tailwind CSS, deployed with Vercel. All
          text is set in the Inter typeface.
        </p>

        <p className="mt-4 text-center text- text-white/40 tracking-wide">
          Mathias Huque — {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

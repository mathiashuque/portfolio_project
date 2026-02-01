import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaMoon, FaSun } from "react-icons/fa";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);


  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored ? stored === "dark" : true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const linkClass =
    "text-slate-700 hover:text-slate-900 transition dark:text-white/80 dark:hover:text-white";

  const iconClass =
    "text-slate-700 hover:text-slate-900 transition dark:text-white/80 dark:hover:text-white";

  return (
    <nav className="sticky top-0 z-50 bg-white text-slate-900 border-b border-slate-900/10
                dark:bg-slate-950 dark:text-white dark:border-white/10">

      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#home"
          className="font-bold leading-tight text-slate-900 dark:text-white"
        >
          Mathias Huque
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={linkClass}>
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop socials + theme */}
        <div className="hidden md:flex items-center gap-4 text-xl">
          <a
            href="https://linkedin.com/in/mathias-huque"
            target="_blank"
            rel="noopener noreferrer"
            className={iconClass}
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://github.com/mHuque1"
            target="_blank"
            rel="noopener noreferrer"
            className={iconClass}
            aria-label="GitHub"
          >
            <FaGithub />
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`${iconClass} text-lg`}
          >
            {dark ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="
            md:hidden inline-flex items-center justify-center rounded-md p-2
            text-slate-700 hover:text-slate-900 hover:bg-slate-900/5 transition
            dark:text-white/80 dark:hover:text-white dark:hover:bg-white/5
          "
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <HiOutlineX size={22} /> : <HiOutlineMenu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`
          md:hidden overflow-hidden transition-[max-height,opacity] duration-200
          ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-6 pb-4 pt-2 border-t border-slate-900/10 dark:border-white/10">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-4 text-xl">
            <a
              href="https://linkedin.com/in/mathias-huque"
              target="_blank"
              rel="noopener noreferrer"
              className={iconClass}
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://github.com/mHuque1"
              target="_blank"
              rel="noopener noreferrer"
              className={iconClass}
              aria-label="GitHub"
            >
              <FaGithub />
            </a>

            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-2 ml-auto text-base text-slate-700 hover:text-slate-900 transition dark:text-white/80 dark:hover:text-white"
              aria-label="Toggle theme"
            >
              {dark ? <FaSun /> : <FaMoon />}
              <span className="text-sm">
                {dark ? "Light mode" : "Dark mode"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

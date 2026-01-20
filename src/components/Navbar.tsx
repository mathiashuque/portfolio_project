import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const links = [
  { href: "#home", label: "Home" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Stack" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Close menu when resizing to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <nav
      className="
        sticky top-0 z-50
        bg-slate-950/40 backdrop-blur-md
        border-b border-white/10
        supports-[backdrop-filter]:bg-slate-950/30
      "
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <a href="#home" className="font-bold text-white leading-tight">
          Mathias Huque
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/80 hover:text-white transition"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop socials */}
        <div className="hidden md:flex items-center gap-4 text-xl">
          <a
            href="https://linkedin.com/in/mathias-huque"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/mHuque1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white/80 hover:text-white hover:bg-white/5 transition"
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
        <div className="px-6 pb-4 pt-2 border-t border-white/10">
          <div className="flex flex-col gap-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="
                  rounded-md px-3 py-2
                  text-white/85 hover:text-white
                  hover:bg-white/5 transition
                "
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
              className="text-white/80 hover:text-white transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/mHuque1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

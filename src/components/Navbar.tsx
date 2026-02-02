import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState("#about");
  const navRef = useRef<HTMLElement | null>(null);
  useLayoutEffect(() => {
    const setNavHeight = () => {
      const h = navRef.current?.offsetHeight ?? 0;
      document.documentElement.style.setProperty("--nav-h", `${h}px`);
    };

    setNavHeight();
    window.addEventListener("resize", setNavHeight);
    return () => window.removeEventListener("resize", setNavHeight);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored ? stored === "dark" : true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((el): el is HTMLElement => el instanceof HTMLElement);

    if (!sections.length) return;

    const getProbeY = () => {
      const nav = document.querySelector("nav");
      const navH = nav instanceof HTMLElement ? nav.offsetHeight : 0;
      // A point in the content area, below the navbar
      return navH + (window.innerHeight - navH) * 0.2; // 20% feels snappy for nav clicks
    };

    const computeActive = () => {
      const probeY = getProbeY();

      // 1) Prefer the section that CONTAINS the probe line
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= probeY && r.bottom >= probeY) {
          setActive(`#${s.id}`);
          return;
        }
      }

      // 2) Fallback: pick closest center among visible sections
      let bestId = sections[0].id;
      let bestDist = Number.POSITIVE_INFINITY;

      for (const s of sections) {
        const r = s.getBoundingClientRect();
        const visible = r.bottom > 0 && r.top < window.innerHeight;
        if (!visible) continue;

        const center = r.top + r.height / 2;
        const dist = Math.abs(center - probeY);

        if (dist < bestDist) {
          bestDist = dist;
          bestId = s.id;
        }
      }

      setActive(`#${bestId}`);
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        computeActive();
        ticking = false;
      });
    };

    computeActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", computeActive);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", computeActive);
    };
  }, []);

  // VERY noticeable hover styles
  const linkBase =
    "relative px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 " +
    "hover:text-slate-900 hover:bg-slate-900/10 hover:scale-[1.06] active:scale-[0.98] " +
    "dark:hover:text-white dark:hover:bg-white/10";

  const linkInactive = "text-muted";
  const linkActive =
    "text-slate-900 bg-slate-900/15 ring-1 ring-slate-900/20 " +
    "dark:text-white dark:bg-white/15 dark:ring-white/20";

  const iconClass =
    "text-muted transition-all duration-200 " +
    "hover:text-slate-900 hover:scale-110 hover:drop-shadow-sm " +
    "active:scale-100 dark:hover:text-white";

  return (
    <nav
      ref={navRef}
      className={`
        sticky top-0 z-50 transition-all duration-200
        ${
          scrolled
            ? "bg-bg/50 backdrop-blur-md border-b border-border/10"
            : "bg-bg border-transparent"
        }
        text-text
      `}
    >
      <div className="max-w-7xl 2xl:max-w-360 mx-auto px-6 py-5 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          className="
            font-bold text-2xl leading-tight tracking-tight
            text-slate-900 dark:text-white
            transition-all duration-300
            hover:text-blue-600
          "
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActive("#about");
          }}
        >
          Mathias Huque
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-2">
          {links.map((l) => {
            const isActive = active === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                className={`${linkBase} ${isActive ? linkActive : linkInactive}`}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setActive(l.href)} // immediate feedback on click
              >
                {l.label}
              </a>
            );
          })}
        </div>

        {/* Desktop socials + theme */}
        <div className="hidden md:flex items-center gap-4 text-2xl">
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
            className={iconClass}
          >
            {dark ? <FaMoon /> : <FaSun />}
          </button>

          {/* Download CV */}
          <a
            href="/Mathias_Huque_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="
    ml-2 px-4 py-2 rounded-lg text-sm font-semibold
    bg-blue-600 text-white
    transition-all duration-200
    hover:bg-blue-700 hover:scale-[1.06]
    hover:shadow-lg hover:shadow-blue-600/30
    active:scale-[0.98]
  "
          >
            View CV
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="
            md:hidden inline-flex items-center justify-center rounded-md p-2
            text-slate-700 hover:text-slate-900 hover:bg-slate-900/10
            transition-all duration-200 hover:scale-105
            dark:text-white/80 dark:hover:text-white dark:hover:bg-white/10
          "
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`
          md:hidden overflow-hidden transition-[max-height,opacity] duration-200
          ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-6 pb-5 pt-3 border-t border-slate-900/10 dark:border-white/10">
          <div className="flex flex-col gap-2">
            {links.map((l) => {
              const isActive = active === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={`${linkBase} ${isActive ? linkActive : linkInactive}`}
                  onClick={() => {
                    setActive(l.href);
                    setOpen(false);
                  }}
                >
                  {l.label}
                </a>
              );
            })}
          </div>

          <div className="mt-5 flex items-center gap-4 text-2xl">
            <button
              type="button"
              onClick={toggleTheme}
              className="
                ml-auto flex items-center gap-2
                px-3 py-2 rounded-lg
                transition-all duration-200
                hover:bg-slate-900/10 hover:scale-[1.04]
                dark:hover:bg-white/10
              "
              aria-label="Toggle theme"
            >
              <span className="text-xl">{dark ? <FaSun /> : <FaMoon />}</span>
              <span className="text-sm text-muted">
                {dark ? "Light mode" : "Dark mode"}
              </span>
            </button>

            {/* Mobile: View CV */}
            <a
              href="/Mathias_Huque_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="
    mt-4 inline-flex w-full items-center justify-center
    px-4 py-2 rounded-lg text-sm font-semibold
    bg-blue-600 text-white
    transition-all duration-200
    hover:bg-blue-700 hover:scale-[1.03]
    hover:shadow-lg hover:shadow-blue-600/30
    active:scale-[0.98]
  "
            >
              View CV
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

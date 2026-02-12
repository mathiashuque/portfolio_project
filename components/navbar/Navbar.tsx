"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import { NAV_LINKS } from "./constants";

function getInitialDark(): boolean {
  // In Next.js client components this will run on the client,
  // but keep the guard for safety/tests.
  if (typeof window === "undefined") return true;

  const stored = window.localStorage.getItem("theme");
  return stored ? stored === "dark" : true;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState<boolean>(getInitialDark);
  const [active, setActive] = useState("#home");
  const navRef = useRef<HTMLElement | null>(null);

  // Set CSS var for nav height
  useLayoutEffect(() => {
    const setNavHeight = () => {
      const h = navRef.current?.offsetHeight ?? 0;
      document.documentElement.style.setProperty("--nav-h", `${h}px`);
    };

    setNavHeight();
    window.addEventListener("resize", setNavHeight);
    return () => window.removeEventListener("resize", setNavHeight);
  }, []);

  // Sync theme state -> DOM + storage (no setState here)
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const toggleTheme = () => setDark((prev) => !prev);

  // Scroll background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Active link detection
  useEffect(() => {
    const sections = NAV_LINKS
      .map((l) => document.querySelector(l.href))
      .filter((el): el is HTMLElement => el instanceof HTMLElement);

    if (!sections.length) return;

    const getProbeY = () => {
      const nav = document.querySelector("nav");
      const navH = nav instanceof HTMLElement ? nav.offsetHeight : 0;
      return navH + (window.innerHeight - navH) * 0.2;
    };

    const computeActive = () => {
      const probeY = getProbeY();

      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= probeY && r.bottom >= probeY) {
          setActive(`#${s.id}`);
          return;
        }
      }

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

    // If the same lint rule ever complains here too, replace this line with:
    // requestAnimationFrame(computeActive);
    computeActive();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", computeActive);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", computeActive);
    };
  }, []);

  const navClass = `
    sticky top-0 z-50 transition-all duration-200
    ${
      scrolled
        ? "bg-bg/50 backdrop-blur-md border-b border-border/10"
        : "bg-bg border-transparent"
    }
    text-text
  `;

  return (
    <nav ref={navRef} className={navClass}>
      <div className="max-w-7xl 2xl:max-w-360 mx-auto px-6 py-5 flex items-center justify-between">
        <div
          className="
            font-bold text-2xl leading-tight tracking-tight
            text-slate-900 dark:text-white
            transition-all duration-300
            hover:text-blue-600
          "
        >
          Mathias Huque
        </div>

        <div className="hidden md:flex items-center gap-2">
          <NavLinks
            links={NAV_LINKS}
            active={active}
            onNavigate={(href) => setActive(href)}
            direction="row"
          />
        </div>

        <div className="hidden md:flex items-center gap-4 text-2xl">
          <ThemeToggle dark={dark} onToggle={toggleTheme} variant="icon" />


        </div>

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

      <MobileMenu
        open={open}
        links={NAV_LINKS}
        active={active}
        dark={dark}
        onToggleTheme={toggleTheme}
        onNavigate={(href) => {
          setActive(href);
          setOpen(false);
        }}
      />
    </nav>
  );
}

"use client";

import type { Variants } from "motion/react";
import { motion, stagger } from "motion/react";
import { useTranslations } from "next-intl";
import type { NavLink } from "./types";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import SocialLinks from "./SocialLinks";

const menuVariants = {
  open: {
    transition: {
      delayChildren: stagger(0.07, { startDelay: 0.1 }),
      staggerChildren: 0.06,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
} satisfies Variants;

const itemVariants: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
      opacity: { duration: 0.15 },
    },
  },
  closed: {
    y: 18,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
      opacity: { duration: 0.1 },
    },
  },
};

// El panel se desliza hacia arriba mientras aparece. Antes esto era un clipPath
// circular que obligaba a medir el alto del panel con un ResizeObserver.
const panelVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.18 },
  },
  closed: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.15 },
  },
};

export default function MobileMenu({
  open,
  links,
  active,
  onNavigate,
  dark,
  onToggleTheme,
}: {
  open: boolean;
  links: readonly NavLink[];
  active: string;
  onNavigate: (href: string) => void;
  dark: boolean;
  onToggleTheme: () => void;
}) {
  const t = useTranslations("Nav");

  return (
    <motion.div
      className="lg:hidden absolute left-0 right-0 top-full z-50"
      initial={false}
      animate={open ? "open" : "closed"}
      // Cerrado, el panel sigue en el DOM (para animar): `inert` lo saca del
      // tab order y del árbol de accesibilidad, cosa que pointer-events no hace.
      inert={!open}
      style={{ pointerEvents: open ? "auto" : "none" }}
    >
      <motion.div
        variants={panelVariants}
        className="
    relative overflow-hidden
    bg-bg/95 backdrop-blur-md
    border-b border-slate-900/10 dark:border-white/10
    max-h-[calc(100vh-var(--nav-h))] overflow-y-auto overscroll-contain
    pb-[env(safe-area-inset-bottom)]
  "
      >
        <div className="relative px-6 pb-5 pt-3">
          <motion.ul className="flex flex-col gap-2" variants={menuVariants}>
            {links.map((l) => {
              const isActive = active === l.href;

              return (
                <motion.li key={l.href} variants={itemVariants}>
                  <a
                    href={l.href}
                    onClick={() => onNavigate(l.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={[
                      "inline-flex items-center w-fit rounded-full px-3 py-2",
                      "text-sm font-medium transition-all duration-200",
                      "hover:bg-slate-900/10 dark:hover:bg-white/10",
                      isActive
                        ? "text-slate-900 dark:text-white bg-slate-900/10 dark:bg-white/10"
                        : "text-slate-700 dark:text-white/80",
                    ].join(" ")}
                  >
                    {t(l.key)}
                  </a>
                </motion.li>
              );
            })}
          </motion.ul>

          <div className="mt-6 pt-5 border-t border-slate-900/10 dark:border-white/10">
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-4 text-2xl">
                <SocialLinks />
              </div>

              <div className="flex items-center">
                <LanguageSwitcher />
                <ThemeToggle
                  dark={dark}
                  onToggle={onToggleTheme}
                  variant="mobile"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import type { Variants } from "motion/react";
import { motion, stagger } from "motion/react";
import { Github, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";
import type { NavLink } from "./types";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { iconClass } from "./constants";
import { SITE } from "@/lib/site";

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

const sidebarVariants: Variants = {
  open: (height = 1000) => ({
    // reveal from top-right (matches your hamburger button area better)
    clipPath: `circle(${height * 2 + 220}px at calc(100% - 28px) 28px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(22px at calc(100% - 28px) 28px)",
    transition: {
      delay: 0.15,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

function useDimensions(ref: React.RefObject<HTMLElement | null>) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      setDimensions({
        width: el.offsetWidth,
        height: el.offsetHeight,
      });
    };

    update();

    // Keep it accurate if content wraps / theme toggle changes height
    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => ro.disconnect();
  }, [ref]);

  return dimensions;
}

const panelVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.18 },
  },
  closed: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.15 },
  },
};

const contentVariants: Variants = {
  open: { opacity: 1, transition: { delay: 0.05 } },
  closed: { opacity: 0 },
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
  const panelRef = useRef<HTMLDivElement | null>(null);
  const { height } = useDimensions(panelRef);
  const t = useTranslations("Nav");

  return (
    <motion.div
      className="lg:hidden absolute left-0 right-0 top-full z-50"
      initial={false}
      animate={open ? "open" : "closed"}
      style={{ pointerEvents: open ? "auto" : "none" }}
    >
      <motion.div
        ref={panelRef}
        variants={panelVariants}
        className="
    relative overflow-hidden
    bg-bg/95 backdrop-blur-md
    border-b border-slate-900/10 dark:border-white/10
    max-h-[calc(100vh-var(--nav-h))] overflow-y-auto overscroll-contain
    pb-[env(safe-area-inset-bottom)]
  "
      >
        <motion.div
          className="absolute inset-0"
          variants={sidebarVariants}
          custom={height}
        />

        <motion.div
          className="relative px-6 pb-5 pt-3"
          variants={contentVariants}
        >
          <motion.ul
            className="flex flex-col gap-2"
            variants={menuVariants}
            aria-hidden={!open}
          >
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
                <a
                  href={SITE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("aria.github")}
                  className={iconClass}
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={SITE.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("aria.linkedin")}
                  className={iconClass}
                >
                  <Linkedin className="h-5 w-5" />
                </a>
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
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

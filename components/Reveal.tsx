"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Segundos de retraso antes de entrar. */
  delay?: number;
  duration?: number;
  /** Píxeles de desplazamiento inicial. */
  offset?: number;
  axis?: "x" | "y";
};

/**
 * Entrada de sección estándar: aparece al entrar en el viewport y vuelve a su
 * estado inicial al salir. Reemplaza el patrón `useState(inView)` +
 * `onViewportEnter/Leave` que cada sección repetía.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  duration = 1,
  offset = 40,
  axis = "y",
}: RevealProps) {
  const hidden = axis === "x" ? { opacity: 0, x: -offset } : { opacity: 0, y: offset };

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ amount: 0.1 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

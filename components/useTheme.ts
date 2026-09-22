"use client";

import { useCallback } from "react";

export const THEME_STORAGE_KEY = "theme";

/**
 * Tema claro/oscuro.
 *
 * No guarda estado en React a propósito: `ThemeInitScript` aplica (o no) la clase
 * `dark` en <html> antes del primer paint, y todo lo visual se resuelve con la
 * variante `dark:` de CSS. El DOM es la única fuente de verdad, así que acá sólo
 * hace falta saber invertirla.
 */
export function useTheme() {
  const toggle = useCallback(() => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");

    root.classList.toggle("dark", next);
    localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
  }, []);

  return { toggle };
}

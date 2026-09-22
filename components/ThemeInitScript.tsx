"use client";

import { useServerInsertedHTML } from "next/navigation";

import { THEME_STORAGE_KEY } from "./useTheme";

const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem('${THEME_STORAGE_KEY}');var d=s?s==='dark':true;document.documentElement.classList.toggle('dark',d);}catch(e){}})();`;

export default function ThemeInitScript({ nonce }: { nonce?: string }) {
  useServerInsertedHTML(() => (
    <script
      id="theme-init"
      nonce={nonce}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
    />
  ));

  return null;
}

"use client";

import { useServerInsertedHTML } from "next/navigation";

const THEME_INIT_SCRIPT =
  "(function(){try{var s=localStorage.getItem('theme');var d=s?s==='dark':true;document.documentElement.classList.toggle('dark',d);}catch(e){}})();";

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

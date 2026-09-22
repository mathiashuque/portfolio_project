"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <section
      id="about"
      className="min-h-dvh snap-start snap-always scroll-mt-32 mb-20"
      aria-label="About"
    >
      <div className="mx-auto w-full max-w-7xl 2xl:max-w-360 px-6">
        <div className="relative isolate overflow-hidden rounded-3xl">
          <Reveal
            duration={1}
            offset={50}
            className="mx-auto max-w-4xl text-center"
          >
            {children}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

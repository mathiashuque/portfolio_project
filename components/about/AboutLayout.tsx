import React from "react";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <section id="about" className="scroll-mt-32 mb-40" aria-label="About">
      <div className="mx-auto w-full max-w-7xl 2xl:max-w-360 px-6">
        <div className="relative isolate overflow-hidden rounded-3xl">
          <div className="mx-auto max-w-4xl text-center">{children}</div>
        </div>
      </div>
    </section>
  );
}

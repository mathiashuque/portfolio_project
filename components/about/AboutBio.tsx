import type { BioTab } from "./types";

export default function AboutBio({ tab }: { tab: BioTab }) {
  return (
    <div className="text-center">
      <h3 className="text-4xl sm:text-5xl font-bold tracking-tight text-text">
        {tab.title}
      </h3>

      {tab.paragraphs.map((p, i) => (
        <p
          key={i}
          className="
            mx-auto mt-6 max-w-4xl
            text-base sm:text-lg
            leading-relaxed
            text-muted/85
          "
        >
          {p}
        </p>
      ))}
    </div>
  );
}

import TechIcon from "./TechIcon";
import { STACK } from "../data/stackData";

export default function Stack() {
  return (
    <section id="stack" className="px-6 py-16 max-w-5xl mx-auto">
      <div className="mb-14 text-center">
        <p className="text-xs font-semibold tracking-[0.22em] text-faint/90">
          STACK
        </p>

        <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-text">
          Skills &amp; Technologies
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-muted/90">
          Explore the stacks I rely on to ship production-ready software.
        </p>
      </div>

      <div className="space-y-16">
        {Object.entries(STACK).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-3xl font-semibold mb-6  text-muted/90">
              {category}
            </h3>

            {/* Box wrapper */}
            <div
              className="
                rounded-2xl border border-border/10 bg-panel
                px-6 py-6 shadow-sm
              "
            >
              <div className="flex flex-wrap gap-6 justify-center">
                {items.map((item) => (
                  <TechIcon
                    key={item.name}
                    name={item.name}
                    logo={item.logo}
                    color={item.color}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import { STACK } from "@/components/Stack/tech/stackData";
import MarqueeRow from "./MarqueeRow";
import StackHeader from "./StackHeader";
import { StackCategoryItems } from "./types";

export default function StackSection() {
  return (
    <section
      id="stack"
      className="px-6 mb-20 max-w-7xl 2xl:max-w-360 mx-auto scroll-mt-32"
    >
      <StackHeader />

      <div className="space-y-5">
        {Object.entries(STACK).map(([category, items], i) => (
          <div key={category}>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-muted/90 tracking-tight">
              {category}
            </h3>

            <div className="rounded-2xl bg-panel px-6 py-1 pt-1 shadow-sm">
              <MarqueeRow
                items={items as StackCategoryItems}
                reverse={i % 2 === 1}
                durationSec={24 + i * 4}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

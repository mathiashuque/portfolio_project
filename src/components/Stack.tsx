import TechIcon from "./TechIcon";
import { STACK } from "../data/stackData";

export default function Stack() {
  return (
    <section id="stack" className="px-6 py-16 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center text-white">
        Developer Stack
      </h2>

      <div className="space-y-16">
        {Object.entries(STACK).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-xl font-semibold mb-6 text-center text-gray-300">
              {category}
            </h3>

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
        ))}
      </div>
    </section>
  );
}

import TechIcon from "./TechIcon";
import jsLogo from "../assets/logos/javascript.logo.svg";
import tsLogo from "../assets/logos/typescript.logo.svg";

export default function Stack() {
  const stack = [
    { name: "TypeScript", logo: tsLogo, color: "ts" as const },
    { name: "JavaScript", logo: jsLogo, color: "js" as const },
  ];

  return (
    <section id="stack" className="px-6 py-16 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center text-white">
        Developer Stack
      </h2>

      <div className="flex flex-wrap gap-6 justify-center">
        {stack.map((item) => (
          <TechIcon
            key={item.name}
            name={item.name}
            logo={item.logo}
            color={item.color}
          />
        ))}
      </div>
    </section>
  );
}

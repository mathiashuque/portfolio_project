import TechIcon from "./TechIcon";
import jsLogo from "../assets/logos/javascript.logo.svg";
import tsLogo from "../assets/logos/typescript.logo.svg";
import htmlLogo from "../assets/logos/html5.logo.svg";
import cssLogo from "../assets/logos/css.logo.svg";
import tailwindLogo from "../assets/logos/tailwindcss.logo.svg";
import reactLogo from "../assets/logos/react.logo.svg";
import nextjsLogo from "../assets/logos/nextjs.logo.svg";
import angularLogo from "../assets/logos/angular.logo.gif";
import nodeLogo from "../assets/logos/nodejs.logo.svg";
import expressLogo from "../assets/logos/expressjs.logo.svg";
import shopifyLogo from "../assets/logos/shopify.logo.svg";
import dotnetLogo from "../assets/logos/dotnet.logo.svg";
export default function Stack() {
  const stack = [
    { name: "HTML5", logo: htmlLogo, color: "html" as const },
    { name: "CSS3", logo: cssLogo, color: "css" as const },
    { name: ".NET", logo: dotnetLogo, color: "dotnet" as const },
    { name: "JavaScript", logo: jsLogo, color: "js" as const },
    { name: "TypeScript", logo: tsLogo, color: "ts" as const },
    { name: "Tailwind", logo: tailwindLogo, color: "tailwind" as const },
    { name: "React", logo: reactLogo, color: "react" as const },
    { name: "Angular", logo: angularLogo, color: "angular" as const },
    { name: "Next.js", logo: nextjsLogo, color: "nextjs" as const },
    { name: "Node.js", logo: nodeLogo, color: "node" as const },
    { name: "Express.js", logo: expressLogo, color: "express" as const },
    
    { name: "Shopify", logo: shopifyLogo, color: "shopify" as const },
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

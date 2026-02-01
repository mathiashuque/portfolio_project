const traits = [
  "Clean Code",
  "Ux-Aware Development",
  "Responsive Design",
  "Accessibility",
  "Web Design",
  "Mobile App Design",
  "Brand Identity",
  "UI/UX",
  "Frontend Development",
  "Design Systems",
];

function Star() {
  return (
    <span className="mx-10 inline-block text-text/80 text-lg leading-none select-none">
      ✦
    </span>
  );
}

function Track({ items }: { items: string[] }) {
  return (
    <div className="flex items-center whitespace-nowrap">
      {items.map((t, i) => (
        <div key={`${t}-${i}`} className="flex items-center">
          <span className="text-xl md:text-2xl font-semibold tracking-tight">
            {t}
          </span>
          <Star />
        </div>
      ))}
    </div>
  );
}

export default function TraitsMarquee() {
  const items = [...traits, ...traits, ...traits];

  return (
    <div className="relative w-full overflow-hidden bg-bg-elev">
      <div className="py-6">
        <div className="marquee">
          <div className="marquee__inner">
            <Track items={items} />
            <Track items={items} />
          </div>
        </div>
      </div>

      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg-elev to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg-elev to-transparent" />
    </div>
  );
}

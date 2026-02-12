export default function NetworkPattern() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-25 dark:opacity-40"
      viewBox="0 0 1200 700"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0" stopColor="rgb(249 115 22)" stopOpacity="0.25" />
          <stop offset="1" stopColor="rgb(236 72 153)" stopOpacity="0.25" />
        </linearGradient>
      </defs>

      <g stroke="url(#g)" strokeWidth="1">
        <line x1="90" y1="120" x2="260" y2="70" />
        <line x1="260" y1="70" x2="390" y2="160" />
        <line x1="390" y1="160" x2="520" y2="110" />
        <line x1="520" y1="110" x2="690" y2="170" />
        <line x1="690" y1="170" x2="860" y2="95" />
        <line x1="860" y1="95" x2="1040" y2="140" />

        <line x1="140" y1="520" x2="300" y2="460" />
        <line x1="300" y1="460" x2="480" y2="520" />
        <line x1="480" y1="520" x2="650" y2="450" />
        <line x1="650" y1="450" x2="820" y2="520" />
        <line x1="820" y1="520" x2="1020" y2="470" />
      </g>

      <g fill="rgb(249 115 22)" fillOpacity="0.22">
        {[
          [90, 120],
          [260, 70],
          [390, 160],
          [520, 110],
          [690, 170],
          [860, 95],
          [1040, 140],
          [140, 520],
          [300, 460],
          [480, 520],
          [650, 450],
          [820, 520],
          [1020, 470],
        ].map(([cx, cy], idx) => (
          <circle key={idx} cx={cx} cy={cy} r="5" />
        ))}
      </g>
    </svg>
  );
}

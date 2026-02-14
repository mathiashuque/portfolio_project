export default function AboutProgress({
  activeKey,
  rotateMs,
}: {
  activeKey: string;
  rotateMs: number;
}) {
  return (
    <div className="mx-auto mt-8 h-1 w-44 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
      <div
        key={activeKey}
        className="h-full w-full origin-left bg-orange-500"
        style={{
          animation: `aboutbar ${rotateMs}ms linear`,
        }}
      />
    </div>
  );
}

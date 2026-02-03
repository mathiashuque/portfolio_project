import React, { useMemo, useRef, useState } from "react";

type BadgeVariant = "orange" | "pink" | "slate";

type Experience = {
  role: string;
  focus?: string;
  organization: string;
  organizationHref?: string;
  period: string;
  duration?: string;
  location?: string;
  modality?: string;
  description: string;
  badge?: {
    label: string;
    variant?: BadgeVariant;
    icon?: React.ReactNode;
  };
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Badge({
  label,
  variant = "slate",
  icon,
}: {
  label: string;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
}) {
  const styles =
    variant === "orange"
      ? "bg-orange-500 text-white shadow-[0_10px_30px_-18px_rgba(249,115,22,0.65)]"
      : variant === "pink"
        ? "bg-pink-500 text-white shadow-[0_10px_30px_-18px_rgba(236,72,153,0.65)]"
        : "bg-slate-700/90 text-white shadow-[0_10px_30px_-18px_rgba(15,23,42,0.60)]";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold",
        "tracking-wide",
        styles,
      )}
    >
      <span className="text-sm leading-none">{icon ?? "🎓"}</span>
      {label}
    </span>
  );
}

function ExperienceCard({ exp }: { exp: Experience }) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-3xl p-8 sm:p-10",
        "bg-[#fbf6ef] dark:bg-panel",
        "shadow-[0_24px_70px_-55px_rgba(0,0,0,0.35)] dark:shadow-[0_26px_80px_-60px_rgba(0,0,0,0.50)]",
      )}
    >
      {/* subtle corner tint */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-orange-400/10 blur-3xl dark:bg-accent/10" />
      <div className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-pink-400/10 blur-3xl dark:bg-accent/10" />

      {exp.badge && (
        <div className="absolute right-6 top-6 sm:right-8 sm:top-8">
          <Badge
            label={exp.badge.label}
            variant={exp.badge.variant}
            icon={exp.badge.icon}
          />
        </div>
      )}

      <div className="relative">
        <h3 className="text-2xl sm:text-3xl font-semibold leading-tight text-text">
          {exp.role}
          {exp.focus && <span className="text-text/80"> — {exp.focus}</span>}
        </h3>

        <div className="mt-3">
          <a
            href={exp.organizationHref ?? "#"}
            className={cn(
              "inline-flex items-center gap-2 font-semibold",
              "text-orange-500 hover:text-orange-600 transition-colors",
            )}
          >
            {exp.organization}
            <span aria-hidden className="text-lg leading-none">
              ›
            </span>
          </a>
        </div>

        <div className="mt-3 space-y-1 text-sm text-muted/90">
          <p>
            {exp.period}
            {exp.duration ? <span> · {exp.duration}</span> : null}
          </p>
          {(exp.location || exp.modality) && (
            <p className="text-muted/80">
              {exp.location ?? null}
              {exp.location && exp.modality ? <span> · </span> : null}
              {exp.modality ?? null}
            </p>
          )}
        </div>

        <p className="mt-8 leading-relaxed text-muted/95 max-w-prose">
          {exp.description}
        </p>
      </div>
    </article>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function ExperienceSection() {
  const experiences = useMemo<Experience[]>(
    () => [
      {
        role: "Professor",
        focus: "Fundamentals Of Computing",
        organization: "Universidad ORT Uruguay",
        organizationHref: "#",
        period: "July 2025 – Present",
        duration: "4 months",
        location: "Montevideo, Uruguay",
        modality: "Hybrid",
        description:
          "Teaching how to explore the deep connection between mathematics and programming, emphasizing two key perspectives. Programming as a mathematical activity, where writing code resembles defining computable functions and proving their properties; and mathematics as a source of computational models, where functions can be implemented as programs.",
        badge: { label: "Part-time", variant: "orange", icon: "🎓" },
      },
      {
        role: "Assistant Professor",
        focus: "Theory Of Computation",
        organization: "Universidad ORT Uruguay",
        organizationHref: "#",
        period: "March 2025 – August 2025",
        duration: "6 months",
        location: "Montevideo, Uruguay",
        modality: "Hybrid",
        description:
          "I guide students in understanding fundamental concepts of Theory of Computation through hands-on language implementation projects. This teaching approach fosters deep engagement with topics such as operational semantics.",
        badge: { label: "Temporary", variant: "pink", icon: "🎓" },
      },
    ],
    [],
  );

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Drag state (refs to avoid re-renders on every mouse move)
  const drag = useRef({
    down: false,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });

  const getSlides = () => {
    const el = scrollerRef.current;
    if (!el) return [];
    return Array.from(el.querySelectorAll<HTMLElement>("[data-slide]"));
  };

  const scrollToIndex = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;

    const items = getSlides();
    const target = items[index];
    if (!target) return;

    el.scrollTo({
      left: target.offsetLeft,
      behavior: "smooth",
    });
  };

  const onPrev = () => {
    const next = clamp(active - 1, 0, experiences.length - 1);
    setActive(next);
    scrollToIndex(next);
  };

  const onNext = () => {
    const next = clamp(active + 1, 0, experiences.length - 1);
    setActive(next);
    scrollToIndex(next);
  };

  // Update active index based on scroll position (good enough + stable)
  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;

    const items = getSlides();
    if (items.length === 0) return;

    const center = el.scrollLeft + el.clientWidth / 2;

    let bestIndex = 0;
    let bestDist = Infinity;

    for (let i = 0; i < items.length; i++) {
      const itemCenter = items[i].offsetLeft + items[i].offsetWidth / 2;
      const dist = Math.abs(itemCenter - center);
      if (dist < bestDist) {
        bestDist = dist;
        bestIndex = i;
      }
    }

    setActive(bestIndex);
  };

  // --- Grab to drag (mouse + touch) ---
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;

    // Only primary button
    if (e.pointerType === "mouse" && e.button !== 0) return;

    drag.current.down = true;
    drag.current.moved = false;
    drag.current.startX = e.clientX;
    drag.current.startScrollLeft = el.scrollLeft;

    setIsDragging(true);
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    if (!drag.current.down) return;

    const DRAG_GAIN = 1.8;

    const dx = e.clientX - drag.current.startX;

    if (Math.abs(dx) > 3) drag.current.moved = true;

    el.scrollLeft = drag.current.startScrollLeft - dx * DRAG_GAIN;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;

    drag.current.down = false;
    setIsDragging(false);

    // Snap to nearest slide after drag (feels “carousel-ish”)
    const items = getSlides();
    const center = el.scrollLeft + el.clientWidth / 2;

    let bestIndex = 0;
    let bestDist = Infinity;

    for (let i = 0; i < items.length; i++) {
      const itemCenter = items[i].offsetLeft + items[i].offsetWidth / 2;
      const dist = Math.abs(itemCenter - center);
      if (dist < bestDist) {
        bestDist = dist;
        bestIndex = i;
      }
    }

    setActive(bestIndex);
    scrollToIndex(bestIndex);

    try {
      el.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  // Prevent clicks on links when user was dragging
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  const canPrev = active > 0;
  const canNext = active < experiences.length - 1;

  return (
    <section
      id="experience"
      className="max-w-6xl mx-auto scroll-mt-32 h-[min(calc(100svh-80px),900px)]"
      aria-label="Experience"
    >
      <div className="mb-14 text-center">
        <p className="text-xs font-semibold tracking-[0.22em] text-faint/90">
          EXPERIENCE
        </p>

        <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-text">
          My Experience RoadMap
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-muted/90">
          Journey through academia and industry, highlighting key roles and
          contributions along the way.
        </p>
      </div>

      {/* Slider */}
      <div className="relative">
        {/* Floating side controls */}
        <button
          type="button"
          onClick={onPrev}
          disabled={!canPrev}
          aria-label="Previous experience"
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 z-10",
            "hidden md:inline-flex",
            "h-11 w-11 items-center justify-center rounded-full border",
            "border-border/15 bg-input/90 backdrop-blur",
            "text-text/80 shadow-[0_18px_60px_-45px_rgba(0,0,0,0.35)]",
            "transition-colors hover:border-accent/35",
            "disabled:opacity-35 disabled:cursor-not-allowed",
          )}
        >
          <span aria-hidden className="text-xl leading-none">
            ‹
          </span>
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          aria-label="Next experience"
          className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 z-10",
            "hidden md:inline-flex",
            "h-11 w-11 items-center justify-center rounded-full border",
            "border-border/15 bg-input/90 backdrop-blur",
            "text-text/80 shadow-[0_18px_60px_-45px_rgba(0,0,0,0.35)]",
            "transition-colors hover:border-accent/35",
            "disabled:opacity-35 disabled:cursor-not-allowed",
          )}
        >
          <span aria-hidden className="text-xl leading-none">
            ›
          </span>
        </button>

        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-bg to-transparent opacity-80" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-bg to-transparent opacity-80" />

        <div
          ref={scrollerRef}
          onScroll={onScroll}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={(e) => {
            if (drag.current.down) endDrag(e);
          }}
          onClickCapture={onClickCapture}
          className={cn(
            "flex gap-6 overflow-x-auto pb-4",
            "snap-x snap-mandatory scroll-smooth",
            // hide scrollbars (all browsers)
            "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
            // UX polish
            "select-none",
            isDragging ? "cursor-grabbing" : "cursor-grab",
          )}
          aria-label="Experience slider"
          role="region"
        >
          {experiences.map((exp, i) => (
            <div
              key={`${exp.role}-${exp.period}`}
              data-slide
              className={cn(
                "snap-start shrink-0",
                // width: show 2 cards on desktop like your screenshot
                "w-[90%] sm:w-[560px] lg:w-[640px]",
                // give room for the floating buttons on desktop
                "md:first:ml-14 md:last:mr-14",
              )}
              aria-label={`Slide ${i + 1} of ${experiences.length}`}
            >
              <ExperienceCard exp={exp} />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {experiences.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setActive(i);
                scrollToIndex(i);
              }}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-all",
                i === active
                  ? "bg-accent/70 w-6"
                  : "bg-border/25 hover:bg-border/40",
              )}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active ? "true" : "false"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

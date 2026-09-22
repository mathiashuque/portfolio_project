"use client";

import { useEffect } from "react";

const SCROLL_DURATION_MS = 900;
const TIMELINE_SCROLL_DURATION_MS = 600;
const EDGE_TOLERANCE_PX = 2;

const easeInOutCubic = (progress: number) =>
  progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

export default function SectionSnapScroll() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame: number | null = null;

    const getSections = () =>
      Array.from(
        document.querySelectorAll<HTMLElement>("main > section, footer"),
      );

    const getDocumentTop = (element: HTMLElement) => {
      let top = 0;
      let current: HTMLElement | null = element;

      while (current) {
        top += current.offsetTop;
        current = current.offsetParent as HTMLElement | null;
      }

      return top;
    };

    const getSnapTop = (section: HTMLElement) => {
      const scrollMarginTop = Number.parseFloat(
        window.getComputedStyle(section).scrollMarginTop,
      );

      return Math.min(
        Math.max(
          0,
          getDocumentTop(section) -
            (Number.isFinite(scrollMarginTop) ? scrollMarginTop : 0),
        ),
        Math.max(0, document.documentElement.scrollHeight - window.innerHeight),
      );
    };

    const getTimelineStops = (section: HTMLElement) => {
      const sectionTop = getSnapTop(section);

      return Array.from(
        section.querySelectorAll<HTMLElement>("[data-timeline-item]"),
      ).map((item) => {
        const centeredTop =
          getDocumentTop(item) - (window.innerHeight - item.offsetHeight) / 2;

        return Math.max(sectionTop, centeredTop);
      });
    };

    const stopAnimation = () => {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
      root.classList.remove(
        "section-snap-animating",
        "section-snap-free-scrolling",
      );
    };

    const animateTo = (targetTop: number, duration = SCROLL_DURATION_MS) => {
      const startTop = window.scrollY;
      const distance = targetTop - startTop;
      const startedAt = performance.now();

      root.classList.add("section-snap-animating");

      const step = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        window.scrollTo(0, startTop + distance * easeInOutCubic(progress));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(step);
          return;
        }

        animationFrame = null;
        root.classList.remove("section-snap-animating");
      };

      animationFrame = requestAnimationFrame(step);
    };

    const onWheel = (event: WheelEvent) => {
      if (
        reducedMotion.matches ||
        event.ctrlKey ||
        Math.abs(event.deltaY) <= Math.abs(event.deltaX)
      ) {
        return;
      }

      if (animationFrame !== null) {
        event.preventDefault();
        return;
      }

      const sections = getSections();
      if (sections.length < 2) return;

      const scrollTop = window.scrollY;
      const snapTops = sections.map(getSnapTop);
      let currentIndex = 0;

      for (let index = 1; index < snapTops.length; index += 1) {
        if (scrollTop >= snapTops[index] - EDGE_TOLERANCE_PX) {
          currentIndex = index;
        } else {
          break;
        }
      }

      const current = sections[currentIndex];
      const currentTop = snapTops[currentIndex];
      const scrollingDown = event.deltaY > 0;
      const isOversized =
        current.offsetHeight > window.innerHeight + EDGE_TOLERANCE_PX;
      const controlsTimeline = current.id === "experience";

      if (controlsTimeline) {
        const timelineStops = getTimelineStops(current);
        const timelineTarget = scrollingDown
          ? timelineStops.find((stop) => stop > scrollTop + EDGE_TOLERANCE_PX)
          : timelineStops.findLast(
              (stop) => stop < scrollTop - EDGE_TOLERANCE_PX,
            );

        if (timelineTarget !== undefined) {
          event.preventDefault();
          root.classList.add("section-snap-free-scrolling");
          animateTo(timelineTarget, TIMELINE_SCROLL_DURATION_MS);
          return;
        }
      }

      // Preserve regular scrolling while there is still content from an
      // oversized section to explore in the requested direction. Snap is
      // paused here so it does not pull the timeline back between wheel ticks.
      if (isOversized && !controlsTimeline) {
        const canScrollWithinSection = scrollingDown
          ? current.getBoundingClientRect().bottom >
            window.innerHeight + EDGE_TOLERANCE_PX
          : scrollTop > currentTop + EDGE_TOLERANCE_PX;

        if (canScrollWithinSection) {
          root.classList.add("section-snap-free-scrolling");
          return;
        }
      }

      root.classList.remove("section-snap-free-scrolling");

      if (!scrollingDown && scrollTop > currentTop + EDGE_TOLERANCE_PX) {
        return;
      }

      const targetIndex = currentIndex + (scrollingDown ? 1 : -1);
      if (targetIndex < 0 || targetIndex >= sections.length) return;

      event.preventDefault();
      const targetSection = sections[targetIndex];
      const targetTimelineStops = getTimelineStops(targetSection);
      const targetTop =
        !scrollingDown && targetTimelineStops.length > 0
          ? targetTimelineStops[targetTimelineStops.length - 1]
          : snapTops[targetIndex];

      if (!scrollingDown && targetTimelineStops.length > 0) {
        root.classList.add("section-snap-free-scrolling");
      }

      animateTo(targetTop);
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      stopAnimation();
    };
  }, []);

  return null;
}

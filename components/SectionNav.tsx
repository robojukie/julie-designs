"use client";

import { useEffect, useRef, useState } from "react";
import { SECTION_SCROLL, scrollToSection } from "@/lib/scroll-to-section";

export type SectionNavItem = { id: string; label: string };

const NAVBAR_HEIGHT = 60;
const SCROLL_SLACK = 24;
const HANDOFF_TRAVEL = 120;
const MIN_TRAVEL = 48;
const APPEAR_FRACTION = 0.35;
const READ_LINE_FRACTION = 0.5;

export default function SectionNav({
  items,
  label,
  numbered = false,
  appearAfterId,
}: {
  items: SectionNavItem[];
  label?: string;
  numbered?: boolean;
  appearAfterId?: string;
}) {
  const floatRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);

  const [active, setActive] = useState(items[0]?.id ?? "");

  const lockedId = useRef<string | null>(null);
  const releaseLock = useRef<() => void>(() => {});

  useEffect(() => {
    const float = floatRef.current;
    const bar = barRef.current;
    if (!float || !bar) return;

    const layout = {
      appearFrom: 0,
      runBottom: 0,
      travel: HANDOFF_TRAVEL,
      fullWidth: 0,
      naturalWidth: 0,
      sectionTops: [] as number[],
    };

    const readLayout = () => {
      const y = window.scrollY;

      // max-content is not a value CSS can interpolate toward, so the shrink's
      // target is measured here. Setting and clearing it within one frame never
      // paints.
      const styles = getComputedStyle(float);
      layout.fullWidth =
        float.clientWidth -
        parseFloat(styles.paddingLeft) -
        parseFloat(styles.paddingRight);
      bar.style.width = "max-content";
      layout.naturalWidth = bar.getBoundingClientRect().width;
      bar.style.width = "";

      const elements = items.map((item) => document.getElementById(item.id));
      layout.sectionTops = elements.map((el) =>
        el ? el.getBoundingClientRect().top + y : Number.POSITIVE_INFINITY
      );
      const first = elements[0];
      const last = elements[elements.length - 1];
      layout.runBottom = last
        ? last.getBoundingClientRect().bottom + y
        : Number.POSITIVE_INFINITY;

      const anchor = appearAfterId
        ? document.getElementById(appearAfterId)
        : null;
      const runTop = first ? first.getBoundingClientRect().top + y : 0;
      layout.appearFrom = anchor
        ? anchor.getBoundingClientRect().bottom + y
        : runTop - window.innerHeight + NAVBAR_HEIGHT;

      // Ends where clicking the first tab lands, so arriving by scroll and
      // arriving by click agree. A constant cannot: the two overlap by however
      // far the first section sits below the anchor.
      const firstLanding =
        layout.sectionTops[0] - (NAVBAR_HEIGHT + SCROLL_SLACK);
      layout.travel = Math.max(
        MIN_TRAVEL,
        Math.min(
          HANDOFF_TRAVEL,
          window.innerHeight * 0.3,
          firstLanding - (layout.appearFrom - NAVBAR_HEIGHT)
        )
      );
    };

    let activeId = "";
    let lastRaw = -1;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const y = window.scrollY;
      const travel = layout.travel;
      const clamp = (n: number) => Math.max(0, Math.min(1, n));

      const raw = Math.min(
        clamp((y + NAVBAR_HEIGHT - layout.appearFrom) / travel),
        clamp((layout.runBottom - y) / travel)
      );

      if (raw !== lastRaw) {
        lastRaw = raw;
        const appear = clamp(raw / APPEAR_FRACTION);
        const shrink = clamp((raw - APPEAR_FRACTION) / (1 - APPEAR_FRACTION));
        const width =
          layout.fullWidth +
          (layout.naturalWidth - layout.fullWidth) * shrink;
        float.style.setProperty("--sectionnav-in", String(appear));
        float.style.setProperty("--sectionnav-width", `${width}px`);
        float.toggleAttribute("data-shown", appear > 0.02);
      }

      if (lockedId.current) return;

      const line = window.innerHeight * READ_LINE_FRACTION;
      let current = items[0]?.id ?? "";
      items.forEach((item, index) => {
        if (layout.sectionTops[index] - y - line <= 1) current = item.id;
      });
      // A last section shorter than the viewport never reaches the line, so
      // without this its tab is unreachable by scrolling.
      if (y + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        current = items[items.length - 1]?.id ?? current;
      }
      if (current !== activeId) {
        activeId = current;
        setActive(current);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    let cancelled = false;

    /* Resets lastRaw and runs measure() directly rather than calling onScroll.
       The cached widths feed the capsule's width and they move without the
       scroll position moving, and onScroll drops the call whenever a frame is
       already pending — which is the state a hidden tab or a reload leaves
       behind. */
    const applyNow = () => {
      if (cancelled) return;
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      lastRaw = -1;
      readLayout();
      measure();
    };

    readLayout();
    measure();

    // Body, not window: section offsets also move when content reflows.
    const observer = new ResizeObserver(applyNow);
    observer.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", applyNow);
    window.addEventListener("load", applyNow);
    window.addEventListener("pageshow", applyNow);
    document.fonts?.ready.then(applyNow);
    return () => {
      cancelled = true;
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", applyNow);
      window.removeEventListener("load", applyNow);
      window.removeEventListener("pageshow", applyNow);
    };
  }, [items, appearAfterId]);

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    const el = document.getElementById(id);
    if (!el) return;
    event.preventDefault();

    // Set here, or the scrollspy strobes through every section passed on the
    // way to this one.
    setActive(id);
    lockedId.current = id;

    releaseLock.current();
    const release = () => {
      lockedId.current = null;
      window.clearTimeout(timer);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchstart", release);
      releaseLock.current = () => {};
    };
    // scrollToSection bails out the moment the user scrolls, so the lock has to
    // lift on real input too, not just on the timer.
    const timer = window.setTimeout(release, SECTION_SCROLL.duration * 1000 + 80);
    window.addEventListener("wheel", release, { passive: true, once: true });
    window.addEventListener("touchstart", release, { passive: true, once: true });
    releaseLock.current = release;

    scrollToSection(el, NAVBAR_HEIGHT + SCROLL_SLACK);
  };

  useEffect(() => () => releaseLock.current(), []);

  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.id === active)
  );

  return (
    <div className="sectionnav-float" ref={floatRef}>
      <nav
        className="sectionnav-floatbar"
        ref={barRef}
        aria-label={label ?? "On this page"}
      >
        <ul className="sectionnav-list">
          {items.map((item, index) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="sectionnav-tab"
                data-active={active === item.id ? "" : undefined}
                aria-current={active === item.id ? "location" : undefined}
                onClick={(event) => handleClick(event, item.id)}
              >
                {label && active === item.id && (
                  <span className="sectionnav-kicker" aria-hidden="true">
                    {label}
                  </span>
                )}
                <span className="sectionnav-tab-main">
                  {numbered && (
                    <span className="sectionnav-n" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  )}
                  {/* Clipped rather than removed below 767px, so the tab still
                      announces itself when all that shows is "02". */}
                  <span className="sectionnav-name">{item.label}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <p className="sectionnav-status" role="status">
        {label ? `${label} ` : ""}
        {activeIndex + 1} of {items.length}
      </p>
    </div>
  );
}

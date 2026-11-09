"use client";

import { useEffect, useRef } from "react";

/** F9 — soft green glow that follows the cursor. Desktop pointers only; off for reduced motion. */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const el = ref.current;
    if (!el || !fine.matches || reduce.matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(34, 197, 94, 0.06), transparent 80%)`;
        el.style.opacity = "1";
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-testid="spotlight"
      className="pointer-events-none fixed inset-0 z-0 opacity-0 transition-opacity duration-300"
    />
  );
}

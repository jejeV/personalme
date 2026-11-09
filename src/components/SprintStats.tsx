"use client";

import { useEffect, useRef, useState } from "react";
import { ui, type Localized } from "@/data/i18n";
import { profile, testCasesPerSprint } from "@/data/profile";
import { industries, projects } from "@/data/projects";
import { prefersReducedMotion, yearsSince } from "@/lib/utils";
import { useLocale } from "./Providers";

type Stat = { value: number; suffix?: string; label: Localized };

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  // Render the final number on the server so the stat is correct without JS.
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 900;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {shown}
      {suffix}
    </span>
  );
}

/** F6 — a compact strip of headline numbers under About. */
export function SprintStats() {
  const { t } = useLocale();

  const stats: Stat[] = [
    { value: yearsSince(profile.careerStart), suffix: "+", label: ui.stats.years },
    { value: projects.length, label: ui.stats.clientProjects },
    { value: industries.length, label: ui.stats.industries },
  ];
  if (testCasesPerSprint !== null) {
    stats.push({
      value: testCasesPerSprint,
      label: { en: "Test cases / sprint", id: "Test case / sprint" },
    });
  }

  return (
    <dl
      aria-label={t(ui.stats.label)}
      data-testid="sprint-stats"
      className="mt-8 grid divide-x divide-border rounded-card border border-border"
      style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}
    >
      {stats.map((stat) => (
        <div key={stat.label.en} className="flex flex-col px-3 py-4 text-center sm:px-4">
          <dt className="order-2 mt-1 font-mono text-[11px] uppercase tracking-wider text-muted">
            {t(stat.label)}
          </dt>
          <dd className="order-1 text-2xl font-bold text-text sm:text-3xl">
            <CountUp value={stat.value} suffix={stat.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

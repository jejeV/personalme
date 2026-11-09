"use client";

import { RotateCcw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { format, ui } from "@/data/i18n";
import { projects } from "@/data/projects";
import { sectionIds } from "@/lib/sections";
import { prefersReducedMotion } from "@/lib/utils";
import { useLocale } from "./Providers";

const specs = sectionIds.map((id) => `${id}.spec.ts`);
const STEP_MS = 380;

/** F1 — a mini terminal that "runs" the portfolio's test suite once on load. */
export function TestRunnerHero() {
  const { t } = useLocale();
  // `done` = number of specs that have passed; specs.length + 1 means the summary is shown.
  const [done, setDone] = useState(specs.length + 1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const run = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (prefersReducedMotion()) {
      setDone(specs.length + 1);
      return;
    }
    setDone(0);
    for (let i = 1; i <= specs.length + 1; i++) {
      timers.current.push(setTimeout(() => setDone(i), STEP_MS * i + 250));
    }
  }, []);

  useEffect(() => {
    run();
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, [run]);

  const finished = done > specs.length;

  return (
    <figure
      aria-label={t(ui.testRunner.label)}
      data-testid="test-runner"
      className="mt-8 max-w-md overflow-hidden short:mt-6 short:leading-5 tiny:hidden rounded-card border border-border bg-surface/60 font-mono text-[13px] leading-6"
    >
      <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="ml-2 text-xs text-muted">npx playwright test</span>
        </div>
        <button
          type="button"
          onClick={run}
          disabled={!finished}
          className="flex items-center gap-1 rounded px-1.5 text-xs text-muted transition-colors hover:text-accent disabled:opacity-40"
        >
          <RotateCcw className="h-3 w-3" aria-hidden="true" />
          {t(ui.testRunner.replay)}
        </button>
      </div>
      <ol className="px-3 py-2" aria-live="off">
        {specs.map((spec, i) => {
          const passed = i < done;
          const running = i === done;
          return (
            <li key={spec} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className={passed ? "text-accent" : running ? "text-text" : "text-border"}
              >
                {passed ? "✓" : running ? "›" : "○"}
              </span>
              <span className={passed ? "text-text" : "text-muted"}>{spec}</span>
              {running && <span className="text-xs text-muted">{t(ui.testRunner.running)}…</span>}
            </li>
          );
        })}
        <li
          className={`mt-1 border-t border-border pt-1 transition-opacity duration-200 ${finished ? "opacity-100" : "opacity-0"}`}
        >
          <span className="text-accent">
            {format(t(ui.testRunner.summary), { n: projects.length })}
          </span>
        </li>
      </ol>
    </figure>
  );
}

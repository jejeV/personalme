"use client";

import { Banknote, Headset, Landmark, ShieldCheck, type LucideIcon } from "lucide-react";
import { ui } from "@/data/i18n";
import { industryLabels, type Industry, type Project } from "@/data/projects";
import { formatMonth } from "@/lib/utils";
import { cardBackdropClass, cardTitleClass } from "./ExperienceCard";
import { useLocale } from "./Providers";
import { Tag } from "./Section";

/** Abstract industry icons — client systems are confidential, so no screenshots. */
export const industryIcons: Record<Industry, LucideIcon> = {
  Insurance: ShieldCheck,
  Finance: Banknote,
  Government: Landmark,
  "Contact Center": Headset,
};

export function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const { t, locale } = useLocale();
  const Icon = industryIcons[project.industry];

  return (
    <>
      <div className={cardBackdropClass} aria-hidden="true" />
      <div className="relative z-10 flex gap-4 sm:gap-6">
        <div
          aria-hidden="true"
          className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-card border border-border bg-bg text-muted transition-colors duration-200 group-hover:border-accent/40 group-hover:text-accent sm:h-14 sm:w-14"
        >
          <Icon className="h-6 w-6" strokeWidth={1.5} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-xs uppercase tracking-wide text-muted">
            {formatMonth(project.date, locale)} · {t(industryLabels[project.industry])}
          </p>
          <h3 className={`mt-1 ${cardTitleClass}`}>
            <button
              type="button"
              onClick={onOpen}
              aria-haspopup="dialog"
              className="text-left after:absolute after:-inset-4 after:rounded-card focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-accent"
            >
              {project.name}
              <span className="sr-only"> — {t(ui.projects.openCaseStudy)}</span>
            </button>
          </h3>
          <p className="mt-0.5 text-sm text-text/80">{project.client}</p>
          <p className="mt-0.5 font-mono text-xs text-muted">{t(project.role)}</p>
          <ul className="mt-3 list-none space-y-1 text-sm leading-normal">
            {project.highlights.slice(0, 3).map((h) => (
              <li key={h.en} className="flex gap-2">
                <span className="text-accent" aria-hidden="true">
                  ✓
                </span>
                {t(h)}
              </li>
            ))}
          </ul>
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tags">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

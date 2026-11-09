"use client";

import { AnimatePresence, m } from "framer-motion";
import { useMemo, useState } from "react";
import { format, ui } from "@/data/i18n";
import { industries, industryLabels, projects, type Industry, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { CaseStudyDrawer } from "./CaseStudyDrawer";
import { cardItemClass, cardListClass } from "./ExperienceCard";
import { ProjectCard } from "./ProjectCard";
import { useLocale } from "./Providers";
import { Section } from "./Section";

type Filter = Industry | "All";

export function Projects() {
  const { t } = useLocale();
  const [filter, setFilter] = useState<Filter>("All");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.industry === filter)),
    [filter],
  );
  const openProject: Project | undefined = projects.find((p) => p.slug === openSlug);

  const filters: Filter[] = ["All", ...industries];

  return (
    <Section id="projects" title={ui.nav.projects}>
      <div
        role="group"
        aria-label={t(ui.projects.filterLabel)}
        className="mb-3 flex flex-wrap gap-2"
      >
        {filters.map((f) => {
          const active = filter === f;
          const count =
            f === "All" ? projects.length : projects.filter((p) => p.industry === f).length;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              data-testid={`filter-${f}`}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-3 py-1 font-mono text-xs transition-colors duration-200",
                active
                  ? "border-accent bg-accent text-bg"
                  : "border-border text-muted hover:border-muted hover:text-text",
              )}
            >
              {f === "All" ? t(ui.projects.all) : t(industryLabels[f])}
              <span className={cn("ml-1.5", active ? "text-bg/70" : "text-muted/70")}>{count}</span>
            </button>
          );
        })}
      </div>
      <p
        className="mb-10 font-mono text-xs text-muted"
        aria-live="polite"
        data-testid="project-count"
      >
        {format(t(ui.projects.showing), { n: visible.length })}
      </p>

      <m.ul layout className={cardListClass}>
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <m.li
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(cardItemClass, "cursor-pointer lg:cursor-pointer")}
              data-testid="project-card"
            >
              <ProjectCard project={project} onOpen={() => setOpenSlug(project.slug)} />
            </m.li>
          ))}
        </AnimatePresence>
      </m.ul>

      <p className="mt-10 text-xs text-muted">{t(ui.projects.confidential)}</p>

      <CaseStudyDrawer project={openProject} onClose={() => setOpenSlug(null)} />
    </Section>
  );
}

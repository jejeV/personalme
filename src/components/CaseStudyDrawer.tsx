"use client";

import { AnimatePresence, m } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { ui } from "@/data/i18n";
import { industryLabels, type Project } from "@/data/projects";
import { formatMonth } from "@/lib/utils";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { industryIcons } from "./ProjectCard";
import { useLocale } from "./Providers";
import { Tag } from "./Section";

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-8">
      <h3 className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-text">
        <span className="text-accent">#</span> {title}
      </h3>
      {children}
    </section>
  );
}

/** F5 — side panel with the details of a client project. */
export function CaseStudyDrawer({
  project,
  onClose,
}: {
  project: Project | undefined;
  onClose: () => void;
}) {
  const { t, locale } = useLocale();
  const panelRef = useRef<HTMLDivElement>(null);
  const open = Boolean(project);

  useFocusTrap(panelRef, open, onClose);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const Icon = project ? industryIcons[project.industry] : null;
  const cs = project?.caseStudy;

  return (
    <AnimatePresence>
      {project && Icon && (
        <div className="fixed inset-0 z-50">
          <m.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <m.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            data-testid="case-study"
            className="absolute inset-y-0 right-0 flex w-full max-w-xl flex-col overflow-y-auto border-l border-border bg-bg px-6 py-8 sm:px-10"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-card border border-accent/40 text-accent">
                <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={t(ui.caseStudy.close)}
                className="rounded-card p-2 text-muted transition-colors hover:bg-surface hover:text-text"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <h2 id="case-study-title" className="mt-6 text-2xl font-bold tracking-tight text-text">
              {project.name}
            </h2>

            <Block title={t(ui.caseStudy.context)}>
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
                <dt className="font-mono text-xs uppercase text-muted">{t(ui.caseStudy.client)}</dt>
                <dd className="text-text">{project.client}</dd>
                <dt className="font-mono text-xs uppercase text-muted">
                  {t(ui.caseStudy.industry)}
                </dt>
                <dd className="text-text">{t(industryLabels[project.industry])}</dd>
                <dt className="font-mono text-xs uppercase text-muted">{t(ui.caseStudy.role)}</dt>
                <dd className="text-text">{t(project.role)}</dd>
                <dt className="font-mono text-xs uppercase text-muted">{t(ui.caseStudy.date)}</dt>
                <dd className="text-text">{formatMonth(project.date, locale)}</dd>
              </dl>
            </Block>

            {cs?.challenge && (
              <Block title={t(ui.caseStudy.challenge)}>
                <p>{t(cs.challenge)}</p>
              </Block>
            )}

            <Block title={t(ui.caseStudy.approach)}>
              <ul className="space-y-2">
                {project.highlights.map((h) => (
                  <li key={h.en} className="flex gap-2">
                    <span className="text-accent" aria-hidden="true">
                      ✓
                    </span>
                    {t(h)}
                  </li>
                ))}
              </ul>
            </Block>

            {cs?.scenarios && cs.scenarios.length > 0 && (
              <Block title={t(ui.caseStudy.scenarios)}>
                <ol className="space-y-2 rounded-card border border-border bg-surface p-4 font-mono text-xs">
                  {cs.scenarios.map((s, i) => (
                    <li key={s.en}>
                      <span className="text-muted">TC-{String(i + 1).padStart(2, "0")}</span>{" "}
                      <span className="text-text">{t(s)}</span>
                    </li>
                  ))}
                </ol>
              </Block>
            )}

            {cs?.result && (
              <Block title={t(ui.caseStudy.result)}>
                <p>{t(cs.result)}</p>
              </Block>
            )}

            <Block title={t(ui.caseStudy.stack)}>
              <ul className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </ul>
            </Block>

            <p className="mt-auto pt-10 text-xs text-muted">{t(ui.projects.confidential)}</p>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}

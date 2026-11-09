"use client";

import { ArrowUpRight } from "lucide-react";
import { experience, type Experience } from "@/data/experience";
import { ui } from "@/data/i18n";
import { profile } from "@/data/profile";
import { formatMonth } from "@/lib/utils";
import { useLocale } from "./Providers";
import { Section, Tag } from "./Section";

/** Shared hover treatment: highlight the hovered card, fade its siblings (desktop only). */
export const cardListClass = "group/list space-y-12";
export const cardItemClass =
  "group relative transition-opacity duration-200 ease-out lg:group-hover/list:opacity-50 lg:hover:opacity-100! lg:focus-within:opacity-100!";
export const cardBackdropClass =
  "absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-card border border-transparent transition-colors duration-200 ease-out lg:block lg:group-hover:border-border lg:group-hover:bg-surface";
export const cardTitleClass =
  "font-medium leading-snug text-text transition-colors duration-200 group-hover:text-accent group-focus-within:text-accent";

function ExperienceCard({ item }: { item: Experience }) {
  const { t, locale } = useLocale();
  const range = `${formatMonth(item.start, locale)} — ${item.end ? formatMonth(item.end, locale) : t(ui.present)}`;

  return (
    <li className={cardItemClass} data-testid="experience-card">
      <div className={cardBackdropClass} aria-hidden="true" />
      <div className="relative z-10 sm:grid sm:grid-cols-8 sm:gap-6">
        <p className="mb-2 mt-1 font-mono text-xs font-semibold uppercase tracking-wide text-muted sm:col-span-2">
          {range}
        </p>
        <div className="sm:col-span-6">
          <h3 className={cardTitleClass}>
            {t(item.role)} <span className="text-muted">·</span> {item.company}
          </h3>
          <p className="mt-2 text-sm leading-normal">{t(item.description)}</p>
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Technologies">
            {item.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

export function ExperienceSection() {
  const { t } = useLocale();

  return (
    <Section id="experience" title={ui.nav.experience}>
      <ol className={cardListClass}>
        {experience.map((item) => (
          <ExperienceCard key={`${item.company}-${item.start}`} item={item} />
        ))}
      </ol>
      <a
        href={profile.cvPath}
        target="_blank"
        rel="noopener"
        className="group mt-12 inline-flex items-center gap-1 font-medium text-text transition-colors hover:text-accent"
      >
        {t(ui.viewResume)}
        <ArrowUpRight
          className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </a>
    </Section>
  );
}

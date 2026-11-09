"use client";

import { ui } from "@/data/i18n";
import { skills, spokenLanguages } from "@/data/skills";
import { useLocale } from "./Providers";
import { Section } from "./Section";

export function SkillBadge({ name }: { name: string }) {
  return (
    <li className="rounded-card border border-border px-3 py-1.5 font-mono text-xs text-text transition-colors duration-200 hover:border-accent/60 hover:text-accent">
      {name}
    </li>
  );
}

export function Skills() {
  const { t } = useLocale();

  return (
    <Section id="skills" title={ui.nav.skills}>
      <div className="space-y-8">
        {skills.map((group) => (
          <div key={group.title.en}>
            <h3 className="mb-3 text-sm font-medium text-text">{t(group.title)}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <SkillBadge key={item} name={item} />
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h3 className="mb-3 text-sm font-medium text-text">{t(ui.languages)}</h3>
          <ul className="space-y-1 text-sm">
            {spokenLanguages.map((lang) => (
              <li key={lang.name.en}>
                <span className="text-text">{t(lang.name)}</span>
                <span className="text-muted"> — {t(lang.level)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

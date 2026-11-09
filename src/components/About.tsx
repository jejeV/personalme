"use client";

import { ui } from "@/data/i18n";
import { about, currentlyLearning } from "@/data/profile";
import { useLocale } from "./Providers";
import { Section } from "./Section";
import { SprintStats } from "./SprintStats";

export function About() {
  const { t } = useLocale();

  return (
    <Section id="about" title={ui.nav.about}>
      <div className="space-y-4">
        {about.map((paragraph) => (
          <p key={paragraph.en}>{t(paragraph)}</p>
        ))}
        {currentlyLearning && (
          <p className="font-mono text-sm">
            <span className="text-accent">›</span> {t(currentlyLearning)}
          </p>
        )}
      </div>
      <SprintStats />
    </Section>
  );
}

"use client";

import { Award, GraduationCap } from "lucide-react";
import { certifications, education } from "@/data/certifications";
import { ui } from "@/data/i18n";
import { formatMonth } from "@/lib/utils";
import { useLocale } from "./Providers";
import { Section } from "./Section";

export function Certifications() {
  const { t, locale } = useLocale();

  return (
    <Section id="certifications" title={ui.nav.certifications}>
      <ul className="divide-y divide-border border-y border-border">
        {certifications.map((cert) => (
          <li key={cert.name} className="flex items-start gap-3 py-4">
            <Award className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4">
              {cert.url ? (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-text hover:text-accent"
                >
                  {cert.name}
                </a>
              ) : (
                <span className="text-text">{cert.name}</span>
              )}
              <span className="font-mono text-xs text-muted">{formatMonth(cert.date, locale)}</span>
            </div>
          </li>
        ))}
      </ul>

      <h3 className="mb-3 mt-10 text-sm font-medium text-text">{t(ui.education)}</h3>
      <ul className="divide-y divide-border border-y border-border">
        {education.map((edu) => (
          <li key={edu.school} className="flex items-start gap-3 py-4">
            <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4">
              <div>
                <p className="text-text">{edu.school}</p>
                <p className="text-sm">{t(edu.program)}</p>
              </div>
              <span className="font-mono text-xs text-muted">{edu.period}</span>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

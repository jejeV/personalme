"use client";

import { ui } from "@/data/i18n";
import { scrollToSection, sectionIds, sections } from "@/lib/sections";
import { useActiveSection } from "@/lib/useActiveSection";
import { cn } from "@/lib/utils";
import { useLocale } from "./Providers";

export function Nav() {
  const { t } = useLocale();
  const active = useActiveSection(sectionIds);

  return (
    <nav aria-label={t(ui.mainNav)} className="hidden lg:block">
      <ul className="mt-12 border-l border-border short:mt-6">
        {sections.map((section, i) => {
          const isActive = active === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "location" : undefined}
                data-active={isActive}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(section.id);
                }}
                className={cn(
                  "group -ml-px flex items-center gap-3 border-l-2 py-1.5 pl-4 font-mono text-xs uppercase tracking-widest transition-colors duration-200",
                  isActive
                    ? "border-accent text-text"
                    : "border-transparent text-muted hover:border-muted hover:text-text",
                )}
              >
                <span className={cn("text-[11px]", isActive ? "text-accent" : "text-muted/70")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {t(section.label)}
                <span
                  aria-hidden="true"
                  className={cn(
                    "text-accent transition-opacity duration-200",
                    isActive ? "opacity-100" : "opacity-0",
                  )}
                >
                  ✓
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

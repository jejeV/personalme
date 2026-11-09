"use client";

import { Command, Download, Languages, Mail, MapPin } from "lucide-react";
import { ui } from "@/data/i18n";
import { profile } from "@/data/profile";
import { useCopyEmail } from "@/lib/useCopyEmail";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";
import { OPEN_PALETTE_EVENT } from "./CommandPalette";
import { Nav } from "./Nav";
import { useLocale } from "./Providers";
import { TestRunnerHero } from "./TestRunnerHero";

const iconLink =
  "flex h-9 w-9 items-center justify-center rounded-card text-muted transition-colors duration-200 hover:bg-surface hover:text-accent";

export function Sidebar() {
  const { t, locale, toggleLocale } = useLocale();
  const copyEmail = useCopyEmail();

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[45%] lg:flex-col lg:justify-between lg:overflow-hidden lg:py-20 short:py-10 tiny:py-8">
      <div>
        <h1 className="text-[44px] font-bold leading-[1.05] tracking-tight text-text sm:text-5xl lg:text-[52px]">
          {profile.name}
        </h1>
        <p className="mt-3 text-lg font-medium text-text sm:text-xl">{t(profile.headline)}</p>
        <p className="mt-4 max-w-sm leading-normal">{t(profile.tagline)}</p>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          {profile.openToWork && (
            <span
              data-testid="open-to-work"
              className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 font-mono text-xs text-accent"
            >
              <span className="pulse-dot h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              {t(ui.openToWork)}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 text-muted">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {t(profile.location)}
          </span>
        </div>

        <TestRunnerHero />
        <Nav />
      </div>

      <div className="mt-8 lg:mt-10 short:mt-6">
        <ul aria-label={t(ui.socialLinks)} className="flex items-center gap-1">
          <li>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn (opens in a new tab)"
              className={iconLink}
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
          </li>
          {profile.github && (
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub (opens in a new tab)"
                className={iconLink}
              >
                <GitHubIcon className="h-5 w-5" />
              </a>
            </li>
          )}
          <li>
            <button
              type="button"
              onClick={copyEmail}
              data-testid="copy-email"
              title={profile.email}
              aria-label={`${t(ui.copyEmail)}: ${profile.email}`}
              className={iconLink}
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
            </button>
          </li>
          <li className="ml-2">
            <a
              href={profile.cvPath}
              download
              data-testid="download-cv"
              className="inline-flex items-center gap-2 rounded-card border border-accent/50 bg-accent-soft px-4 py-2 text-sm font-medium text-accent transition-colors duration-200 hover:bg-accent hover:text-bg"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              {t(ui.downloadCv)}
            </a>
          </li>
        </ul>

        <div className="mt-5 flex items-center gap-4 font-mono text-xs">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
            className="hidden items-center gap-1.5 text-muted transition-colors hover:text-text md:inline-flex"
          >
            <kbd className="inline-flex items-center gap-0.5 rounded border border-border px-1.5 py-0.5 text-text">
              <Command className="h-3 w-3" aria-hidden="true" />K
            </kbd>
            {t(ui.palette.hint)}
          </button>
          <button
            type="button"
            onClick={toggleLocale}
            data-testid="lang-toggle"
            aria-label={t(ui.switchLanguage)}
            className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-text"
          >
            <Languages className="h-3.5 w-3.5" aria-hidden="true" />
            <span className={locale === "en" ? "text-accent" : undefined}>EN</span>
            <span aria-hidden="true">/</span>
            <span className={locale === "id" ? "text-accent" : undefined}>ID</span>
          </button>
        </div>
      </div>
    </header>
  );
}

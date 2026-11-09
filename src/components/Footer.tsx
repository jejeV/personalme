"use client";

import { ui } from "@/data/i18n";
import { profile } from "@/data/profile";
import { useLocale } from "./Providers";

/** F2 — status of this repo's E2E workflow on GitHub Actions. */
function LiveTestBadge() {
  const { t } = useLocale();
  const repo = profile.githubRepo;

  if (!repo) {
    // No repo configured yet: show a neutral label rather than a fake "passing" status.
    return (
      <span
        data-testid="live-test-badge"
        className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-xs"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-muted" aria-hidden="true" />
        {t(ui.footer.e2e)}: Playwright
      </span>
    );
  }

  const workflowUrl = `https://github.com/${repo}/actions/workflows/${profile.e2eWorkflowFile}`;
  return (
    <a
      href={workflowUrl}
      target="_blank"
      rel="noreferrer noopener"
      data-testid="live-test-badge"
      className="inline-flex items-center"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${workflowUrl}/badge.svg?branch=main`}
        alt={`${t(ui.footer.e2e)} status`}
        height={20}
        className="h-5 w-auto"
      />
    </a>
  );
}

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="flex flex-col gap-4 pb-16 text-sm sm:flex-row sm:items-center sm:justify-between sm:pb-0">
      <p className="max-w-sm">{t(ui.footer.builtBy)}</p>
      <LiveTestBadge />
    </footer>
  );
}

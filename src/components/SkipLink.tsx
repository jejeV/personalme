"use client";

import { ui } from "@/data/i18n";
import { useLocale } from "./Providers";

export function SkipLink() {
  const { t } = useLocale();
  return (
    <a
      href="#content"
      className="fixed left-4 top-4 z-[70] -translate-y-20 rounded-card bg-accent px-4 py-2 text-sm font-semibold text-bg transition-transform focus:translate-y-0"
    >
      {t(ui.skipToContent)}
    </a>
  );
}

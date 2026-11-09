"use client";

import type { ReactNode } from "react";
import type { Localized } from "@/data/i18n";
import { useLocale } from "./Providers";

export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: Localized;
  children: ReactNode;
}) {
  const { t } = useLocale();
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="mb-16 scroll-mt-16 outline-none md:mb-24 lg:mb-32 lg:scroll-mt-24"
    >
      {/* Sticky label on mobile; a quiet static label on desktop. */}
      <div className="sticky top-0 z-20 -mx-6 mb-4 bg-bg/80 px-6 py-4 backdrop-blur md:-mx-12 md:px-12 lg:static lg:mx-0 lg:mb-6 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none">
        <h2
          id={headingId}
          className="flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-widest text-text"
        >
          <span className="text-accent" aria-hidden="true">
            #
          </span>
          {t(title)}
        </h2>
      </div>
      {children}
    </section>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-full bg-accent-soft px-3 py-1 font-mono text-xs font-medium leading-5 text-accent">
      {children}
    </li>
  );
}

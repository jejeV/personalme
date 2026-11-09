"use client";

import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, Download, Languages, Mail, Search, type LucideIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ui } from "@/data/i18n";
import { profile } from "@/data/profile";
import { scrollToSection, sections } from "@/lib/sections";
import { useCopyEmail } from "@/lib/useCopyEmail";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { cn } from "@/lib/utils";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";
import { useLocale } from "./Providers";

export const OPEN_PALETTE_EVENT = "open-command-palette";

type Item = {
  id: string;
  group: "nav" | "actions";
  label: string;
  icon: LucideIcon | typeof LinkedInIcon;
  run: () => void;
};

/** F3 — Ctrl/⌘ + K command palette. */
export function CommandPalette() {
  const { t, toggleLocale } = useLocale();
  const copyEmail = useCopyEmail();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);
  useFocusTrap(panelRef, open, close);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setIndex(0);
    }
  }, [open]);

  const items = useMemo<Item[]>(() => {
    const nav: Item[] = sections.map((s) => ({
      id: `nav-${s.id}`,
      group: "nav",
      label: `${t(ui.palette.goTo)} ${t(s.label)}`,
      icon: ArrowRight,
      run: () => scrollToSection(s.id),
    }));
    const actions: Item[] = [
      {
        id: "copy-email",
        group: "actions",
        label: t(ui.palette.copyEmail),
        icon: Mail,
        run: copyEmail,
      },
      {
        id: "linkedin",
        group: "actions",
        label: t(ui.palette.openLinkedIn),
        icon: LinkedInIcon,
        run: () => window.open(profile.linkedin, "_blank", "noopener,noreferrer"),
      },
      ...(profile.github
        ? [
            {
              id: "github",
              group: "actions" as const,
              label: t(ui.palette.openGitHub),
              icon: GitHubIcon,
              run: () => window.open(profile.github!, "_blank", "noopener,noreferrer"),
            },
          ]
        : []),
      {
        id: "cv",
        group: "actions",
        label: t(ui.palette.downloadCv),
        icon: Download,
        run: () => {
          const a = document.createElement("a");
          a.href = profile.cvPath;
          a.download = "";
          a.click();
        },
      },
      {
        id: "lang",
        group: "actions",
        label: t(ui.palette.toggleLang),
        icon: Languages,
        run: toggleLocale,
      },
    ];
    return [...nav, ...actions];
  }, [t, copyEmail, toggleLocale]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((i) => i.label.toLowerCase().includes(q)) : items;
  }, [items, query]);

  const select = (item: Item | undefined) => {
    if (!item) return;
    setOpen(false);
    // Let the dialog close (and restore focus) before running the action.
    requestAnimationFrame(() => item.run());
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      select(filtered[index]);
    }
  };

  const groups: { key: Item["group"]; label: string }[] = [
    { key: "nav", label: t(ui.palette.groupNav) },
    { key: "actions", label: t(ui.palette.groupActions) },
  ];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[55] flex items-start justify-center px-4 pt-[15vh]">
          <m.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={close}
            aria-hidden="true"
          />
          <m.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={t(ui.palette.title)}
            data-testid="command-palette"
            className="relative w-full max-w-lg overflow-hidden rounded-card border border-border bg-surface shadow-2xl shadow-black"
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="h-4 w-4 text-muted" aria-hidden="true" />
              <input
                data-autofocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIndex(0);
                }}
                onKeyDown={onInputKey}
                placeholder={t(ui.palette.placeholder)}
                aria-label={t(ui.palette.placeholder)}
                aria-controls="palette-list"
                aria-activedescendant={
                  filtered[index] ? `palette-${filtered[index].id}` : undefined
                }
                role="combobox"
                aria-expanded="true"
                className="h-12 flex-1 bg-transparent text-sm text-text placeholder:text-muted focus:outline-none"
              />
              <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted">
                ESC
              </kbd>
            </div>
            <ul id="palette-list" role="listbox" className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-muted">{t(ui.palette.empty)}</li>
              )}
              {groups.map((g) => {
                const groupItems = filtered.filter((i) => i.group === g.key);
                if (groupItems.length === 0) return null;
                return (
                  <li key={g.key} role="presentation">
                    <p className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-widest text-muted">
                      {g.label}
                    </p>
                    <ul role="presentation">
                      {groupItems.map((item) => {
                        const i = filtered.indexOf(item);
                        const Icon = item.icon;
                        return (
                          <li
                            key={item.id}
                            id={`palette-${item.id}`}
                            role="option"
                            aria-selected={i === index}
                            onMouseMove={() => setIndex(i)}
                            onClick={() => select(item)}
                            className={cn(
                              "flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm",
                              i === index ? "bg-accent-soft text-accent" : "text-text",
                            )}
                          >
                            <Icon className="h-4 w-4" aria-hidden="true" />
                            {item.label}
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}

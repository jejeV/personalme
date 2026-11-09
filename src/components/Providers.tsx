"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { defaultLocale, locales, type Locale, type Localized } from "@/data/i18n";

const STORAGE_KEY = "locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (value: Localized) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside <Providers>");
  return ctx;
}

type ToastContextValue = { show: (message: string) => void };
const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <Providers>");
  return ctx;
}

const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

export function Providers({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && (locales as readonly string[]).includes(saved)) {
        setLocaleState(saved as Locale);
      }
    } catch {
      // Storage unavailable (private mode etc.) — keep the default language.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    // Lets E2E tests know the page is interactive.
    document.documentElement.dataset.hydrated = "true";
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const show = useCallback((message: string) => {
    clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), message });
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const localeValue = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      toggleLocale: () => setLocale(locale === "en" ? "id" : "en"),
      t: (value) => value[locale],
    }),
    [locale, setLocale],
  );

  const toastValue = useMemo(() => ({ show }), [show]);

  return (
    <LocaleContext.Provider value={localeValue}>
      <ToastContext.Provider value={toastValue}>
        <MotionConfig reducedMotion="user">
          <LazyMotion features={loadFeatures} strict>
            {children}
          </LazyMotion>
        </MotionConfig>
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4"
        >
          {toast && (
            <div
              key={toast.id}
              data-testid="toast"
              className="rounded-card border border-border bg-surface px-4 py-2 font-mono text-sm text-text shadow-lg shadow-black/50"
            >
              {toast.message}
            </div>
          )}
        </div>
      </ToastContext.Provider>
    </LocaleContext.Provider>
  );
}

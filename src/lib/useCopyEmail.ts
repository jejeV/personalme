"use client";

import { useCallback } from "react";
import { useLocale, useToast } from "@/components/Providers";
import { ui } from "@/data/i18n";
import { profile } from "@/data/profile";
import { copyToClipboard } from "./utils";

export function useCopyEmail() {
  const { t } = useLocale();
  const { show } = useToast();

  return useCallback(async () => {
    const ok = await copyToClipboard(profile.email);
    show(ok ? t(ui.copied) : `${t(ui.copyFailed)}${profile.email}`);
  }, [show, t]);
}

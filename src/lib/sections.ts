import { ui } from "@/data/i18n";

export const sections = [
  { id: "about", label: ui.nav.about },
  { id: "experience", label: ui.nav.experience },
  { id: "projects", label: ui.nav.projects },
  { id: "skills", label: ui.nav.skills },
  { id: "certifications", label: ui.nav.certifications },
] as const;

export const sectionIds = sections.map((s) => s.id);

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
  // Move focus for keyboard/screen-reader users without scrolling again.
  el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

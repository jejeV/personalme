export const locales = ["en", "id"] as const;
export type Locale = (typeof locales)[number];

/** A piece of content in both languages. English is the default. */
export type Localized = Record<Locale, string>;

export const defaultLocale: Locale = "en";

/** UI strings that are not tied to a specific data entry. */
export const ui = {
  skipToContent: { en: "Skip to content", id: "Langsung ke konten" },
  openToWork: { en: "Open to opportunities", id: "Terbuka untuk peluang" },
  downloadCv: { en: "Download CV", id: "Unduh CV" },
  viewResume: { en: "View full résumé", id: "Lihat CV lengkap" },
  present: { en: "Present", id: "Sekarang" },
  nav: {
    about: { en: "About", id: "Tentang" },
    experience: { en: "Experience", id: "Pengalaman" },
    projects: { en: "Projects", id: "Proyek" },
    skills: { en: "Skills", id: "Keahlian" },
    certifications: { en: "Certifications", id: "Sertifikasi" },
  },
  mainNav: { en: "Main navigation", id: "Navigasi utama" },
  socialLinks: { en: "Social links", id: "Tautan sosial" },
  copyEmail: { en: "Copy email address", id: "Salin alamat email" },
  copied: { en: "Copied ✓", id: "Tersalin ✓" },
  copyFailed: { en: "Couldn't copy — email: ", id: "Gagal menyalin — email: " },
  language: { en: "Language", id: "Bahasa" },
  switchLanguage: { en: "Ganti ke Bahasa Indonesia", id: "Switch to English" },
  palette: {
    hint: { en: "to open command palette", id: "untuk membuka command palette" },
    title: { en: "Command palette", id: "Command palette" },
    placeholder: { en: "Type a command or search…", id: "Ketik perintah atau cari…" },
    empty: { en: "No results.", id: "Tidak ada hasil." },
    goTo: { en: "Go to", id: "Buka" },
    copyEmail: { en: "Copy email", id: "Salin email" },
    openLinkedIn: { en: "Open LinkedIn", id: "Buka LinkedIn" },
    openGitHub: { en: "Open GitHub", id: "Buka GitHub" },
    downloadCv: { en: "Download CV", id: "Unduh CV" },
    toggleLang: { en: "Switch to Bahasa Indonesia", id: "Ganti ke English" },
    groupNav: { en: "Navigation", id: "Navigasi" },
    groupActions: { en: "Actions", id: "Aksi" },
  },
  testRunner: {
    label: { en: "Portfolio test run", id: "Hasil tes portfolio" },
    replay: { en: "Replay", id: "Ulangi" },
    running: { en: "Running", id: "Menjalankan" },
    summary: {
      en: "{n} projects · 0 critical bugs · PASSED",
      id: "{n} proyek · 0 bug kritis · PASSED",
    },
  },
  projects: {
    filterLabel: { en: "Filter projects by industry", id: "Filter proyek berdasarkan industri" },
    all: { en: "All", id: "Semua" },
    showing: { en: "Showing {n} projects", id: "Menampilkan {n} proyek" },
    openCaseStudy: { en: "Open case study", id: "Buka studi kasus" },
    confidential: {
      en: "Client systems are confidential — no screenshots are shown.",
      id: "Sistem klien bersifat rahasia — tidak ada screenshot yang ditampilkan.",
    },
  },
  caseStudy: {
    close: { en: "Close case study", id: "Tutup studi kasus" },
    context: { en: "Context", id: "Konteks" },
    challenge: { en: "Challenge", id: "Tantangan" },
    approach: { en: "Testing approach", id: "Pendekatan testing" },
    scenarios: { en: "Sample scenarios (anonymised)", id: "Contoh skenario (disamarkan)" },
    result: { en: "Result", id: "Hasil" },
    client: { en: "Client", id: "Klien" },
    industry: { en: "Industry", id: "Industri" },
    role: { en: "Role", id: "Peran" },
    date: { en: "Date", id: "Tanggal" },
    stack: { en: "Tools & testing types", id: "Tools & jenis testing" },
  },
  stats: {
    label: { en: "Sprint stats", id: "Statistik sprint" },
    years: { en: "Years in QA", id: "Tahun di QA" },
    clientProjects: { en: "Client projects", id: "Proyek klien" },
    industries: { en: "Industries", id: "Industri" },
  },
  education: { en: "Education", id: "Pendidikan" },
  languages: { en: "Languages", id: "Bahasa" },
  footer: {
    builtBy: {
      en: "Designed & built by Samuel Jason Rain. Tested with Playwright.",
      id: "Didesain & dibangun oleh Samuel Jason Rain. Dites dengan Playwright.",
    },
    e2e: { en: "E2E tests", id: "Tes E2E" },
  },
} satisfies Record<string, unknown>;

/** Replace `{key}` placeholders in a translated string. */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
}

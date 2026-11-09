import type { Localized } from "./i18n";

export const profile = {
  name: "Samuel Jason Rain",
  headline: {
    en: "QA Engineer & Scrum Master",
    id: "QA Engineer & Scrum Master",
  } satisfies Localized,
  tagline: {
    en: "I make sure enterprise software ships with confidence: automated tests, clear sprints, zero surprises.",
    id: "Saya memastikan software enterprise rilis dengan percaya diri: tes otomatis, sprint yang jelas, tanpa kejutan.",
  } satisfies Localized,
  location: {
    en: "Depok, West Java, Indonesia",
    id: "Depok, Jawa Barat, Indonesia",
  } satisfies Localized,
  /** Toggle the pulsing "Open to opportunities" chip in the sidebar. */
  openToWork: true,
  email: "muejason27@gmail.com",
  linkedin: "https://www.linkedin.com/in/samuel-jason-rain",
  /** [TODO: URL] e.g. "https://github.com/<username>". Leave null to hide the link. */
  github: null as string | null,
  /** PDF served from /public. Replace the file to update the CV. */
  cvPath: "/cv-samuel-jason-rain.pdf",
  /**
   * [TODO] "owner/repo" of this portfolio on GitHub. When set, the footer shows the live
   * GitHub Actions badge for the E2E workflow (F2).
   */
  githubRepo: null as string | null,
  e2eWorkflowFile: "e2e.yml",
  /** Year the QA career started, used for the "years of experience" stat. */
  careerStart: "2023-08-01",
  /**
   * [TODO] Public URL after deploying (e.g. your Vercel domain). Used for SEO, sitemap and
   * the Open Graph image. Can also be set with NEXT_PUBLIC_SITE_URL.
   */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const about: Localized[] = [
  {
    en: "QA Engineer at PT Ciptadra Softindo since August 2023, testing contact center and CRM systems for insurance, finance, and public-sector clients. Since January 2025 also serving as the team's Scrum Master.",
    id: "QA Engineer di PT Ciptadra Softindo sejak Agustus 2023, menguji sistem contact center dan CRM untuk klien asuransi, keuangan, dan sektor publik. Sejak Januari 2025 juga menjabat sebagai Scrum Master tim.",
  },
  {
    en: "Day to day: designing test plans, building automated suites with Playwright and Katalon Studio, and facilitating Scrum events so the team ships predictably.",
    id: "Sehari-hari: merancang test plan, membangun automated test suite dengan Playwright dan Katalon Studio, serta memfasilitasi Scrum event agar tim rilis secara terprediksi.",
  },
  {
    en: "Background in software engineering (SMK Taruna Bhakti) and backend development (PHP, Node.js); currently studying Information Systems at Universitas Bina Sarana Informatika.",
    id: "Berlatar belakang rekayasa perangkat lunak (SMK Taruna Bhakti) dan backend development (PHP, Node.js); saat ini menempuh studi Sistem Informasi di Universitas Bina Sarana Informatika.",
  },
];

/** [TODO] Optional "Currently learning…" line. Leave null to hide it. */
export const currentlyLearning: Localized | null = null;

/**
 * [TODO: angka asli] Test cases written per sprint. Leave null to hide the stat
 * instead of showing a made-up number.
 */
export const testCasesPerSprint: number | null = null;

import type { Localized } from "./i18n";

export const industries = ["Insurance", "Finance", "Government", "Contact Center"] as const;
export type Industry = (typeof industries)[number];

export const industryLabels: Record<Industry, Localized> = {
  Insurance: { en: "Insurance", id: "Asuransi" },
  Finance: { en: "Finance", id: "Keuangan" },
  Government: { en: "Government", id: "Pemerintahan" },
  "Contact Center": { en: "Contact Center", id: "Contact Center" },
};

export type Project = {
  slug: string;
  /** ISO month, e.g. "2026-09". */
  date: string;
  name: string;
  client: string;
  industry: Industry;
  role: Localized;
  highlights: Localized[];
  tags: string[];
  /**
   * Optional case-study details for the drawer (F5). [TODO] — fill these in yourself;
   * sections that are left empty are simply not rendered.
   */
  caseStudy?: {
    challenge?: Localized;
    scenarios?: Localized[];
    result?: Localized;
  };
};

const qaRole: Localized = { en: "Implementator – QA Engineer", id: "Implementator – QA Engineer" };

/** Client implementations, newest first. */
export const projects: Project[] = [
  {
    slug: "ciputra-life-nbuw",
    date: "2026-09",
    name: "Enhancement Contact Center Ciputra Life NBUW",
    client: "PT Asuransi Ciputra Indonesia",
    industry: "Insurance",
    role: qaRole,
    highlights: [
      { en: "Automated regression testing", id: "Automation regression testing" },
      {
        en: "Validated call disposition and Next Action logic",
        id: "Validasi call disposition dan logika Next Action",
      },
      { en: "Tested the outbound call workflow", id: "Pengujian alur outbound call" },
      { en: "UAT support with the client", id: "Pendampingan UAT bersama klien" },
    ],
    tags: ["Playwright", "Katalon", "UAT"],
  },
  {
    slug: "tipidkor-polri",
    date: "2026-06",
    name: "Tipidkor Polri",
    client: "Kakortas Tipidkor Polri",
    industry: "Government",
    role: qaRole,
    highlights: [
      {
        en: "Tested document OCR and field mapping",
        id: "Pengujian OCR dokumen dan field mapping",
      },
      { en: "Verified the disposition workflow", id: "Verifikasi alur disposisi" },
      { en: "Role-based access control testing", id: "Pengujian role-based access control" },
      {
        en: "Electronic signature (TTE) testing",
        id: "Pengujian tanda tangan elektronik (TTE)",
      },
    ],
    tags: ["Katalon", "OCR", "RBAC"],
  },
  {
    slug: "atmi-contact-center",
    date: "2026-02",
    name: "Contact Center ATMi",
    client: "PT Abadi Tambah Mulia Internasional",
    industry: "Contact Center",
    role: qaRole,
    highlights: [
      {
        en: "Derived the test plan and scenarios from business processes",
        id: "Menyusun test plan dan skenario dari proses bisnis",
      },
      {
        en: "Functional, integration, regression and UAT testing",
        id: "Functional, integration, regression, dan UAT testing",
      },
    ],
    tags: ["Functional", "Regression"],
  },
  {
    slug: "mandiri-tunas-finance",
    date: "2024-08",
    name: "Contact Center Mandiri Tunas Finance",
    client: "PT Mandiri Tunas Finance",
    industry: "Finance",
    role: qaRole,
    highlights: [
      {
        en: "End-to-end quality assurance of the contact center system",
        id: "Quality assurance sistem contact center secara end-to-end",
      },
    ],
    tags: ["Functional", "UAT"],
  },
  {
    slug: "tob-insurance",
    date: "2024-08",
    name: "Contact Center TOB Insurance",
    client: "PT Asuransi Total Bersama",
    industry: "Insurance",
    role: qaRole,
    highlights: [
      {
        en: "Identified and resolved critical bugs",
        id: "Identifikasi dan resolusi bug kritis",
      },
      { en: "Business process optimisation", id: "Optimasi proses bisnis" },
    ],
    tags: ["Regression", "Bug Tracking"],
  },
  {
    slug: "ciputra-life",
    date: "2023-10",
    name: "Enhancement Contact Center Ciputra Life",
    client: "PT Asuransi Ciputra Indonesia",
    industry: "Insurance",
    role: qaRole,
    highlights: [
      {
        en: "Test strategy for the contact center enhancement",
        id: "Strategi testing untuk enhancement contact center",
      },
    ],
    tags: ["Test Strategy"],
  },
  // [TODO] Add 1–2 personal projects here (e.g. a Playwright framework repo).
];

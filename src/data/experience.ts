import type { Localized } from "./i18n";

export type Experience = {
  /** ISO month, e.g. "2025-01". `end: null` means "Present". */
  start: string;
  end: string | null;
  role: Localized;
  company: string;
  url?: string;
  description: Localized;
  tags: string[];
};

export const experience: Experience[] = [
  {
    start: "2025-01",
    end: null,
    role: { en: "Scrum Master", id: "Scrum Master" },
    company: "PT Ciptadra Softindo",
    description: {
      en: "Facilitate Sprint Planning, Daily Scrum, Sprint Review and Retrospective. Work with the Product Owner to prioritise the backlog, and track velocity, burndown and cycle time to keep delivery predictable.",
      id: "Memfasilitasi Sprint Planning, Daily Scrum, Sprint Review, dan Retrospective. Bekerja sama dengan Product Owner memprioritaskan backlog, serta melacak velocity, burndown, dan cycle time agar delivery tetap terprediksi.",
    },
    tags: ["Scrum", "Jira", "Agile Metrics"],
  },
  {
    start: "2023-08",
    end: null,
    role: { en: "QA Engineer", id: "QA Engineer" },
    company: "PT Ciptadra Softindo",
    description: {
      en: "Write test plans and test cases for the Onebox CRM platform. Build test automation with Katalon Studio and Playwright, and track defects in Jira through to resolution.",
      id: "Menyusun test plan dan test case untuk platform Onebox CRM. Membangun test automation dengan Katalon Studio dan Playwright, serta melacak defect di Jira hingga terselesaikan.",
    },
    tags: ["Playwright", "Katalon", "Jira", "Postman"],
  },
  {
    start: "2022-08",
    end: "2023-02",
    role: { en: "Backend Developer Intern", id: "Backend Developer Intern" },
    company: "PT Integrasi Jaringan Ekosistem",
    description: {
      en: "Built backend components in PHP and Node.js and designed MySQL databases. Worked on performance optimisation and debugging.",
      id: "Membangun komponen backend dengan PHP dan Node.js serta mendesain database MySQL. Mengerjakan optimasi performa dan debugging.",
    },
    tags: ["PHP", "Node.js", "MySQL"],
  },
];

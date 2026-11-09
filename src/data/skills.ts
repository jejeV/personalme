import type { Localized } from "./i18n";

export type SkillGroup = {
  title: Localized;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    title: { en: "Testing", id: "Testing" },
    items: [
      "Test Planning",
      "Test Case Design",
      "Functional",
      "Integration",
      "Regression",
      "UAT",
      "Web Testing",
      "Mobile Testing",
      "RBAC Testing",
    ],
  },
  {
    title: { en: "Automation & Tools", id: "Automation & Tools" },
    items: ["Playwright", "Katalon Studio", "Postman", "Jira", "Notion", "VS Code"],
  },
  {
    title: { en: "Agile", id: "Agile" },
    items: [
      "Scrum",
      "Sprint Facilitation",
      "Backlog Prioritization",
      "Velocity / Burndown / Cycle Time",
    ],
  },
  {
    title: { en: "Programming", id: "Pemrograman" },
    items: ["JavaScript", "Python", "PHP", "HTML", "CSS", "Node.js", "React", "MySQL", "MongoDB"],
  },
];

export const spokenLanguages: { name: Localized; level: Localized }[] = [
  {
    name: { en: "Indonesian", id: "Bahasa Indonesia" },
    level: { en: "Native", id: "Bahasa ibu" },
  },
  {
    name: { en: "English", id: "Bahasa Inggris" },
    level: { en: "Professional working", id: "Profesional" },
  },
];

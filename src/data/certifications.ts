import type { Localized } from "./i18n";

export type Certification = {
  name: string;
  /** ISO month, e.g. "2024-04". */
  date: string;
  /** [TODO] Optional credential URL. */
  url?: string;
};

export const certifications: Certification[] = [
  { name: "AWS Academy Cloud Developing", date: "2024-04" },
  { name: "Google Data Analytics", date: "2023-09" },
  { name: "Information Technology Specialist – Database", date: "2023-07" },
];

export type Education = {
  school: string;
  program: Localized;
  period: string;
};

export const education: Education[] = [
  {
    school: "Universitas Bina Sarana Informatika",
    program: { en: "B.Sc. Information Systems", id: "S1 Sistem Informasi" },
    period: "2023 – 2027",
  },
  {
    school: "SMK Taruna Bhakti",
    program: { en: "Software Engineering", id: "Rekayasa Perangkat Lunak" },
    period: "2020 – 2023",
  },
];

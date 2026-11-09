# Portfolio — Samuel Jason Rain

One-page portfolio for a QA Engineer & Scrum Master. Next.js (App Router, static export) +
TypeScript + Tailwind CSS v4 + Framer Motion, tested end-to-end with Playwright.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script           | What it does                                              |
| ---------------- | --------------------------------------------------------- |
| `npm run dev`    | Dev server with hot reload                                |
| `npm run build`  | Static export to `out/`                                   |
| `npm start`      | Serve `out/` on http://localhost:4173                     |
| `npm test`       | Playwright E2E on Chromium, Firefox, WebKit (build first) |
| `npm run verify` | Lint + type-check + build + tests — run before pushing    |
| `npm run format` | Prettier                                                  |

First time running tests: `npx playwright install`.

## Editing content

All text lives in `src/data/` — components never hard-code content.

| File                | Content                                                      |
| ------------------- | ------------------------------------------------------------ |
| `profile.ts`        | Name, headline, tagline, links, "Open to work" toggle, About |
| `experience.ts`     | Experience cards                                             |
| `projects.ts`       | Client projects + optional case-study details                |
| `skills.ts`         | Skill groups & spoken languages                              |
| `certifications.ts` | Certifications & education                                   |
| `i18n.ts`           | UI labels (buttons, headings) in EN / ID                     |

Every translatable string is an object `{ en: "...", id: "..." }`. Add both languages.

To replace the CV, overwrite `public/cv-samuel-jason-rain.pdf`.

### Open TODOs (intentionally left blank — not invented)

- `profile.ts` → `github` (profile URL), `githubRepo` (`"owner/repo"`, turns on the live
  E2E badge in the footer), `siteUrl` (production domain), `currentlyLearning`,
  `testCasesPerSprint` (the stat is hidden until you set a real number).
- `projects.ts` → `caseStudy.challenge / scenarios / result` per project (drawer sections are
  hidden while empty), and 1–2 personal projects.
- Testimonials (F12) and the Bug Hunt easter egg (F10) are not built yet ("Could" priority).

## Deploying to Vercel

1. Push this folder to a new GitHub repository.
2. On [vercel.com](https://vercel.com) → **Add New… → Project** → import the repo. The
   framework preset (Next.js) is detected automatically; no settings needed.
3. Add an environment variable `NEXT_PUBLIC_SITE_URL` = your production URL
   (e.g. `https://your-name.vercel.app`) so Open Graph, sitemap and canonical URLs are correct.
4. Set `profile.githubRepo` to `"<owner>/<repo>"` to show the live test badge.
5. Optional analytics: enable **Vercel Web Analytics** in the project dashboard and add
   `@vercel/analytics` (`<Analytics />` in `src/app/layout.tsx`). It is cookieless.

Every push runs `.github/workflows/e2e.yml` (lint, type-check, build, Playwright on three
browsers). The HTML report is uploaded as a workflow artifact.

## Features

| #   | Feature                       | Where                            |
| --- | ----------------------------- | -------------------------------- |
| F1  | Test Runner Hero              | `components/TestRunnerHero.tsx`  |
| F2  | Live Test Badge               | `components/Footer.tsx`          |
| F3  | Command palette (Ctrl/⌘ + K)  | `components/CommandPalette.tsx`  |
| F4  | Project filter by industry    | `components/Projects.tsx`        |
| F5  | Case study drawer             | `components/CaseStudyDrawer.tsx` |
| F6  | Sprint stats strip            | `components/SprintStats.tsx`     |
| F7  | EN / ID toggle (localStorage) | `components/Providers.tsx`       |
| F8  | Copy email + toast            | `lib/useCopyEmail.ts`            |
| F9  | Cursor spotlight              | `components/Spotlight.tsx`       |
| F11 | Dynamic OG image              | `app/opengraph-image.tsx`        |

Accessibility: skip link, visible focus ring, focus-trapped dialogs, `prefers-reduced-motion`
respected (spotlight off, test runner and count-ups render their final state).

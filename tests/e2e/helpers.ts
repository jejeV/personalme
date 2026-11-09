import { expect, type Page } from "@playwright/test";

/** Open the home page and wait until React has hydrated it. */
export async function gotoHome(page: Page) {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true", { timeout: 15_000 });
}

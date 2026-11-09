import { expect, test } from "@playwright/test";
import { gotoHome } from "./helpers";

for (const width of [375, 768, 1024, 1440]) {
  test(`no horizontal scroll at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await gotoHome(page);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test.describe("mobile (375px)", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("sidebar becomes a normal header and nav is hidden", async ({ page }) => {
    await gotoHome(page);
    await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeHidden();

    const name = page.getByRole("heading", { level: 1 });
    await page.mouse.wheel(0, 1500);
    await expect(name).not.toBeInViewport();
  });

  test("section titles stick to the top while scrolling", async ({ page }) => {
    await gotoHome(page);
    await page.locator("#experience").scrollIntoViewIfNeeded();
    await page.mouse.wheel(0, 300);
    const heading = page.getByRole("heading", { name: "Experience", level: 2 });
    await expect.poll(async () => (await heading.boundingBox())?.y ?? -1).toBeLessThan(40);
    await expect.poll(async () => (await heading.boundingBox())?.y ?? -1).toBeGreaterThanOrEqual(0);
  });
});

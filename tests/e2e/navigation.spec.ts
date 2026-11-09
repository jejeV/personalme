import { expect, test } from "@playwright/test";
import { gotoHome } from "./helpers";

test.describe("layout & navigation (desktop)", () => {
  test("sidebar stays fixed while the content scrolls", async ({ page }) => {
    await gotoHome(page);
    const name = page.getByRole("heading", { level: 1, name: "Samuel Jason Rain" });
    const before = await name.boundingBox();
    await page.mouse.wheel(0, 2000);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(500);
    const after = await name.boundingBox();
    expect(after?.y).toBeCloseTo(before!.y, 0);
  });

  test("nav marks the visible section and smooth-scrolls on click", async ({ page }) => {
    await gotoHome(page);
    const nav = page.getByRole("navigation", { name: "Main navigation" });
    await expect(nav.getByRole("link", { name: /About/ })).toHaveAttribute(
      "aria-current",
      "location",
    );

    await nav.getByRole("link", { name: /Projects/ }).click();
    await expect(page.locator("#projects")).toBeInViewport();
    await expect(nav.getByRole("link", { name: /Projects/ })).toHaveAttribute(
      "aria-current",
      "location",
    );
    await expect(nav.getByRole("link", { name: /About/ })).not.toHaveAttribute("aria-current");
  });

  test("hovering a card highlights it and fades its siblings", async ({ page }) => {
    await gotoHome(page);
    const cards = page.getByTestId("experience-card");
    await cards.first().hover();
    await expect(cards.nth(1)).toHaveCSS("opacity", "0.5");
    await expect(cards.first()).toHaveCSS("opacity", "1");
  });

  test("skip link moves focus to the main content", async ({ page }) => {
    await gotoHome(page);
    // Tab-to-link behaviour differs per browser/OS (Safari skips links by default), so assert
    // the skip link is first in tab order, then activate it from the keyboard.
    const firstFocusable = await page.evaluate(
      () =>
        document.querySelector<HTMLElement>(
          'a[href], button, input, [tabindex]:not([tabindex="-1"])',
        )?.textContent,
    );
    expect(firstFocusable).toBe("Skip to content");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await skip.focus();
    await expect(skip).toBeInViewport();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#content$/);
  });

  test("has SEO metadata and JSON-LD Person", async ({ page }) => {
    await gotoHome(page);
    await expect(page).toHaveTitle(/Samuel Jason Rain/);
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
    const ld = await page.locator('script[type="application/ld+json"]').textContent();
    expect(JSON.parse(ld!)["@type"]).toBe("Person");
  });
});

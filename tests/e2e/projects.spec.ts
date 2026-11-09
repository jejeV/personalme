import { expect, test } from "@playwright/test";
import { gotoHome } from "./helpers";

const expected: Record<string, number> = {
  All: 6,
  Insurance: 3,
  Finance: 1,
  Government: 1,
  "Contact Center": 1,
};

test.describe("projects", () => {
  test("industry filter shows the right number of cards", async ({ page }) => {
    await gotoHome(page);
    const cards = page.getByTestId("project-card");
    await expect(cards).toHaveCount(6);

    for (const [industry, count] of Object.entries(expected)) {
      await page.getByTestId(`filter-${industry}`).click();
      await expect(page.getByTestId(`filter-${industry}`)).toHaveAttribute("aria-pressed", "true");
      await expect(cards).toHaveCount(count);
      await expect(page.getByTestId("project-count")).toHaveText(`Showing ${count} projects`);
    }
  });

  test("clicking a project opens the case study drawer; Esc closes it", async ({ page }) => {
    await gotoHome(page);
    await page.getByRole("button", { name: /Tipidkor Polri/ }).click();
    const drawer = page.getByRole("dialog", { name: "Tipidkor Polri" });
    await expect(drawer).toBeVisible();
    await expect(drawer).toContainText("Kakortas Tipidkor Polri");
    await expect(drawer).toContainText("Role-based access control testing");
    await page.keyboard.press("Escape");
    await expect(drawer).toBeHidden();
  });
});

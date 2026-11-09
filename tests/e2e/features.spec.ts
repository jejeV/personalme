import { expect, test } from "@playwright/test";
import { gotoHome } from "./helpers";

test.describe("interactive features", () => {
  test("clicking email copies the address and shows a toast", async ({
    page,
    browserName,
    context,
  }) => {
    if (browserName === "chromium") {
      await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    }
    await gotoHome(page);
    await page.getByTestId("copy-email").click();
    await expect(page.getByTestId("toast")).toHaveText("Copied ✓");
    if (browserName === "chromium") {
      expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
        "muejason27@gmail.com",
      );
    }
  });

  test("Download CV serves a valid PDF", async ({ page, request }) => {
    await gotoHome(page);
    const link = page.getByTestId("download-cv");
    await expect(link).toHaveAttribute("download", "");
    const href = await link.getAttribute("href");
    const res = await request.get(href!);
    expect(res.ok()).toBeTruthy();
    const body = await res.body();
    expect(body.subarray(0, 5).toString()).toBe("%PDF-");
  });

  test("command palette opens with Ctrl/⌘+K, runs a command and closes with Esc", async ({
    page,
  }) => {
    await gotoHome(page);
    await page.keyboard.press("ControlOrMeta+k");
    const palette = page.getByTestId("command-palette");
    await expect(palette).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(palette).toBeHidden();

    await page.keyboard.press("ControlOrMeta+k");
    await page.getByRole("combobox").fill("skills");
    await page.keyboard.press("Enter");
    await expect(palette).toBeHidden();
    await expect(page.locator("#skills")).toBeInViewport();
  });

  test("language toggle switches content and persists after reload", async ({ page }) => {
    await gotoHome(page);
    await expect(page.getByRole("heading", { name: "Experience", level: 2 })).toBeVisible();
    await page.getByTestId("lang-toggle").click();
    await expect(page.getByRole("heading", { name: "Pengalaman", level: 2 })).toBeVisible();
    await expect(page.getByTestId("download-cv")).toHaveText("Unduh CV");
    await expect(page.locator("html")).toHaveAttribute("lang", "id");

    await page.reload();
    await expect(page.getByRole("heading", { name: "Pengalaman", level: 2 })).toBeVisible();
    await page.getByTestId("lang-toggle").click();
    await expect(page.getByRole("heading", { name: "Experience", level: 2 })).toBeVisible();
  });

  test("test runner hero finishes with PASSED and can be replayed", async ({ page }) => {
    await gotoHome(page);
    const runner = page.getByTestId("test-runner");
    await expect(runner).toContainText("6 projects · 0 critical bugs · PASSED");
    const replay = runner.getByRole("button", { name: "Replay" });
    await expect(replay).toBeEnabled({ timeout: 5000 });
    await replay.click();
    await expect(replay).toBeDisabled();
    await expect(replay).toBeEnabled({ timeout: 5000 });
  });

  test("live test badge is rendered in the footer", async ({ page }) => {
    await gotoHome(page);
    await expect(page.locator("footer").getByTestId("live-test-badge")).toBeVisible();
  });
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("non-essential animation is disabled", async ({ page }) => {
    await gotoHome(page);
    const replay = page.getByTestId("test-runner").getByRole("button", { name: "Replay" });
    // With reduced motion the runner shows its final state immediately.
    await replay.click();
    await expect(replay).toBeEnabled();
    await expect(page.getByTestId("test-runner")).toContainText("PASSED");

    await page.mouse.move(400, 400);
    await page.mouse.move(600, 500);
    await expect(page.getByTestId("spotlight")).toHaveCSS("opacity", "0");
  });
});

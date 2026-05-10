import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows site name in nav", async ({ page }) => {
    await expect(page.getByText("The Hanging Bouquet")).toBeVisible();
  });

  test("Builder tab is active by default", async ({ page }) => {
    const builderTab = page.getByRole("button", { name: "Builder" });
    await expect(builderTab).toHaveClass(/active/);
  });

  test("switches to Library tab", async ({ page }) => {
    await page.getByRole("button", { name: "Library" }).click();
    await expect(page.getByRole("heading", { name: "Flower Library" })).toBeVisible();
  });

  test("switching back to Builder from Library shows homepage", async ({ page }) => {
    await page.getByRole("button", { name: "Library" }).click();
    await page.getByRole("button", { name: "Builder" }).click();
    await expect(page.getByText("Zones 9–10")).toBeVisible();
  });
});

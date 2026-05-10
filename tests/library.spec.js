import { test, expect } from "@playwright/test";

test.describe("Library", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Library" }).click();
  });

  test("shows Flower Library heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Flower Library" })).toBeVisible();
  });

  test("shows total flower count in subtitle", async ({ page }) => {
    await expect(page.locator(".library-sub")).toContainText(/flowers/i);
  });

  test("renders flower cards", async ({ page }) => {
    const cards = page.locator(".lib-card");
    expect(await cards.count()).toBeGreaterThan(0);
  });

  test("search by name filters results", async ({ page }) => {
    await page.locator(".library-search").fill("Zinnia");
    const cards = page.locator(".lib-card");
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    // All visible cards should contain Zinnia
    for (let i = 0; i < count; i++) {
      const name = await cards.nth(i).locator(".lib-card-name").textContent();
      expect(name.toLowerCase()).toContain("zinnia");
    }
  });

  test("search by latin name filters results", async ({ page }) => {
    await page.locator(".library-search").fill("Tagetes");
    const cards = page.locator(".lib-card");
    expect(await cards.count()).toBeGreaterThan(0);
    const latin = await cards.first().locator(".lib-card-latin").textContent();
    expect(latin.toLowerCase()).toContain("tagetes");
  });

  test("search with no match shows 0 flowers", async ({ page }) => {
    await page.locator(".library-search").fill("xyznotaflower");
    await expect(page.locator(".library-count")).toContainText("0 flowers");
  });

  test("season filter narrows results", async ({ page }) => {
    const totalBefore = await page.locator(".lib-card").count();

    await page.locator(".filter-select").nth(0).selectOption("spring");
    const afterSpring = await page.locator(".lib-card").count();
    expect(afterSpring).toBeLessThanOrEqual(totalBefore);
  });

  test("zone filter for 9-10 shows correct count", async ({ page }) => {
    await page.locator(".filter-select").nth(1).selectOption("9-10");
    const count = await page.locator(".lib-card").count();
    // 31 flowers are zone 9-10 compatible
    expect(count).toBe(31);
  });

  test("role filter Thriller shows only upright flowers", async ({ page }) => {
    await page.locator(".filter-select").nth(2).selectOption("upright");
    const cards = page.locator(".lib-card");
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const badge = await cards.nth(i).locator(".role-badge").textContent();
      expect(badge).toBe("Thriller");
    }
  });

  test("role filter Filler shows only mounder flowers", async ({ page }) => {
    await page.locator(".filter-select").nth(2).selectOption("mounder");
    const cards = page.locator(".lib-card");
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const badge = await cards.nth(i).locator(".role-badge").textContent();
      expect(badge).toBe("Filler");
    }
  });

  test("role filter Spiller shows only trailer flowers", async ({ page }) => {
    await page.locator(".filter-select").nth(2).selectOption("trailer");
    const cards = page.locator(".lib-card");
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const badge = await cards.nth(i).locator(".role-badge").textContent();
      expect(badge).toBe("Spiller");
    }
  });

  test("filters can be combined", async ({ page }) => {
    await page.locator(".filter-select").nth(1).selectOption("9-10");
    await page.locator(".filter-select").nth(0).selectOption("autumn");
    await page.locator(".filter-select").nth(2).selectOption("upright");

    const count = await page.locator(".lib-card").count();
    // Should be a meaningful subset
    expect(count).toBeGreaterThan(0);
    await expect(page.locator(".library-count")).toContainText(`${count} flowers`);
  });

  test("clearing search restores full results", async ({ page }) => {
    const totalBefore = await page.locator(".lib-card").count();

    await page.locator(".library-search").fill("Zinnia");
    await page.locator(".library-search").fill("");

    const totalAfter = await page.locator(".lib-card").count();
    expect(totalAfter).toBe(totalBefore);
  });

  test("each card shows name, latin, role badge, and description", async ({ page }) => {
    const card = page.locator(".lib-card").first();
    await expect(card.locator(".lib-card-name")).toBeVisible();
    await expect(card.locator(".lib-card-latin")).toBeVisible();
    await expect(card.locator(".role-badge")).toBeVisible();
    await expect(card.locator(".lib-card-desc")).toBeVisible();
  });

  test("each card shows weeks to bloom", async ({ page }) => {
    const card = page.locator(".lib-card").first();
    await expect(card.locator(".lib-card-weeks")).toContainText(/wks/i);
  });
});

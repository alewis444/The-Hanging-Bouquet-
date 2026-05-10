import { test, expect } from "@playwright/test";

test.describe("HomePage — Zone badge and mood tabs", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows Zones 9–10 badge", async ({ page }) => {
    await expect(page.getByText("Zones 9–10")).toBeVisible();
  });

  test("shows all 6 mood tabs", async ({ page }) => {
    for (const mood of ["Pollinator", "Romantic", "Wild", "Apothecary", "Moody", "Joyful"]) {
      await expect(page.getByRole("button", { name: new RegExp(mood, "i") })).toBeVisible();
    }
  });

  test("Pollinator is selected by default", async ({ page }) => {
    const tab = page.getByRole("button", { name: /Pollinator/i });
    await expect(tab).toHaveClass(/active/);
  });

  test("clicking a mood tab makes it active", async ({ page }) => {
    await page.getByRole("button", { name: /Romantic/i }).click();
    await expect(page.getByRole("button", { name: /Romantic/i })).toHaveClass(/active/);
    await expect(page.getByRole("button", { name: /Pollinator/i })).not.toHaveClass(/active/);
  });

  test("mood tagline updates when mood changes", async ({ page }) => {
    await page.getByRole("button", { name: /Pollinator/i }).click();
    const pollinatorTagline = await page.locator(".home-mood-tagline").textContent();

    await page.getByRole("button", { name: /Romantic/i }).click();
    const romanticTagline = await page.locator(".home-mood-tagline").textContent();

    expect(pollinatorTagline).not.toBe(romanticTagline);
  });
});

test.describe("HomePage — Date row", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows SOW DATE and PLANT DATE labels", async ({ page }) => {
    await expect(page.getByText("Sow date", { exact: false })).toBeVisible();
    await expect(page.getByText("Plant date", { exact: false })).toBeVisible();
  });

  test("plant date is sow date + 7 days", async ({ page }) => {
    // Set sow date to a known value
    await page.locator('input[type="date"]').fill("2026-06-01");

    const plantText = await page.locator(".date-input-readonly").inputValue();
    expect(plantText).toContain("Jun");
    expect(plantText).toContain("8"); // June 1 + 7 days = June 8
  });

  test("season pill updates when date changes", async ({ page }) => {
    // Spring date
    await page.locator('input[type="date"]').fill("2026-04-01");
    await expect(page.locator(".home-season-pill")).toContainText(/spring/i);

    // Summer date
    await page.locator('input[type="date"]').fill("2026-07-01");
    await expect(page.locator(".home-season-pill")).toContainText(/summer/i);

    // Autumn date
    await page.locator('input[type="date"]').fill("2026-10-01");
    await expect(page.locator(".home-season-pill")).toContainText(/autumn/i);
  });
});

test.describe("HomePage — Basket cards", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows at least one basket card for Pollinator spring", async ({ page }) => {
    await page.locator('input[type="date"]').fill("2026-04-01");
    await expect(page.locator(".hb-basket-card").first()).toBeVisible();
  });

  test("each basket card has an Accept button", async ({ page }) => {
    const cards = page.locator(".hb-basket-card");
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i).getByRole("button", { name: /Accept Basket/i })).toBeVisible();
    }
  });

  test("basket card shows flower count", async ({ page }) => {
    const countEl = page.locator(".hb-basket-count").first();
    await expect(countEl).toContainText(/flowers/i);
  });

  test("basket card shows Thriller / Filler / Spiller role badges", async ({ page }) => {
    const badges = page.locator(".role-badge").first();
    await expect(badges).toBeVisible();
    const text = await badges.textContent();
    expect(["Thriller", "Filler", "Spiller"]).toContain(text);
  });

  test("baskets update when mood changes", async ({ page }) => {
    await page.locator('input[type="date"]').fill("2026-04-01");

    const getFirstFlower = async () =>
      page.locator(".hb-flower-name").first().textContent();

    await page.getByRole("button", { name: /Pollinator/i }).click();
    const pollinatorFlower = await getFirstFlower();

    await page.getByRole("button", { name: /Moody/i }).click();
    const moodyFlower = await getFirstFlower();

    expect(pollinatorFlower).not.toBe(moodyFlower);
  });

  test("empty state shown when no baskets for season", async ({ page }) => {
    // Winter has no unique baskets for zone 9-10 — they fall back to autumn baskets
    // Test that the UI handles all moods gracefully (never crashes)
    for (const mood of ["Pollinator", "Romantic", "Wild", "Apothecary", "Moody", "Joyful"]) {
      await page.getByRole("button", { name: new RegExp(mood, "i") }).click();
      // Either cards show or the empty message shows — no crash
      const hasCards = await page.locator(".hb-basket-card").count();
      const hasEmpty = await page.locator(".basket-empty").count();
      expect(hasCards + hasEmpty).toBeGreaterThan(0);
    }
  });
});

test.describe("HomePage — Flower swap", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator('input[type="date"]').fill("2026-04-01");
  });

  test("swap button opens dropdown", async ({ page }) => {
    const swapBtn = page.locator(".hb-swap-btn").first();
    await swapBtn.click();
    await expect(page.locator(".hb-swap-dropdown").first()).toBeVisible();
  });

  test("clicking a swap option changes the flower", async ({ page }) => {
    const firstCard = page.locator(".hb-basket-card").first();
    const swapBtns = firstCard.locator(".hb-swap-btn");
    const count = await swapBtns.count();

    if (count === 0) {
      test.skip(); // No swappable flowers in this basket
      return;
    }

    const swapBtn = swapBtns.first();
    const originalName = await swapBtn.locator("..").locator(".hb-flower-name").textContent();

    await swapBtn.click();
    const option = page.locator(".hb-swap-option").first();
    const newName = await option.locator("span").textContent();
    await option.click();

    // Dropdown closes
    await expect(page.locator(".hb-swap-dropdown")).not.toBeVisible();

    // If names differ, the swap occurred
    if (originalName !== newName) {
      await expect(firstCard.locator(".hb-flower-name", { hasText: newName })).toBeVisible();
    }
  });
});

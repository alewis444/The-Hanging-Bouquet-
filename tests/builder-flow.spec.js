import { test, expect } from "@playwright/test";

// Helper: accept the first basket on the homepage
async function acceptFirstBasket(page) {
  await page.goto("/");
  await page.locator('input[type="date"]').fill("2026-04-01");
  await page.locator(".hb-accept-btn").first().click();
}

test.describe("Builder flow — Grow Schedule step", () => {
  test.beforeEach(async ({ page }) => {
    await acceptFirstBasket(page);
  });

  test("shows Your Grow Schedule heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /Your Grow Schedule/i })).toBeVisible();
  });

  test("shows mood, zone, and sow date in subtitle", async ({ page }) => {
    const sub = page.locator(".step-sub");
    await expect(sub).toContainText(/Zones 9–10/i);
    await expect(sub).toContainText(/Apr/i);
  });

  test("shows frost banner", async ({ page }) => {
    await expect(page.locator(".frost-banner")).toBeVisible();
  });

  test("shows a schedule card for each flower", async ({ page }) => {
    const cards = page.locator(".schedule-card");
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("each schedule card shows Plant and Bloom dates", async ({ page }) => {
    const card = page.locator(".schedule-card").first();
    await expect(card.locator(".schedule-date-label", { hasText: "Plant" })).toBeVisible();
    await expect(card.locator(".schedule-date-label", { hasText: "Bloom" })).toBeVisible();
  });

  test("each schedule card shows care facts (sun, water, indoor)", async ({ page }) => {
    const card = page.locator(".schedule-card").first();
    const facts = card.locator(".care-fact");
    expect(await facts.count()).toBeGreaterThanOrEqual(2);
  });

  test("Download PDF button is present", async ({ page }) => {
    await expect(page.getByRole("button", { name: /Download PDF/i })).toBeVisible();
  });

  test("Finish button advances to Congratulations", async ({ page }) => {
    await page.getByRole("button", { name: /Finish/i }).click();
    await expect(page.getByRole("heading", { name: /Congratulations/i })).toBeVisible();
  });

  test("Back button returns to homepage", async ({ page }) => {
    await page.getByRole("button", { name: /← Back/i }).click();
    await expect(page.getByText("Zones 9–10")).toBeVisible();
  });
});

test.describe("Builder flow — Congratulations step", () => {
  test.beforeEach(async ({ page }) => {
    await acceptFirstBasket(page);
    await page.getByRole("button", { name: /Finish/i }).click();
  });

  test("shows Congratulations heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /Congratulations/i })).toBeVisible();
  });

  test("shows flower count", async ({ page }) => {
    await expect(page.locator(".congrats-body")).toContainText(/flowers/i);
  });

  test("shows sow date, plant date, and full bloom date", async ({ page }) => {
    await expect(page.getByText("Your sow date")).toBeVisible();
    await expect(page.getByText("Actual plant date")).toBeVisible();
    await expect(page.locator(".congrats-date-label", { hasText: "Full bloom by" })).toBeVisible();
  });

  test("shows flower chips", async ({ page }) => {
    const chips = page.locator(".congrats-flower-chip");
    expect(await chips.count()).toBeGreaterThan(0);
  });

  test("Build Another Basket restarts to homepage", async ({ page }) => {
    await page.getByRole("button", { name: /Build Another Basket/i }).click();
    await expect(page.getByText("Zones 9–10")).toBeVisible();
  });

  test("Builder tab nav also restarts", async ({ page }) => {
    await page.getByRole("button", { name: "Builder" }).click();
    await expect(page.getByText("Zones 9–10")).toBeVisible();
  });
});

test.describe("Builder flow — full end-to-end per mood", () => {
  const moods = ["Pollinator", "Romantic", "Wild", "Apothecary", "Moody", "Joyful"];

  for (const mood of moods) {
    test(`completes full flow for ${mood} mood`, async ({ page }) => {
      await page.goto("/");
      await page.locator('input[type="date"]').fill("2026-04-01");
      await page.getByRole("button", { name: new RegExp(mood, "i") }).click();

      // Accept first basket
      await page.locator(".hb-accept-btn").first().click();
      await expect(page.getByRole("heading", { name: /Your Grow Schedule/i })).toBeVisible();

      // Advance to congratulations
      await page.getByRole("button", { name: /Finish/i }).click();
      await expect(page.getByRole("heading", { name: /Congratulations/i })).toBeVisible();

      // Restart
      await page.getByRole("button", { name: /Build Another Basket/i }).click();
      await expect(page.getByText("Zones 9–10")).toBeVisible();
    });
  }
});

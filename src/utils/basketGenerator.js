import { flowers } from "../data/flowers";
import { getSeason } from "./scheduleCalc";

// Winter: flowers available in both spring AND autumn (they bridge winter)
// or flowers with indoor zones
function isAvailableInWinter(flower, zone) {
  const isIndoor = zone.startsWith("indoor");
  if (isIndoor) {
    return (
      flower.zones.includes(zone) &&
      (flower.seasons.includes("spring") || flower.seasons.includes("autumn"))
    );
  }
  // Outdoor winter only viable in zones 8, 9-10
  if (zone !== "8" && zone !== "9-10") return false;
  return (
    flower.zones.includes(zone) &&
    flower.seasons.includes("spring") &&
    flower.seasons.includes("autumn")
  );
}

// Filter flowers available for a given zone + season
function getAvailableFlowers(zone, season, mood) {
  return flowers.filter((f) => {
    const zoneMatch = f.zones.includes(zone);
    const moodMatch = f.moods.includes(mood);
    let seasonMatch;
    if (season === "winter") {
      seasonMatch = isAvailableInWinter(f, zone);
    } else {
      seasonMatch = f.seasons.includes(season);
    }
    return zoneMatch && seasonMatch && moodMatch;
  });
}

// Shuffle array (Fisher-Yates)
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Pick one item from array by index offset (for deterministic variety)
function pickByOffset(arr, offset) {
  if (!arr.length) return null;
  return arr[offset % arr.length];
}

// Build a basket: 1 upright + 1–2 mounders + 2 trailers = 5 flowers
function buildBasket(uprights, mounders, trailers, offset) {
  const upright = pickByOffset(uprights, offset);
  const mounder1 = pickByOffset(mounders, offset);
  const mounder2 = mounders.length > 1 ? pickByOffset(mounders, offset + 1) : null;
  const trailer1 = pickByOffset(trailers, offset);
  const trailer2 = trailers.length > 1 ? pickByOffset(trailers, offset + 1) : null;

  const picks = [upright, mounder1, mounder2, trailer1, trailer2].filter(Boolean);
  // Deduplicate
  const seen = new Set();
  const deduped = picks.filter((f) => {
    if (!f || seen.has(f.id)) return false;
    seen.add(f.id);
    return true;
  });

  // Need at least 5 unique flowers
  if (deduped.length < 3) return null;
  return deduped;
}

// Generate 2–3 basket suggestions for a mood + zone + bloom date
export function generateBaskets(mood, zone, bloomDate) {
  const season = getSeason(new Date(bloomDate + "T12:00:00"));
  const available = getAvailableFlowers(zone, season, mood);

  const uprights = shuffle(available.filter((f) => f.role === "upright"));
  const mounders = shuffle(available.filter((f) => f.role === "mounder"));
  const trailers = shuffle(available.filter((f) => f.role === "trailer"));

  const baskets = [];
  const usedIds = new Set();

  for (let i = 0; i < 3; i++) {
    const basket = buildBasket(
      uprights.filter((f) => !usedIds.has(f.id)),
      mounders.filter((f) => !usedIds.has(f.id)),
      trailers.filter((f) => !usedIds.has(f.id)),
      i
    );
    if (basket && basket.length >= 3) {
      basket.forEach((f) => usedIds.add(f.id));
      baskets.push(basket);
    }
  }

  return baskets;
}

// Get backup flowers for a given role/mood/zone/season that aren't in the current basket
export function getBackups(currentBasket, mood, zone, bloomDate) {
  const season = getSeason(new Date(bloomDate + "T12:00:00"));
  const available = getAvailableFlowers(zone, season, mood);
  const currentIds = new Set(currentBasket.map((f) => f.id));
  return available.filter((f) => !currentIds.has(f.id));
}

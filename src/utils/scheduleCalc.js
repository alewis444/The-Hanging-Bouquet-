import { LAST_FROST } from "../data/flowers";

// Add weeks to a Date object
export function addWeeks(date, weeks) {
  const result = new Date(date);
  result.setDate(result.getDate() + weeks * 7);
  return result;
}

// Add days to a Date object
export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// Format a Date as "Month D, YYYY"
export function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// Format a Date as short "Mon D"
export function formatShortDate(date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// Derive bloom season from a Date
export function getSeason(date) {
  const month = date.getMonth(); // 0-indexed
  if (month >= 2 && month <= 4) return "spring";  // Mar–May
  if (month >= 5 && month <= 7) return "summer";  // Jun–Aug
  if (month >= 8 && month <= 10) return "autumn"; // Sep–Nov
  return "winter";                                  // Dec–Feb
}

// Given a user-entered sow date string and zone,
// return the actual sow date (+ 7-day shipping buffer)
export function getActualSowDate(sowDateString) {
  const base = new Date(sowDateString + "T12:00:00"); // noon to avoid timezone issues
  return addDays(base, 7);
}

// For a flower + actual sow date, return the expected bloom date
export function getBloomDate(flower, actualSowDate) {
  return addWeeks(actualSowDate, flower.weeksToBloom);
}

// Determine if a flower needs to start indoors given zone + actual sow date
export function needsIndoorStart(flower, zone, actualSowDate) {
  const frost = LAST_FROST[zone];
  if (!frost) return false; // indoor zones — already inside
  if (flower.type === "plug") return false; // plugs are purchased, not started from seed

  const frostDate = new Date(actualSowDate.getFullYear(), frost.month, frost.day);
  return actualSowDate < frostDate;
}

// Build the full schedule for a basket (array of flowers)
export function buildSchedule(flowers, sowDateString, zone) {
  const actualSowDate = getActualSowDate(sowDateString);
  return flowers.map((flower) => {
    const bloomDate = getBloomDate(flower, actualSowDate);
    const indoorStart = needsIndoorStart(flower, zone, actualSowDate);
    return {
      flower,
      actualSowDate,
      bloomDate,
      indoorStart,
      weeksToBloom: flower.weeksToBloom,
    };
  });
}

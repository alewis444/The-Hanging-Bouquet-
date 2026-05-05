import { LAST_FROST } from "../data/flowers";

export function addWeeks(date, weeks) {
  const result = new Date(date);
  result.setDate(result.getDate() + weeks * 7);
  return result;
}

export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatShortDate(date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function getSeason(date) {
  const month = date.getMonth();
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  if (month >= 8 && month <= 10) return "autumn";
  return "winter";
}

// Actual sow date = user-entered date + 7-day shipping buffer
export function getActualSowDate(sowDateString) {
  const base = new Date(sowDateString + "T12:00:00");
  return addDays(base, 7);
}

// Bloom date = actual sow date + weeks to bloom
export function getBloomDate(flower, actualSowDate) {
  return addWeeks(actualSowDate, flower.weeksToBloom);
}

export function needsIndoorStart(flower, zone, actualSowDate) {
  const frost = LAST_FROST[zone];
  if (!frost) return false;
  if (flower.type === "plug") return false;
  const frostDate = new Date(actualSowDate.getFullYear(), frost.month, frost.day);
  return actualSowDate < frostDate;
}

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

import { buildSchedule, formatDate, getActualSowDate } from "../../utils/scheduleCalc";
import { exportSchedulePDF } from "../../utils/pdfExport";
import { ZONES, LAST_FROST } from "../../data/flowers";
import { moods } from "../../data/moods";

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

export default function GrowScheduleStep({ basket, zone, sowDate, mood, onNext, onBack }) {
  const schedule = buildSchedule(basket, sowDate, zone);
  const zoneLabel = ZONES.find((z) => z.id === zone)?.label || zone;
  const moodLabel = moods.find((m) => m.id === mood)?.label || mood;
  const actualSowDate = getActualSowDate(sowDate);

  const frost = LAST_FROST[zone];
  const frostDate = frost
    ? new Date(actualSowDate.getFullYear(), frost.month, frost.day)
    : null;
  const frostLabel = frost
    ? `${MONTH_NAMES[frost.month]} ${frost.day}`
    : null;
  const frostHasPassed = frostDate ? new Date() > frostDate : true;

  function handleDownload() {
    exportSchedulePDF(schedule, moodLabel, zoneLabel, sowDate);
  }

  return (
    <div className="step-container schedule-container">
      <h2 className="step-title">Your Grow Schedule</h2>
      <p className="step-sub">
        {moodLabel} · {zoneLabel} · Sow date: {formatDate(actualSowDate)}
      </p>

      {frostLabel && (
        <div className={`frost-banner ${frostHasPassed ? "frost-banner--passed" : "frost-banner--upcoming"}`}>
          {frostHasPassed ? (
            <>
              <span className="frost-banner-icon">✓</span>
              <span>Last frost for {zoneLabel} was around <strong>{frostLabel}</strong> — it has passed for this year.</span>
            </>
          ) : (
            <>
              <span className="frost-banner-icon">❄</span>
              <span>Last frost for {zoneLabel} is around <strong>{frostLabel}</strong> — plan indoor starts accordingly.</span>
            </>
          )}
        </div>
      )}

      <div className="schedule-list">
        {schedule.map(({ flower, actualSowDate, bloomDate, indoorStart, weeksToBloom }) => (
          <div key={flower.id} className="schedule-card">
            <div className="schedule-card-header">
              <div>
                <h3 className="schedule-flower-name">{flower.name}</h3>
                <span className="schedule-flower-latin">{flower.latin}</span>
              </div>
              <div className="schedule-dates">
                <div className="schedule-date-row">
                  <span className="schedule-date-label">Plant</span>
                  <span className="schedule-date-value">{formatDate(actualSowDate)}</span>
                </div>
                <div className="schedule-date-row">
                  <span className="schedule-date-label">Bloom</span>
                  <span className="schedule-date-value bloom-highlight">{formatDate(bloomDate)}</span>
                </div>
                <div className="schedule-date-row">
                  <span className="schedule-date-label">Time</span>
                  <span className="schedule-date-value">{weeksToBloom} weeks</span>
                </div>
              </div>
            </div>

            {indoorStart && (
              <>
                <div className="indoor-flag">
                  🌱 Start indoors — sow date is before last frost for your zone. Starting early indoors gives these seeds the best head start.
                </div>
                <div className="indoor-flag-alt">
                  {frostHasPassed
                    ? "✓ Last frost has passed — skip the indoor phase entirely. Direct sow into the basket or into seed trays kept outside."
                    : `Once last frost passes (around ${frostLabel}), you can skip the indoor phase and direct sow outside instead.`
                  }
                </div>
              </>
            )}

            <div className="care-facts">
              <div className="care-fact">
                <span className="care-icon">☀</span>
                <span>{flower.sunlight}</span>
              </div>
              <div className="care-fact">
                <span className="care-icon">💧</span>
                <span>{flower.watering}</span>
              </div>
              <div className="care-fact">
                <span className="care-icon">🌱</span>
                <span>{flower.indoorNotes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="schedule-actions">
        <button className="btn-download" onClick={handleDownload}>
          ↓ Download PDF Schedule
        </button>
        <button className="btn-primary" onClick={onNext}>
          I'm Done — Finish →
        </button>
      </div>

      <button className="btn-secondary" onClick={onBack}>← Back</button>
    </div>
  );
}

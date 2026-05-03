import { buildSchedule, formatDate } from "../../utils/scheduleCalc";
import { exportSchedulePDF } from "../../utils/pdfExport";
import { ZONES } from "../../data/flowers";
import { moods } from "../../data/moods";

export default function GrowScheduleStep({ basket, zone, sowDate, mood, onNext, onBack }) {
  const schedule = buildSchedule(basket, sowDate, zone);
  const zoneLabel = ZONES.find((z) => z.id === zone)?.label || zone;
  const moodLabel = moods.find((m) => m.id === mood)?.label || mood;

  function handleDownload() {
    exportSchedulePDF(schedule, moodLabel, zoneLabel, sowDate);
  }

  return (
    <div className="step-container schedule-container">
      <h2 className="step-title">Your Grow Schedule</h2>
      <p className="step-sub">
        {moodLabel} · {zoneLabel} · Sow date: {sowDate}
      </p>

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
              <div className="indoor-flag">
                🌱 Start indoors — outdoor sow date is before last frost for your zone.
              </div>
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

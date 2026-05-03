import { addDays, formatDate, getSeason } from "../../utils/scheduleCalc";
import { LAST_FROST } from "../../data/flowers";

export default function SowDateStep({ sowDate, zone, onSowDate, onNext, onBack }) {
  const actualSowDate = sowDate ? addDays(new Date(sowDate + "T12:00:00"), 7) : null;
  const bloomSeason = actualSowDate ? getSeason(actualSowDate) : null;

  const frost = zone ? LAST_FROST[zone] : null;
  const frostDate =
    frost && actualSowDate
      ? new Date(actualSowDate.getFullYear(), frost.month, frost.day)
      : null;
  const beforeFrost = frostDate && actualSowDate < frostDate;

  return (
    <div className="step-container">
      <h2 className="step-title">When do you want to sow?</h2>
      <p className="step-sub">
        Enter the date you plan to sow. We'll add 7 days for shipping so your
        seeds arrive ready to plant.
      </p>

      <div className="date-input-wrap">
        <label htmlFor="sowDate" className="date-label">Sow Date</label>
        <input
          id="sowDate"
          type="date"
          className="date-input"
          value={sowDate}
          onChange={(e) => onSowDate(e.target.value)}
        />
      </div>

      {actualSowDate && (
        <div className="date-info-box">
          <div className="date-info-row">
            <span className="date-info-label">Actual sow date</span>
            <span className="date-info-value">{formatDate(actualSowDate)}</span>
          </div>
          <div className="date-info-row">
            <span className="date-info-label">Growing season</span>
            <span className="date-info-value season-badge">{bloomSeason}</span>
          </div>
          {beforeFrost && (
            <div className="date-info-row indoor-note">
              <span className="date-info-label">⚠ Before last frost</span>
              <span className="date-info-value">
                Some flowers will need to be started indoors. Indoor start dates
                will be shown in your grow schedule.
              </span>
            </div>
          )}
          {(zone === "indoor-window" || zone === "indoor-grow-light") && (
            <div className="date-info-row indoor-note">
              <span className="date-info-label">🌱 Indoor growing</span>
              <span className="date-info-value">
                All flowers will be grown indoors. Indoor-specific care notes
                will appear in your schedule.
              </span>
            </div>
          )}
        </div>
      )}

      <div className="step-actions">
        <button className="btn-secondary" onClick={onBack}>← Back</button>
        <button className="btn-primary" disabled={!sowDate} onClick={onNext}>
          Show My Baskets →
        </button>
      </div>
    </div>
  );
}

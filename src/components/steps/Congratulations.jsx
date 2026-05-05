import { formatDate, getActualSowDate, getBloomDate } from "../../utils/scheduleCalc";

export default function Congratulations({ basket, sowDate, onRestart }) {
  const actualSowDate = getActualSowDate(sowDate);
  const bloomDates = basket.map((f) => getBloomDate(f, actualSowDate));
  const lastBloom = new Date(Math.max(...bloomDates.map((d) => d.getTime())));

  return (
    <div className="step-container congrats">
      <div className="congrats-icon">🌸</div>
      <h2 className="congrats-title">Congratulations!</h2>
      <p className="congrats-body">
        You've made your bouquet. Your basket of{" "}
        <strong>{basket.length} flowers</strong> will be in full bloom by{" "}
        <strong>{formatDate(lastBloom)}</strong>.
      </p>

      <div className="congrats-dates">
        <div className="congrats-date-row">
          <span className="congrats-date-label">Your sow date</span>
          <span className="congrats-date-value">{formatDate(new Date(sowDate + "T12:00:00"))}</span>
        </div>
        <div className="congrats-date-arrow">↓ +7 days shipping</div>
        <div className="congrats-date-row congrats-date-row--highlight">
          <span className="congrats-date-label">Actual plant date</span>
          <span className="congrats-date-value">{formatDate(actualSowDate)}</span>
        </div>
        <div className="congrats-date-arrow">↓ grow</div>
        <div className="congrats-date-row congrats-date-row--bloom">
          <span className="congrats-date-label">Full bloom by</span>
          <span className="congrats-date-value">{formatDate(lastBloom)}</span>
        </div>
      </div>

      <div className="congrats-flowers">
        {basket.map((f) => (
          <span key={f.id} className="congrats-flower-chip">
            {f.name}
          </span>
        ))}
      </div>

      <p className="congrats-note">
        Check your downloaded schedule for planting dates and care tips. Happy growing!
      </p>
      <button className="btn-primary" onClick={onRestart}>
        Build Another Basket
      </button>
    </div>
  );
}

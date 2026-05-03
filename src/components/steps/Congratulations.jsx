import { formatDate } from "../../utils/scheduleCalc";
import { getActualSowDate, getBloomDate } from "../../utils/scheduleCalc";

export default function Congratulations({ basket, sowDate, onRestart }) {
  const actualSowDate = getActualSowDate(sowDate);
  // Latest bloom date in the basket = when the whole basket is in full bloom
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
      <div className="congrats-flowers">
        {basket.map((f) => (
          <span key={f.id} className="congrats-flower-chip">
            {f.name}
          </span>
        ))}
      </div>
      <p className="congrats-note">
        Check your downloaded schedule for planting dates and care tips. Happy
        growing!
      </p>
      <button className="btn-primary" onClick={onRestart}>
        Build Another Basket
      </button>
    </div>
  );
}

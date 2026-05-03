import { ZONES } from "../../data/flowers";

export default function ZoneStep({ selected, onSelect, onNext, onBack }) {
  return (
    <div className="step-container">
      <h2 className="step-title">Where do you grow?</h2>
      <p className="step-sub">Select your USDA hardiness zone or growing environment.</p>
      <div className="zone-grid">
        {ZONES.map((zone) => (
          <button
            key={zone.id}
            className={`zone-card ${selected === zone.id ? "selected" : ""}`}
            onClick={() => onSelect(zone.id)}
          >
            {zone.label}
          </button>
        ))}
      </div>
      <div className="step-actions">
        <button className="btn-secondary" onClick={onBack}>← Back</button>
        <button className="btn-primary" disabled={!selected} onClick={onNext}>
          Next →
        </button>
      </div>
    </div>
  );
}

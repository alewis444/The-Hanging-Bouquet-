import { useState } from "react";
import { ZONES, LAST_FROST } from "../../data/flowers";

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

function formatFrostDate(frost) {
  if (!frost) return null;
  return `${MONTH_NAMES[frost.month]} ${frost.day}`;
}

function mapApiZoneToId(apiZone) {
  const num = parseFloat(apiZone);
  if (num <= 4)  return "4";
  if (num <= 6)  return "5-6";
  if (num <= 7)  return "7";
  if (num <= 8)  return "8";
  return "9-10";
}

export default function ZoneStep({ selected, onSelect, onNext, onBack }) {
  const [zip, setZip] = useState("");
  const [zipStatus, setZipStatus] = useState(null);
  const [detectedZone, setDetectedZone] = useState(null);

  const frostDate = selected ? formatFrostDate(LAST_FROST[selected]) : null;
  const selectedLabel = ZONES.find((z) => z.id === selected)?.label;

  async function lookupZip() {
    if (zip.length < 5) return;
    setZipStatus("loading");
    setDetectedZone(null);
    try {
      const res = await fetch(`https://phzmapi.org/${zip}.json`);
      if (!res.ok) throw new Error("Not found");
      const data = await res.json();
      const zoneId = mapApiZoneToId(data.zone);
      setDetectedZone({ raw: data.zone, id: zoneId });
      setZipStatus("found");
      onSelect(zoneId);
    } catch {
      setZipStatus("error");
    }
  }

  function handleZipKey(e) {
    if (e.key === "Enter") lookupZip();
  }

  return (
    <div className="step-container">
      <h2 className="step-title">Where do you grow?</h2>
      <p className="step-sub">Enter your zip code to auto-detect your zone, or pick manually below.</p>

      <div className="zip-lookup">
        <div className="zip-input-row">
          <input
            className="zip-input"
            type="text"
            inputMode="numeric"
            maxLength={5}
            placeholder="ZIP code"
            value={zip}
            onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
            onKeyDown={handleZipKey}
          />
          <button
            className="zip-btn"
            onClick={lookupZip}
            disabled={zip.length < 5 || zipStatus === "loading"}
          >
            {zipStatus === "loading" ? "…" : "Find Zone"}
          </button>
        </div>

        {zipStatus === "found" && detectedZone && (
          <div className="zip-result">
            ✓ USDA Zone <strong>{detectedZone.raw}</strong> — selected{" "}
            <strong>{ZONES.find((z) => z.id === detectedZone.id)?.label}</strong>
          </div>
        )}
        {zipStatus === "error" && (
          <div className="zip-error">Couldn't find that zip code. Select your zone manually below.</div>
        )}
      </div>

      <p className="zone-manual-label">Or select manually:</p>
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

      {selected && frostDate && (
        <div className="frost-info">
          <span className="frost-info-zone">{selectedLabel}</span>
          <span className="frost-info-divider">·</span>
          <span className="frost-info-label">Last frost date</span>
          <span className="frost-info-date">{frostDate}</span>
        </div>
      )}

      <div className="step-actions">
        <button className="btn-secondary" onClick={onBack}>← Back</button>
        <button className="btn-primary" disabled={!selected} onClick={onNext}>
          Next →
        </button>
      </div>
    </div>
  );
}

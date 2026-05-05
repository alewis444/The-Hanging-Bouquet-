import { useState, useEffect } from "react";
import { generateBaskets, getBackups } from "../../utils/basketGenerator";
import { getActualSowDate, getBloomDate, formatDate } from "../../utils/scheduleCalc";
import { moods } from "../../data/moods";

const ROLE_LABEL = { upright: "Thriller", mounder: "Filler", trailer: "Spiller" };

function FlowerPill({ flower, onSwap, backups }) {
  const [showSwap, setShowSwap] = useState(false);

  return (
    <div className="flower-pill-wrap">
      <div className="flower-pill">
        <div className="flower-pill-info">
          <span className="flower-pill-role">{ROLE_LABEL[flower.role]}</span>
          <span className="flower-pill-name">{flower.name}</span>
          <span className="flower-pill-latin">{flower.latin}</span>
          {flower.description && (
            <span className="flower-pill-desc">{flower.description}</span>
          )}
          {flower.bloomDuration && (
            <span className="flower-pill-duration">Blooms for {flower.bloomDuration}</span>
          )}
        </div>
        <button
          className="swap-btn"
          onClick={() => setShowSwap((v) => !v)}
          title="Swap this flower"
        >
          ⇄
        </button>
      </div>
      {showSwap && (
        <div className="swap-dropdown">
          <p className="swap-hint">Swap with:</p>
          {backups.filter((b) => b.role === flower.role).length === 0 && (
            <p className="swap-empty">No backups available for this role in your selection.</p>
          )}
          {backups
            .filter((b) => b.role === flower.role)
            .map((b) => (
              <button
                key={b.id}
                className="swap-option"
                onClick={() => {
                  onSwap(flower.id, b);
                  setShowSwap(false);
                }}
              >
                {b.name} <span className="swap-option-latin">{b.latin}</span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

export default function BasketStep({ mood: initialMood, zone, sowDate, onAccept, onBack }) {
  const [activeMood, setActiveMood] = useState(initialMood);
  const [baskets, setBaskets] = useState([]);
  const [editedBaskets, setEditedBaskets] = useState([]);

  const actualSowDate = getActualSowDate(sowDate);
  const activeMoodData = moods.find((m) => m.id === activeMood);

  useEffect(() => {
    const generated = generateBaskets(activeMood, zone, sowDate);
    setBaskets(generated);
    setEditedBaskets(generated.map((b) => [...b]));
  }, [activeMood, zone, sowDate]);

  function swapFlower(basketIdx, oldFlowerId, newFlower) {
    setEditedBaskets((prev) =>
      prev.map((basket, i) => {
        if (i !== basketIdx) return basket;
        return basket.map((f) => (f.id === oldFlowerId ? newFlower : f));
      })
    );
  }

  return (
    <div className="step-container">
      <h2 className="step-title">Your curated baskets</h2>

      {/* Mood tabs */}
      <div className="basket-mood-tabs">
        {moods.map((m) => (
          <button
            key={m.id}
            className={`basket-mood-tab ${activeMood === m.id ? "active" : ""}`}
            style={{ "--tab-color": m.palette[0] }}
            onClick={() => setActiveMood(m.id)}
          >
            <span className="basket-mood-tab-emoji">{m.emoji}</span>
            <span className="basket-mood-tab-label">{m.label}</span>
          </button>
        ))}
      </div>

      {activeMoodData && (
        <p className="basket-mood-tagline">
          <strong>{activeMoodData.label}:</strong> {activeMoodData.tagline}
        </p>
      )}

      {baskets.length === 0 ? (
        <div className="basket-empty">
          No baskets available for <strong>{activeMoodData?.label}</strong> in your zone and season.
          Try a different mood above.
        </div>
      ) : (
        <>
          {editedBaskets[0]?.[0] && (
            <p className="basket-bloom-note">
              If you start sowing{" "}
              <strong>{formatDate(actualSowDate)}</strong>, blooms together around{" "}
              <strong>{formatDate(getBloomDate(editedBaskets[0][0], actualSowDate))}</strong>.{" "}
              Swap any flower using the ⇄ button, then accept the basket you love.
            </p>
          )}

          <div className="baskets-list">
            {editedBaskets.map((basket, idx) => {
              const backups = getBackups(basket, activeMood, zone, sowDate);
              return (
                <div key={idx} className="basket-card">
                  <div className="basket-card-header">
                    <span className="basket-number">Basket {idx + 1}</span>
                    <span className="basket-count">{basket.length} flowers</span>
                  </div>
                  <div className="basket-flowers">
                    {basket.map((flower) => (
                      <FlowerPill
                        key={flower.id}
                        flower={flower}
                        backups={backups}
                        onSwap={(oldId, newFlower) => swapFlower(idx, oldId, newFlower)}
                      />
                    ))}
                  </div>
                  <div className="basket-bloom-preview">
                    <div className="bloom-row bloom-header">
                      <span className="bloom-flower-name">Flower</span>
                      <span className="bloom-arrow" />
                      <span className="bloom-date">Bloom Date</span>
                      <span className="bloom-weeks" />
                    </div>
                    {basket.map((f) => (
                      <div key={f.id} className="bloom-row">
                        <span className="bloom-flower-name">{f.name}</span>
                        <span className="bloom-arrow">→</span>
                        <span className="bloom-date">{formatDate(getBloomDate(f, actualSowDate))}</span>
                        <span className="bloom-weeks">({f.weeksToBloom} wks)</span>
                      </div>
                    ))}
                  </div>
                  <button
                    className="btn-primary btn-accept"
                    onClick={() => onAccept(basket)}
                  >
                    Accept Basket {idx + 1} →
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}

      <button className="btn-secondary" onClick={onBack}>← Back</button>
    </div>
  );
}

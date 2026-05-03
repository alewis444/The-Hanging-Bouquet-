import { useState, useEffect } from "react";
import { generateBaskets, getBackups } from "../../utils/basketGenerator";
import { getActualSowDate, getBloomDate, formatDate } from "../../utils/scheduleCalc";

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

export default function BasketStep({ mood, zone, sowDate, onAccept, onBack }) {
  const [baskets, setBaskets] = useState([]);
  const [editedBaskets, setEditedBaskets] = useState([]);

  const actualSowDate = getActualSowDate(sowDate);

  useEffect(() => {
    const generated = generateBaskets(mood, zone, sowDate);
    setBaskets(generated);
    setEditedBaskets(generated.map((b) => [...b]));
  }, [mood, zone, sowDate]);

  function swapFlower(basketIdx, oldFlowerId, newFlower) {
    setEditedBaskets((prev) =>
      prev.map((basket, i) => {
        if (i !== basketIdx) return basket;
        return basket.map((f) => (f.id === oldFlowerId ? newFlower : f));
      })
    );
  }

  if (baskets.length === 0) {
    return (
      <div className="step-container">
        <h2 className="step-title">No baskets found</h2>
        <p className="step-sub">
          Not enough flowers match your mood, zone, and season. Try a different
          combination.
        </p>
        <button className="btn-secondary" onClick={onBack}>← Back</button>
      </div>
    );
  }

  return (
    <div className="step-container">
      <h2 className="step-title">Your curated baskets</h2>
      <p className="step-sub">
        Each basket blooms together around{" "}
        <strong>
          {formatDate(
            getBloomDate(
              editedBaskets[0]?.[0],
              actualSowDate
            )
          )}
        </strong>
        . Swap any flower using the ⇄ button.
      </p>

      <div className="baskets-list">
        {editedBaskets.map((basket, idx) => {
          const backups = getBackups(basket, mood, zone, sowDate);
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
                    onSwap={(oldId, newFlower) =>
                      swapFlower(idx, oldId, newFlower)
                    }
                  />
                ))}
              </div>
              <div className="basket-bloom-preview">
                {basket.map((f) => (
                  <div key={f.id} className="bloom-row">
                    <span className="bloom-flower-name">{f.name}</span>
                    <span className="bloom-arrow">→</span>
                    <span className="bloom-date">
                      {formatDate(getBloomDate(f, actualSowDate))}
                    </span>
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

      <button className="btn-secondary" onClick={onBack}>← Back</button>
    </div>
  );
}

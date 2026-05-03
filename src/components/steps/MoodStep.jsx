import { moods } from "../../data/moods";

export default function MoodStep({ selected, onSelect, onNext }) {
  return (
    <div className="step-container">
      <h2 className="step-title">What's the mood?</h2>
      <p className="step-sub">Choose the feeling you want your basket to carry.</p>
      <div className="mood-grid">
        {moods.map((mood) => (
          <button
            key={mood.id}
            className={`mood-card ${selected === mood.id ? "selected" : ""}`}
            onClick={() => onSelect(mood.id)}
            style={{
              "--mood-color-1": mood.palette[0],
              "--mood-color-2": mood.palette[1],
            }}
          >
            <span className="mood-emoji">{mood.emoji}</span>
            <span className="mood-label">{mood.label}</span>
            <span className="mood-tagline">{mood.tagline}</span>
          </button>
        ))}
      </div>
      <button
        className="btn-primary"
        disabled={!selected}
        onClick={onNext}
      >
        Next →
      </button>
    </div>
  );
}

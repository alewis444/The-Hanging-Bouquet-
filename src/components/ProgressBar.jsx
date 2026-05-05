// step 0 = intro, 1 = mood, 2 = zone, 3 = date, 4 = baskets, 5 = schedule, 6 = congrats
const STEPS = ["Mood", "Zone", "Date", "Baskets", "Schedule"];

export default function ProgressBar({ step, onNavigate }) {
  const activeIndex = step - 1;

  if (step === 0 || step === 6) return null;

  return (
    <div className="progress-bar">
      {STEPS.map((label, i) => {
        const isDone = i < activeIndex;
        const isActive = i === activeIndex;
        return (
          <div key={label} className={`progress-step ${isDone ? "done" : ""} ${isActive ? "active" : ""}`}>
            <button
              className="progress-crumb"
              disabled={!isDone}
              onClick={() => isDone && onNavigate(i + 1)}
              title={isDone ? `Go back to ${label}` : undefined}
            >
              <div className="progress-dot" />
              <span className="progress-label">{label}</span>
            </button>
            {i < STEPS.length - 1 && <div className="progress-line" />}
          </div>
        );
      })}
    </div>
  );
}

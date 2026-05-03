const STEPS = ["Mood", "Zone", "Date", "Baskets", "Schedule"];

export default function ProgressBar({ step }) {
  // step 0 = intro, 1 = mood, 2 = zone, 3 = date, 4 = baskets, 5 = schedule, 6 = congrats
  const activeIndex = step - 1;

  if (step === 0 || step === 6) return null;

  return (
    <div className="progress-bar">
      {STEPS.map((label, i) => (
        <div
          key={label}
          className={`progress-step ${i < activeIndex ? "done" : ""} ${
            i === activeIndex ? "active" : ""
          }`}
        >
          <div className="progress-dot" />
          <span className="progress-label">{label}</span>
          {i < STEPS.length - 1 && <div className="progress-line" />}
        </div>
      ))}
    </div>
  );
}

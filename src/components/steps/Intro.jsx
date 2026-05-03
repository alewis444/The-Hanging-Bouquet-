import { useCurrentDate } from "../../hooks/useCurrentDate";

export default function Intro({ onStart }) {
  const now = useCurrentDate();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="step-container intro">
      <div className="intro-date">{dateStr}</div>
      <h1 className="intro-title">The Hanging Bouquet</h1>
      <p className="intro-sub">
        A curated guide to growing and arranging hanging baskets — by mood,
        zone, and season.
      </p>
      <p className="intro-body">
        Choose your mood, tell us where you grow, and enter your sow date.
        We'll build you a basket of flowers that all bloom together — with a
        planting schedule to match.
      </p>
      <button className="btn-primary" onClick={onStart}>
        Build My Basket
      </button>
    </div>
  );
}

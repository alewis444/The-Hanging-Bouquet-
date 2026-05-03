import { useState } from "react";
import Intro from "./components/steps/Intro";
import MoodStep from "./components/steps/MoodStep";
import ZoneStep from "./components/steps/ZoneStep";
import SowDateStep from "./components/steps/SowDateStep";
import BasketStep from "./components/steps/BasketStep";
import GrowScheduleStep from "./components/steps/GrowScheduleStep";
import Congratulations from "./components/steps/Congratulations";
import Library from "./components/Library";
import ProgressBar from "./components/ProgressBar";
import "./App.css";

const STEP_INTRO = 0;
const STEP_MOOD = 1;
const STEP_ZONE = 2;
const STEP_DATE = 3;
const STEP_BASKET = 4;
const STEP_SCHEDULE = 5;
const STEP_CONGRATS = 6;

export default function App() {
  const [tab, setTab] = useState("builder");
  const [step, setStep] = useState(STEP_INTRO);
  const [mood, setMood] = useState(null);
  const [zone, setZone] = useState(null);
  const [sowDate, setSowDate] = useState("");
  const [acceptedBasket, setAcceptedBasket] = useState(null);

  function restart() {
    setStep(STEP_INTRO);
    setMood(null);
    setZone(null);
    setSowDate("");
    setAcceptedBasket(null);
  }

  return (
    <div className="app">
      <nav className="tab-nav">
        <div className="tab-nav-inner">
          <span className="site-name">🌸 The Hanging Bouquet</span>
          <div className="tabs">
            <button
              className={`tab ${tab === "builder" ? "active" : ""}`}
              onClick={() => setTab("builder")}
            >
              Builder
            </button>
            <button
              className={`tab ${tab === "library" ? "active" : ""}`}
              onClick={() => setTab("library")}
            >
              Library
            </button>
          </div>
        </div>
      </nav>

      {tab === "library" ? (
        <main className="main-content">
          <Library />
        </main>
      ) : (
        <main className="main-content">
          <ProgressBar step={step} />

          {step === STEP_INTRO && (
            <Intro onStart={() => setStep(STEP_MOOD)} />
          )}
          {step === STEP_MOOD && (
            <MoodStep
              selected={mood}
              onSelect={setMood}
              onNext={() => setStep(STEP_ZONE)}
            />
          )}
          {step === STEP_ZONE && (
            <ZoneStep
              selected={zone}
              onSelect={setZone}
              onNext={() => setStep(STEP_DATE)}
              onBack={() => setStep(STEP_MOOD)}
            />
          )}
          {step === STEP_DATE && (
            <SowDateStep
              sowDate={sowDate}
              zone={zone}
              onSowDate={setSowDate}
              onNext={() => setStep(STEP_BASKET)}
              onBack={() => setStep(STEP_ZONE)}
            />
          )}
          {step === STEP_BASKET && (
            <BasketStep
              mood={mood}
              zone={zone}
              sowDate={sowDate}
              onAccept={(basket) => {
                setAcceptedBasket(basket);
                setStep(STEP_SCHEDULE);
              }}
              onBack={() => setStep(STEP_DATE)}
            />
          )}
          {step === STEP_SCHEDULE && (
            <GrowScheduleStep
              basket={acceptedBasket}
              zone={zone}
              sowDate={sowDate}
              mood={mood}
              onNext={() => setStep(STEP_CONGRATS)}
              onBack={() => setStep(STEP_BASKET)}
            />
          )}
          {step === STEP_CONGRATS && (
            <Congratulations
              basket={acceptedBasket}
              sowDate={sowDate}
              onRestart={restart}
            />
          )}
        </main>
      )}
    </div>
  );
}

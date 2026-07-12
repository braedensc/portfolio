"use client";

import { useRef, useState } from "react";
import { chefTourSteps } from "@/content/site";

/**
 * ChefClaw's guided-tour dialog — the project isn't deployed yet, so the
 * "expedition in progress" peak offers a short briefing tour instead of a live
 * launch. Native <dialog> for built-in focus trapping + Esc-to-close.
 */
export default function ChefTour() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState(0);

  const open = () => {
    setStep(0);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const prev = () =>
    setStep((s) => (s + chefTourSteps.length - 1) % chefTourSteps.length);
  const next = () => setStep((s) => (s + 1) % chefTourSteps.length);

  return (
    <div className="launch">
      <button className="tour-btn" onClick={open}>
        Take the guided tour →
      </button>
      <div>
        <small>
          Not deployed yet — the briefing tour walks the trail while the route
          is built.
        </small>
      </div>

      <dialog
        ref={dialogRef}
        className="topo-dialog"
        aria-labelledby="chef-tour-title"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") next();
          if (e.key === "ArrowLeft") prev();
        }}
      >
        <div className="tour-body">
          <h4 id="chef-tour-title">ChefClaw — guided tour</h4>
          <p className="tour-lead">
            Placeholder frames — the real tour uses live screenshots.
          </p>
          <div className="tour-step">
            <div className="mock-ui" aria-hidden="true" />
            <p>{chefTourSteps[step]}</p>
          </div>
          <div className="tour-nav">
            <button onClick={prev}>← Prev</button>
            <span className="dots">
              {step + 1} / {chefTourSteps.length}
            </span>
            <button onClick={next}>Next →</button>
          </div>
          <div className="tour-close">
            <button onClick={close}>CLOSE</button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

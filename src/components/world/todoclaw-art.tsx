/**
 * Todoclaw's REAL mascot art, extracted from the app itself so the portfolio
 * station shows the actual product (client round-2 note: "the exact apps").
 *
 * Sources (verbatim SVG markup, trimmed only of app-specific props):
 * - TodoClawIcon   ← todoclaw/src/components/TodoClawIcon.tsx
 * - TodoClawPeek   ← todoclaw/src/components/TodoClawPeek.tsx
 * - SleepingPuppy  ← todoclaw/src/components/SleepingPuppy.tsx
 * - PawPrint       ← todoclaw/src/components/PawPrint.tsx
 *
 * The blink animation classes (.tc-eye-blink / .tc-eye-blink-alt) are ported
 * into world.css from todoclaw/src/index.css.
 */

import { useId } from "react";

/** The jumping-up portrait of the real dog (cream curly fur, floppy tan ears,
 *  pale blue eyes) — Todoclaw's app icon. From todoclaw/src/components/TodoClawIcon.tsx. */
export function TodoClawIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <path
        d="M15,21 C3,25 1,44 13,52 C22,55 29,41 24,26 Z"
        fill="#b3a488"
        stroke="#2e2a24"
        strokeWidth="1.5"
      />
      <path
        d="M49,21 C61,25 63,44 51,52 C42,55 35,41 40,26 Z"
        fill="#b3a488"
        stroke="#2e2a24"
        strokeWidth="1.5"
      />
      <circle cx="32" cy="34" r="20" fill="#f8f2e6" stroke="#2e2a24" strokeWidth="1.5" />
      <circle cx="24.5" cy="32" r="3.6" fill="#5f8aa3" />
      <circle cx="39.5" cy="32" r="3.6" fill="#5f8aa3" />
      <circle cx="23.3" cy="30.7" r="1" fill="#fff" />
      <circle cx="38.3" cy="30.7" r="1" fill="#fff" />
      <ellipse cx="32" cy="41.5" rx="3.2" ry="2.4" fill="#2e2a24" />
      <path
        d="M32,44 q0,2.5 -3,3 M32,44 q0,2.5 3,3"
        stroke="#2e2a24"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <g transform="translate(9,46) rotate(-25)">
        <ellipse cx="0" cy="0" rx="7" ry="6" fill="#f8f2e6" stroke="#2e2a24" strokeWidth="1.5" />
        <path d="M-5,-5 L-4,-15 L-2,-5 Z" fill="#2e2a24" />
        <path d="M-1,-6 L0,-16 L1,-6 Z" fill="#2e2a24" />
        <path d="M2,-5 L4,-15 L5,-5 Z" fill="#2e2a24" />
      </g>
      <g transform="translate(55,46) rotate(25)">
        <ellipse cx="0" cy="0" rx="7" ry="6" fill="#f8f2e6" stroke="#2e2a24" strokeWidth="1.5" />
        <path d="M-5,-5 L-4,-15 L-2,-5 Z" fill="#2e2a24" />
        <path d="M-1,-6 L0,-16 L1,-6 Z" fill="#2e2a24" />
        <path d="M2,-5 L4,-15 L5,-5 Z" fill="#2e2a24" />
      </g>
    </svg>
  );
}

/** The peeking pup: paws hooked over an edge, claw tips dangling, nose draped
 *  over the rail. `ledge={false}` clips his chin at y=42.2/64 so whatever the
 *  parent positions him on reads as the thing he hides behind — exactly how he
 *  peeks over the priority grid's top border in the real app.
 *  From todoclaw/src/components/TodoClawPeek.tsx. */
export function TodoClawPeek({
  className,
  ledge = true,
  blinkClassName = "tc-eye-blink",
}: {
  className?: string;
  ledge?: boolean;
  blinkClassName?: string;
}) {
  const clipId = useId();

  const face = (
    <>
      <path
        d="M21,14 C11,15 6,28 12,38 C15,43 20,41 20.5,32 C21,25 21.5,18 23,15 Z"
        fill="#b3a488"
        stroke="#2e2a24"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M43,14 C53,15 58,28 52,38 C49,43 44,41 43.5,32 C43,25 42.5,18 41,15 Z"
        fill="#b3a488"
        stroke="#2e2a24"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="30" r="17" fill="#f8f2e6" stroke="#2e2a24" strokeWidth="1.5" />
      <path
        d="M27.5,13.5 q2.2,-3.2 4.4,-0.4 q1.8,-2.8 3.6,0.2"
        fill="none"
        stroke="#2e2a24"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M21.5,23.5 q3,-2 6,-1 M36.5,22.5 q3,-1 6,1"
        fill="none"
        stroke="#2e2a24"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.6"
      />
      <g className={blinkClassName}>
        <circle cx="25" cy="29" r="3.5" fill="#5f8aa3" />
        <circle cx="23.8" cy="27.7" r="1" fill="#fff" />
      </g>
      <g className={blinkClassName}>
        <circle cx="39" cy="29" r="3.5" fill="#5f8aa3" />
        <circle cx="37.8" cy="27.7" r="1" fill="#fff" />
      </g>
    </>
  );

  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      {ledge ? (
        face
      ) : (
        <>
          <defs>
            <clipPath id={clipId}>
              <rect x="0" y="0" width="64" height="42.2" />
            </clipPath>
          </defs>
          <g clipPath={`url(#${clipId})`}>{face}</g>
        </>
      )}
      {ledge && (
        <rect
          x="5"
          y="41.5"
          width="54"
          height="7"
          rx="3.5"
          fill="#b3a488"
          stroke="#2e2a24"
          strokeWidth="1.5"
        />
      )}
      <ellipse cx="32" cy="41.5" rx="4.2" ry="3.2" fill="#2e2a24" />
      <circle cx="30.8" cy="40.4" r="0.9" fill="#f8f2e6" opacity="0.85" />
      <g>
        <rect
          x="14.5"
          y="39.5"
          width="10"
          height="9.5"
          rx="4.5"
          fill="#f8f2e6"
          stroke="#2e2a24"
          strokeWidth="1.5"
        />
        <path
          d="M17.8,44.5 v3.4 M21.2,44.5 v3.4"
          stroke="#2e2a24"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M16.2,49.4 l0.8,2 M19.5,49.8 l0.3,2.2 M22.8,49.4 l-0.4,2.1"
          stroke="#2e2a24"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </g>
      <g>
        <rect
          x="39.5"
          y="39.5"
          width="10"
          height="9.5"
          rx="4.5"
          fill="#f8f2e6"
          stroke="#2e2a24"
          strokeWidth="1.5"
        />
        <path
          d="M42.8,44.5 v3.4 M46.2,44.5 v3.4"
          stroke="#2e2a24"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M41.2,49.4 l0.8,2 M44.5,49.8 l0.3,2.2 M47.8,49.4 l-0.4,2.1"
          stroke="#2e2a24"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

/** The curled-up sleeping puppy (Todoclaw's empty-state illustration) — here he
 *  sleeps beside the planner desk. `currentColor` silhouette; the caller sets
 *  the color. From todoclaw/src/components/SleepingPuppy.tsx. */
export function SleepingPuppy({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <path
        d="M20,70 C8,54 14,33 36,26 C58,18 84,21 98,35 C112,49 109,69 90,75 C69,81 43,81 20,70 Z"
        fill="currentColor"
        opacity="0.55"
      />
      <circle cx="30" cy="39" r="15" fill="currentColor" opacity="0.55" />
      <path d="M19,29 C10,31 7,45 16,51 C23,53 27,44 25,35 Z" fill="currentColor" opacity="0.75" />
      <ellipse cx="17" cy="46" rx="7" ry="5.5" fill="currentColor" opacity="0.75" />
      <path
        d="M35,35 q4,3 8,0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.9"
        fill="none"
      />
      <path
        d="M99,54 q11,-6 6,-17"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.55"
        fill="none"
      />
      <text x="45" y="17" fontFamily="serif" fontSize="12" fill="currentColor" opacity="0.75">
        z
      </text>
      <text x="55" y="9" fontFamily="serif" fontSize="9" fill="currentColor" opacity="0.6">
        z
      </text>
    </svg>
  );
}

/** One paw print (main pad + four toe beans), `currentColor`.
 *  From todoclaw/src/components/PawPrint.tsx. */
export function PawPrint({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <ellipse cx="12" cy="16.5" rx="5.4" ry="4.4" />
      <circle cx="5.6" cy="10.6" r="2.5" />
      <circle cx="9.7" cy="6.6" r="2.7" />
      <circle cx="14.3" cy="6.6" r="2.7" />
      <circle cx="18.4" cy="10.6" r="2.5" />
    </svg>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { todoclawUrl } from "@/content/site";

const DUR = 750; // ms to fill the stamp

/**
 * The Todoclaw "permit" — press and hold to fill the ring, then it stamps and
 * opens the live app in a new tab. window.open runs inside the transient
 * activation from pointerdown (well under the browser's activation window), and
 * an ordinary anchor ("open without ceremony") is the accessible / never-blocked
 * fallback.
 */
export default function PermitStamp() {
  const stampRef = useRef<HTMLButtonElement>(null);
  const raf = useRef<number | null>(null);
  const t0 = useRef(0);
  const held = useRef(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const doneTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const thunkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [done, setDone] = useState(false);
  const [thunk, setThunk] = useState(false);
  const [toast, setToast] = useState("");

  const setP = (p: number) => stampRef.current?.style.setProperty("--p", String(p));

  const say = useCallback((m: string) => {
    setToast(m);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 3400);
  }, []);

  const complete = useCallback(() => {
    held.current = false;
    if (raf.current) cancelAnimationFrame(raf.current);
    setDone(true);
    setThunk(true);
    setP(100);
    // window.open with `noopener` returns null even on success, so the return
    // value can't tell us whether the pop-up was blocked. Always report success
    // — the visible "open without ceremony" link is the fallback if it's blocked.
    window.open(todoclawUrl, "_blank", "noopener,noreferrer");
    say("Permit validated ✓ — Todoclaw opens in a new tab.");
    thunkTimer.current = setTimeout(() => setThunk(false), 450);
    doneTimer.current = setTimeout(() => {
      setDone(false);
      setP(0);
    }, 3600);
  }, [say]);

  const start = useCallback(
    (e: React.PointerEvent | React.KeyboardEvent) => {
      if (done) return;
      e.preventDefault();
      held.current = true;
      t0.current = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0.current) / DUR);
        setP(p * 100);
        if (p >= 1) {
          complete();
          return;
        }
        raf.current = requestAnimationFrame(tick);
      };
      raf.current = requestAnimationFrame(tick);
    },
    [done, complete],
  );

  const cancel = useCallback(() => {
    if (!held.current) return;
    held.current = false;
    if (raf.current) cancelAnimationFrame(raf.current);
    if (!done) setP(0);
  }, [done]);

  useEffect(
    () => () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      [toastTimer, doneTimer, thunkTimer].forEach((r) => {
        if (r.current) clearTimeout(r.current);
      });
    },
    [],
  );

  return (
    <>
      <div className="launch">
        <button
          ref={stampRef}
          className={"stamp" + (done ? " done" : "") + (thunk ? " thunk" : "")}
          aria-label="Press and hold to validate your trail permit and open Todoclaw"
          onPointerDown={start}
          onPointerUp={cancel}
          onPointerLeave={cancel}
          onPointerCancel={cancel}
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && !e.repeat) start(e);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter" || e.key === " ") cancel();
          }}
        />
        <div>
          <small>
            <b>Press &amp; hold to stamp your permit.</b> Opens the live app —
            public guest trail coming soon.
          </small>
          <a
            className="alt"
            href={todoclawUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => say("Opening Todoclaw in a new tab.")}
          >
            or open without ceremony →
          </a>
        </div>
      </div>
      <div id="toast" role="status" className={toast ? "on" : ""}>
        {toast}
      </div>
    </>
  );
}

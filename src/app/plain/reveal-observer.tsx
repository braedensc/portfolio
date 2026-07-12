"use client";

import { useEffect } from "react";

/**
 * Progressive-enhancement reveal-on-scroll. Only when JS runs (and motion is
 * allowed) does it "arm" the page — adding `reveal-armed` to <html>, which is
 * what actually hides un-revealed `.reveal` blocks (see plain.css). Without JS
 * or under reduced-motion, everything stays visible, so crawlers and no-JS
 * visitors get the full content.
 */
export default function RevealObserver() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    const root = document.documentElement;
    root.classList.add("reveal-armed");

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 },
    );

    document.querySelectorAll(".topo .reveal").forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      root.classList.remove("reveal-armed");
    };
  }, []);

  return null;
}

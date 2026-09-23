"use client";

import { useEffect, useRef, useState } from "react";

/**
 * useReducedMotion — respects prefers-reduced-motion.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduced(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/**
 * useInViewOnce — returns true once the ref enters the viewport.
 */
export function useInViewOnce<T extends Element>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px", ...options }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [options]);
  return { ref, inView } as const;
}

/**
 * useCountUp — animates a number from 0 to target when active.
 * SSR-safe: returns target until active, so crawlers and no-JS users see the final number.
 * After activation, runs the visual count-up from 0 → target.
 */
export function useCountUp(target: number, active: boolean, duration = 1800) {
  const [value, setValue] = useState(target);
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    if (!active) return;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    let start = 0;
    let first = true;
    const tick = (now: number) => {
      if (first) {
        // First frame: synchronously reset to 0 inside the rAF callback (runs before paint,
        // so there's no visual flash of the target value before the animation starts).
        start = now;
        setValue(0);
        first = false;
      }
      const p = Math.min(1, (now - start) / duration);
      setValue(target * ease(p));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, active, duration]);
  return value;
}

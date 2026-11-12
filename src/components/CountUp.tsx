import { useEffect, useState } from "react";
import { clamp, easeOut, prefersReducedMotion } from "@/lib/scroll";

type Props = {
  to: number;
  from?: number;
  /** Counting begins when this turns true. */
  start: boolean;
  suffix?: string;
  duration?: number;
};

// A number that counts up to its value once `start` is true.
export default function CountUp({ to, from = 0, start, suffix = "", duration = 1500 }: Props) {
  const [value, setValue] = useState(() => (prefersReducedMotion() ? to : from));

  useEffect(() => {
    if (!start || prefersReducedMotion()) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const k = clamp((now - t0) / duration);
      setValue(Math.round(from + (to - from) * easeOut(k)));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to, from, duration]);

  return (
    <>
      {value}
      {suffix}
    </>
  );
}

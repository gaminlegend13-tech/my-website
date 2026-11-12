import { useEffect, useRef } from "react";
import { onFrame, prefersReducedMotion, type Frame } from "@/lib/scroll";

// Runs `draw` on every scrolled frame. Skipped entirely for visitors who have
// asked their device to reduce motion.
export function useScrollFx(draw: (frame: Frame) => void) {
  const latest = useRef(draw);
  latest.current = draw;

  useEffect(() => {
    if (prefersReducedMotion()) return;
    return onFrame((frame) => latest.current(frame));
  }, []);
}

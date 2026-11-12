import { useEffect, useRef } from "react";
import Plus from "@/components/Plus";
import { clamp, lerp, prefersReducedMotion } from "@/lib/scroll";

const items = [
  "Retail Pharmacy",
  "Wholesale Distribution",
  "Hospital Supplies",
  "Genuine Medicines",
  "Five Branches",
  "Serving Liberia since 2008",
];

// Scrolling navy strip, styled after the shop signage. It drifts on its own,
// speeds up and leans with your scrolling, and runs backwards when you scroll up.
export default function Marquee() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapEl = wrap.current;
    const trackEl = track.current;
    if (!wrapEl || !trackEl || prefersReducedMotion()) return;

    let x = 0;
    let push = 0;
    let raf = 0;
    let visible = false;
    let lastTime = performance.now();
    let lastY = window.scrollY;

    const tick = (now: number) => {
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;
      const y = window.scrollY;
      push = lerp(push, y - lastY, 0.1);
      lastY = y;

      const half = trackEl.scrollWidth / 2;
      x -= dt * 0.055 + push * 0.7;
      if (half > 0) {
        x %= half;
        if (x > 0) x -= half;
      }
      trackEl.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0) skewX(${clamp(push * -0.35, -12, 12).toFixed(2)}deg)`;
      raf = visible ? requestAnimationFrame(tick) : 0;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) {
        lastTime = performance.now();
        lastY = window.scrollY;
        raf = requestAnimationFrame(tick);
      }
    });
    observer.observe(wrapEl);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={item} className="flex items-center gap-7 pr-7">
          <span
            className={`sign text-3xl sm:text-5xl ${
              i % 2 ? "text-transparent [-webkit-text-stroke:1.5px_#fff]" : "text-white"
            }`}
          >
            {item}
          </span>
          <Plus className="h-5 w-5 text-leaf-400 sm:h-7 sm:w-7" />
        </li>
      ))}
    </ul>
  );

  return (
    <div ref={wrap} className="overflow-hidden bg-navy-900 py-6 sm:py-8">
      <div ref={track} className="flex w-max will-change-transform">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

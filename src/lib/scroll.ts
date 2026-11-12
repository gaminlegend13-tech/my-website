// One shared scroll loop for every scroll-linked animation on the page.
// Components subscribe with onFrame(); the loop only runs while the page is
// actually scrolling or resizing, and everything is drawn once per frame.

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export type Frame = {
  /** Viewport width and height in px. */
  vw: number;
  vh: number;
  /** Signed scroll speed in px per frame (positive = scrolling down). */
  velocity: number;
};

type Subscriber = (frame: Frame) => void;

const subscribers = new Set<Subscriber>();
let raf = 0;
let lastY = 0;
let lastTime = 0;

function run() {
  raf = 0;
  const now = performance.now();
  const y = window.scrollY;
  const dt = Math.max(now - lastTime, 1);
  const velocity = lastTime ? ((y - lastY) / dt) * 16.7 : 0;
  lastY = y;
  lastTime = now;

  const frame: Frame = { vw: window.innerWidth, vh: window.innerHeight, velocity };
  subscribers.forEach((fn) => fn(frame));
}

function request() {
  if (!raf) raf = requestAnimationFrame(run);
}

/** Call `fn` once now and then on every scrolled/resized frame. Returns an unsubscribe function. */
export function onFrame(fn: Subscriber) {
  if (subscribers.size === 0) {
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    window.addEventListener("load", request);
  }
  subscribers.add(fn);
  request();

  return () => {
    subscribers.delete(fn);
    if (subscribers.size === 0) {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      window.removeEventListener("load", request);
    }
  };
}

/** 0 when the element's top edge enters the bottom of the screen, 1 when its bottom edge leaves the top. */
export function viewProgress(el: Element, frame: Frame) {
  const r = el.getBoundingClientRect();
  return clamp((frame.vh - r.top) / (frame.vh + r.height));
}

/** For tall "pinned" sections: 0 when the top reaches the top of the screen, 1 when the bottom reaches the bottom. */
export function pinProgress(el: Element, frame: Frame) {
  const r = el.getBoundingClientRect();
  const distance = r.height - frame.vh;
  return distance <= 0 ? 0 : clamp(-r.top / distance);
}

/** True when the element is on screen (with a little margin). */
export function isNear(el: Element, frame: Frame, margin = 200) {
  const r = el.getBoundingClientRect();
  return r.bottom > -margin && r.top < frame.vh + margin;
}

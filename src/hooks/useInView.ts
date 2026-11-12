import { useEffect, useState, type RefObject } from "react";

// Turns true (and stays true) the first time the element scrolls into view.
export function useInView(ref: RefObject<Element>, threshold = 0.4) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return inView;
}

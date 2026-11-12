import { useEffect } from "react";

// Adds "is-visible" the first time an animated element scrolls into view.
//   .reveal   soft fade-up for paragraphs and small blocks
//   .rise     headings whose words rise out of a mask
//   .shutter  photos that open like a capsule
//   .pop      cards that pop in
export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    document
      .querySelectorAll(":is(.reveal, .rise, .shutter, .pop):not(.is-visible)")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

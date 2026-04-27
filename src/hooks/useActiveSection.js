import { useState, useEffect } from 'react';

export default function useActiveSection(containerRef) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const root = containerRef?.current ?? null;
    const sections = (root ?? document).querySelectorAll('[data-section]');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Array.from(sections).indexOf(entry.target);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { root, threshold: 0.3 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [containerRef]);

  return activeIndex;
}

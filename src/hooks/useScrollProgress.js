import { useState, useEffect } from 'react';

export default function useScrollProgress(containerRef) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef?.current ?? window;
    const isWindow = el === window;

    function handleScroll() {
      let scrollTop, scrollHeight, clientHeight;
      if (isWindow) {
        scrollTop    = window.scrollY;
        scrollHeight = document.documentElement.scrollHeight;
        clientHeight = window.innerHeight;
      } else {
        scrollTop    = el.scrollTop;
        scrollHeight = el.scrollHeight;
        clientHeight = el.clientHeight;
      }
      const max = scrollHeight - clientHeight;
      setProgress(max > 0 ? Math.min(scrollTop / max, 1) : 0);
    }

    el.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => el.removeEventListener('scroll', handleScroll);
  }, [containerRef]);

  return progress;
}

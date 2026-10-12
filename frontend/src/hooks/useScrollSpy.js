import { useEffect, useState } from 'react';

/**
 * Tracks which section (by id) is currently most visible in the viewport.
 * Returns the active id; falls back to the first id.
 */
export default function useScrollSpy(ids, { rootMargin = '-35% 0px -55% 0px' } = {}) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin, threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids.join('|'), rootMargin]); // eslint-disable-line react-hooks/exhaustive-deps

  return active;
}

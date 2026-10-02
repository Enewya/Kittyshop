"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Tracks the pointer's horizontal position over `ref` as a fraction of the
 * element's width (0 = left edge, 1 = right edge). Raw input: no smoothing.
 * Returns null until the first pointermove.
 */
export function usePointerFraction(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
): number | null {
  const [fraction, setFraction] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    const onPointerMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0) return;
      const x = (event.clientX - rect.left) / rect.width;
      setFraction(Math.min(1, Math.max(0, x)));
    };

    el.addEventListener("pointermove", onPointerMove);
    return () => el.removeEventListener("pointermove", onPointerMove);
  }, [ref, enabled]);

  return fraction;
}

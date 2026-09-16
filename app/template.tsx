"use client";

import { useEffect, useState } from "react";

let hasNavigated = false;

/**
 * Route fade (M11). The first page load renders without the fade so it never
 * delays LCP; client-side navigations fade in over 150ms.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => hasNavigated);

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return <div className={animate ? "route-fade" : undefined}>{children}</div>;
}

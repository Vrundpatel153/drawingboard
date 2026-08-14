import React from 'react';

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE TRANSITION — Zero-delay instant pass-through
   Page change transitions removed per design requirement.
───────────────────────────────────────────────────────────────────────────── */
export default function PageTransition({ children }) {
  return <>{children}</>;
}

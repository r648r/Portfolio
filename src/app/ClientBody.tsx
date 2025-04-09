"use client";

import { useEffect } from "react";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Apply default theme class to body on mount
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.classList.add("antialiased", "theme-blue");
  }, []);

  return (
    <div className="antialiased" suppressHydrationWarning>
      {children}
    </div>
  );
}

"use client";

import React from "react";

export default function ClientBody({ children }: { children: React.ReactNode }) {
  // Simple wrapper component sans ScrollLock
  return <>{children}</>;
}
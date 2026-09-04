"use client";

import type { ReactNode } from "react";

type FadeInSectionProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
};

export function FadeInSection({
  children,
  className = "",
  delayMs = 0,
}: FadeInSectionProps) {
  return (
    <section
      className={`animate-fade-in-up ${className}`}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      {children}
    </section>
  );
}

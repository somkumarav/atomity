"use client";

import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("bg-white px-6 py-5 rounded-2xl shadow-sm", className)}>
      {children}
    </div>
  );
}

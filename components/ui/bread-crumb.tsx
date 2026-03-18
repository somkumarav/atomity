"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export function Breadcrumb({
  crumbs,
  activeCrumb,
  className,
  onClick,
}: {
  crumbs: {
    label: string;
    value: string;
  }[];
  activeCrumb: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <nav className={cn("flex items-center", className)}>
      <ol className='flex items-center gap-1'>
        {crumbs.map((crumb, index) => {
          const isActive = activeCrumb == crumb.value;

          return (
            <motion.li
              key={crumb.value}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className='flex items-center gap-1'
            >
              {isActive ? (
                <span className='text-sm font-semibold text-accent-foreground'>
                  {crumb.label}
                </span>
              ) : (
                <>
                  <button
                    onClick={onClick}
                    className={cn(
                      "text-sm font-medium text-muted-foreground hover:text-muted-foreground/50 transition-colors px-1",
                      isActive ? "cursor-default" : "cursor-pointer",
                    )}
                  >
                    {crumb.label}
                  </button>
                  <span className='text-muted-foreground'>
                    {<ChevronRight strokeWidth={2} size={16} />}
                  </span>
                </>
              )}
            </motion.li>
          );
        })}
      </ol>
    </nav>
  );
}

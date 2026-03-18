"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronDown } from "lucide-react";

export function Dropdown({
  options,
  defaultValue,
  onSelect,
}: {
  options: { label: string; value: string }[];
  defaultValue: string;
  onSelect?: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const selected = options.find((option) => option.value === selectedValue);
  const containerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, [close]);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelect?.(value);
    close();
  };

  return (
    <div ref={containerRef} className='relative inline-block z-50'>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex items-center justify-between gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all hover:cursor-pointer min-w-[150px] border-border",
          open && "border-accent-foreground dark:border-accent/30",
        )}
      >
        <span className='flex items-center gap-2'>
          <span className={cn(!selected && "text-muted-foreground")}>
            {selected?.label ?? "Select an option"}
          </span>
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className='text-neutral-400'
        >
          <ChevronDown size={16} strokeWidth={2} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className='absolute z-50 mt-1.5 min-w-full border border-border rounded-xl shadow-lg shadow-black/5 py-1 overflow-hidden bg-popover'
          >
            {options.map((option, i) => {
              const isSelected = option.value === selectedValue;
              return (
                <motion.li
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    "group flex items-center justify-between space-x-2 px-4 py-2.5 text-sm cursor-pointer transition-colors",
                    isSelected
                      ? "text-accent-foreground bg-accent/10 font-medium"
                      : "text-muted-foreground hover:bg-muted/50",
                  )}
                >
                  <span className='flex items-center gap-2'>
                    {option.label}
                  </span>
                  {isSelected && (
                    <span className='text-accent-foreground'>
                      <CheckIcon size={16} strokeWidth={2} />
                    </span>
                  )}
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

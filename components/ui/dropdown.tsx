"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronDown } from "lucide-react";

export function Dropdown({
  options,
  defaultValue,
}: {
  options: { label: string; value: string }[];
  defaultValue: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === defaultValue);
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

  const toggleShowOption = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div ref={containerRef} className={cn("relative inline-block")}>
      <button
        onClick={toggleShowOption}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all hover:cursor-pointer",
          "bg-white border-neutral-200 text-neutral-700",
          open && "border-[#00D97E] ring-2 ring-[#00D97E]/20",
          "min-w-[150px] justify-between",
        )}
      >
        <span className='flex items-center gap-2'>
          <span className={cn(!selected && "text-neutral-400")}>
            {selected?.label}
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
        {!open ? null : (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className={
              "absolute z-50 mt-1.5 min-w-full bg-white border border-neutral-100 rounded-xl shadow-lg shadow-black/5 py-1 overflow-hidden"
            }
          >
            {options.map((option, i) => {
              const isSelected = option.value === defaultValue;
              return (
                <motion.li
                  key={option.value}
                  onClick={toggleShowOption}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    "flex items-center justify-between gap-2 px-4 py-2.5 text-sm cursor-pointer transition-colors",
                    isSelected
                      ? "text-[#00994D] bg-[#00D97E]/08 font-medium"
                      : "text-neutral-700 hover:bg-neutral-50",
                  )}
                >
                  <span className='flex items-center gap-2'>
                    {option.label}
                  </span>
                  {isSelected && (
                    <span className='text-[#00D97E]'>
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

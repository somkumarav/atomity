"use client";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Bar = ({
  label,
  height,
  href,
  disabled,
}: {
  label: string;
  height: number;
  href: string;
  disabled: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  return (
    <div
      className='flex flex-col items-center gap-2 flex-1 h-full justify-end'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        onClick={() => !disabled && router.push(href)}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeIn",
        }}
        style={{
          height: `${height}%`,
          originY: 1,
        }}
        className={cn(
          "w-full bg-accent rounded-xl transition-all duration-150",
          disabled ? "cursor-default" : "cursor-pointer hover:brightness-110",
          isHovered && "brightness-110",
        )}
      />
      <span className='h-4 text-xs font-medium text-accent-foreground'>
        {label}
      </span>
    </div>
  );
};

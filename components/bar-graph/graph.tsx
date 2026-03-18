"use client";
import { usePathname } from "next/navigation";
import { Bar } from "./bar";

export const Graph = ({
  bars,
}: {
  bars: { id: number | string; label: string; height: number }[];
}) => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const isPodLevel = segments.length === 2;
  const max =
    Math.ceil(Math.max(...bars.map((bar) => bar.height), 1) / 100) * 100;
  const gridLines = [25, 50, 75, 100];

  return (
    <div className='relative h-full flex w-full items-end justify-between px-8'>
      <div className='absolute inset-0 pb-6'>
        {gridLines.map((line) => (
          <div
            key={line}
            className='absolute w-full h-0.5'
            style={{
              bottom: `${line}%`,
              backgroundImage: `repeating-linear-gradient(
                to right,
                color-mix(in srgb, var(--muted-foreground) 30%, transparent) 0px,
                color-mix(in srgb, var(--muted-foreground) 30%, transparent) 4px,
                transparent 4px,
                transparent 10px
              )`,
            }}
          />
        ))}
      </div>
      <div className='flex h-full items-end justify-between w-full z-10 space-x-24 pb-6'>
        {bars.map((bar) => {
          const height = (bar.height / max) * 100;
          return (
            <Bar
              key={bar.id}
              label={bar.label}
              height={height}
              href={`${pathname === "/" ? "" : pathname}/${bar.id}`}
              disabled={isPodLevel}
            />
          );
        })}
      </div>
    </div>
  );
};

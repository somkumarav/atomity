import { Bar } from "./bar";

export const Graph = ({
  bars,
}: {
  bars: { label: string; height: number }[];
}) => {
  const max =
    Math.ceil(Math.max(...bars.map((bar) => bar.height), 1) / 1000) * 1000;
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
        {bars.map((bar, i) => {
          const height = (bar.height / max) * 100;
          return <Bar key={i} label={bar.label} height={height} />;
        })}
      </div>
    </div>
  );
};

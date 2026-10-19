import { Children, type ComponentProps } from "react";
import { cn } from "../../../src/app/components/ui/utils";

type MarqueeProps = ComponentProps<"div"> & {
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  paused?: boolean;
  repeat?: number;
};

export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  paused = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  const items = Children.toArray(children);

  return (
    <div
      {...props}
      data-paused={paused || undefined}
      data-hover-pause={pauseOnHover || undefined}
      className={cn(
        "mployus-marquee group flex min-w-0 overflow-hidden [--duration:20s] [--gap:1rem] gap-(--gap)",
        vertical ? "flex-col" : "flex-row",
        className,
      )}
    >
      {Array.from({ length: repeat }, (_, groupIndex) => (
        <div
          key={groupIndex}
          aria-hidden={groupIndex > 0 ? true : undefined}
          data-reverse={reverse || undefined}
          className={cn(
            "mployus-marquee-track flex shrink-0 gap-(--gap)",
            vertical ? "mployus-marquee-vertical flex-col" : "mployus-marquee-horizontal flex-row",
            groupIndex > 0 && "mployus-marquee-copy",
          )}
        >
          {items}
        </div>
      ))}
    </div>
  );
}

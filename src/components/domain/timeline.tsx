import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type TimelineItem = {
  year: string;
  title: string;
  detail: string;
  result?: string;
};

type TimelineProps = {
  items: TimelineItem[];
  className?: string;
};

export function Timeline({ items, className }: TimelineProps) {
  return (
    <ol className={cn("relative ms-3 space-y-0 border-s border-border md:ms-4", className)}>
      {items.map((item) => (
        <li key={`${item.year}-${item.title}`} className="relative ps-8 pb-10 last:pb-0">
          <span
            className="bg-primary ring-background absolute top-1.5 -start-[5px] size-2.5 rounded-full ring-4"
            aria-hidden
          />
          <div className="flex flex-wrap items-center gap-2">
            <time className="font-mono text-sm font-semibold text-primary" dateTime={item.year}>
              {item.year}
            </time>
            {item.result ? <Badge tone="neutral">{item.result}</Badge> : null}
          </div>
          <h3 className="mt-2 text-lg font-semibold tracking-tight">{item.title}</h3>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {item.detail}
          </p>
        </li>
      ))}
    </ol>
  );
}

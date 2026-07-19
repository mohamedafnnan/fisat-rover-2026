import { cn } from "@/lib/utils";

export type StatItem = {
  label: string;
  value: string;
  hint?: string;
};

type StatGridProps = {
  items: StatItem[];
  className?: string;
};

export function StatGrid({ items, className }: StatGridProps) {
  return (
    <dl className={cn("grid grid-cols-2 gap-3 sm:grid-cols-4", className)}>
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-lg border border-border bg-card px-4 py-3"
        >
          <dt className="text-caption text-muted-foreground">{item.label}</dt>
          <dd className="font-mono text-lg font-semibold tracking-tight">{item.value}</dd>
          {item.hint ? (
            <p className="mt-1 text-caption text-muted-foreground">{item.hint}</p>
          ) : null}
        </div>
      ))}
    </dl>
  );
}

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  message?: string;
  actionLabel?: string;
  actionHref?: string;
}

function EmptyState({
  className,
  icon,
  title,
  message,
  actionLabel,
  actionHref,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-subtle px-6 py-12 text-center",
        className,
      )}
      role="status"
      {...props}
    >
      {icon ? (
        <div className="text-muted-foreground [&_svg]:size-8" aria-hidden>
          {icon}
        </div>
      ) : null}
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {message ? <p className="max-w-md text-sm text-muted-foreground">{message}</p> : null}
      </div>
      {actionLabel && actionHref ? (
        <Button asChild variant="secondary" size="sm">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      ) : null}
    </div>
  );
}

export { EmptyState };

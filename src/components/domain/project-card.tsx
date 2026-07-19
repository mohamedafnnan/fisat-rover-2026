import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type ProjectCardProps = {
  href: string;
  title: string;
  summary: string;
  eyebrow?: string;
  chips?: string[];
  resultBadge?: string;
  className?: string;
};

export function ProjectCard({
  href,
  title,
  summary,
  eyebrow,
  chips,
  resultBadge,
  className,
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className={cn("group block h-full rounded-lg focus-visible:outline-none", className)}
    >
      <Card className="h-full transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-border-strong motion-reduce:transform-none">
        <CardHeader className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {eyebrow ? <Badge tone="accent">{eyebrow}</Badge> : null}
            {resultBadge ? <Badge tone="mars">{resultBadge}</Badge> : null}
          </div>
          <CardTitle className="flex items-start justify-between gap-2 text-base">
            <span>{title}</span>
            <ArrowUpRight
              className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </CardTitle>
          <CardDescription className="leading-relaxed">{summary}</CardDescription>
          {chips?.length ? (
            <ul className="flex flex-wrap gap-1.5 pt-1">
              {chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-sm border border-border bg-muted px-2 py-0.5 text-caption text-muted-foreground"
                >
                  {chip}
                </li>
              ))}
            </ul>
          ) : null}
        </CardHeader>
      </Card>
    </Link>
  );
}

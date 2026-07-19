import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type TeamCardProps = {
  name: string;
  role: string;
  division?: string;
  bio?: string;
  variant?: "lead" | "member" | "advisor" | "alumni";
  className?: string;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function TeamCard({
  name,
  role,
  division,
  bio,
  variant = "member",
  className,
}: TeamCardProps) {
  return (
    <Card
      className={cn(
        "h-full transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transform-none",
        className,
      )}
    >
      <CardHeader className="flex-row items-start gap-4 space-y-0">
        <div
          className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-sm font-semibold text-primary"
          aria-hidden
        >
          {initials(name)}
        </div>
        <div className="min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle className="text-base">{name}</CardTitle>
            {variant === "lead" ? <Badge tone="accent">Lead</Badge> : null}
            {variant === "advisor" ? <Badge tone="neutral">Advisor</Badge> : null}
            {variant === "alumni" ? <Badge tone="mars">Alumni</Badge> : null}
          </div>
          <CardDescription>
            {role}
            {division ? (
              <span className="text-muted-foreground/70"> · {division}</span>
            ) : null}
          </CardDescription>
          {bio ? <p className="pt-1 text-sm leading-relaxed text-muted-foreground">{bio}</p> : null}
        </div>
      </CardHeader>
    </Card>
  );
}

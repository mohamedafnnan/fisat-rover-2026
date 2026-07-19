import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  className?: string;
  titleAs?: "h2" | "h3";
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  body,
  align = "left",
  className,
  titleAs: Title = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl space-y-3",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-overline text-primary">{eyebrow}</p>
      ) : null}
      <Title id={id}>{title}</Title>
      {body ? <p className="text-body-lg text-muted-foreground">{body}</p> : null}
    </div>
  );
}

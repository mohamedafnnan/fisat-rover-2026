import * as React from "react";
import { cn } from "@/lib/utils";

type ContainerSize = "narrow" | "default" | "wide" | "full";

const sizeClass: Record<ContainerSize, string> = {
  narrow: "container-narrow",
  default: "container-default",
  wide: "container-wide",
  full: "w-full px-4 md:px-6",
};

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  as?: "div" | "section" | "article" | "main";
}

function Container({
  className,
  size = "default",
  as: Comp = "div",
  ...props
}: ContainerProps) {
  return <Comp className={cn(sizeClass[size], className)} {...props} />;
}

export { Container };

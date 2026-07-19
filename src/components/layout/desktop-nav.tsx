"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { mainNav } from "@/config/site";
import { cn } from "@/lib/utils";

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <NavigationMenu.Root className="relative z-40 hidden lg:flex">
      <NavigationMenu.List className="flex items-center gap-1">
        {mainNav.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          if (!item.children?.length) {
            return (
              <NavigationMenu.Item key={item.href}>
                <NavigationMenu.Link asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex h-10 items-center rounded-md px-3 text-sm font-medium transition-colors",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.title}
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            );
          }

          return (
            <NavigationMenu.Item key={item.href}>
              <NavigationMenu.Trigger
                className={cn(
                  "group inline-flex h-10 items-center gap-1 rounded-md px-3 text-sm font-medium transition-colors",
                  "hover:bg-muted hover:text-foreground focus:outline-none",
                  "data-[state=open]:bg-muted",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.title}
                <ChevronDown
                  className="relative top-px size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180"
                  aria-hidden
                />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute top-full left-0 mt-2 w-[min(28rem,calc(100vw-2rem))] rounded-lg border border-border bg-popover p-3 shadow-lg">
                <ul className="grid gap-1 sm:grid-cols-2">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <NavigationMenu.Link asChild>
                        <Link
                          href={child.href}
                          className="block rounded-md p-3 transition-colors hover:bg-muted focus:bg-muted"
                        >
                          <div className="text-sm font-medium text-foreground">
                            {child.title}
                          </div>
                          {child.description ? (
                            <p className="mt-1 text-xs text-muted-foreground">
                              {child.description}
                            </p>
                          ) : null}
                        </Link>
                      </NavigationMenu.Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          );
        })}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

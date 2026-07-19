"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronDown, Menu, X } from "lucide-react";
import { mainNav, type NavItem } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function MobileNavItem({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const isActive =
    pathname === item.href || pathname.startsWith(`${item.href}/`);

  if (!item.children?.length) {
    return (
      <Link
        href={item.href}
        onClick={onNavigate}
        className={cn(
          "block rounded-md px-3 py-3 text-base font-medium",
          isActive ? "bg-primary-subtle text-primary" : "text-foreground hover:bg-muted",
        )}
        aria-current={isActive ? "page" : undefined}
      >
        {item.title}
      </Link>
    );
  }

  return (
    <div className="rounded-md">
      <button
        type="button"
        className={cn(
          "flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-base font-medium",
          isActive ? "bg-primary-subtle text-primary" : "text-foreground hover:bg-muted",
        )}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {item.title}
        <ChevronDown
          className={cn("size-4 transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>
      {open ? (
        <ul className="mt-1 space-y-1 border-l border-border pl-3 ml-3">
          {item.children.map((child) => {
            const childActive =
              pathname === child.href || pathname.startsWith(`${child.href}/`);
            return (
              <li key={child.href}>
                <Link
                  href={child.href}
                  onClick={onNavigate}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm",
                    childActive
                      ? "bg-primary-subtle text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                  aria-current={childActive ? "page" : undefined}
                >
                  <span className="font-medium">{child.title}</span>
                  {child.description ? (
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {child.description}
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const close = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5" aria-hidden />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/40 data-[state=open]:animate-in data-[state=closed]:animate-out" />
        <Dialog.Content
          className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-background shadow-xl focus:outline-none"
          aria-describedby={undefined}
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <Dialog.Title className="text-base font-semibold">Menu</Dialog.Title>
            <Dialog.Close asChild>
              <Button type="button" variant="ghost" size="icon-sm" aria-label="Close menu">
                <X className="size-4" aria-hidden />
              </Button>
            </Dialog.Close>
          </div>

          <div className="flex gap-2 border-b border-border p-4">
            <Button asChild variant="primary" className="flex-1" onClick={close}>
              <Link href="/join">Join</Link>
            </Button>
            <Button asChild variant="secondary" className="flex-1" onClick={close}>
              <Link href="/sponsors">Sponsor Us</Link>
            </Button>
          </div>

          <nav className="flex-1 overflow-y-auto p-3" aria-label="Mobile">
            <ul className="space-y-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <MobileNavItem item={item} onNavigate={close} />
                </li>
              ))}
              <li>
                <Link
                  href="/mission"
                  onClick={close}
                  className="block rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
                >
                  Mission
                </Link>
              </li>
              <li>
                <Link
                  href="/achievements"
                  onClick={close}
                  className="block rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
                >
                  Achievements
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  onClick={close}
                  className="block rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

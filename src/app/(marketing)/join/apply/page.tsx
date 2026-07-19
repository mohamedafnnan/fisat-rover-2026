"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { subsystems } from "@/content/site-content";

export default function ApplyPage() {
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = React.useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setMessage("Application received. We’ll follow up by email.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Email rover@fisat.ac.in and we’ll take it from there.");
    }
  }

  return (
    <div className="section-y">
      <Container className="max-w-2xl space-y-8">
        <div className="space-y-3">
          <Badge tone="accent">Recruitment · Apply</Badge>
          <h1>Application</h1>
          <p className="text-body-lg text-muted-foreground">
            Tell us who you are and what you want to own. Backend wiring lands with CMS — this form
            posts to the foundation API stub today.
          </p>
          <p className="text-sm text-muted-foreground">
            Prefer email?{" "}
            <a className="text-primary underline-offset-4 hover:underline" href="mailto:rover@fisat.ac.in">
              rover@fisat.ac.in
            </a>
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5 rounded-xl border border-border bg-card p-6" noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" name="name" required autoComplete="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required autoComplete="email" />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="year">Year of study</Label>
              <Input id="year" name="year" placeholder="e.g. 2nd year" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subsystem">Primary subsystem</Label>
              <select
                id="subsystem"
                name="subsystem"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                defaultValue=""
              >
                <option value="" disabled>
                  Select…
                </option>
                {subsystems.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.title}
                  </option>
                ))}
                <option value="any">Open to any</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="portfolio">Portfolio / GitHub / LinkedIn (optional)</Label>
            <Input id="portfolio" name="portfolio" type="url" placeholder="https://" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="why">What do you want to own this season?</Label>
            <textarea
              id="why"
              name="why"
              required
              rows={5}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="A few sentences is enough."
            />
          </div>

          <div
            role="status"
            aria-live="polite"
            className={
              status === "error"
                ? "text-sm text-destructive"
                : status === "success"
                  ? "text-sm text-success"
                  : "text-sm text-muted-foreground"
            }
          >
            {message}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="submit" variant="primary" loading={status === "loading"}>
              Submit application
            </Button>
            <Button asChild variant="secondary">
              <Link href="/join/roles">Back to roles</Link>
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
}
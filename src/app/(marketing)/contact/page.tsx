"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { contactChannels } from "@/content/site-content";

export default function ContactPage() {
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = React.useState("");
  const [inquiry, setInquiry] = React.useState("general");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("success");
      setMessage("Message sent. We’ll reply by email.");
      form.reset();
      setInquiry("general");
    } catch {
      setStatus("error");
      setMessage("Could not send. Email rover@fisat.ac.in directly.");
    }
  }

  return (
    <div className="section-y">
      <Container className="grid gap-12 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-8">
          <div className="space-y-3">
            <Badge tone="accent">Contact</Badge>
            <h1>Single front door</h1>
            <p className="text-body-lg text-muted-foreground">
              Sponsorship, press, recruitment, or general questions — pick a type and we’ll route it.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5 rounded-xl border border-border bg-card p-6">
            <div className="space-y-2">
              <Label htmlFor="inquiry">Inquiry type</Label>
              <select
                id="inquiry"
                name="inquiry"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={inquiry}
                onChange={(e) => setInquiry(e.target.value)}
              >
                <option value="general">General</option>
                <option value="sponsor">Sponsorship</option>
                <option value="press">Press / media</option>
                <option value="recruitment">Recruitment</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required autoComplete="name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required autoComplete="email" />
              </div>
            </div>

            {inquiry === "sponsor" ? (
              <div className="space-y-2">
                <Label htmlFor="org">Organization</Label>
                <Input id="org" name="org" autoComplete="organization" />
              </div>
            ) : null}

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" name="subject" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                    : "sr-only"
              }
            >
              {message || "Form status"}
            </div>

            <Button type="submit" variant="primary" loading={status === "loading"}>
              Send message
            </Button>
          </form>
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <h2 className="text-base font-semibold">Direct channels</h2>
            <ul className="space-y-3 text-sm">
              {contactChannels.map((c) => (
                <li key={c.label}>
                  <p className="text-caption text-muted-foreground">{c.label}</p>
                  <a href={c.href} className="font-medium text-primary hover:underline">
                    {c.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-subtle p-5 space-y-3">
            <h2 className="text-base font-semibold">Campus</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Federal Institute of Science and Technology (FISAT)
              <br />
              Angamaly, Kerala, India
            </p>
            <Button asChild variant="secondary" size="sm">
              <Link href="/press">Press kit</Link>
            </Button>
          </div>
        </aside>
      </Container>
    </div>
  );
}
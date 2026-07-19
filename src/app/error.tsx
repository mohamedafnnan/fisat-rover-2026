"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ErrorState } from "@/components/feedback/error-state";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Hook for observability (Sentry, etc.)
    console.error(error);
  }, [error]);

  return (
    <div className="section-y">
      <Container className="max-w-xl space-y-4">
        <ErrorState
          title="This page hit a snag"
          message="Something unexpected happened while rendering this section. You can retry or head home."
          onRetry={reset}
        />
        <div className="flex justify-center gap-3">
          <Button asChild variant="secondary" size="sm">
            <Link href="/">Home</Link>
          </Button>
          <Button asChild variant="tertiary" size="sm">
            <Link href="/contact">Contact</Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}

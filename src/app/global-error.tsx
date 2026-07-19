"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-neutral-50 antialiased">
        <main className="mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center gap-4 px-6 text-center">
          <h1 className="text-2xl font-semibold">Critical error</h1>
          <p className="text-sm text-neutral-400">
            The application failed to load. Please try again.
            {error.digest ? (
              <span className="mt-2 block font-mono text-xs">Ref: {error.digest}</span>
            ) : null}
          </p>
          <button
            type="button"
            onClick={reset}
            className="rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-500"
          >
            Retry
          </button>
        </main>
      </body>
    </html>
  );
}

"use client";

/**
 * Root-level error boundary — must define its own <html>/<body>
 * because the root layout may have failed. Keep styles self-contained
 * (no theme providers / design-system components available here).
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          background: "#0a0a0a",
          color: "#fafafa",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <main
          style={{
            margin: "0 auto",
            display: "flex",
            minHeight: "100dvh",
            maxWidth: "32rem",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#a3a3a3",
            }}
          >
            FISAT Rover
          </p>
          <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600 }}>
            Critical error
          </h1>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "#a3a3a3", lineHeight: 1.5 }}>
            The application failed to load. Please try again.
            {error.digest ? (
              <span
                style={{
                  display: "block",
                  marginTop: "0.5rem",
                  fontFamily: "ui-monospace, monospace",
                  fontSize: "0.75rem",
                }}
              >
                Ref: {error.digest}
              </span>
            ) : null}
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              border: 0,
              borderRadius: "0.375rem",
              background: "#0284c7",
              color: "#fff",
              fontSize: "0.875rem",
              fontWeight: 500,
              padding: "0.5rem 1rem",
              cursor: "pointer",
            }}
          >
            Retry
          </button>
        </main>
      </body>
    </html>
  );
}

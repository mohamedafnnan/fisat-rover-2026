/**
 * World route group — minimal chrome.
 * Full R3F canvas loads only inside /explore (client island).
 */
export default function WorldLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <a
        href="#world-main"
        className="bg-primary text-primary-foreground focus:ring-ring sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
      >
        Skip to world controls
      </a>
      <main id="world-main" className="min-h-dvh" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}

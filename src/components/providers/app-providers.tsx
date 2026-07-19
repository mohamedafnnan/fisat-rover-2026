"use client";

import * as React from "react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <Toaster
        position="bottom-right"
        closeButton
        richColors
        toastOptions={{
          className: "font-sans",
        }}
      />
    </ThemeProvider>
  );
}

export { AppProviders };

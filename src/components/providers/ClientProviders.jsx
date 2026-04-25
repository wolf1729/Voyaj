"use client";

import { SnackbarProvider, SnackbarContainer, SnackbarManager } from "popcrumb";

export function ClientProviders({ children }) {
  return (
    <SnackbarProvider>
      <SnackbarManager />
      <SnackbarContainer />
      {children}
    </SnackbarProvider>
  );
}

import { I18nextProvider } from "react-i18next";
import type { ReactNode } from "react";
import { BrowserRouter } from "react-router";

import i18n from "@/shared/i18n/config";
import { ThemeProvider } from "@/components/app";
import { Toaster } from "@/components/ui/sonner";

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme">
        <BrowserRouter>{children}</BrowserRouter>
        <Toaster position="top-right" richColors />
      </ThemeProvider>
    </I18nextProvider>
  );
}

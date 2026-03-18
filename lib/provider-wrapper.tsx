"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export const ProviderWrapper = ({ children }: { children: ReactNode }) => {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

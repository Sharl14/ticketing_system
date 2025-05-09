"use client";
//pnpm install @tanstack/react-query
//app/QueryClientProvider.tsx
"use client";

import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode } from "react";

export function QueryClientProvider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
}

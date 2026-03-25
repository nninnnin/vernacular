"use client";

import { SessionProvider } from "next-auth/react";
import { useSyncOnLogin } from "@/hooks/useSyncOnLogin";

function SyncOnLogin() {
  useSyncOnLogin();
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SyncOnLogin />
      {children}
    </SessionProvider>
  );
}

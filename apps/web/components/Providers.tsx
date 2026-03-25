"use client";

import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { useSyncOnLogin } from "@/hooks/useSyncOnLogin";
import { useTokenStore } from "@/lib/store";

function SyncOnLogin() {
  useSyncOnLogin();
  return null;
}

function StoreHydrator() {
  useEffect(() => {
    useTokenStore.persist.rehydrate();
  }, []);
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <StoreHydrator />
      <SyncOnLogin />
      {children}
    </SessionProvider>
  );
}

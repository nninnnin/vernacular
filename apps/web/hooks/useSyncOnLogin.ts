"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { useTokenStore } from "@/lib/store";

export function useSyncOnLogin() {
  const { data: session, status } = useSession();
  const { tokens, clearLocal } = useTokenStore();
  const synced = useRef(false);

  useEffect(() => {
    if (status !== "authenticated" || synced.current) return;

    synced.current = true;

    fetch("/api/ds/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tokens }),
    }).then(() => {
      clearLocal();
    });
  }, [status, tokens, clearLocal]);
}

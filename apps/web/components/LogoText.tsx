"use client";

import { useEffect, useState } from "react";

export default function LogoText() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("vernacular:user");
      if (stored) {
        const { name } = JSON.parse(stored);
        setUsername(name ?? null);
      }
    } catch {}
  }, []);

  return (
    <span className="text-base font-semibold tracking-tight font-mono">
      {username ? (
        <>
          <span className="text-zinc-400">@vrnclr/</span>
          {username}
        </>
      ) : (
        <span className="text-zinc-400">@vrnclr</span>
      )}
    </span>
  );
}

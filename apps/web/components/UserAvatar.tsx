"use client";

import { useEffect, useState } from "react";
import { adjectives, nouns } from "@/lib/wordlist";
import { Avatar } from "@vernacular/ui";

type AnonUser = {
  name: string;
  key: string;
};

function generateName(): string {
  const used: string[] = JSON.parse(localStorage.getItem("vernacular:used-names") ?? "[]");
  const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  let name: string;
  let attempts = 0;
  do {
    name = `${pick(adjectives)}-${pick(nouns)}`;
    attempts++;
  } while (used.includes(name) && attempts < 200);

  used.push(name);
  localStorage.setItem("vernacular:used-names", JSON.stringify(used));
  return name;
}

function getOrCreateUser(): AnonUser {
  const stored = localStorage.getItem("vernacular:user");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed.name && parsed.key) return parsed;
    } catch {}
  }
  const user: AnonUser = { name: generateName(), key: crypto.randomUUID() };
  localStorage.setItem("vernacular:user", JSON.stringify(user));
  return user;
}

export default function UserAvatar() {
  const [user, setUser] = useState<AnonUser | null>(null);

  useEffect(() => {
    setUser(getOrCreateUser());
  }, []);

  if (!user) return <div className="w-5 h-5 rounded-full bg-zinc-100" />;

  const initials = user.name
    .split("-")
    .map((w) => w[0].toUpperCase())
    .join("");

  return (
    <Avatar
      initials={initials}
      size="sm"
      className="w-5 h-5 text-[9px] cursor-default"
      title={`Key: ${user.key}`}
    />
  );
}

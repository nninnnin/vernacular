"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/nav";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-r border-zinc-200 overflow-y-auto flex flex-col">
      <nav className="flex-1 px-3 py-4 flex flex-col gap-6">
        {nav.map(({ label, category, items }) => (
          <div key={category}>
            <p className="px-2 mb-1 text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
              {label}
            </p>
            <ul className="flex flex-col">
              {items.map((item) => {
                const href = `/${category}/${item.slug}`;
                const isActive = pathname === href;
                return (
                  <li key={item.slug}>
                    <Link
                      href={href}
                      className={`block px-2 py-1.5 text-sm rounded transition-colors ${
                        isActive
                          ? "bg-zinc-100 text-zinc-900 font-medium"
                          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

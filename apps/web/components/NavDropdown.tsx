"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/nav";

export default function NavDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Find the currently active item label
  const activeItem = nav
    .flatMap((g) => g.items)
    .find((item) => {
      const group = nav.find((g) => g.items.includes(item));
      return group && pathname === `/${group.category}/${item.slug}`;
    });

  return (
    <div ref={ref} className="fixed top-20 left-5 z-40">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center px-2.5 py-2 rounded-md border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 transition-colors shadow-sm"
      >
        <svg
          className="w-5 h-5 text-zinc-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 w-48 rounded-xl border border-zinc-200 bg-white shadow-lg py-1.5 flex flex-col gap-3 px-2">
          {nav.map(({ label, category, items }) => (
            <div key={category}>
              <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
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
                        onClick={() => setOpen(false)}
                        className={`block px-2 py-1.5 text-sm rounded-md transition-colors ${
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
        </div>
      )}
    </div>
  );
}

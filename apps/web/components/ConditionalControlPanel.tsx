"use client";

import { usePathname } from "next/navigation";
import { ControlPanel } from "@vernacular/control-panel";

export default function ConditionalControlPanel() {
  const pathname = usePathname();
  if (pathname.startsWith("/documentation")) {
    return <div className="w-64 shrink-0" />;
  }
  return <ControlPanel />;
}

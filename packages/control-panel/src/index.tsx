"use client";

import { SeedControls } from "./SeedControls";

export function ControlPanel() {
  return (
    <aside className="w-64 shrink-0 border-l border-zinc-200 overflow-y-auto flex flex-col">
      <div className="flex flex-col gap-6 px-4 py-5">
        <SeedControls />
      </div>
    </aside>
  );
}

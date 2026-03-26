"use client";

import { SeedControls } from "./SeedControls";

export function ControlPanel() {
  return (
    <aside className="w-64 shrink-0 bg-white rounded-2xl border border-zinc-200 shadow-lg overflow-y-auto flex flex-col">
      <div className="flex flex-col gap-6 px-4 py-5">
        <SeedControls />
      </div>
    </aside>
  );
}

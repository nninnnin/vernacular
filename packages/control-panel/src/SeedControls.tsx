"use client";

import { useTokenStore, neutralOptions } from "@vernacular/tokens-core";

export function SeedControls() {
  const { tokens, setSeed } = useTokenStore();
  const { seed } = tokens.color;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
        Seed
      </p>

      {/* Neutral */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-zinc-500">Neutral</label>
        <div className="flex flex-wrap gap-1.5">
          {neutralOptions.map((name) => (
            <button
              key={name}
              onClick={() => setSeed({ neutral: name })}
              className={`px-2.5 py-1 rounded text-xs capitalize transition-colors ${
                seed.neutral === name
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Accent */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-zinc-500">Accent</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={seed.accent}
            onChange={(e) => setSeed({ accent: e.target.value })}
            className="w-8 h-8 rounded border border-zinc-200 cursor-pointer bg-transparent"
          />
          <span className="text-xs text-zinc-400 font-mono">{seed.accent}</span>
        </div>
      </div>

      {/* Mode */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-zinc-500">Mode</label>
        <div className="flex gap-1.5">
          {(["light", "dark"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setSeed({ mode })}
              className={`px-2.5 py-1 rounded text-xs capitalize transition-colors ${
                seed.mode === mode
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

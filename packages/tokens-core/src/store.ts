"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  defaultTokens,
  generatePalette,
  generateSemantic,
  type ColorSeed,
  type DesignTokens,
} from "./tokens";

type NonColorGroup = Exclude<keyof DesignTokens, "color">;

type TokenStore = {
  tokens: DesignTokens;
  setSeed: (seed: Partial<ColorSeed>) => void;
  setToken: <K extends NonColorGroup>(
    group: K,
    key: keyof DesignTokens[K],
    value: string
  ) => void;
  resetTokens: () => void;
  clearLocal: () => void;
};

export const useTokenStore = create<TokenStore>()(
  persist(
    (set) => ({
      tokens: defaultTokens,
      setSeed: (partial) =>
        set((state) => {
          const seed = { ...state.tokens.color.seed, ...partial };
          const palette = generatePalette(seed);
          const semantic = generateSemantic(palette, seed.mode);
          return {
            tokens: {
              ...state.tokens,
              color: { seed, palette, semantic },
            },
          };
        }),
      setToken: (group, key, value) =>
        set((state) => ({
          tokens: {
            ...state.tokens,
            [group]: {
              ...state.tokens[group],
              [key]: value,
            },
          },
        })),
      resetTokens: () => set({ tokens: defaultTokens }),
      clearLocal: () => {
        localStorage.removeItem("vernacular-tokens");
      },
    }),
    {
      name: "vernacular-tokens",
      skipHydration: true,
    }
  )
);

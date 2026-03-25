"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultTokens, type DesignTokens } from "./tokens";

type TokenStore = {
  tokens: DesignTokens;
  setToken: <K extends keyof DesignTokens>(
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
    }
  )
);

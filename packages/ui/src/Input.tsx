import React from "react";

export type InputState = "default" | "error";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  state?: InputState;
}

const stateClasses: Record<InputState, string> = {
  default:
    "border-zinc-200 focus:ring-2 focus:ring-zinc-900 focus:border-transparent",
  error: "border-red-400 focus:ring-2 focus:ring-red-400 focus:border-transparent",
};

export function Input({ state = "default", className = "", ...props }: InputProps) {
  return (
    <input
      className={`px-3 py-2 text-sm border rounded-md bg-white text-zinc-900 outline-none transition-all disabled:bg-zinc-50 disabled:text-zinc-400 disabled:cursor-not-allowed ${stateClasses[state]} ${className}`}
      {...props}
    />
  );
}

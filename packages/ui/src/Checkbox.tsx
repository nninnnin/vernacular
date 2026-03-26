"use client";

import React from "react";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Checkbox({ label, className = "", ...props }: CheckboxProps) {
  return (
    <label
      className={`inline-flex items-center gap-2 text-sm cursor-pointer ${props.disabled ? "text-zinc-400 cursor-not-allowed" : "text-zinc-700"} ${className}`}
    >
      <input
        type="checkbox"
        className="w-4 h-4 rounded border-zinc-300 accent-zinc-900 disabled:cursor-not-allowed"
        {...props}
      />
      {label}
    </label>
  );
}

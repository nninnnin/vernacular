"use client";

import React, { useState } from "react";

export interface ToggleProps {
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export function Toggle({
  defaultChecked = false,
  checked,
  onChange,
  disabled = false,
  label,
  className = "",
}: ToggleProps) {
  const [internal, setInternal] = useState(defaultChecked);
  const on = checked !== undefined ? checked : internal;

  function handleClick() {
    if (disabled) return;
    const next = !on;
    setInternal(next);
    onChange?.(next);
  }

  return (
    <label
      className={`inline-flex items-center gap-3 text-sm ${disabled ? "text-zinc-400 cursor-not-allowed" : "text-zinc-700 cursor-pointer"} ${className}`}
    >
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={handleClick}
        disabled={disabled}
        className={`w-10 h-6 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${on ? "bg-zinc-900" : "bg-zinc-200"}`}
      >
        <span
          className={`block w-4 h-4 bg-white rounded-full shadow transition-transform mx-1 ${on ? "translate-x-4" : "translate-x-0"}`}
        />
      </button>
      {label}
    </label>
  );
}

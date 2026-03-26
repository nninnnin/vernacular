import React from "react";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function Label({ className = "", ...props }: LabelProps) {
  return (
    <label
      className={`text-xs font-medium text-zinc-600 ${className}`}
      {...props}
    />
  );
}

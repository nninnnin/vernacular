import React from "react";

export type BadgeVariant = "default" | "info" | "success" | "warning" | "error";

const variants: Record<BadgeVariant, string> = {
  default: "bg-zinc-900 text-white",
  info: "bg-blue-100 text-blue-700",
  success: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  error: "bg-red-100 text-red-700",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ variant = "default", className = "", ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

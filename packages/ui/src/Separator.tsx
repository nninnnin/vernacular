import React from "react";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

export function Separator({
  orientation = "horizontal",
  className = "",
  ...props
}: SeparatorProps) {
  return (
    <div
      role="separator"
      className={
        orientation === "horizontal"
          ? `h-px w-full bg-zinc-100 ${className}`
          : `w-px self-stretch bg-zinc-100 ${className}`
      }
      {...props}
    />
  );
}

import React from "react";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  initials: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "w-6 h-6 text-[10px]",
  md: "w-8 h-8 text-xs",
  lg: "w-10 h-10 text-sm",
};

export function Avatar({ initials, size = "md", className = "", ...props }: AvatarProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-zinc-900 text-white font-medium select-none ${sizes[size]} ${className}`}
      {...props}
    >
      {initials}
    </span>
  );
}

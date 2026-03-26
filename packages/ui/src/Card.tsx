import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-zinc-200 ${className}`}
      {...props}
    />
  );
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardHeader({ className = "", ...props }: CardHeaderProps) {
  return <div className={`p-5 flex flex-col gap-1 ${className}`} {...props} />;
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardContent({ className = "", ...props }: CardContentProps) {
  return <div className={`px-5 pb-5 ${className}`} {...props} />;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardFooter({ className = "", ...props }: CardFooterProps) {
  return (
    <div
      className={`px-5 py-4 border-t border-zinc-100 flex items-center gap-2 ${className}`}
      {...props}
    />
  );
}

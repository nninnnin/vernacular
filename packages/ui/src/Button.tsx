import React from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-zinc-900 text-white hover:bg-zinc-700",
  secondary: "border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50",
  ghost: "text-zinc-600 hover:bg-zinc-100",
  destructive: "bg-red-500 text-white hover:bg-red-600",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type ButtonAsButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asAnchor?: false;
  };

type ButtonAsAnchorProps = BaseProps & {
  asAnchor: true;
  children: React.ReactElement<React.AnchorHTMLAttributes<HTMLAnchorElement>>;
};

export type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

function buildClasses(variant: ButtonVariant, size: ButtonSize, className: string) {
  return `inline-flex items-center justify-center font-medium rounded-md transition-colors disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`.trim();
}

function isAnchorLike(type: unknown): boolean {
  if (type === "a") return true;
  if (typeof type !== "function" && typeof type !== "object") return false;
  const name =
    (type as any).displayName?.toLowerCase() ||
    (type as any).name?.toLowerCase() ||
    "";
  return name.includes("link");
}

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className = "" } = props;
  const classes = buildClasses(variant, size, className);

  if (props.asAnchor) {
    const { children } = props;

    if (process.env.NODE_ENV === "development") {
      if (!isAnchorLike((children as any)?.type)) {
        console.warn(
          "[Button] asAnchor: 자식은 anchor 계열이어야 해요. (예: <a>, <Link>)"
        );
      }
    }

    const childClassName = (children.props as any).className;
    return React.cloneElement(children, {
      className: childClassName ? `${classes} ${childClassName}` : classes,
    } as any);
  }

  const { asAnchor: _a, variant: _v, size: _s, className: _c, ...rest } =
    props as ButtonAsButtonProps;
  return <button className={classes} {...rest} />;
}

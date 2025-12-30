import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  href,
  className = "",
  type = "button",
}) => {
  const baseClasses =
    "inline-block font-medium transition-all duration-300 text-center";

  const variantClasses = {
    primary:
      "bg-[#b59a5b] text-white hover:bg-[#9a8643] border-2 border-[#9a8643]",
    secondary:
      "bg-amber-700 text-white hover:bg-amber-800 border-2 border-amber-700",
    outline:
      "bg-transparent text-slate-900 border-2 border-slate-900 hover:bg-slate-900 hover:text-white",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

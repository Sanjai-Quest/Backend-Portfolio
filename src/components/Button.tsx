import React from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  isLoading = false,
  disabled,
  icon: Icon,
  children,
  className = "",
  ...props
}) => {
  const baseClasses =
    "h-11 px-4 rounded-[10px] flex items-center justify-center font-mono text-xs font-semibold select-none transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-status-info focus:ring-offset-2 focus:ring-offset-bg-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:opacity-80";
  
  const variantClasses =
    variant === "primary"
      ? "bg-status-info hover:brightness-110 text-bg-primary"
      : "bg-transparent border border-border-primary text-text-secondary hover:text-text-primary hover:bg-card-hover";

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin mr-2" />
      ) : (
        Icon && <Icon className="w-3.5 h-3.5 mr-2" />
      )}
      <span>{children}</span>
    </button>
  );
};

// src/components/UI/Button.tsx
import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "default";
  size?: "sm" | "md" | "lg"; // ✅ Add size here
  loading?: boolean;
}

const variantClasses: Record<string, string> = {
  primary: "bg-amber-400 text-black hover:bg-amber-500",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  danger: "bg-red-500 text-white hover:bg-red-600",
  default: "bg-gray-100 text-gray-700",
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  loading,
  className = "",
  ...props
}) => {
  let sizeClass = "";
  switch (size) {
    case "sm":
      sizeClass = "px-3 py-1 text-sm";
      break;
    case "md":
      sizeClass = "px-4 py-2 text-base";
      break;
    case "lg":
      sizeClass = "px-6 py-3 text-lg";
      break;
  }

  return (
    <button
      className={`rounded-xl font-medium flex items-center justify-center ${variantClasses[variant]} ${sizeClass} ${className} ${
        loading ? "opacity-70 cursor-not-allowed" : ""
      }`}
      disabled={loading}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

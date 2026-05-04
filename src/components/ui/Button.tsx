import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "ghost";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "outline",
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "px-6 py-3 transition-all duration-200 text-sm font-medium border";
  const variants = {
    outline: `
      border-[#C4C4C4] text-black bg-transparent
      hover:bg-[#C4C4C4] active:bg-[#C4C4C4]
      disabled:border-gray-300 disabled:text-gray-400 disabled:bg-transparent disabled:cursor-not-allowed
    `,
    ghost: "border-transparent hover:bg-gray-100",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

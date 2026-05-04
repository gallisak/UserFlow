import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "px-10 py-2 text-sm transition-all duration-200 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed";

  const variants = {
    primary: "border-2 border-[#C4C4C4] hover:bg-gray-50 active:bg-gray-100",
    secondary: "bg-[#C4C4C4] text-gray-700 border border-[#C4C4C4]",
    outline:
      "border border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-700",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

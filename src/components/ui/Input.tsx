import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = ({ label, className = "", ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-semibold text-[#5E626B] tracking-tight">
          {label}
        </label>
      )}
      <input
        className={`border border-gray-300 text-[#5E626B] text-sm px-3 py-2 outline-none focus:ring-1 transition-all ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;

import { Check } from "lucide-react";

interface CheckboxProps {
  checked: boolean;
}

export const Checkbox = ({ checked }: CheckboxProps) => (
  <div
    className={`w-5 h-5 border flex items-center justify-center transition-colors ${
      checked ? "bg-black border-black" : "border-gray-400"
    }`}
  >
    {checked && <Check className="w-3 h-3 text-white" />}
  </div>
);

import { ChevronDown } from "lucide-react";

interface MultiSelectTriggerProps {
  label?: string;
  selectedCount: number;
  placeholder: string;
  isOpen: boolean;
  onClick: () => void;
}

export const MultiSelectTrigger = ({
  label,
  selectedCount,
  placeholder,
  isOpen,
  onClick,
}: MultiSelectTriggerProps) => (
  <div className="flex flex-col gap-1 w-full">
    {label && (
      <label className="text-sm font-semibold text-gray-700 uppercase">
        {label}
      </label>
    )}
    <div
      onClick={onClick}
      className="border border-gray-300 px-3 py-2 cursor-pointer flex justify-between items-center min-h-10 text-sm text-gray-700 bg-white"
    >
      <span
        className={
          selectedCount === 0 ? "text-gray-400" : "text-black font-medium"
        }
      >
        {selectedCount > 0 ? `Selected (${selectedCount})` : placeholder}
      </span>
      <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
        <ChevronDown className="w-4 h-4" />
      </span>
    </div>
  </div>
);

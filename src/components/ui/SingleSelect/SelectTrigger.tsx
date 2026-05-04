import { ChevronDown } from "lucide-react";

interface SelectTriggerProps {
  label?: string;
  selectedName?: string;
  placeholder: string;
  isOpen: boolean;
  onClick: () => void;
}

export const SelectTrigger = ({
  label,
  selectedName,
  placeholder,
  isOpen,
  onClick,
}: SelectTriggerProps) => (
  <div className="flex flex-col gap-1 w-full">
    {label && (
      <label className="text-sm font-semibold text-[#5E626B]">{label}</label>
    )}
    <div
      onClick={onClick}
      className="border border-gray-300 px-3 py-2 cursor-pointer flex justify-between items-center min-h-10 text-sm text-gray-700 bg-white"
    >
      <span className={!selectedName ? "text-gray-400" : ""}>
        {selectedName || placeholder}
      </span>
      <span
        className={`text-[10px] transition-transform ${isOpen ? "rotate-180" : ""}`}
      >
        <ChevronDown size={16} />
      </span>
    </div>
  </div>
);

import { ChevronDown, Check } from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";

interface Option {
  name: string;
  value: string;
}

interface MultiselectProps {
  label?: string;
  options: Option[];
  value: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

const Multiselect = ({
  label,
  options,
  value = [],
  onChange,
  placeholder = "Select...",
}: MultiselectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const processedOptions = useMemo(() => {
    const filtered = options.filter((opt) =>
      opt.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return [...filtered].sort((a, b) => {
      const aSelected = value.includes(a.value) ? 1 : 0;
      const bSelected = value.includes(b.value) ? 1 : 0;
      return bSelected - aSelected;
    });
  }, [options, value, searchTerm]);

  const toggleOption = (optionValue: string) => {
    const newSelection = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange(newSelection);
  };

  return (
    <div className="flex flex-col gap-1 w-full relative" ref={wrapperRef}>
      {label && (
        <label className="text-sm font-semibold text-gray-700 uppercase">
          {label}
        </label>
      )}

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="border border-gray-300 px-3 py-2 cursor-pointer flex justify-between items-center min-h-10 text-sm text-gray-700 bg-white"
      >
        <span
          className={
            value.length === 0 ? "text-gray-400" : "text-black font-medium"
          }
        >
          {value.length > 0 ? `Selected (${value.length})` : placeholder}
        </span>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <ChevronDown className="w-4 h-4" />
        </span>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full z-50 border border-black bg-white -mt-px shadow-lg">
          <input
            autoFocus
            className="w-full p-3 text-sm border-b border-gray-200 outline-none focus:bg-gray-50"
            placeholder="Type to search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="max-h-60 overflow-y-auto">
            {processedOptions.map((option) => {
              const isSelected = value.includes(option.value);
              return (
                <div
                  key={option.value}
                  onClick={() => toggleOption(option.value)}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer text-sm"
                >
                  <div
                    className={`w-5 h-5 border flex items-center justify-center transition-colors ${isSelected ? "bg-black border-black" : "border-gray-400"}`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </div>

                  <span className={isSelected ? "text-gray-400" : "text-black"}>
                    {option.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Multiselect;

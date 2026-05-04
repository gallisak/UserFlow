import { ChevronDown } from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";

interface Option {
  name: string;
  value: string;
}

interface MultiselectProps {
  label?: string;
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

const Multiselect = ({
  label,
  options,
  selectedValues,
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
      const aSelected = selectedValues.includes(a.value) ? 1 : 0;
      const bSelected = selectedValues.includes(b.value) ? 1 : 0;
      return bSelected - aSelected;
    });
  }, [options, selectedValues, searchTerm]);

  const toggleOption = (value: string) => {
    const newSelection = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
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
        <span className={selectedValues.length === 0 ? "text-gray-400" : ""}>
          {selectedValues.length > 0
            ? `Selected (${selectedValues.length})`
            : placeholder}
        </span>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <ChevronDown />
        </span>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full z-50 border border-gray-300 bg-white mt-1 shadow-lg">
          <input
            autoFocus
            className="w-full p-2 text-sm border-b outline-none focus:bg-gray-50"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="max-h-60 overflow-y-auto">
            {processedOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => toggleOption(option.value)}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option.value)}
                  readOnly
                  className="w-4 h-4"
                />
                <span
                  className={
                    selectedValues.includes(option.value) ? "font-medium" : ""
                  }
                >
                  {option.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Multiselect;

import { useState, useMemo, useRef, useEffect } from "react";
import { MultiSelectTrigger } from "./MultiSelectTrigger";
import { MultiSelectOption } from "./MultiSelectOption";

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
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
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

  const toggleOption = (val: string) => {
    onChange(
      value.includes(val) ? value.filter((v) => v !== val) : [...value, val],
    );
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <MultiSelectTrigger
        label={label}
        selectedCount={value.length}
        placeholder={placeholder}
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      />

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
            {processedOptions.map((opt) => (
              <MultiSelectOption
                key={opt.value}
                name={opt.name}
                isSelected={value.includes(opt.value)}
                onClick={() => toggleOption(opt.value)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Multiselect;

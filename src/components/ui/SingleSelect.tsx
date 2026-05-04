import { useState, useMemo, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  name: string;
  value: string;
}

interface SingleSelectProps {
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SingleSelect = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Select...",
}: SingleSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

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

  const filteredOptions = useMemo(() => {
    return options.filter((opt) =>
      opt.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [options, searchTerm]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="flex flex-col gap-1 w-full relative" ref={wrapperRef}>
      {label && (
        <label className="text-sm font-semibold text-[#5E626B]">{label}</label>
      )}

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="border border-gray-300 px-3 py-2 cursor-pointer flex justify-between items-center min-h-10 text-sm text-gray-700 bg-white"
      >
        <span className={!selectedOption ? "text-gray-400" : ""}>
          {selectedOption ? selectedOption.name : placeholder}
        </span>
        <span
          className={`text-[10px] transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <ChevronDown />
        </span>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full z-50 border border-gray-300 bg-white mt-1 shadow-md">
          <input
            autoFocus
            className="w-full p-2 text-sm border-b outline-none focus:bg-gray-50"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`p-2 hover:bg-gray-100 cursor-pointer text-sm ${value === option.value ? "bg-gray-50 font-medium" : ""}`}
                >
                  {option.name}
                </div>
              ))
            ) : (
              <div className="p-2 text-xs text-gray-400 text-center">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleSelect;

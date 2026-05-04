import { useState, useMemo, useRef, useEffect } from "react";
import { SelectTrigger } from "./SelectTrigger";
import { SelectMenu } from "./SelectMenu";
import { SelectOption } from "./SelectOption";

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

  // Закриття при кліку зовні
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filteredOptions = useMemo(
    () =>
      options.filter((opt) =>
        opt.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [options, searchTerm],
  );

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <SelectTrigger
        label={label}
        selectedName={selectedOption?.name}
        placeholder={placeholder}
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <SelectMenu searchTerm={searchTerm} onSearchChange={setSearchTerm}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <SelectOption
                key={option.value}
                name={option.name}
                isSelected={value === option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                  setSearchTerm("");
                }}
              />
            ))
          ) : (
            <div className="p-2 text-xs text-gray-400 text-center">
              No results found
            </div>
          )}
        </SelectMenu>
      )}
    </div>
  );
};

export default SingleSelect;

import { Checkbox } from "./Checkbox";

interface MultiSelectOptionProps {
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

export const MultiSelectOption = ({
  name,
  isSelected,
  onClick,
}: MultiSelectOptionProps) => (
  <div
    onClick={onClick}
    className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer text-sm"
  >
    <Checkbox checked={isSelected} />
    <span className={isSelected ? "text-gray-400" : "text-black"}>{name}</span>
  </div>
);

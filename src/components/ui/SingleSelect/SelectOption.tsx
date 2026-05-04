interface SelectOptionProps {
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

export const SelectOption = ({
  name,
  isSelected,
  onClick,
}: SelectOptionProps) => (
  <div
    onClick={onClick}
    className={`p-2 hover:bg-gray-100 cursor-pointer text-sm ${
      isSelected ? "bg-gray-50 font-medium" : ""
    }`}
  >
    {name}
  </div>
);

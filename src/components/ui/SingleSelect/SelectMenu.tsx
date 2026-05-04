interface SelectMenuProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  children: React.ReactNode;
}

export const SelectMenu = ({
  searchTerm,
  onSearchChange,
  children,
}: SelectMenuProps) => (
  <div className="absolute top-full left-0 w-full z-50 border border-gray-300 bg-white mt-1 shadow-md">
    <input
      autoFocus
      className="w-full p-2 text-sm border-b outline-none focus:bg-gray-50"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
    <div className="max-h-60 overflow-y-auto">{children}</div>
  </div>
);

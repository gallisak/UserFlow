import SingleSelect from "../../components/ui/SingleSelect";
import MultiSelect from "../../components/ui/Multiselect";
import Button from "../../components/ui/Button";
import { useAppSelector } from "../../store/hooks";
import { Trash2 } from "lucide-react";

interface FilterBarProps {
  selectedDepartments: string[];
  setSelectedDepartments: (values: string[]) => void;
  selectedCountry: string;
  setSelectedCountry: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  onReset: () => void;
  onAddClick: () => void;
}

export const FilterBar = ({
  selectedDepartments,
  setSelectedDepartments,
  selectedCountry,
  setSelectedCountry,
  selectedStatus,
  setSelectedStatus,
  onReset,
  onAddClick,
}: FilterBarProps) => {
  const { countries, statuses, departments } = useAppSelector(
    (state) => state.users,
  );

  const isFiltersDisabled = selectedDepartments.length < 3;

  return (
    <div className="mb-6">
      <p
        className={`text-sm mb-4 transition-colors ${
          isFiltersDisabled ? "text-red-500 font-medium" : "text-gray-500"
        }`}
      >
        Please add at least 3 departments to be able to proceed next steps.
      </p>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-64">
            <MultiSelect
              options={departments}
              value={selectedDepartments}
              onChange={setSelectedDepartments}
              placeholder="Select departments"
            />
          </div>

          <div
            className={`w-48 transition-opacity ${isFiltersDisabled ? "opacity-40 pointer-events-none" : ""}`}
          >
            <SingleSelect
              options={countries}
              value={selectedCountry}
              onChange={setSelectedCountry}
              placeholder="Select country"
            />
          </div>

          <div
            className={`w-48 transition-opacity ${isFiltersDisabled ? "opacity-40 pointer-events-none" : ""}`}
          >
            <SingleSelect
              options={statuses}
              value={selectedStatus}
              onChange={setSelectedStatus}
              placeholder="All Statuses"
            />
          </div>

          <button
            onClick={onReset}
            className="p-2 border cursor-pointer border-gray-300 hover:bg-gray-50 transition"
          >
            <Trash2 className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <Button variant="outline" className="px-10 py-2" onClick={onAddClick}>
          Add User
        </Button>
      </div>
    </div>
  );
};

import { useState, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import SingleSelect from "../components/ui/SingleSelect";
import MultiSelect from "../components/ui/Multiselect";
import Button from "../components/ui/Button";
import { Trash2 } from "lucide-react";
import { deleteUser } from "../store/usersSlice";

const Users = () => {
  const { users, countries, statuses, departments } = useAppSelector(
    (state) => state.users,
  );

  const dispatch = useAppDispatch();

  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const isFiltersDisabled = selectedDepartments.length < 3;

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchDept =
        selectedDepartments.length === 0 ||
        selectedDepartments.includes(user.department.value);
      const matchCountry =
        !selectedCountry || user.country.value === selectedCountry;
      const matchStatus =
        !selectedStatus || user.status.value === selectedStatus;

      return matchDept && matchCountry && matchStatus;
    });
  }, [users, selectedDepartments, selectedCountry, selectedStatus]);

  const handleResetFilters = () => {
    setSelectedDepartments([]);
    setSelectedCountry("");
    setSelectedStatus("");
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="border-2 border-black p-12 pt-16">
        <div className="flex justify-center mb-12">
          <h1 className="text-2xl tracking-[0.5em] uppercase font-medium text-black">
            Users
          </h1>
        </div>

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
                onClick={handleResetFilters}
                className="p-2 border cursor-pointer border-gray-300 hover:bg-gray-50 transition"
              >
                <Trash2 className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <Button
              variant="outline"
              className="px-10 py-2"
              disabled={isFiltersDisabled}
            >
              Add User
            </Button>
          </div>
        </div>

        <div className="border border-gray-200 rounded-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-white">
                <th className="py-5 px-8 text-sm font-bold text-black uppercase tracking-wider">
                  Full Name
                </th>
                <th className="py-5 px-8 text-sm font-bold text-black uppercase tracking-wider">
                  Department
                </th>
                <th className="py-5 px-8 text-sm font-bold text-black uppercase tracking-wider">
                  Country
                </th>
                <th className="py-5 px-8 text-sm font-bold text-black uppercase tracking-wider">
                  Status
                </th>
                <th className="py-5 px-8"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredUsers.map((user, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition"
                >
                  <td className="py-6 px-8 text-gray-900 font-medium">
                    {user.name}
                  </td>
                  <td className="py-6 px-8 text-gray-600">
                    {user.department.name}
                  </td>
                  <td className="py-6 px-8 text-gray-600">
                    {user.country.name}
                  </td>
                  <td className="py-6 px-8 text-gray-600">
                    {user.status.name}
                  </td>
                  <td className="py-6 px-8 text-right">
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete user ${user.name}?`)) {
                          dispatch(deleteUser(user.name));
                        }
                      }}
                      className="text-gray-400 cursor-pointer hover:text-red-500 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;

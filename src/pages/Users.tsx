import { useState, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";

import { Trash2 } from "lucide-react";
import { deleteUser } from "../store/usersSlice";
import { AddUserModal } from "../components/modals/AddUserModal";
import { FilterBar } from "../components/ui/FilterBar";
import EmptyState from "../components/ui/EmptyState";

const Users = () => {
  const { users } = useAppSelector((state) => state.users);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

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
      <div className="border-2 border-black p-12 pt-16 bg-white">
        <div className="flex justify-center mb-12">
          <h1 className="text-2xl tracking-[0.5em] uppercase font-medium text-black">
            Users
          </h1>
        </div>

        <FilterBar
          selectedDepartments={selectedDepartments}
          setSelectedDepartments={setSelectedDepartments}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          onReset={handleResetFilters}
          onAddClick={() => setIsModalOpen(true)}
        />

        <div className="border border-gray-200 rounded-sm overflow-hidden">
          {filteredUsers.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="py-5 px-8 text-sm font-bold text-black tracking-wider uppercase">
                    Full Name
                  </th>
                  <th className="py-5 px-8 text-sm font-bold text-black tracking-wider uppercase">
                    Department
                  </th>
                  <th className="py-5 px-8 text-sm font-bold text-black tracking-wider uppercase">
                    Country
                  </th>
                  <th className="py-5 px-8 text-sm font-bold text-black tracking-wider uppercase">
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
          ) : (
            <EmptyState />
          )}
        </div>
      </div>

      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Users;

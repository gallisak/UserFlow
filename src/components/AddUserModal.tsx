import { useState } from "react";
import Input from "./ui/Input";
import SingleSelect from "./ui/SingleSelect";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addUser } from "../store/usersSlice";
import Button from "./ui/Button";

export const AddUserModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const { countries, statuses, departments } = useAppSelector(
    (state) => state.users,
  );

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    country: "",
    status: "",
  });

  if (!isOpen) return null;

  const handleSave = () => {
    if (!formData.name) return alert("Please enter a name");

    const selectedDept = departments.find(
      (d) => d.value === formData.department,
    );
    const selectedCountry = countries.find((c) => c.value === formData.country);
    const selectedStatus = statuses.find((s) => s.value === formData.status);

    dispatch(
      addUser({
        name:
          formData.name.charAt(0).toUpperCase() +
          formData.name.slice(1).toLowerCase(),
        department: {
          name: selectedDept?.name || formData.department,
          value: formData.department,
        },
        country: {
          name: selectedCountry?.name || formData.country,
          value: formData.country,
        },
        status: {
          name: selectedStatus?.name || formData.status,
          value: formData.status,
        },
      }),
    );

    onClose();
    setFormData({ name: "", department: "", country: "", status: "" });
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white p-16 w-full max-w-4xl shadow-sm border border-gray-100">
        <h2 className="text-2xl tracking-[0.5em] uppercase font-medium text-black text-center mb-16">
          Add User
        </h2>

        <div className="grid grid-cols-2 gap-x-12 gap-y-10 mb-20">
          <Input
            label="Full Name"
            placeholder="Enter full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <SingleSelect
            label="Department"
            placeholder="Select department"
            options={departments}
            value={formData.department}
            onChange={(val) => setFormData({ ...formData, department: val })}
          />

          <SingleSelect
            label="Country"
            placeholder="Select country"
            options={countries}
            value={formData.country}
            onChange={(val) => setFormData({ ...formData, country: val })}
          />

          <SingleSelect
            label="Status"
            placeholder="Select status"
            options={statuses}
            value={formData.status}
            onChange={(val) => setFormData({ ...formData, status: val })}
          />
        </div>

        <div className="flex justify-end gap-6">
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} className="w-37.5">
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

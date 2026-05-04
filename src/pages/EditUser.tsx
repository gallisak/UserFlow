import { useState } from "react";
import { useAppSelector } from "../store/hooks";
import SingleSelect from "../components/ui/SingleSelect";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const EditUser = () => {
  const { users, countries, statuses, departments } = useAppSelector(
    (state) => state.users,
  );

  const [selectedUserValue, setSelectedUserValue] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    country: "",
    status: "",
  });

  const currentUser = users.find((u) => u.name === selectedUserValue);

  const isChanged =
    currentUser &&
    (formData.name !== currentUser.name ||
      formData.department !== currentUser.department.value ||
      formData.country !== currentUser.country.value ||
      formData.status !== currentUser.status.value);

  const handleUserChange = (userName: string) => {
    setSelectedUserValue(userName);
    const userToEdit = users.find((u) => u.name === userName);
    if (userToEdit) {
      setFormData({
        name: userToEdit.name,
        department: userToEdit.department.value,
        country: userToEdit.country.value,
        status: userToEdit.status.value,
      });
    }
  };

  const handleUndo = () => {
    if (currentUser) {
      setFormData({
        name: currentUser.name,
        department: currentUser.department.value,
        country: currentUser.country.value,
        status: currentUser.status.value,
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="border-2 border-black p-12 pt-16">
        <div className="w-full flex justify-center mb-20">
          <h1 className=" bg-white px-8 text-2xl tracking-[0.4em] uppercase font-medium text-black">
            Edit User
          </h1>
        </div>

        <div className="max-w-100 mb-10">
          <SingleSelect
            label="User"
            options={users.map((u) => ({ name: u.name, value: u.name }))}
            value={selectedUserValue}
            onChange={handleUserChange}
            placeholder="Select a user"
          />
        </div>

        {selectedUserValue && (
          <div className="space-y-10">
            <h2 className="text-xl font-medium text-black">User Information</h2>

            <div className="grid grid-cols-2 gap-x-16 gap-y-10">
              <Input
                label="Full Name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <SingleSelect
                label="Department"
                options={departments}
                value={formData.department}
                onChange={(val) =>
                  setFormData({ ...formData, department: val })
                }
                placeholder="Select department"
              />

              <SingleSelect
                label="Country"
                options={countries}
                value={formData.country}
                onChange={(val) => setFormData({ ...formData, country: val })}
                placeholder="Select country"
              />

              <SingleSelect
                label="Status"
                options={statuses}
                value={formData.status}
                onChange={(val) => setFormData({ ...formData, status: val })}
                placeholder="Select status"
              />
            </div>

            <div className="flex justify-end gap-6 pt-6">
              {isChanged && (
                <Button variant="outline" onClick={handleUndo}>
                  Undo
                </Button>
              )}

              <Button variant="outline" disabled={!isChanged}>
                Save
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditUser;

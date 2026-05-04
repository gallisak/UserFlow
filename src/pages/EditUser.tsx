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

  const currentUser = users.find((u) => u.name === selectedUserValue);

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
            onChange={setSelectedUserValue}
            placeholder="Select a user"
          />
        </div>

        <div className="space-y-10">
          <h2 className="text-xl font-medium text-black">User Information</h2>

          <div className="grid grid-cols-2 gap-x-16 gap-y-10">
            <Input
              label="Full Name"
              placeholder="Enter full name"
              value={currentUser?.name || ""}
              readOnly
            />

            <SingleSelect
              label="Department"
              options={departments}
              value={currentUser?.department.value || ""}
              onChange={() => {}}
              placeholder="Select department"
            />

            <SingleSelect
              label="Country"
              options={countries}
              value={currentUser?.country.value || ""}
              onChange={() => {}}
              placeholder="Select country"
            />

            <SingleSelect
              label="Status"
              options={statuses}
              value={currentUser?.status.value || ""}
              onChange={() => {}}
              placeholder="Select status"
            />
          </div>

          <div className="flex justify-end gap-6 pt-6">
            <Button variant="outline">Undo</Button>
            <Button variant="outline" disabled>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;

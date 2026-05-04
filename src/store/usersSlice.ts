import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { countries, departments, statuses, users } from "../data/allData";

export interface User {
  name: string;
  department: { name: string; value: string };
  country: { name: string; value: string };
  status: { name: string; value: string };
}
export interface UserFormData {
  name: string;
  department: string;
  country: string;
  status: string;
}

interface UsersState {
  users: User[];
  countries: { name: string; value: string }[];
  departments: { name: string; value: string }[];
  statuses: { name: string; value: string }[];
}

const initialState: UsersState = {
  countries: countries,
  departments: departments,
  statuses: statuses,
  users: users,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUser: (
      state,
      action: PayloadAction<{ originalName: string; newData: UserFormData }>,
    ) => {
      const { originalName, newData } = action.payload;
      const index = state.users.findIndex((u) => u.name === originalName);

      if (index !== -1) {
        const dept = state.departments.find(
          (d) => d.value === newData.department,
        );
        const country = state.countries.find(
          (c) => c.value === newData.country,
        );
        const status = state.statuses.find((s) => s.value === newData.status);

        state.users[index] = {
          name: newData.name,
          department: dept || state.users[index].department,
          country: country || state.users[index].country,
          status: status || state.users[index].status,
        };
      }
    },

    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.name !== action.payload);
    },

    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
  },
});

export const { updateUser, deleteUser, addUser } = usersSlice.actions;
export default usersSlice.reducer;

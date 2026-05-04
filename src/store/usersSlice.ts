import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { countries, departments, statuses, users } from "../data/allData";

export interface User {
  name: string;
  status: { name: string; value: string };
  department: { name: string; value: string };
  country: { name: string; value: string };
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
      const index = state.users.findIndex(
        (u) => u.name === action.payload.originalName,
      );
      if (index !== -1) {
        const { name, department, country, status } = action.payload.newData;
        state.users[index] = {
          ...state.users[index],
          name: name,
          department: { name: department, value: department },
          country: { name: country, value: country },
          status: { name: status, value: status },
        };
      }
    },
  },
});

export const { updateUser } = usersSlice.actions;
export default usersSlice.reducer;

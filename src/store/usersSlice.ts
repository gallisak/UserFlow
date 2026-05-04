import { createSlice } from "@reduxjs/toolkit";
import { countries, departments, statuses, users } from "../data/allData";

export interface User {
  name: string;
  status: { name: string; value: string };
  department: { name: string; value: string };
  country: { name: string; value: string };
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
  reducers: {},
});

export default usersSlice.reducer;

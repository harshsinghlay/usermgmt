import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },

    addUser: (state, action) => {
      state.users.push(action.payload);
    },

    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },

    updateUser: (state, action) => {
      state.users = state.users.map((user) =>
        user.id !== action.payload.id ? user : { ...action.payload }
      );
    },
  },
});

export const { setUsers, addUser, removeUser, updateUser } = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveAllUser: (state, action) => {
      return action.payload;  
    },

    deleteUser: (state, action) => {
      return state.filter(user => user._id !== action.payload);
    },

    editUser: (state, action) => {
      return state.map(user =>
        user._id === action.payload._id ? action.payload : user
      );
    },
  },
});

export const { saveAllUser, deleteUser, editUser } = userSlice.actions;
export default userSlice.reducer;

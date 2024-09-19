import {} from "react-redux";
import { createSlice } from "@reduxjs/toolkit";

interface User {
    _id: string;
    // Các thuộc tính khác của user (nếu có)
  }

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload
      console.log("detail", action.payload);
    },
  },
});

export const { setUserDetails } = authSlice.actions;

export default authSlice.reducer;

import {} from "react-redux";
import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user.types";

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
      console.log("detail", action.payload);
    },
  },
});

export const { setUserDetails } = authSlice.actions;

export default authSlice.reducer;

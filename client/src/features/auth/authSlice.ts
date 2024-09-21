import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user.types";
import authService from "./authService";

interface AuthState {
  user: User | null;
  users: User[];
  isLoading: boolean;
  deleteUser: any;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: AuthState = {
  user: null,
  users: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  deleteUser: null,
  message: "",
};

export const getAllUser = createAsyncThunk("user", async (_, thunkApi) => {
  try {
    return await authService.getAllUser();
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const deleteUser = createAsyncThunk(
  "delete-user",
  async (id: string, thunkApi) => {
    try {
      return await authService.deleteUser(id);
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
      console.log("detail", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getAllUser.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      }).addCase(deleteUser.pending, (state) => {
        state.isLoading = true
      }).addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deleteUser = action.payload;
      });
  },
});

export const { setUserDetails } = authSlice.actions;

export default authSlice.reducer;

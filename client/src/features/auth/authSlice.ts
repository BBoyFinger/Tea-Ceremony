import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user.types";
import authService from "./authService";

interface AuthState {
  user: User | null;
  users: User[];
  isLoading: boolean;
  updatedUser: any;
  addToCart: any;
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
  updatedUser: null,
  addToCart: null,
  message: "",
};

export const resetState = createAction("Reset_all");

export const getAllUser = createAsyncThunk("user", async (_, thunkApi) => {
  try {
    return await authService.getAllUser();
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const addCart = createAsyncThunk(
  "addToCart",
  async (productId: string, thunkApi) => {
    try {
      return await authService.addToCart(productId);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update-user",
  async (dataUser: any, thunkApi) => {
    try {
      return await authService.updateUserRole(dataUser);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteUsers = createAsyncThunk(
  "delete-user",
  async (ids: string[], thunkApi) => {
    try {
      return await authService.deleteUsers(ids);
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
      })
      .addCase(deleteUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deleteUser = action.payload;
      })
      .addCase(deleteUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message || "";
      })
      .addCase(updateUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedUser = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message || "";
      })
      .addCase(addCart.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.addToCart = action.payload;
      })
      .addCase(addCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message || "";
      })
      .addCase(resetState, () => initialState);
  },
});

export const { setUserDetails } = authSlice.actions;

export default authSlice.reducer;

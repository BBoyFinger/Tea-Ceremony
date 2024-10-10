import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IBlog } from "../../types/blog.type";

import { BlogService } from "./blogService";

interface initialBlog {
  blog: IBlog | null;
  blogs: IBlog[];
  isLoading: boolean;
  updatedBlog: any;
  deleteBlog: any;
  createdBlog: any;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: initialBlog = {
  blog: null,
  blogs: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  updatedBlog: null,
  deleteBlog: null,
  createdBlog: null,
  message: "",
};

export const resetBlogState = createAction("Reset_BlogState");

export const getBlog = createAsyncThunk("get-blogs", async (_, thunkApi) => {
  try {
    return await BlogService.getBlogs();
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createBlog = createAsyncThunk(
  "create-blog",
  async (data: IBlog, thunkApi) => {
    try {
      return await BlogService.createBlog(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "update-blog",
  async (data: IBlog, thunkApi) => {
    try {
      return await BlogService.editBlog(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "delete-blog",
  async (ids: string[], thunkApi) => {
    try {
      return await BlogService.deleteBlog(ids);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const blogSlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlog.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.blogs = action.payload;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message as string;
      })
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdBlog = action.payload;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message as string;
      })
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedBlog = action.payload;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message as string;
      })
      .addCase(deleteBlog.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.deleteBlog = action.payload;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message as string;
      })
      .addCase(resetBlogState, () => initialState);
  },
});

export default blogSlice.reducer;

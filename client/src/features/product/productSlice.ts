import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "../../types/product.types";
import { productService } from "./productService";

interface IProductState {
  product: IProduct | null;
  products: IProduct[];
  isLoading: boolean;
  updatedProduct: any;
  deletedProduct: any;
  createdProduct: any;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: IProductState = {
  product: null,
  products: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  updatedProduct: null,
  deletedProduct: null,
  createdProduct: null,
  message: "",
};

export const getProducts = createAsyncThunk(
  "get-products",
  async (_, thunkApi) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const createProduct = createAsyncThunk(
  "create-Product",
  async (data: any, thunkApi) => {
    try {
      return await productService.createProduct(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "update-Product",
  async (data: IProduct, thunkApi) => {
    try {
      return await productService.editProduct(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "delete-Product",
  async (ids: string[], thunkApi) => {
    try {
      return await productService.deleteProduct(ids);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message as string;
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdProduct = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message as string;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedProduct = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message as string;
      });
  },
});

export default productSlice.reducer;

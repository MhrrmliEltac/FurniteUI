import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios, { AxiosError } from "axios";

type Dimensions = {
  width: string;
  height: string;
};

export interface ProductDataType {
  _id: string;
  name: string;
  category: string;
  subCategory: string;
  brand: string;
  price: number;
  discountPrice: number;
  discountPercent: number;
  description: string;
  stock: number;
  colors: string[];
  structureColor: string[];
  material: string[];
  size: string[];
  images: string[];
  isPopular: boolean;
  isOnSale: boolean;
  dimensions: Dimensions;
  style: string[];
}

const initialState: {
  loading: boolean;
  product: ProductDataType[];
  viewed: ProductDataType[];
  error: string | null;
  activeTab: string;
} = {
  loading: false,
  product: [],
  viewed: [],
  error: null,
  activeTab: "Chair",
};

export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (_id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://furniture-server-two.vercel.app/api/products/${_id}`
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

export const getViewedProduct = createAsyncThunk(
  "product/recently-viewed",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://furniture-server-two.vercel.app/api/viewed/recently-viewed/1234"
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    changeActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      getProductById.fulfilled,
      (state, action: PayloadAction<ProductDataType>) => {
        state.loading = false;
        state.product = [action.payload];
      }
    );
    builder.addCase(
      getProductById.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Something went wrong";
      }
    );
    builder.addCase(getViewedProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      getViewedProduct.fulfilled,
      (state, action: PayloadAction<ProductDataType>) => {
        state.loading = false;
        state.viewed = [action.payload];
      }
    );
    builder.addCase(
      getViewedProduct.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Something went wrong";
      }
    );
  },
});

export const { changeActiveTab } = productSlice.actions;

export const selectAll = (state: RootState) => state.productReducer.product;
export const selectLoading = (state: RootState) => state.productReducer.loading;
export const selectError = (state: RootState) => state.productReducer.error;

export default productSlice.reducer;

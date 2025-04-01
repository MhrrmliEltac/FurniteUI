import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios, { isAxiosError } from "axios";
import { CartProductType } from "@/components/cart/CartItem";

const initialState: {
  loading: boolean;
  cart: CartProductType[];
  error: string | null;
} = {
  loading: true,
  cart: [],
  error: null,
};

export const getCartItem = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://furniture-server-two.vercel.app/api/cart/get-cart",
        { withCredentials: true }
      );
      console.log(response.data.cartArr);
      return response.data.cartArr;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data.message || "Failed to fetch cart"
        );
      }
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCartItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      getCartItem.fulfilled,
      (state, action: PayloadAction<CartProductType[]>) => {
        state.cart = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(getCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const selectAll = (state: RootState) => state.checkReducer.cart;
export const selectLoading = (state: RootState) => state.checkReducer.loading;
export const selectError = (state: RootState) => state.checkReducer.error;

export default cartSlice.reducer;

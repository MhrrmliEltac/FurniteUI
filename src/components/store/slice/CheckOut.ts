import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios, { isAxiosError } from "axios";
import { CartProductType } from "@/types/Type";

interface Cart {
  items: CartProductType[];
  userId?: string;
  _id?: string;
}

interface PayloadActionType {
  cart: Cart;
  message: string;
}

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

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCart",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://furniture-server-two.vercel.app/api/cart/delete-cart/${id}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data.message || "Failed to delete cart product"
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
    builder.addCase(deleteCartItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      deleteCartItem.fulfilled,
      (state, action: PayloadAction<PayloadActionType>) => {
        state.cart = action.payload.cart.items;
        state.loading = false;
      }
    );
    builder.addCase(deleteCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const selectAll = (state: RootState) => state.checkReducer.cart;
export const selectLoading = (state: RootState) => state.checkReducer.loading;
export const selectError = (state: RootState) => state.checkReducer.error;

export default cartSlice.reducer;

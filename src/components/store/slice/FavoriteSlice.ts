import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios, { AxiosError } from "axios";
import { ProductDataType } from "@/types/Type";

const initialState: {
  loading: boolean;
  favorite: ProductDataType[];
  error: string | null;
} = {
  loading: false,
  favorite: [],
  error: null,
};

export const getFavorite = createAsyncThunk(
  "favorite/getFavorite",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://furniture-server-two.vercel.app/api/favorite/get-favorite`,
        { withCredentials: true }
      );
      return response.data.favoriteArr;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch favorite"
      );
    }
  }
);

export const deleteFavorite = createAsyncThunk(
  "favorite/deleteFavorite",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://furniture-server-two.vercel.app/api/favorite/remove-favorite/${id}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete favorite"
      );
    }
  }
);

export const addFavorite = createAsyncThunk(
  "favorite/addFavorite",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://furniture-server-two.vercel.app/api/favorite/add-favorite",
        {
          favorite: id,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete favorite"
      );
    }
  }
);

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFavorite.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      getFavorite.fulfilled,
      (state, action: PayloadAction<ProductDataType[]>) => {
        state.favorite = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(getFavorite.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // deleteFavorite
    builder.addCase(deleteFavorite.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteFavorite.fulfilled, (state, action) => {
      state.favorite = state.favorite.filter(
        (item: any) => item._id !== action.meta.arg
      );
      state.loading = false;
    });
    builder.addCase(deleteFavorite.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(addFavorite.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addFavorite.fulfilled, (state, action) => {
      state.favorite.push(action.payload.favorite);
      state.loading = false;
    });
    builder.addCase(addFavorite.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const selectAll = (state: RootState) => state.favoriteReducer.favorite;
export const selectLoading = (state: RootState) =>
  state.favoriteReducer.loading;
export const selectError = (state: RootState) => state.favoriteReducer.error;

export default favoriteSlice.reducer;

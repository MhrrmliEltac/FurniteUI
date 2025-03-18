import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { AxiosError } from "axios";
import { api } from "../../utils/Api";

type UserDataType = {
  id: string;
  email: string;
  exp?: number;
  iat?: number;
};

interface ProfileData {
  loading: boolean;
  message: string;
  user: UserDataType;
  error: string | null;
}

const initialState: ProfileData = {
  loading: false,
  message: "",
  user: { id: "", email: "" },
  error: null,
};

export const getProfileToken = createAsyncThunk(
  "user/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/profile");
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

export const deleteProfileToken = createAsyncThunk(
  "users/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/logout");
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

export const userSlice = createSlice({
  name: "user/profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfileToken.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
      getProfileToken.fulfilled,
      (state, action: PayloadAction<ProfileData>) => {
        state.user = action.payload.user;
      }
    );

    builder.addCase(
      getProfileToken.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Something went wrong";
      }
    );
    builder.addCase(deleteProfileToken.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteProfileToken.fulfilled, (state) => {
      state.user = { id: "", email: "" };
    });
    builder.addCase(
      deleteProfileToken.rejected,
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

export const selectAll = (state: RootState) => state.userReducer.user;
export const selectLoading = (state: RootState) => state.userReducer.loading;
export const selectError = (state: RootState) => state.userReducer.error;

export default userSlice.reducer;

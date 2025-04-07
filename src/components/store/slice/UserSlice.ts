import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { AxiosError, isAxiosError } from "axios";
import { api } from "../../../utils/Api";

type UserDataType = {
  _id: string;
  email: string;
  userName: string;
  phoneNumber: string;
};
interface ProfileData {
  loading: boolean;
  message: string;
  user: UserDataType;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: ProfileData = {
  loading: false,
  message: "",
  user: { _id: "", email: "", userName: "", phoneNumber: "" },
  error: null,
  isAuthenticated: false,
};

export const getProfileToken = createAsyncThunk(
  "user/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/profile");
      return response.data.user;
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
      window.location.reload();
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

export const changePassword = createAsyncThunk(
  "/user/change-password",
  async ({
    currentPassword,
    newPassword,
  }: {
    currentPassword: string;
    newPassword: string;
  }) => {
    try {
      const response = await api.post(
        "/change-password",
        { currentPassword, newPassword },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return error.response?.data?.message || "Failed to fetch product";
      }
    }
  }
);

export const userSlice = createSlice({
  name: "user/profile",
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuthenticated = true;
      const hasUser = JSON.stringify(state.isAuthenticated);
      sessionStorage.setItem("auth", hasUser);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfileToken.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
      getProfileToken.fulfilled,
      (state, action: PayloadAction<UserDataType>) => {
        state.user = action.payload;
        state.loading = false;
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
      state.user = { _id: "", email: "", userName: "", phoneNumber: "" };
      sessionStorage.removeItem("auth");
      state.loading = false;
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
    builder.addCase(changePassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.message = action.payload.message;
    });
    builder.addCase(changePassword.rejected, (state) => {
      state.loading = false;
      state.error = state.message;
    });
  },
});

export const { authCheck } = userSlice.actions;

export const selectAll = (state: RootState) => state.userReducer.user;
export const selectLoading = (state: RootState) => state.userReducer.loading;
export const selectError = (state: RootState) => state.userReducer.error;

export default userSlice.reducer;

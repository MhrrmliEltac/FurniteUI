import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slice/ProductSlice";
import { userSlice } from "./slice/UserSlice";

export const store = configureStore({
  reducer: {
    productReducer: productSlice.reducer,
    userReducer: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

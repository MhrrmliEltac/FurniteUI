import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slice/ProductSlice";

export const store = configureStore({
  reducer: {
    productReducer: productSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

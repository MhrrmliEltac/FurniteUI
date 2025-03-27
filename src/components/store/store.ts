import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slice/ProductSlice";
import { userSlice } from "./slice/UserSlice";
import { favoriteSlice } from "./slice/FavoriteSlice";

export const store = configureStore({
  reducer: {
    productReducer: productSlice.reducer,
    favoriteReducer: favoriteSlice.reducer,
    userReducer: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

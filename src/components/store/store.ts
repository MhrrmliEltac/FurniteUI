import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slice/ProductSlice";
import { userSlice } from "./slice/UserSlice";
import { favoriteSlice } from "./slice/FavoriteSlice";
import { cartSlice } from "./slice/CheckOut";

export const store = configureStore({
  reducer: {
    productReducer: productSlice.reducer,
    favoriteReducer: favoriteSlice.reducer,
    userReducer: userSlice.reducer,
    checkReducer: cartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

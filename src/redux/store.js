import { configureStore } from "@reduxjs/toolkit";
import { rootApi } from "./apiSlice";
import authReducer from "./features/authSlice";
import cartReducer from "./features/cartSlice";

const rootReducer = {
  [rootApi.reducerPath]: rootApi.reducer,
  auth: authReducer,
  cart: cartReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(rootApi.middleware),
});

import { configureStore } from "@reduxjs/toolkit";
import authReducer, { authApi } from "./features/authSlice";

const rootReducer = {
  [authApi.reducerPath]: authApi.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(authApi.middleware),
});

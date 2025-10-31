import { configureStore } from "@reduxjs/toolkit";
import { rootApi } from "./apiSlice";
import authReducer from "./features/authSlice";

const rootReducer = {
  [rootApi.reducerPath]: rootApi.reducer,
  auth: authReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(rootApi.middleware),
});

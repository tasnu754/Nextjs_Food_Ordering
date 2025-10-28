import { configureStore } from "@reduxjs/toolkit";
import { rootApi } from "./apiSlice";

const rootReducer = {
  [rootApi.reducerPath]: rootApi.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(rootApi.middleware),
});

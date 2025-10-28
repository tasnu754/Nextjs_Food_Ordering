import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rootApi = createApi({
  reducerPath: "rootApi",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.SERVER_BASE_API_URL || "http://localhost:5000/api/v1",
  }),

  tagTypes: ["auth", "users"],
  endpoints: () => ({}),
});

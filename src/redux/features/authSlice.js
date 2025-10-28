import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const initialState = {
  name: "Tasnuva",
  email: "",
  password: "",
  profileImage: "",
  role: "user",
  isLoggedIn: false,
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.SERVER_BASE_API_URL || "http://localhost:5000/api/v1",
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: `auth/register`,
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useRegisterMutation } = authApi;

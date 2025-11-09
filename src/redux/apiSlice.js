import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "./features/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.SERVER_BASE_API_URL || "http://localhost:5001/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const errorMessage = result.error.data?.message;

    if (
      errorMessage === "Access token expired" ||
      errorMessage === "Invalid access token"
    ) {
      const refreshResult = await baseQuery(
        { url: "auth/refresh", method: "POST" },
        api,
        extraOptions
      );

      if (refreshResult?.data) {
        const { accessToken } = refreshResult.data.data;
        api.dispatch(
          setCredentials({
            user: api.getState().auth.user,
            accessToken,
          })
        );

        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } else if (errorMessage === "Invalid or expired refresh token") {
      api.dispatch(logout());
    }
  }

  return result;
};

export const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "auth",
    "users",
    "categories",
    "foodItems",
    "FoodItem",
    "singleFoodItem",
    "user",
    "Cart",
    "Order",
    "Wishlist",
    "Review",
    "Dashboard",
  ],
  endpoints: () => ({}),
});

import { rootApi } from "../apiSlice";
import { logout } from "./authSlice";

const authApi = rootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: `auth/register`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"],
    }),

    login: builder.mutation({
      query: (user) => ({
        url: `auth/login`,
        method: "POST",
        body: user,
      }),
    }),

    refreshToken: builder.mutation({
      query: () => ({
        url: `auth/refresh`,
        method: "POST",
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `auth/logout`,
        method: "POST",
      }),
      invalidatesTags: ["auth", "users", "Cart", "Order", "Wishlist"],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (error) {
          console.error("Logout API failed:", error);
          dispatch(logout());
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
} = authApi;

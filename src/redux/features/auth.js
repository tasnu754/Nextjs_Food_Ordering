import { rootApi } from "../apiSlice";

const authApi = rootApi.injectEndpoints({
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
    logout: builder.mutation({
      query: () => ({
        url: `auth/logout`,
        method: "POST",
      }),
      invalidatesTags: ["auth", "users"],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Logout API failed:", error);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApi;

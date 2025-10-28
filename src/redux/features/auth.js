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
  }),
});

export const { useRegisterMutation } = authApi;

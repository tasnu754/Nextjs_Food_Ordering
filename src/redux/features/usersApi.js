import { rootApi } from "../apiSlice";

export const usersApi = rootApi.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "user/allUsers",
        method: "GET",
      }),
      providesTags: ["users"],
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `user/delete/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),

    makeAdmin: builder.mutation({
      query: (userId) => ({
        url: `user/make-admin/${userId}`,
        method: "PATCH",
        body: { role: "admin" },
      }),
      invalidatesTags: ["users"],
    }),

    removeAdmin: builder.mutation({
      query: (userId) => ({
        url: `user/remove-admin/${userId}`,
        method: "PATCH",
        body: { role: "user" },
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useMakeAdminMutation,
  useRemoveAdminMutation,
} = usersApi;

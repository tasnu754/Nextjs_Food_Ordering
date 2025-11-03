// features/usersApi.js
import { rootApi } from "../apiSlice";

export const usersApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users
    getAllUsers: builder.query({
      query: () => ({
        url: "user/allUsers",
        method: "GET",
      }),
      providesTags: ["users"],
    }),

    // Delete user
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `user/delete/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),

    // Make user admin
    makeAdmin: builder.mutation({
      query: (userId) => ({
        url: `user/make-admin/${userId}`,
        method: "PATCH",
        body: { role: "admin" },
      }),
      invalidatesTags: ["users"],
    }),

    // Remove admin role
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

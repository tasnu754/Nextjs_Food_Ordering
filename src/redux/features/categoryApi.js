import { rootApi } from "../apiSlice";

export const categoryApi = rootApi.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: "category",
        method: "GET",
      }),
      providesTags: ["categories"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"],
    }),
  }),
});

export const { useGetAllCategoriesQuery, useDeleteCategoryMutation } =
  categoryApi;

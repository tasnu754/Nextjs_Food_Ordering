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

    addCategory: builder.mutation({
      query: (formData) => ({
        url: "category",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["categories"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, formData }) => ({
        url: `category/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["categories"],
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

export const {
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;

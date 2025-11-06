import { rootApi } from "../apiSlice";

export const foodApi = rootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createFoodItem: builder.mutation({
      query: (formData) => ({
        url: "food",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["foodItems", "categories"],
    }),
    getAllFoodItems: builder.query({
      query: ({ isFeatured }) => ({
        url: `food?isFeatured=${isFeatured}`,
        method: "GET",
      }),
      providesTags: ["foodItems"],
    }),
    getFoodItemsByCategory: builder.query({
      query: ({ categoryId, isFeatured }) => ({
        url: `food?category=${categoryId}&isFeatured=${isFeatured}`,
        method: "GET",
      }),
      providesTags: ["foodItems"],
    }),
  }),
});

export const {
  useCreateFoodItemMutation,
  useGetAllFoodItemsQuery,
  useGetFoodItemsByCategoryQuery,
} = foodApi;

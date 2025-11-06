import { rootApi } from "../apiSlice";

export const foodApi = rootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllFoodItems: builder.query({
      query: (params = {}) => {
        const { isFeatured } = params;
        const queryParams = new URLSearchParams();

        if (isFeatured !== undefined) {
          queryParams.append("isFeatured", isFeatured);
        }

        return {
          url: queryParams.toString()
            ? `food?${queryParams.toString()}`
            : "food",
          method: "GET",
        };
      },
      providesTags: ["foodItems"],
    }),

    getFoodItemsByCategory: builder.query({
      query: ({ categoryId, isFeatured }) => ({
        url: `food?category=${categoryId}&isFeatured=${isFeatured}`,
        method: "GET",
      }),
      providesTags: ["foodItems"],
    }),

    getSingleFoodItem: builder.query({
      query: ({ id }) => ({
        url: `food/${id}`,
        method: "GET",
      }),
      providesTags: ["singleFoodItem"],
    }),

    createFoodItem: builder.mutation({
      query: (formData) => ({
        url: "food",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["foodItems", "categories"],
    }),
  }),
});

export const {
  useCreateFoodItemMutation,
  useGetAllFoodItemsQuery,
  useGetFoodItemsByCategoryQuery,
  useGetSingleFoodItemQuery,
} = foodApi;

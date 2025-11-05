import { rootApi } from "../apiSlice";

export const foodApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    createFoodItem: builder.mutation({
      query: (formData) => ({
        url: "food",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["foodItems"],
    }),
  }),
});

export const { useCreateFoodItemMutation } = foodApi;

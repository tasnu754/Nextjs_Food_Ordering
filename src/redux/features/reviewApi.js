import { rootApi } from "../apiSlice";

const reviewApi = rootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: ({ foodItemId, stars, comment }) => ({
        url: `/reviews/${foodItemId}`,
        method: "POST",
        body: { stars, comment },
      }),
      invalidatesTags: (result, error, { foodItemId }) => [
        { type: "FoodItem", id: foodItemId },
        "Review",
      ],
    }),

    updateReview: builder.mutation({
      query: ({ foodItemId, reviewId, stars, comment }) => ({
        url: `/reviews/${foodItemId}/${reviewId}`,
        method: "PATCH",
        body: { stars, comment },
      }),
      invalidatesTags: (result, error, { foodItemId }) => [
        { type: "FoodItem", id: foodItemId },
        { type: "singleFoodItem", id: foodItemId },
        "Review",
      ],
    }),

    deleteReview: builder.mutation({
      query: ({ foodItemId, reviewId }) => ({
        url: `/reviews/${foodItemId}/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { foodItemId }) => [
        { type: "FoodItem", id: foodItemId },
        "Review",
      ],
    }),

    getUserReview: builder.query({
      query: (foodItemId) => ({
        url: `/reviews/${foodItemId}/user-review`,
        method: "GET",
      }),
      providesTags: (result, error, foodItemId) => [
        { type: "Review", id: foodItemId },
      ],
    }),

    canUserReview: builder.query({
      query: (foodItemId) => ({
        url: `/reviews/${foodItemId}/can-review`,
        method: "GET",
      }),
      providesTags: (result, error, foodItemId) => [
        { type: "Review", id: `can-${foodItemId}` },
      ],
    }),
  }),
});

export const {
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useGetUserReviewQuery,
  useCanUserReviewQuery,
} = reviewApi;

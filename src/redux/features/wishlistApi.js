import { rootApi } from "../apiSlice";

const wishlistApi = rootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => ({
        url: "/wishlist",
        method: "GET",
      }),
      providesTags: ["Wishlist"],
    }),

    addToWishlist: builder.mutation({
      query: (data) => ({
        url: "/wishlist/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wishlist"],
    }),

    toggleWishlistItem: builder.mutation({
      query: (data) => ({
        url: "/wishlist/toggle",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wishlist"],
    }),

    removeFromWishlist: builder.mutation({
      query: (foodItemId) => ({
        url: `/wishlist/remove/${foodItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),

    clearWishlist: builder.mutation({
      query: () => ({
        url: "/wishlist/clear",
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),

    checkWishlistItem: builder.query({
      query: (foodItemId) => ({
        url: `/wishlist/check/${foodItemId}`,
        method: "GET",
      }),
      providesTags: (result, error, foodItemId) => [
        { type: "Wishlist", id: foodItemId },
      ],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useToggleWishlistItemMutation,
  useRemoveFromWishlistMutation,
  useClearWishlistMutation,
  useCheckWishlistItemQuery,
} = wishlistApi;

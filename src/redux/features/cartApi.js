import { rootApi } from "../apiSlice";

const cartApi = rootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Get user's cart
    getCart: builder.query({
      query: () => ({
        url: "/cart",
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),

    // Add item to cart
    addToCart: builder.mutation({
      query: (data) => ({
        url: "/cart/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),

    // Update item quantity
    updateCartItem: builder.mutation({
      query: ({ itemId, quantity }) => ({
        url: `/cart/update/${itemId}`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    // Remove item from cart
    removeFromCart: builder.mutation({
      query: (itemId) => ({
        url: `/cart/remove/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    // Clear entire cart
    clearCart: builder.mutation({
      query: () => ({
        url: "/cart/clear",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    // Increment item quantity
    incrementCartItem: builder.mutation({
      query: (itemId) => ({
        url: `/cart/increment/${itemId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Cart"],
    }),

    // Decrement item quantity
    decrementCartItem: builder.mutation({
      query: (itemId) => ({
        url: `/cart/decrement/${itemId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
  useIncrementCartItemMutation,
  useDecrementCartItemMutation,
} = cartApi;

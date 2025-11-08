import { rootApi } from "../apiSlice";

const orderApi = rootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order", "Cart"],
    }),

    getUserOrders: builder.query({
      query: ({ status, page = 1, limit = 10 } = {}) => ({
        url: "/orders/my-orders",
        method: "GET",
        params: { status, page, limit },
      }),
      providesTags: ["Order"],
    }),

    getOrderById: builder.query({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "GET",
      }),
      providesTags: (result, error, orderId) => [
        { type: "Order", id: orderId },
      ],
    }),

    cancelOrder: builder.mutation({
      query: ({ orderId, reason }) => ({
        url: `/orders/${orderId}/cancel`,
        method: "PATCH",
        body: { reason },
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: "Order", id: orderId },
        "Order",
      ],
    }),

    // ============ ADMIN ENDPOINTS ============

    getAllOrders: builder.query({
      query: ({
        status,
        paymentStatus,
        page = 1,
        limit = 20,
        sortBy = "createdAt",
        order = "desc",
      } = {}) => ({
        url: "/orders/admin/all",
        method: "GET",
        params: { status, paymentStatus, page, limit, sortBy, order },
      }),
      providesTags: ["Order"],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ orderId, status, note }) => ({
        url: `/orders/${orderId}/status`,
        method: "PATCH",
        body: { status, note },
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: "Order", id: orderId },
        "Order",
      ],
    }),

    updatePaymentStatus: builder.mutation({
      query: ({ orderId, paymentStatus }) => ({
        url: `/orders/${orderId}/payment`,
        method: "PATCH",
        body: { paymentStatus },
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: "Order", id: orderId },
        "Order",
      ],
    }),

    getOrderStatistics: builder.query({
      query: (period = "all") => ({
        url: "/orders/admin/statistics",
        method: "GET",
        params: { period },
      }),
      providesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetUserOrdersQuery,
  useGetOrderByIdQuery,
  useCancelOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useUpdatePaymentStatusMutation,
  useGetOrderStatisticsQuery,
} = orderApi;

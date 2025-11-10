import { rootApi } from "../apiSlice";

const dashboardApi = rootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAdminStats: builder.query({
      query: () => ({
        url: "/dashboard/stats",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),

    getRecentActivities: builder.query({
      query: () => ({
        url: "/dashboard/activities",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetAdminStatsQuery, useGetRecentActivitiesQuery } =
  dashboardApi;

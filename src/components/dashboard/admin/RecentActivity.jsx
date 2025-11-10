"use client";

import { Roboto } from "next/font/google";
import { useGetRecentActivitiesQuery } from "@/redux/features/dashboardApi";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const RecentActivity = () => {
  const { data, isLoading } = useGetRecentActivitiesQuery();

  const activities = data?.data || [];

  const colorClasses = {
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
    yellow: "bg-yellow-100 text-yellow-600",
  };

  if (isLoading) {
    return (
      <div
        className={`bg-white rounded-xl shadow-md p-6 h-full ${roboto.className}`}
      >
        <h2 className="!font-bold !text-[#AE3433] mb-4">Recent Activity</h2>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#AE3433]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-md p-6 ${roboto.className}`}>
      <h2 className="!font-bold !text-[#AE3433] mb-4">Recent Activity</h2>

      {activities.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-gray-400">
          <p>No recent activity</p>
        </div>
      ) : (
        <div className="space-y-4 overflow-y-auto max-h-96">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  colorClasses[activity.color] || "bg-gray-100 text-gray-600"
                }`}
              >
                {activity.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;

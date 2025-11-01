import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/shared/DashboardLayout";
import StatCard from "@/components/dashboard/shared/StatCard";
import RecentActivity from "@/components/dashboard/admin/RecentActivity";
import AnalyticsCharts from "@/components/dashboard/admin/AnalyticsCharts";
import { Lilita_One, Oswald, Roboto } from "next/font/google";

const lil = Lilita_One({
  subsets: ["latin"],
  weight: "400",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Orders",
      value: "1,234",
      icon: "🛒",
      trend: "up",
      trendValue: "+12%",
      color: "orange",
    },
    {
      title: "Revenue",
      value: "$45,678",
      icon: "💰",
      trend: "up",
      trendValue: "+8%",
      color: "green",
    },
    {
      title: "Active Users",
      value: "856",
      icon: "👥",
      trend: "up",
      trendValue: "+5%",
      color: "blue",
    },
    {
      title: "Menu Items",
      value: "124",
      icon: "🍕",
      trend: "down",
      trendValue: "-2",
      color: "purple",
    },
  ];

  return (
    <ProtectedRoute>
      <DashboardLayout userRole="admin">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div
            className={`bg-gradient-to-r from-[#5E0208]  to-[#AE3433] rounded-xl shadow-lg p-6 text-white ${oswald.className}`}
          >
            <h1 className="text-3xl font-bold mb-2">Welcome back, Admin!</h1>
            <p className="text-orange-100">
              Here's what's happening with your restaurant today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* Charts and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AnalyticsCharts />
            </div>
            <div className="lg:col-span-1">
              <RecentActivity />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-center">
                <div className="text-3xl mb-2">➕</div>
                <div className="text-sm font-medium text-gray-700">
                  Add Menu Item
                </div>
              </button>
              <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-center">
                <div className="text-3xl mb-2">📊</div>
                <div className="text-sm font-medium text-gray-700">
                  View Reports
                </div>
              </button>
              <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-center">
                <div className="text-3xl mb-2">👥</div>
                <div className="text-sm font-medium text-gray-700">
                  Manage Users
                </div>
              </button>
              <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-center">
                <div className="text-3xl mb-2">⚙️</div>
                <div className="text-sm font-medium text-gray-700">
                  Settings
                </div>
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default AdminDashboard;

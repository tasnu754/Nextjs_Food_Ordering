import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/shared/DashboardLayout";
import StatCard from "@/components/dashboard/shared/StatCard";
import RecentActivity from "@/components/dashboard/admin/RecentActivity";
import AnalyticsCharts from "@/components/dashboard/admin/AnalyticsCharts";
import { Oswald, Roboto } from "next/font/google";
import UserName from "@/components/dashboard/shared/UserName";
import Link from "next/link";

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
      color: "[#AE3433]",
    },
    {
      title: "Revenue",
      value: "$45,678",
      icon: "💰",
      color: "[#5E0208]",
    },
    {
      title: "Active Users",
      value: "856",
      icon: "👥",
      color: "[#C9983C]",
    },
    {
      title: "Category Items",
      value: "124",
      icon: "🍕",
      color: "[#AE3433]",
    },
  ];

  return (
    <ProtectedRoute requiredRole="admin">
      <DashboardLayout userRole="admin">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div
            className={`bg-gradient-to-r from-[#5E0208]  to-[#AE3433] rounded-xl shadow-lg p-6 text-white ${oswald.className}`}
          >
            <UserName></UserName>
            <p className="text-orange-100">
              Here's what's happening with your restaurant today.
            </p>
          </div>

          {/* Stats Grid */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${roboto.className}`}
          >
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
          <div
            className={`bg-white rounded-xl shadow-md p-6 ${roboto.className}`}
          >
            <h2 className=" !font-bold !text-[#AE3433] mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {" "}
              <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-center">
                <Link href="admin/addFood" className="!no-underline">
                  <div className="text-3xl mb-2">➕</div>
                  <div className="text-sm font-medium text-gray-700">
                    Add Menu Item
                  </div>
                </Link>
              </button>
              <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-center">
                <Link href="admin/analytics" className="!no-underline">
                  <div className="text-3xl mb-2">📊</div>
                  <div className="text-sm font-medium text-gray-700">
                    View Reports
                  </div>
                </Link>
              </button>
              <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-center">
                <Link href="admin/users" className="!no-underline">
                  <div className="text-3xl mb-2">👥</div>
                  <div className="text-sm font-medium text-gray-700">
                    Manage Users
                  </div>
                </Link>
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

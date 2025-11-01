// app/dashboard/user/page.jsx
"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/shared/DashboardLayout";
import StatCard from "@/components/dashboard/shared/StatCard";
import QuickOrder from "@/components/dashboard/user/QuickOrder";
import RecommendedItems from "@/components/dashboard/user/RecommendedItems";
import OrderHistory from "@/components/dashboard/user/OrderHistory";

const UserDashboard = () => {
  const stats = [
    { title: "Total Orders", value: "28", icon: "📦", color: "orange" },
    { title: "Favorite Items", value: "12", icon: "❤️", color: "purple" },
    { title: "Reward Points", value: "450", icon: "⭐", color: "blue" },
    { title: "Active Orders", value: "2", icon: "🚚", color: "green" },
  ];

  return (
    <ProtectedRoute>
      <DashboardLayout userRole="user">
        <div className="space-y-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg p-6 md:p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10 text-9xl">🍔</div>
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2">Hey John! 👋</h1>
              <p className="text-orange-100 mb-4">
                Hungry? Let's get you something delicious!
              </p>
              <button className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-lg hover:bg-orange-50 transition-colors shadow-md">
                Order Now 🍕
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Order Section */}
            <div className="lg:col-span-2">
              <QuickOrder />
              <div className="mt-6">
                <OrderHistory limit={3} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <RecommendedItems />

              {/* Promo Card */}
              <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl shadow-lg p-6 text-white">
                <div className="text-4xl mb-2">🎉</div>
                <h3 className="text-xl font-bold mb-2">Special Offer!</h3>
                <p className="text-sm mb-4">
                  Get 20% off on your next order. Use code: FOOD20
                </p>
                <button className="bg-white text-orange-600 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-orange-50 transition-colors">
                  Claim Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default UserDashboard;

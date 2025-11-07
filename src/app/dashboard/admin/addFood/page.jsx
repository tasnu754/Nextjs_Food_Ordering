import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/shared/DashboardLayout";
import { Oswald } from "next/font/google";
import AddFoodForm from "@/components/dashboard/admin/AddFoodForm";

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

const AddFoodPage = () => {
  return (
    <ProtectedRoute requiredRole="admin">
      <DashboardLayout userRole="admin">
        <div className="min-h-screen bg-gradient-to-br  !rounded-xl  from-gray-50 to-gray-100 md:p-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white !rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              {/* Header */}
              <div
                className={`bg-gradient-to-r from-[#5E0208] to-[#AE3433] px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 ${oswald.className}`}
              >
                <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-white">
                  Create a delicious addition to your menu
                </h2>
              </div>

              <AddFoodForm />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default AddFoodPage;

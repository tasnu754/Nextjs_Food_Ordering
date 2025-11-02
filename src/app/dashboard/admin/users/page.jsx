import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/shared/DashboardLayout";
import UsersTable from "@/components/dashboard/admin/UsersTable";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

async function getUsers() {
  try {
    const res = await fetch("http://localhost:5001/api/v1/user/allUsers", {
      cache: "no-store",
    });

    if (!res?.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await res.json();
    return data?.users || data || [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

const UsersPage = async () => {
  const users = await getUsers();

  return (
    <ProtectedRoute>
      <DashboardLayout userRole="admin">
        <div className="min-h-screen bg-gradient-to-br !rounded-xl from-gray-50 to-gray-100 p-3 sm:p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div
              className={`bg-white !rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-gray-200 mb-4 sm:mb-6 ${oswald.className}`}
            >
              <div className="bg-gradient-to-r from-[#5E0208] to-[#AE3433] px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  Manage all users and their roles
                </h2>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              {users?.length === 0 ? (
                <div className="p-8 sm:p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <svg
                      className="w-16 h-16 sm:w-20 sm:h-20 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                    No Users Found
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500">
                    There are no users in the system yet.
                  </p>
                </div>
              ) : (
                <UsersTable users={users?.data} />
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default UsersPage;

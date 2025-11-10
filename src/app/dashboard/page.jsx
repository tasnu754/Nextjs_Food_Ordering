// app/dashboard/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import ProtectedRoute from "@/components/ProtectedRoute";

const DashboardPage = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  // router.replace(`/dashboard/${user?.role}`);

  useEffect(() => {
    // If no user after initial load, there might be an issue
    const timer = setTimeout(() => {
      if (!user) {
        console.error("No user data found");
        // Optionally redirect to login or show error
        router.replace("/login");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [user, router]);

  useEffect(() => {
    if (user) {
      const redirectTimer = setTimeout(() => {
        if (user?.role === "admin") {
          router.replace("/dashboard/admin");
        } else {
          router.replace("/dashboard/user");
        }
      }, 100);

      return () => clearTimeout(redirectTimer);
    } else {
      console.log("No user data available");
      setIsLoading(false);
    }
  }, [user, router]);

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your dashboard...</p>
            {!user && (
              <p className="text-sm text-gray-500 mt-2">
                No user data detected
              </p>
            )}
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Unable to load dashboard</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Retry
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;

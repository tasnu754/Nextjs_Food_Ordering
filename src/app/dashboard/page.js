"use client";
import ProtectedRoute from "@/components/ProtectedRoute";

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <div>User Dashboard</div>
    </ProtectedRoute>
  );
};
export default DashboardPage;

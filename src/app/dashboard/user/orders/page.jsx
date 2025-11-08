import DashboardLayout from "@/components/dashboard/shared/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";

const MyOrders = () => {
  return (
    <ProtectedRoute requiredRole="user">
      <DashboardLayout userRole="user">
        <div>My orders</div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default MyOrders;

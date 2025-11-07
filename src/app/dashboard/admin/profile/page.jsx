import DashboardLayout from "@/components/dashboard/shared/DashboardLayout";
import Profile from "@/components/dashboard/shared/Profile";
import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";

const AdminProfilePage = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout userRole="admin">
        <Profile></Profile>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default AdminProfilePage;

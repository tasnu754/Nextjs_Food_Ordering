const {
  default: DashboardLayout,
} = require("@/components/dashboard/shared/DashboardLayout");
const { default: ProtectedRoute } = require("@/components/ProtectedRoute");

const AdminOrdersPage = () => {
  return (
    <ProtectedRoute requiredRole="admin">
      <DashboardLayout userRole="admin">
        <div>Order List</div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default AdminOrdersPage;

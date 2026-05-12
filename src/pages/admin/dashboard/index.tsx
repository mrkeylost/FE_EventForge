import AdminDashboard from "@/components/admin/dashboard/AdminDashboard";
import DashboardLayout from "@/components/layouts/dashboard/DashboardLayout";

const AdminDashboardPage = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      description="Dashboard Admin"
      type="admin"
    >
      <AdminDashboard />
    </DashboardLayout>
  );
};

export default AdminDashboardPage;

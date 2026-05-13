import AdminDashboard from "@/features/admin/dashboard/_components/AdminDashboard";
import DashboardLayout from "@/components/layouts/DashboardLayout";

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

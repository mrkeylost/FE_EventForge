import DashboardAdmin from "@/components/admin/dashboard";
import DashboardLayout from "@/components/layouts/dashboard/DashboardLayout";

const DashboardAdminPage = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      description="Dashboard Admin"
      type="admin"
    >
      <DashboardAdmin />
    </DashboardLayout>
  );
};

export default DashboardAdminPage;

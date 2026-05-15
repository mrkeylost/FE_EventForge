import DashboardLayout from "@/components/layouts/DashboardLayout";
import AdminEvent from "@/features/admin/event/_components/AdminEvent";

const AdminEventPage = () => {
  return (
    <DashboardLayout
      title="Event"
      description="Manage your event here"
      type="admin"
    >
      <AdminEvent />
    </DashboardLayout>
  );
};

export default AdminEventPage;

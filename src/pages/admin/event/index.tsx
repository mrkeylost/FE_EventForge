import DashboardLayout from "@/components/layouts/DashboardLayout";
import AdminEvent from "@/features/admin/event/_components/AdminEvent";
import { withURLParams } from "@/hooks/useChangeURL";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return withURLParams(context) ?? { props: {} };
};

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

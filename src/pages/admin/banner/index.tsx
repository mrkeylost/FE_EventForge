import DashboardLayout from "@/components/layouts/DashboardLayout";
import AdminBanner from "@/features/admin/banner/_components/AdminBanner";
import { withURLParams } from "@/hooks/useChangeURL";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return withURLParams(context) ?? { props: {} };
};

const AdminBannerPage = () => {
  return (
    <DashboardLayout
      title="Banner"
      description="Manage your banner here"
      type="admin"
    >
      <AdminBanner />
    </DashboardLayout>
  );
};

export default AdminBannerPage;

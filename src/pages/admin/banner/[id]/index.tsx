import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailBanner from "@/features/admin/banner/_components/DetailBanner";

const AdminDetailBannerPage = () => {
  return (
    <DashboardLayout
      title="Detail Banner"
      description="Manage information for this banner"
      type="admin"
    >
      <DetailBanner />
    </DashboardLayout>
  );
};

export default AdminDetailBannerPage;

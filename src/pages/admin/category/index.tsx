import AdminCategory from "@/features/admin/category/_components/AdminCategory";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { withURLParams } from "@/hooks/useChangeURL";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return withURLParams(context) ?? { props: {} };
};

const AdminCategoryPage = () => {
  return (
    <DashboardLayout
      title="Category"
      description="Manage your category here"
      type="admin"
    >
      <AdminCategory />
    </DashboardLayout>
  );
};

export default AdminCategoryPage;

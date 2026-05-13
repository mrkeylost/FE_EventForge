import AdminCategory from "@/features/admin/category/_components/AdminCategory";
import DashboardLayout from "@/components/layouts/DashboardLayout";

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

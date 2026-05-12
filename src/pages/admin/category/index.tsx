import AdminCategory from "@/components/admin/category/AdminCategory";
import DashboardLayout from "@/components/layouts/dashboard/DashboardLayout";

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

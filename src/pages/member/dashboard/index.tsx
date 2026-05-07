import DashboardLayout from "@/components/layouts/dashboard/DashboardLayout";
import DashboardMember from "@/components/member/dashboard";

const DashboardMemberPage = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      description="Dashboard Member"
      type="member"
    >
      <DashboardMember />
    </DashboardLayout>
  );
};

export default DashboardMemberPage;

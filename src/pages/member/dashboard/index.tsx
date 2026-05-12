import DashboardLayout from "@/components/layouts/dashboard/DashboardLayout";
import MemberDashboard from "@/components/member/dashboard/MemberDashboard";

const MemberDashboardPage = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      description="Dashboard Member"
      type="member"
    >
      <MemberDashboard />
    </DashboardLayout>
  );
};

export default MemberDashboardPage;

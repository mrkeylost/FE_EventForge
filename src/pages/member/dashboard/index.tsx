import DashboardLayout from "@/components/layouts/DashboardLayout";
import MemberDashboard from "@/features/member/dashboard/_components/MemberDashboard";

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

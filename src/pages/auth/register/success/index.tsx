import AuthLayout from "@/components/layouts/AuthLayout";
import RegisterSuccess from "@/features/auth/_components/RegisterSuccess";

const RegisterSuccessPage = () => {
  return (
    <AuthLayout title="EventForge | Register">
      <RegisterSuccess />
    </AuthLayout>
  );
};

export default RegisterSuccessPage;

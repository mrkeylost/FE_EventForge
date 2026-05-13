import AuthLayout from "@/components/layouts/AuthLayout";
import Register from "@/features/auth/_components/Register";

const RegisterPage = () => {
  return (
    <AuthLayout title="EventForge | Register">
      <Register />
    </AuthLayout>
  );
};

export default RegisterPage;

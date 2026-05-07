import AuthLayout from "@/components/layouts/AuthLayout";
import Register from "@/components/auth/Register";

const RegisterPage = () => {
  return (
    <AuthLayout title="EventForge | Register">
      <Register />
    </AuthLayout>
  );
};

export default RegisterPage;

import Login from "@/features/auth/_components/Login";
import AuthLayout from "@/components/layouts/AuthLayout";

const LoginPage = () => {
  return (
    <AuthLayout title="EventForge | Register">
      <Login />
    </AuthLayout>
  );
};

export default LoginPage;

import Login from "@/components/auth/Login";
import AuthLayout from "@/components/layouts/AuthLayout";

const LoginPage = () => {
  return (
    <AuthLayout title="EventForge | Register">
      <Login />
    </AuthLayout>
  );
};

export default LoginPage;

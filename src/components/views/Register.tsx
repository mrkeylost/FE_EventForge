import { Button, Card, CardBody, Input } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Register = () => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const toggleVisiblePassword = (key: "password" | "confirmPassword") => {
    setShowPassword({
      ...showPassword,
      [key]: !showPassword[key],
    });
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:gap-20">
      <div className="flex w-full flex-col items-center justify-center gap-10 lg:w-1/3">
        <Image
          src="/images/general/logo.svg"
          alt="logo"
          width={180}
          height={180}
          priority
        />
        <Image
          src="/images/illustrations/login.svg"
          alt="login"
          className="h-auto w-2/3 lg:w-full"
          width={1024}
          height={1024}
          priority
        />
      </div>
      <Card>
        <CardBody className="p-8">
          <h2 className="text-xl font-bold text-red-500">Create Account</h2>
          <p className="text-small mb-4">
            Have an account?&nbsp;
            <Link href="/login" className="font-semibold text-red-400">
              Login here
            </Link>
          </p>
          <form className="flex w-80 flex-col">
            <div className="flex w-80 flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Input
                  fullWidth
                  label="Fullname"
                  variant="bordered"
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Input
                  fullWidth
                  label="Username"
                  variant="bordered"
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Input
                  fullWidth
                  id="input-type-email"
                  label="Email"
                  variant="bordered"
                  autoComplete="off"
                  type="email"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Input
                  fullWidth
                  id="input-type-password"
                  label="Password"
                  variant="bordered"
                  autoComplete="off"
                  type={showPassword.password ? "text" : "password"}
                  endContent={
                    <button
                      aria-label="toggle password visibility"
                      className="outline-transparent focus:outline-solid"
                      type="button"
                      onClick={() => toggleVisiblePassword("password")}
                    >
                      {showPassword.password ? (
                        <Eye className="text-base-content/40 size-5" />
                      ) : (
                        <EyeOff className="text-base-content/40 size-5" />
                      )}
                    </button>
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <Input
                  fullWidth
                  id="input-type-password"
                  label="Password Confirmation"
                  variant="bordered"
                  autoComplete="off"
                  type={showPassword.confirmPassword ? "text" : "password"}
                  endContent={
                    <button
                      aria-label="toggle password visibility"
                      className="outline-transparent focus:outline-solid"
                      type="button"
                      onClick={() => toggleVisiblePassword("confirmPassword")}
                    >
                      {showPassword.confirmPassword ? (
                        <Eye className="text-base-content/40 size-5" />
                      ) : (
                        <EyeOff className="text-base-content/40 size-5" />
                      )}
                    </button>
                  }
                />
              </div>

              <Button color="danger" size="lg" type="submit">
                Register
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Register;

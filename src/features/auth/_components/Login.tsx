import useLogin from "@/features/auth/_hooks/useLogin";
import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Controller } from "react-hook-form";

const Login = () => {
  const {
    isVisible,
    setIsVisible,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  } = useLogin();

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
          <h2 className="text-danger-500 text-xl font-bold">Create Account</h2>
          <p className="text-small mb-4">
            Don&apos;t Have an account?&nbsp;
            <Link
              href="/auth/register"
              className="text-danger-400 font-semibold"
            >
              Register here
            </Link>
          </p>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex w-80 flex-col gap-4"
          >
            <Controller
              name="identifier"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-1">
                  <Input
                    {...field}
                    fullWidth
                    label="Email / Username"
                    variant="bordered"
                    autoComplete="off"
                    type="text"
                    isInvalid={!!errors.identifier}
                    errorMessage={errors.identifier?.message}
                  />
                </div>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-1">
                  <Input
                    {...field}
                    fullWidth
                    label="Password"
                    variant="bordered"
                    autoComplete="off"
                    type={isVisible ? "text" : "password"}
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message}
                    endContent={
                      <button
                        aria-label="toggle password visibility"
                        className="outline-transparent focus:outline-solid"
                        type="button"
                        onClick={() => setIsVisible(!isVisible)}
                      >
                        {isVisible ? (
                          <Eye className="text-base-content/40 size-5" />
                        ) : (
                          <EyeOff className="text-base-content/40 size-5" />
                        )}
                      </button>
                    }
                  />
                </div>
              )}
            />

            <Button color="danger" size="lg" type="submit">
              {isPendingLogin ? (
                <Spinner variant="dots" color="default" size="sm" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;

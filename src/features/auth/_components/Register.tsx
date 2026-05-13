import useRegister from "@/features/auth/_hooks/useRegister";
import { cn } from "@/utils/cn";
import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Controller } from "react-hook-form";

const Register = () => {
  const {
    showPassword,
    toggleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  } = useRegister();

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
            Have an account?&nbsp;
            <Link href="/auth/login" className="text-danger-400 font-semibold">
              Login here
            </Link>
          </p>
          {errors.root && (
            <p className="text-danger mb-2 font-medium">
              {errors.root.message}
            </p>
          )}
          <form
            onSubmit={handleSubmit(handleRegister)}
            className={cn(
              "flex w-80 flex-col",
              Object.keys(errors).length > 0 ? "gap-2" : "gap-4",
            )}
          >
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-1">
                  <Input
                    {...field}
                    fullWidth
                    label="Fullname"
                    variant="bordered"
                    autoComplete="off"
                    type="text"
                    isInvalid={!!errors.fullName}
                    errorMessage={errors.fullName?.message}
                  />
                </div>
              )}
            />
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-1">
                  <Input
                    {...field}
                    fullWidth
                    label="Username"
                    variant="bordered"
                    autoComplete="off"
                    type="text"
                    isInvalid={!!errors.username}
                    errorMessage={errors.username?.message}
                  />
                </div>
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-1">
                  <Input
                    {...field}
                    fullWidth
                    label="Email"
                    variant="bordered"
                    autoComplete="off"
                    type="email"
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
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
                    type={showPassword.password ? "text" : "password"}
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message}
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
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-1">
                  <Input
                    {...field}
                    fullWidth
                    label="Password Confirmation"
                    variant="bordered"
                    autoComplete="off"
                    type={showPassword.confirmPassword ? "text" : "password"}
                    isInvalid={!!errors.confirmPassword}
                    errorMessage={errors.confirmPassword?.message}
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
              )}
            />

            <Button color="danger" size="lg" type="submit">
              {isPendingRegister ? (
                <Spinner variant="dots" color="default" size="sm" />
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Register;

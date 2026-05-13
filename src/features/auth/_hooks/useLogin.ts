import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILogin } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { addToast } from "@heroui/react";

const loginSchema = Yup.object().shape({
  identifier: Yup.string().required("Please input your email or username"),
  password: Yup.string().required("Please input your password"),
});

const useLogin = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const callbackUrl: string = (router.query.callbackUrl as string) || "/";

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginService = async (payload: ILogin) => {
    const res = await signIn("credentials", {
      ...payload,
      redirect: false,
      callbackUrl,
    });

    if (res?.error && res.status === 401) {
      throw new Error("Login failed");
    }
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,
    onError(err) {
      setError("root", {
        message: err.message,
      });

      addToast({
        title: err.message,
        description: "please check your username or email and password",
        color: "danger",
      });
    },
    onSuccess: () => {
      router.push(callbackUrl);
      reset();

      addToast({
        title: "Login Success",
        color: "success",
      });
    },
  });

  const handleLogin = (data: ILogin) => mutateLogin(data);

  return {
    isVisible,
    setIsVisible,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  };
};

export default useLogin;

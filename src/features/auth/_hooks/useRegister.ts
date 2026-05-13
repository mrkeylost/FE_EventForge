import * as Yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "@/types/auth";
import authServices from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { addToast } from "@heroui/react";

const registerSchema = Yup.object().shape({
  fullName: Yup.string().required("Please input your fullname"),
  username: Yup.string().required("Please input your username"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Please input your fullname"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Please input your password")
    .test(
      "at-least-one-uppercase-letter",
      "Password must contains at least one uppercase letter",
      (value) => {
        if (!value) return false;

        const regex = /^(?=.*[A-Z])/;
        return regex.test(value);
      },
    )
    .test(
      "at-least-one-number",
      "Password must Contains at least one number",
      (value) => {
        if (!value) return false;

        const regex = /^(?=.*\d)/;
        return regex.test(value);
      },
    ),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), ""], "Password not match"),
});

const useRegister = () => {
  const router = useRouter();

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

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerService = async (payload: IRegister) => {
    const res = await authServices.register(payload);

    return res;
  };

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerService,
    onError(err) {
      setError("root", {
        message: err.message,
      });

      addToast({
        title: "Register Failed",
        description: err.message,
        color: "danger",
      });
    },
    onSuccess: () => {
      router.push("/auth/register/success");
      reset();

      addToast({
        title: "Register Success",
        color: "success",
      });
    },
  });

  const handleRegister = (data: IRegister) => mutateRegister(data);

  return {
    showPassword,
    toggleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  };
};

export default useRegister;

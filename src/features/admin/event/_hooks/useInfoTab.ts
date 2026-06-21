import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { DateValue } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import categoryServices from "@/services/category.service";
import { useRouter } from "next/router";

const updateInformationSchema = Yup.object().shape({
  name: Yup.string().required("Please input name"),
  slug: Yup.string().required("Please input slug"),
  category: Yup.string().required("Please select category"),
  startDate: Yup.mixed<DateValue>().required("Please input start date"),
  endDate: Yup.mixed<DateValue>().required("Please input end date"),
  description: Yup.string().required("Please input description"),
  isFeatured: Yup.string().default("Please select event highlight"),
  isPublish: Yup.string().required("Please select status"),
});

const useInfoTab = () => {
  const router = useRouter();
  const {
    control: updateInfoControl,
    handleSubmit: handleSubmitUpdateInfo,
    formState: { errors: updateInfoErrors },
    reset: updateInfoReset,
    setValue: updateInfoSetValue,
  } = useForm({
    resolver: yupResolver(updateInformationSchema),
  });

  const { data: dataCategory } = useQuery({
    queryKey: ["Category"],
    queryFn: () => categoryServices.getCategories(),
    enabled: router.isReady,
  });

  return {
    dataCategory,

    updateInfoControl,
    updateInfoErrors,
    updateInfoReset,
    updateInfoSetValue,
    handleSubmitUpdateInfo,
  };
};

export default useInfoTab;

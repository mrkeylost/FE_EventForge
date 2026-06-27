import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const updateInformationSchema = Yup.object().shape({
  title: Yup.string().required("Please input banner title"),
  isShow: Yup.string().required("Please select banner status"),
});

const useInfoTab = () => {
  const {
    control: updateInfoControl,
    handleSubmit: handleSubmitUpdateInfo,
    formState: { errors: updateInfoErrors },
    reset: updateInfoReset,
    setValue: updateInfoSetValue,
  } = useForm({
    resolver: yupResolver(updateInformationSchema),
  });

  return {
    updateInfoControl,
    updateInfoErrors,
    updateInfoReset,
    updateInfoSetValue,
    handleSubmitUpdateInfo,
  };
};

export default useInfoTab;

import useMediaHandling from "@/hooks/useMediaHandling";
import bannerServices from "@/services/banner.service";
import { IBanner } from "@/types/banner";
import { isValidFileType, MAX_FILE_SIZE } from "@/utils/file";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import * as Yup from "yup";

const bannerSchema = Yup.object().shape({
  title: Yup.string().required("Please input banner title"),
  isShow: Yup.string().required("Please select banner status"),
  image: Yup.mixed<FileList | string>()
    .required("Please input Image")
    .test("fileType", "Not a valid image type", (value): boolean => {
      if (typeof value === "string") return value.length > 0;

      if (!(value instanceof FileList) || value.length === 0) return false;

      return isValidFileType(value[0].name, "image");
    })
    .test("fileSize", "Max allowed size is 100KB", (value): boolean => {
      if (typeof value === "string") return true;

      if (!(value instanceof FileList) || value.length === 0) return false;

      return value[0].size <= MAX_FILE_SIZE;
    }),
});

const useAddBannerModal = () => {
  const {
    control: addBannerControl,
    handleSubmit: handleSubmitAddBanner,
    formState: { errors: addBannerErrors },
    reset: addBannerReset,
    getValues: addBannerGetValues,
    setValue: addBannerSetValues,
  } = useForm({
    resolver: yupResolver(bannerSchema),
  });

  const {
    isPendingUploadFile,
    isPendingDeleteFile,

    handleUploadFile,
    handleDeleteFile,
  } = useMediaHandling();

  const preview = useWatch({
    control: addBannerControl,
    name: "image",
  });

  const handleUploadImage = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        addBannerSetValues("image", fileUrl);
      }
    });
  };

  const fileUrl = addBannerGetValues("image");

  const handleDeleteImage = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      addBannerReset();
      onClose();
    });
  };

  const addBanner = async (payload: IBanner) => {
    const res = await bannerServices.createBanner(payload);

    return res;
  };

  const {
    mutate: mutateAddBanner,
    isPending: isPendingAddBanner,
    isSuccess: isSuccessAddBanner,
  } = useMutation({
    mutationFn: addBanner,
    onError(err) {
      addToast({
        title: "Add Banner Failed",
        description: err.message,
        color: "danger",
      });
    },
    onSuccess: () => {
      addBannerReset();

      addToast({
        title: "Add Banner Success",
        color: "success",
      });
    },
  });

  const handleAddBanner = (data: IBanner) => mutateAddBanner(data);

  return {
    addBannerControl,
    addBannerErrors,
    addBannerReset,

    handleSubmitAddBanner,
    handleAddBanner,
    isPendingAddBanner,
    isSuccessAddBanner,

    preview,
    handleUploadImage,
    isPendingUploadFile,
    handleDeleteImage,
    isPendingDeleteFile,

    handleOnClose,
  };
};

export default useAddBannerModal;

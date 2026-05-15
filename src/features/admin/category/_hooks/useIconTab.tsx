import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch } from "react-hook-form";
import { isValidFileType, MAX_FILE_SIZE } from "@/utils/file";
import useMediaHandling from "@/hooks/useMediaHandling";

const updateIconSchema = Yup.object().shape({
  icon: Yup.mixed<FileList | string>()
    .required("Please input Icon")
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

const useIconTab = () => {
  const {
    mutateUploadFile,
    isPendingUploadFile,
    mutateDeleteFile,
    isPendingDeleteFile,
  } = useMediaHandling();

  const {
    control: updateIconControl,
    handleSubmit: handleSubmitUpdateIcon,
    formState: { errors: updateIconErrors },
    reset: updateIconReset,
    getValues: updateIconGetValues,
    setValue: updateIconSetValue,
  } = useForm({
    resolver: yupResolver(updateIconSchema),
  });

  const preview = useWatch({
    control: updateIconControl,
    name: "icon",
  });

  const handleUploadIcon = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    if (files.length !== 0) {
      onChange(files);
      mutateUploadFile({
        file: files[0],
        callback: (fileUrl: string) => {
          updateIconSetValue("icon", fileUrl);
        },
      });
    }
  };

  const handleDeleteIcon = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    const fileUrl = updateIconGetValues("icon");
    if (typeof fileUrl === "string") {
      mutateDeleteFile({ fileUrl, callback: () => onChange(undefined) });
    }
  };

  return {
    updateIconControl,
    updateIconErrors,
    updateIconReset,
    handleSubmitUpdateIcon,
    preview,

    handleUploadIcon,
    handleDeleteIcon,
    isPendingUploadFile,
    isPendingDeleteFile,
  };
};

export default useIconTab;

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch } from "react-hook-form";
import { isValidFileType, MAX_FILE_SIZE } from "@/utils/file";
import useMediaHandling from "@/hooks/useMediaHandling";

const updateImageSchema = Yup.object().shape({
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

const useImageTab = () => {
  const {
    mutateUploadFile,
    isPendingUploadFile,
    mutateDeleteFile,
    isPendingDeleteFile,
  } = useMediaHandling();

  const {
    control: updateImageControl,
    handleSubmit: handleSubmitUpdateImage,
    formState: { errors: updateImageErrors },
    reset: updateImageReset,
    getValues: updateImageGetValues,
    setValue: updateImageSetValue,
  } = useForm({
    resolver: yupResolver(updateImageSchema),
  });

  const preview = useWatch({
    control: updateImageControl,
    name: "image",
  });

  const handleUploadImage = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    if (files.length !== 0) {
      onChange(files);
      mutateUploadFile({
        file: files[0],
        callback: (fileUrl: string) => {
          updateImageSetValue("image", fileUrl);
        },
      });
    }
  };

  const handleDeleteImage = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    const fileUrl = updateImageGetValues("image");
    if (typeof fileUrl === "string") {
      mutateDeleteFile({ fileUrl, callback: () => onChange(undefined) });
    }
  };

  return {
    updateImageControl,
    updateImageErrors,
    updateImageReset,
    handleSubmitUpdateImage,
    preview,

    handleUploadImage,
    handleDeleteImage,
    isPendingUploadFile,
    isPendingDeleteFile,
  };
};

export default useImageTab;

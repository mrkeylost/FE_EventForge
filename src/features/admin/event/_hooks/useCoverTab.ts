import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch } from "react-hook-form";
import { isValidFileType, MAX_FILE_SIZE } from "@/utils/file";
import useMediaHandling from "@/hooks/useMediaHandling";

const updateCoverSchema = Yup.object().shape({
  banner: Yup.mixed<FileList | string>()
    .required("Please input Cover")
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

const useCoverTab = () => {
  const {
    mutateUploadFile,
    isPendingUploadFile,
    mutateDeleteFile,
    isPendingDeleteFile,
  } = useMediaHandling();

  const {
    control: updateCoverControl,
    handleSubmit: handleSubmitUpdateCover,
    formState: { errors: updateCoverErrors },
    reset: updateCoverReset,
    getValues: updateCoverGetValues,
    setValue: updateCoverSetValue,
  } = useForm({
    resolver: yupResolver(updateCoverSchema),
  });

  const preview = useWatch({
    control: updateCoverControl,
    name: "banner",
  });

  const handleUploadCover = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    if (files.length !== 0) {
      onChange(files);
      mutateUploadFile({
        file: files[0],
        callback: (fileUrl: string) => {
          updateCoverSetValue("banner", fileUrl);
        },
      });
    }
  };

  const handleDeleteCover = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    const fileUrl = updateCoverGetValues("banner");
    if (typeof fileUrl === "string") {
      mutateDeleteFile({ fileUrl, callback: () => onChange(undefined) });
    }
  };

  return {
    updateCoverControl,
    updateCoverErrors,
    updateCoverReset,
    handleSubmitUpdateCover,
    preview,

    handleUploadCover,
    handleDeleteCover,
    isPendingUploadFile,
    isPendingDeleteFile,
  };
};

export default useCoverTab;

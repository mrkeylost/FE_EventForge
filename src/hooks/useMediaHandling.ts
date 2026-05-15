import mediaServices from "@/services/media.service";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const useMediaHandling = () => {
  const uploadIcon = async (
    file: File,
    callback: (fileUrl: string) => void,
  ) => {
    const formData = new FormData();
    formData.append("file", file);

    const {
      data: {
        data: { secure_url: icon },
      },
    } = await mediaServices.uploadSingleFile(formData);

    callback(icon);
  };

  const { mutate: mutateUploadFile, isPending: isPendingUploadFile } =
    useMutation({
      mutationFn: (params: {
        file: File;
        callback: (fileUrl: string) => void;
      }) => uploadIcon(params.file, params.callback),
      onError(err) {
        addToast({
          title: "Add Icon Failed",
          description: err.message,
          color: "danger",
        });
      },
    });

  const deleteIcon = async (fileUrl: string, callback: () => void) => {
    const res = await mediaServices.removeFIle({ fileUrl });

    if (res.data.meta.status === 200) {
      callback();
    }
  };

  const { mutate: mutateDeleteFile, isPending: isPendingDeleteFile } =
    useMutation({
      mutationFn: (params: { fileUrl: string; callback: () => void }) =>
        deleteIcon(params.fileUrl, params.callback),
      onError(err) {
        addToast({
          title: "Delete Icon Failed",
          description: err.message,
          color: "danger",
        });
      },
    });

  return {
    mutateUploadFile,
    isPendingUploadFile,
    mutateDeleteFile,
    isPendingDeleteFile,
  };
};

export default useMediaHandling;

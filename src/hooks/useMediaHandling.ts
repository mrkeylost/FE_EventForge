import mediaServices from "@/services/media.service";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const useMediaHandling = () => {
  const uploadFile = async (
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
      }) => uploadFile(params.file, params.callback),
      onError(err) {
        addToast({
          title: "Add Icon Failed",
          description: err.message,
          color: "danger",
        });
      },
    });

  const deleteFile = async (fileUrl: string, callback: () => void) => {
    const res = await mediaServices.removeFIle({ fileUrl });

    if (res.data.meta.status === 200) {
      callback();
    }
  };

  const { mutate: mutateDeleteFile, isPending: isPendingDeleteFile } =
    useMutation({
      mutationFn: (params: { fileUrl: string; callback: () => void }) =>
        deleteFile(params.fileUrl, params.callback),
      onError(err) {
        addToast({
          title: "Delete Icon Failed",
          description: err.message,
          color: "danger",
        });
      },
    });

  const handleUploadFile = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
    callback: (fileUrl?: string) => void,
  ) => {
    if (files.length !== 0) {
      onChange(files);
      mutateUploadFile({
        file: files[0],
        callback,
      });
    }
  };

  const handleDeleteFile = (
    fileUrl: FileList | string | undefined,
    callback: () => void,
  ) => {
    if (typeof fileUrl === "string") {
      mutateDeleteFile({ fileUrl, callback });
    } else {
      callback();
    }
  };

  return {
    mutateUploadFile,
    isPendingUploadFile,
    mutateDeleteFile,
    isPendingDeleteFile,

    handleUploadFile,
    handleDeleteFile,
  };
};

export default useMediaHandling;

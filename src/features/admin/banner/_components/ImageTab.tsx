import InputFile from "@/components/ui/InputFile";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import { Save } from "lucide-react";
import Image from "next/image";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import useImageTab from "../_hooks/useImageTab";

interface PropTypes {
  currentImage: string;
  onUpdate: (data: { image: FileList | string }) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const ImageTab = (props: PropTypes) => {
  const { currentImage, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

  const {
    updateImageControl,
    updateImageErrors,
    updateImageReset,
    handleSubmitUpdateImage,
    preview,

    handleUploadImage,
    handleDeleteImage,
    isPendingUploadFile,
    isPendingDeleteFile,
  } = useImageTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      updateImageReset();
    }
  }, [isSuccessUpdate, updateImageReset]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Banner Image</h1>
        <p className="text-small text-default-400 w-full">
          Manage Image of this banner
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateImage(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-default-700 text-sm font-medium">
              Current Image
            </p>
            <Skeleton
              isLoaded={!!currentImage}
              className="aspect-square rounded-lg"
            >
              <Image
                src={currentImage}
                alt="image"
                fill
                className="relative!"
              />
            </Skeleton>
          </div>

          <Controller
            name="image"
            control={updateImageControl}
            render={({ field: { onChange, ...field } }) => (
              <InputFile
                {...field}
                onUpload={(files) => handleUploadImage(files, onChange)}
                onDelete={() => handleDeleteImage(onChange)}
                isUploading={isPendingUploadFile}
                isDeleting={isPendingDeleteFile}
                preview={typeof preview === "string" ? preview : ""}
                isDropable
                isInvalid={!!updateImageErrors.image}
                errorMessage={updateImageErrors.image?.message}
                label={
                  <p className="text-default-700 mb-2 text-sm font-medium">
                    Upload new image
                  </p>
                }
              />
            )}
          />

          <Button
            type="submit"
            color="danger"
            className="disabled:bg-default-500 mt-2"
            startContent={<Save />}
            disabled={isPendingUploadFile || isPendingUpdate || !preview}
          >
            {isPendingUpdate ? (
              <Spinner variant="dots" size="sm" color="white" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default ImageTab;

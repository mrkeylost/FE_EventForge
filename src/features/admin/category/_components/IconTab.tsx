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
import useIconTab from "../_hooks/useIconTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface PropTypes {
  currentIcon: string;
  onUpdate: (data: { icon: FileList | string }) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const IconTab = (props: PropTypes) => {
  const { currentIcon, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

  const {
    updateIconControl,
    updateIconErrors,
    updateIconReset,
    handleSubmitUpdateIcon,
    preview,

    handleUploadIcon,
    handleDeleteIcon,
    isPendingUploadFile,
    isPendingDeleteFile,
  } = useIconTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      updateIconReset();
    }
  }, [isSuccessUpdate, updateIconReset]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Category Icon</h1>
        <p className="text-small text-default-400 w-full">
          Manage Icon of this category
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateIcon(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-default-700 text-sm font-medium">Current Icon</p>
            <Skeleton
              isLoaded={!!currentIcon}
              className="aspect-square rounded-lg"
            >
              <Image src={currentIcon} alt="icon" fill className="relative!" />
            </Skeleton>
          </div>

          <Controller
            name="icon"
            control={updateIconControl}
            render={({ field: { onChange, ...field } }) => (
              <InputFile
                {...field}
                onUpload={(files) => handleUploadIcon(files, onChange)}
                onDelete={() => handleDeleteIcon(onChange)}
                isUploading={isPendingUploadFile}
                isDeleting={isPendingDeleteFile}
                preview={typeof preview === "string" ? preview : ""}
                isDropable
                isInvalid={!!updateIconErrors.icon}
                errorMessage={updateIconErrors.icon?.message}
                label={
                  <p className="text-default-700 mb-2 text-sm font-medium">
                    Upload new icon
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

export default IconTab;

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
import useCoverTab from "../_hooks/useCoverTab";

interface PropTypes {
  currentCover: string;
  onUpdate: (data: { banner: FileList | string }) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const CoverTab = (props: PropTypes) => {
  const { currentCover, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

  const {
    updateCoverControl,
    updateCoverErrors,
    updateCoverReset,
    handleSubmitUpdateCover,
    preview,

    handleUploadCover,
    handleDeleteCover,
    isPendingUploadFile,
    isPendingDeleteFile,
  } = useCoverTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      updateCoverReset();
    }
  }, [isSuccessUpdate, updateCoverReset]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Event Cover</h1>
        <p className="text-small text-default-400 w-full">
          Manage Cover of this event
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateCover(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-default-700 text-sm font-medium">
              Current Banner
            </p>
            <Skeleton
              isLoaded={!!currentCover}
              className="aspect-square rounded-lg"
            >
              <Image
                src={currentCover}
                alt="cover"
                fill
                className="relative!"
              />
            </Skeleton>
          </div>

          <Controller
            name="banner"
            control={updateCoverControl}
            render={({ field: { onChange, ...field } }) => (
              <InputFile
                {...field}
                onUpload={(files) => handleUploadCover(files, onChange)}
                onDelete={() => handleDeleteCover(onChange)}
                isUploading={isPendingUploadFile}
                isDeleting={isPendingDeleteFile}
                preview={typeof preview === "string" ? preview : ""}
                isDropable
                isInvalid={!!updateCoverErrors.banner}
                errorMessage={updateCoverErrors.banner?.message}
                label={
                  <p className="text-default-700 mb-2 text-sm font-medium">
                    Upload new cover
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

export default CoverTab;

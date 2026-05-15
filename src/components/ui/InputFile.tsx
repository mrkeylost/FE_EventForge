import { cn } from "@/utils/cn";
import { Button, Spinner } from "@heroui/react";
import { CloudUpload, Trash2 } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, ReactNode, useEffect, useId, useRef } from "react";

interface PropTypes {
  name: string;
  isDropable?: boolean;
  className?: string;
  onUpload?: (files: FileList) => void;
  onDelete?: () => void;
  isUploading?: boolean;
  isDeleting?: boolean;
  preview?: string;
  isInvalid?: boolean;
  errorMessage?: string;
  label?: ReactNode;
}

const InputFile = (props: PropTypes) => {
  const {
    name,
    isDropable = false,
    className,
    onUpload,
    onDelete,
    isUploading,
    isDeleting,
    preview,
    isInvalid,
    errorMessage,
    label,
  } = props;

  const drop = useRef<HTMLLabelElement>(null);
  const dropzoneId = useId();

  useEffect(() => {
    const dropCurrent = drop.current;

    const handleDragOver = (e: DragEvent) => {
      if (isDropable) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      const files = e.dataTransfer?.files;

      if (files && onUpload) {
        onUpload(files);
      }
    };

    if (dropCurrent) {
      dropCurrent.addEventListener("dragover", handleDragOver);
      dropCurrent.addEventListener("drop", handleDrop);

      return () => {
        dropCurrent.removeEventListener("dragover", handleDragOver);
        dropCurrent.removeEventListener("drop", handleDrop);
      };
    }
  }, [isDropable, onUpload]);

  const handleOnUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && onUpload) {
      onUpload(files);
    }
  };

  return (
    <div>
      {label}
      <label
        ref={drop}
        htmlFor={`dropzone-file-${dropzoneId}`}
        className={cn(
          "border-bg flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100",
          className,
          { "border-danger-500": isInvalid },
        )}
      >
        {preview && (
          <div className="relative flex flex-col items-center justify-center p-5">
            <div className="mb-2 w-1/2">
              <Image fill src={preview} alt="image" className="relative!" />
            </div>
            <Button
              isIconOnly
              className="bg-danger-100 absolute top-2 right-2 flex h-9 w-9 items-center justify-center rounded"
              onPress={onDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Spinner size="sm" color="danger" />
              ) : (
                <Trash2 className="text-danger-500 h-5 w-5" />
              )}
            </Button>
          </div>
        )}

        {!preview && !isUploading && (
          <div className="flex flex-col items-center justify-center p-5">
            <CloudUpload className="mb-2 h-10 w-10 text-gray-400" />
            <p className="text-center text-sm font-semibold text-gray-500">
              {isDropable
                ? "Drag and drop or click to upload file here"
                : "Click to upload file here"}
            </p>
          </div>
        )}

        {isUploading && (
          <div className="flex flex-col items-center justify-center p-5">
            <Spinner color="danger" />
          </div>
        )}

        <input
          name={name}
          type="file"
          className="hidden"
          accept="image/*"
          id={`dropzone-file-${dropzoneId}`}
          onChange={handleOnUpload}
          disabled={preview !== ""}
          onClick={(e) => {
            e.currentTarget.value = "";
            e.target.dispatchEvent(new Event("change", { bubbles: true }));
          }}
        />
      </label>
      {isInvalid && (
        <p className="text-danger-500 p-1 text-xs">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputFile;

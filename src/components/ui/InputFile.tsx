import { cn } from "@/utils/cn";
import { CloudUpload } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useId, useRef, useState } from "react";

interface PropTypes {
  name: string;
  isDropable?: boolean;
  className?: string;
}

const InputFile = (props: PropTypes) => {
  const { name, isDropable = false, className } = props;

  const [uploadImage, setUploadImage] = useState<File | null>(null);

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
      setUploadImage(e.dataTransfer?.files?.[0] || null);
    };

    if (dropCurrent) {
      dropCurrent.addEventListener("dragover", handleDragOver);
      dropCurrent.addEventListener("drop", handleDrop);

      return () => {
        dropCurrent.removeEventListener("dragover", handleDragOver);
        dropCurrent.removeEventListener("drop", handleDrop);
      };
    }
  }, [isDropable]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      setUploadImage(files[0]);
    }
  };

  return (
    <label
      ref={drop}
      htmlFor={`dropzone-file-${dropzoneId}`}
      className={cn(
        "border-bg flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100",
        className,
      )}
    >
      {uploadImage ? (
        <div className="flex flex-col items-center justify-center p-5">
          <div className="mb-2 w-1/2">
            <Image
              fill
              src={URL.createObjectURL(uploadImage)}
              alt="image"
              className="relative!"
            />
          </div>
          <p className="text-center text-sm font-semibold text-gray-500">
            {uploadImage.name}
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-5">
          <CloudUpload className="mb-2 h-10 w-10 text-gray-400" />
          <p className="text-center text-sm font-semibold text-gray-500">
            {isDropable
              ? "Drag and drop or click to upload file here"
              : "Click to upload file here"}
          </p>
        </div>
      )}
      <input
        name={name}
        type="file"
        className="hidden"
        accept="image/*"
        id={`dropzone-file-${dropzoneId}`}
        onChange={handleOnChange}
      />
    </label>
  );
};

export default InputFile;

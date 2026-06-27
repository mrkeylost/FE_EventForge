import InputFile from "@/components/ui/InputFile";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { Save } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import useAddBannerModal from "../_hooks/useAddBannerModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
}

const AddBannerModal = (props: PropTypes) => {
  const queryClient = useQueryClient();
  const { isOpen, onClose, onOpenChange } = props;
  const {
    addBannerControl,
    addBannerErrors,

    handleSubmitAddBanner,
    handleAddBanner,
    isPendingAddBanner,
    isSuccessAddBanner,

    preview,
    handleUploadImage,
    isPendingUploadFile,
    handleDeleteImage,
    isPendingDeleteFile,

    handleOnClose,
  } = useAddBannerModal();

  useEffect(() => {
    if (isSuccessAddBanner) {
      onClose();

      queryClient.invalidateQueries({ queryKey: ["Banner"] });
    }
  }, [isSuccessAddBanner, onClose, queryClient]);

  const disabledButton =
    isPendingAddBanner || isPendingUploadFile || isPendingDeleteFile;

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      onOpenChange={onOpenChange}
      onClose={() => handleOnClose(onClose)}
    >
      <ModalContent>
        <form onSubmit={handleSubmitAddBanner(handleAddBanner)}>
          <ModalHeader className="flex flex-col gap-1">Add Banner</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-3">
              <strong>Information</strong>
              <Controller
                name="title"
                control={addBannerControl}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Title"
                    variant="bordered"
                    autoComplete="off"
                    type="text"
                    isInvalid={!!addBannerErrors.title}
                    errorMessage={addBannerErrors.title?.message}
                  />
                )}
              />
              <Controller
                name="isShow"
                control={addBannerControl}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Status"
                    variant="bordered"
                    autoComplete="off"
                    disallowEmptySelection
                    isInvalid={!!addBannerErrors.isShow}
                    errorMessage={addBannerErrors.isShow?.message}
                  >
                    <SelectItem key="true">Show</SelectItem>
                    <SelectItem key="false">Hide</SelectItem>
                  </Select>
                )}
              />
            </div>
            <div className="flex flex-col gap-3">
              <strong>Image</strong>
              <Controller
                name="image"
                control={addBannerControl}
                render={({ field: { onChange, ...field } }) => (
                  <InputFile
                    {...field}
                    onUpload={(files) => handleUploadImage(files, onChange)}
                    onDelete={() => handleDeleteImage(onChange)}
                    isUploading={isPendingUploadFile}
                    isDeleting={isPendingDeleteFile}
                    preview={typeof preview === "string" ? preview : ""}
                    isDropable
                    isInvalid={!!addBannerErrors.image}
                    errorMessage={addBannerErrors.image?.message}
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => handleOnClose(onClose)}
              disabled={disabledButton}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="danger"
              disabled={disabledButton}
              startContent={<Save />}
            >
              {isPendingAddBanner ? (
                <Spinner variant="dots" size="sm" color="white" />
              ) : (
                "Create Banner"
              )}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddBannerModal;

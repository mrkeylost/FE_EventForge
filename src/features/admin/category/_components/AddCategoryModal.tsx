import InputFile from "@/components/ui/InputFile";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
} from "@heroui/react";
import useAddCategoryModal from "../_hooks/useAddCategoryModal";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { Save } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
}

const AddCategoryModal = (props: PropTypes) => {
  const queryClient = useQueryClient();
  const { isOpen, onClose, onOpenChange } = props;
  const {
    control,
    errors,
    handleSubmitForm,
    handleAddCategory,
    isPendingAddCategory,
    isSuccessAddCategory,
    handleUploadIcon,
    isPendingUploadFile,
    handleDeleteIcon,
    isPendingDeleteFile,
    preview,
    handleOnClose,
  } = useAddCategoryModal();

  useEffect(() => {
    if (isSuccessAddCategory) {
      onClose();

      queryClient.invalidateQueries({ queryKey: ["Category"] });
    }
  }, [isSuccessAddCategory, onClose, queryClient]);

  const disabledButton =
    isPendingAddCategory || isPendingUploadFile || isPendingDeleteFile;

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      onOpenChange={onOpenChange}
      onClose={() => handleOnClose(onClose)}
    >
      <ModalContent>
        <form onSubmit={handleSubmitForm(handleAddCategory)}>
          <ModalHeader className="flex flex-col gap-1">
            Add Category
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-3">
              <strong>Information</strong>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Name"
                    variant="bordered"
                    autoComplete="off"
                    type="text"
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Description"
                    variant="bordered"
                    autoComplete="off"
                    isInvalid={!!errors.description}
                    errorMessage={errors.description?.message}
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-3">
              <strong>Icon</strong>
              <Controller
                name="icon"
                control={control}
                render={({ field: { onChange, ...field } }) => (
                  <InputFile
                    {...field}
                    onUpload={(files) => handleUploadIcon(files, onChange)}
                    onDelete={() => handleDeleteIcon(onChange)}
                    isUploading={isPendingUploadFile}
                    isDeleting={isPendingDeleteFile}
                    preview={typeof preview === "string" ? preview : ""}
                    isDropable
                    isInvalid={!!errors.icon}
                    errorMessage={errors.icon?.message}
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
              {isPendingAddCategory ? (
                <Spinner variant="dots" size="sm" color="white" />
              ) : (
                "Create Category"
              )}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddCategoryModal;

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import useDeleteCategoryModal from "../_hooks/useDeleteCategory";
import { useEffect } from "react";
import { Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  data: Record<string, unknown> | null;
}

const DeleteCategoryModal = (props: PropTypes) => {
  const queryClient = useQueryClient();
  const { isOpen, onClose, onOpenChange, data } = props;
  const {
    handleDeleteCategory,
    isPendingDeleteCategory,
    isSuccessDeleteCategory,
  } = useDeleteCategoryModal();

  useEffect(() => {
    if (isSuccessDeleteCategory) {
      onClose();

      queryClient.invalidateQueries({ queryKey: ["Category"] });
    }
  }, [isSuccessDeleteCategory, onClose, queryClient]);

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      onOpenChange={onOpenChange}
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Delete Category
        </ModalHeader>
        <ModalBody>
          <h6>Are you sure you want to delete this category?</h6>
          <div className="bg-default-100 flex flex-col gap-2 rounded-lg p-4">
            <div className="flex gap-2">
              <span className="text-default-500 w-20 shrink-0">Name</span>
              <span className="text-default-500">:</span>
              <span>{data?.name as string}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-default-500 w-20 shrink-0">
                Description
              </span>
              <span className="text-default-500">:</span>
              <span>{data?.description as string}</span>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={onClose}
            disabled={isPendingDeleteCategory}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="danger"
            disabled={isPendingDeleteCategory}
            startContent={<Trash2 />}
            onPress={() => handleDeleteCategory(data?._id as string)}
          >
            {isPendingDeleteCategory ? (
              <Spinner variant="dots" size="sm" color="white" />
            ) : (
              "Delete Category"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteCategoryModal;

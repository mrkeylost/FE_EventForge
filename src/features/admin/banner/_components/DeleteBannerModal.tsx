import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import { useEffect } from "react";
import { Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import useDeleteBannerModal from "../_hooks/useDeleteBanner";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  data: Record<string, unknown> | null;
}

const DeleteBannerModal = (props: PropTypes) => {
  const queryClient = useQueryClient();
  const { isOpen, onClose, onOpenChange, data } = props;
  const { handleDeleteBanner, isPendingDeleteBanner, isSuccessDeleteBanner } =
    useDeleteBannerModal();

  useEffect(() => {
    if (isSuccessDeleteBanner) {
      onClose();

      queryClient.invalidateQueries({ queryKey: ["Banner"] });
    }
  }, [isSuccessDeleteBanner, onClose, queryClient]);

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      onOpenChange={onOpenChange}
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Delete Banner</ModalHeader>
        <ModalBody>
          <h6>Are you sure you want to delete this banner?</h6>
          <div className="bg-default-100 flex flex-col gap-2 rounded-lg p-4">
            <div className="flex gap-2">
              <span className="text-default-500 w-20 shrink-0">Title</span>
              <span className="text-default-500">:</span>
              <span>{data?.title as string}</span>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={onClose}
            disabled={isPendingDeleteBanner}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="danger"
            disabled={isPendingDeleteBanner}
            startContent={<Trash2 />}
            onPress={() => handleDeleteBanner(data?._id as string)}
          >
            {isPendingDeleteBanner ? (
              <Spinner variant="dots" size="sm" color="white" />
            ) : (
              "Delete Banner"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteBannerModal;

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
import useDeleteTicketModal from "../_hooks/useDeleteTicket";
import { convertIDR } from "@/utils/currency";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  data: Record<string, unknown> | null;
}

const DeleteTicketModal = (props: PropTypes) => {
  const queryClient = useQueryClient();
  const { isOpen, onClose, onOpenChange, data } = props;
  const { handleDeleteTicket, isPendingDeleteTicket, isSuccessDeleteTicket } =
    useDeleteTicketModal();

  useEffect(() => {
    if (isSuccessDeleteTicket) {
      onClose();

      queryClient.invalidateQueries({ queryKey: ["Ticket"] });
    }
  }, [isSuccessDeleteTicket, onClose, queryClient]);

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      onOpenChange={onOpenChange}
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Delete Ticket</ModalHeader>
        <ModalBody>
          <h6>Are you sure you want to delete this ticket?</h6>
          <div className="bg-default-100 flex flex-col gap-2 rounded-lg p-4">
            <div className="flex gap-2">
              <span className="text-default-500 w-20 shrink-0">Name</span>
              <span className="text-default-500">:</span>
              <span>{data?.name as string}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-default-500 w-20 shrink-0">Price</span>
              <span className="text-default-500">:</span>
              <span>{`${convertIDR(data?.price as number)}`}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-default-500 w-20 shrink-0">Quantity</span>
              <span className="text-default-500">:</span>
              <span>{data?.quantity as string}</span>
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
            disabled={isPendingDeleteTicket}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="danger"
            disabled={isPendingDeleteTicket}
            startContent={<Trash2 />}
            onPress={() => handleDeleteTicket(data?._id as string)}
          >
            {isPendingDeleteTicket ? (
              <Spinner variant="dots" size="sm" color="white" />
            ) : (
              "Delete Ticket"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteTicketModal;

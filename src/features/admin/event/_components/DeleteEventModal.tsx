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
import useDeleteEventModal from "../_hooks/useDeleteEvent";
import { toGMTFormat } from "@/utils/date";
import { useQueryClient } from "@tanstack/react-query";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  data: Record<string, unknown> | null;
}

const DeleteEventModal = (props: PropTypes) => {
  const queryClient = useQueryClient();
  const { isOpen, onClose, onOpenChange, data } = props;
  const { handleDeleteEvent, isPendingDeleteEvent, isSuccessDeleteEvent } =
    useDeleteEventModal();

  useEffect(() => {
    if (isSuccessDeleteEvent) {
      onClose();

      queryClient.invalidateQueries({ queryKey: ["Event"] });
    }
  }, [isSuccessDeleteEvent, onClose, queryClient]);

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      onOpenChange={onOpenChange}
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Delete Event</ModalHeader>
        <ModalBody>
          <h6>Are you sure you want to delete this event?</h6>
          <div className="bg-default-100 flex flex-col gap-2 rounded-lg p-4">
            <div className="flex gap-2">
              <span className="text-default-500 w-20 shrink-0">Name</span>
              <span className="text-default-500">:</span>
              <span>{data?.name as string}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-default-500 w-20 shrink-0">Start Date</span>
              <span className="text-default-500">:</span>
              <span>{toGMTFormat(data?.startDate as string)}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-default-500 w-20 shrink-0">End Date</span>
              <span className="text-default-500">:</span>
              <span>{toGMTFormat(data?.endDate as string)}</span>
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
            disabled={isPendingDeleteEvent}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="danger"
            disabled={isPendingDeleteEvent}
            startContent={<Trash2 />}
            onPress={() => handleDeleteEvent(data?._id as string)}
          >
            {isPendingDeleteEvent ? (
              <Spinner variant="dots" size="sm" color="white" />
            ) : (
              "Delete Event"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteEventModal;

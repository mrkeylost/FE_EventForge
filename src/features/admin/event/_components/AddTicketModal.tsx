import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  NumberInput,
  Spinner,
  Textarea,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { Save } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import useAddTicketModal from "../_hooks/useAddTicketModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
}

const AddTicketModal = (props: PropTypes) => {
  const queryClient = useQueryClient();
  const { isOpen, onClose, onOpenChange } = props;
  const {
    addTicketControl,
    addTicketErrors,

    handleSubmitAddTicket,
    handleAddTicket,
    isPendingAddTicket,
    isSuccessAddTicket,

    handleOnClose,
  } = useAddTicketModal();

  useEffect(() => {
    if (isSuccessAddTicket) {
      onClose();

      queryClient.invalidateQueries({ queryKey: ["Ticket"] });
    }
  }, [isSuccessAddTicket, onClose, queryClient]);

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      onOpenChange={onOpenChange}
      onClose={() => handleOnClose(onClose)}
    >
      <ModalContent>
        <form onSubmit={handleSubmitAddTicket(handleAddTicket)}>
          <ModalHeader className="flex flex-col gap-1">Add Ticket</ModalHeader>
          <ModalBody>
            <div className="mb-4 flex flex-col gap-4">
              <strong>Information</strong>
              <Controller
                name="name"
                control={addTicketControl}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Name"
                    variant="bordered"
                    autoComplete="off"
                    type="text"
                    isInvalid={!!addTicketErrors.name}
                    errorMessage={addTicketErrors.name?.message}
                  />
                )}
              />

              <Controller
                name="price"
                control={addTicketControl}
                render={({ field }) => (
                  <NumberInput
                    value={field.value}
                    onValueChange={(val) => field.onChange(val)}
                    onBlur={field.onBlur}
                    name={field.name}
                    label="Price"
                    variant="bordered"
                    hideStepper
                    isInvalid={!!addTicketErrors.price}
                    errorMessage={addTicketErrors.price?.message}
                    formatOptions={{
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    }}
                  />
                )}
              />

              <Controller
                name="quantity"
                control={addTicketControl}
                render={({ field }) => (
                  <NumberInput
                    value={field.value}
                    onValueChange={(val) => field.onChange(val)}
                    onBlur={field.onBlur}
                    name={field.name}
                    label="Quantity"
                    variant="bordered"
                    hideStepper
                    isInvalid={!!addTicketErrors.quantity}
                    errorMessage={addTicketErrors.quantity?.message}
                  />
                )}
              />

              <Controller
                name="description"
                control={addTicketControl}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Description"
                    variant="bordered"
                    autoComplete="off"
                    isInvalid={!!addTicketErrors.description}
                    errorMessage={addTicketErrors.description?.message}
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
            >
              Cancel
            </Button>
            <Button type="submit" color="danger" startContent={<Save />}>
              {isPendingAddTicket ? (
                <Spinner variant="dots" size="sm" color="white" />
              ) : (
                "Add New Ticket"
              )}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddTicketModal;

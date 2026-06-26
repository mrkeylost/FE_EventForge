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
import useUpdateTicket from "../_hooks/useUpdateTicket";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  data: Record<string, unknown> | null;
}

const UpdateTicketModal = (props: PropTypes) => {
  const queryClient = useQueryClient();
  const { isOpen, onClose, onOpenChange, data } = props;
  const {
    updateTicketControl,
    updateTicketErrors,
    updateTicketSetValue,

    handleSubmitUpdateTicket,
    handleUpdateTicket,
    isPendingUpdateTicket,
    isSuccessUpdateTicket,

    handleOnClose,
  } = useUpdateTicket();

  useEffect(() => {
    if (isSuccessUpdateTicket) {
      onClose();

      queryClient.invalidateQueries({ queryKey: ["Ticket"] });
    }
  }, [isSuccessUpdateTicket, onClose, queryClient]);

  useEffect(() => {
    updateTicketSetValue("name", `${data?.name}`);
    updateTicketSetValue("price", data?.price as number);
    updateTicketSetValue("quantity", data?.quantity as number);
    updateTicketSetValue("description", `${data?.description}`);
  }, [data, updateTicketSetValue]);

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      onOpenChange={onOpenChange}
      onClose={onClose}
    >
      <ModalContent>
        <form
          onSubmit={handleSubmitUpdateTicket((formData) =>
            handleUpdateTicket(data?._id as string, formData),
          )}
        >
          <ModalHeader className="flex flex-col gap-1">
            Update Ticket
          </ModalHeader>
          <ModalBody>
            <div className="mb-4 flex flex-col gap-4">
              <strong>Information</strong>
              <Controller
                name="name"
                control={updateTicketControl}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Name"
                    variant="bordered"
                    autoComplete="off"
                    type="text"
                    defaultValue={data?.name as string}
                    isInvalid={!!updateTicketErrors.name}
                    errorMessage={updateTicketErrors.name?.message}
                  />
                )}
              />

              <Controller
                name="price"
                control={updateTicketControl}
                render={({ field }) => (
                  <NumberInput
                    value={field.value}
                    onValueChange={(val) => field.onChange(val)}
                    onBlur={field.onBlur}
                    name={field.name}
                    label="Price"
                    variant="bordered"
                    hideStepper
                    defaultValue={data?.price as number}
                    isInvalid={!!updateTicketErrors.price}
                    errorMessage={updateTicketErrors.price?.message}
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
                control={updateTicketControl}
                render={({ field }) => (
                  <NumberInput
                    value={field.value}
                    onValueChange={(val) => field.onChange(val)}
                    onBlur={field.onBlur}
                    name={field.name}
                    label="Quantity"
                    variant="bordered"
                    hideStepper
                    defaultValue={data?.quantity as number}
                    isInvalid={!!updateTicketErrors.quantity}
                    errorMessage={updateTicketErrors.quantity?.message}
                  />
                )}
              />

              <Controller
                name="description"
                control={updateTicketControl}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Description"
                    variant="bordered"
                    autoComplete="off"
                    defaultValue={data?.description as string}
                    isInvalid={!!updateTicketErrors.description}
                    errorMessage={updateTicketErrors.description?.message}
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
              {isPendingUpdateTicket ? (
                <Spinner variant="dots" size="sm" color="white" />
              ) : (
                "Update Ticket"
              )}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default UpdateTicketModal;

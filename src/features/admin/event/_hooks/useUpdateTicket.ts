import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import ticketServices from "@/services/ticket.service";
import { ITicket } from "@/types/ticket";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const ticketSchema = Yup.object().shape({
  name: Yup.string().required("Please input name"),
  price: Yup.number().required("Please input price"),
  quantity: Yup.number().required("Please input quantity"),
  description: Yup.string().required("Please input description"),
});

const useUpdateTicket = () => {
  const {
    control: updateTicketControl,
    handleSubmit: handleSubmitUpdateTicket,
    formState: { errors: updateTicketErrors },
    reset: updateTicketReset,
    setValue: updateTicketSetValue,
  } = useForm({
    resolver: yupResolver(ticketSchema),
  });

  const handleOnClose = (onClose: () => void) => {
    updateTicketReset();
    onClose();
  };

  const updateTicket = async (id: string, payload: ITicket) => {
    const res = await ticketServices.updateTicket(id, payload);

    return res.data.data;
  };

  const {
    mutate: mutateUpdateTicket,
    isPending: isPendingUpdateTicket,
    isSuccess: isSuccessUpdateTicket,
  } = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: ITicket }) =>
      updateTicket(id, payload),
    onError(err) {
      addToast({
        title: "Update Ticket Failed",
        description: err.message,
        color: "danger",
      });
    },
    onSuccess: () => {
      addToast({
        title: "Update ticket success",
        color: "success",
      });
    },
  });

  const handleUpdateTicket = (id: string, data: ITicket) =>
    mutateUpdateTicket({ id, payload: data });

  return {
    updateTicketControl,
    updateTicketErrors,
    updateTicketReset,
    updateTicketSetValue,

    handleSubmitUpdateTicket,
    handleUpdateTicket,
    isPendingUpdateTicket,
    isSuccessUpdateTicket,

    handleOnClose,
  };
};

export default useUpdateTicket;

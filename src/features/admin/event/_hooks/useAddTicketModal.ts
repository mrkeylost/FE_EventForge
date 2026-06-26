import ticketServices from "@/services/ticket.service";
import { ITicket } from "@/types/ticket";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const ticketSchema = Yup.object().shape({
  name: Yup.string().required("Please input name"),
  price: Yup.number().required("Please input price"),
  quantity: Yup.number().required("Please input quantity"),
  description: Yup.string().required("Please input description"),
});

const useAddTicketModal = () => {
  const { query } = useRouter();
  const {
    control: addTicketControl,
    handleSubmit: handleSubmitAddTicket,
    formState: { errors: addTicketErrors },
    reset: addTicketReset,
  } = useForm({
    resolver: yupResolver(ticketSchema),
  });

  const handleOnClose = (onClose: () => void) => {
    addTicketReset();
    onClose();
  };

  const addTicket = async (payload: ITicket) => {
    const res = await ticketServices.createTicket(payload);

    return res;
  };

  const {
    mutate: mutateAddTicket,
    isPending: isPendingAddTicket,
    isSuccess: isSuccessAddTicket,
  } = useMutation({
    mutationFn: addTicket,
    onError(err) {
      addToast({
        title: "Add Ticket Failed",
        description: err.message,
        color: "danger",
      });
    },
    onSuccess: () => {
      addTicketReset();

      addToast({
        title: "Add Ticket Success",
        color: "success",
      });
    },
  });

  const handleAddTicket = (data: ITicket) => {
    const payload = {
      ...data,
      event: `${query.id}`,
    };

    mutateAddTicket(payload);
  };

  return {
    addTicketControl,
    addTicketErrors,
    addTicketReset,

    handleSubmitAddTicket,
    handleAddTicket,
    isPendingAddTicket,
    isSuccessAddTicket,

    handleOnClose,
  };
};

export default useAddTicketModal;

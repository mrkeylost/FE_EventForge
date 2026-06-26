import ticketServices from "@/services/ticket.service";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const useDeleteTicketModal = () => {
  const deleteTicket = async (id: string) => {
    const res = await ticketServices.deleteTicket(id);

    return res;
  };

  const {
    mutate: mutateDeleteTicket,
    isPending: isPendingDeleteTicket,
    isSuccess: isSuccessDeleteTicket,
  } = useMutation({
    mutationFn: deleteTicket,
    onError(err) {
      addToast({
        title: "Delete Ticket Failed",
        description: err.message,
        color: "danger",
      });
    },
    onSuccess: () => {
      addToast({
        title: "Delete Ticket Success",
        color: "success",
      });
    },
  });

  const handleDeleteTicket = (id: string) => mutateDeleteTicket(id);

  return {
    handleDeleteTicket,
    isPendingDeleteTicket,
    isSuccessDeleteTicket,
  };
};

export default useDeleteTicketModal;

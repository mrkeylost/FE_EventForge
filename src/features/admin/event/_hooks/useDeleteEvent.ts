import eventServices from "@/services/event.service";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const useDeleteEventModal = () => {
  const deleteEvent = async (id: string) => {
    const res = await eventServices.deleteEvent(id);

    return res;
  };

  const {
    mutate: mutateDeleteEvent,
    isPending: isPendingDeleteEvent,
    isSuccess: isSuccessDeleteEvent,
  } = useMutation({
    mutationFn: deleteEvent,
    onError(err) {
      addToast({
        title: "Delete Event Failed",
        description: err.message,
        color: "danger",
      });
    },
    onSuccess: () => {
      addToast({
        title: "Delete Event Success",
        color: "success",
      });
    },
  });

  const handleDeleteEvent = (id: string) => mutateDeleteEvent(id);

  return {
    handleDeleteEvent,
    isPendingDeleteEvent,
    isSuccessDeleteEvent,
  };
};

export default useDeleteEventModal;

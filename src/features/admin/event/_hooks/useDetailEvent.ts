import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { addToast } from "@heroui/react";
import eventServices from "@/services/event.service";
import { IEvent, IEventForm } from "@/types/event";
import { formatDateStandard } from "@/utils/date";

const useDetailEvent = () => {
  const { query, isReady } = useRouter();
  const queryClient = useQueryClient();

  /*====================== Get Event By ID =============================*/

  const getEventById = async (id: string) => {
    const res = await eventServices.getEventById(id);

    return res.data.data;
  };

  const { data: dataEvent } = useQuery({
    queryKey: ["Event", query.id],
    queryFn: () => getEventById(`${query.id}`),
    enabled: isReady,
  });

  /*====================== Update Event =============================*/

  const updateEvent = async (payload: IEvent) => {
    const res = await eventServices.updateEvent(`${query.id}`, payload);

    return res.data.data;
  };

  const { mutate: mutateUpdateEvent, isPending: isPendingUpdateEvent } =
    useMutation({
      mutationFn: (payload: IEvent) => updateEvent(payload),
      onError(err) {
        addToast({
          title: "Update Event Failed",
          description: err.message,
          color: "danger",
        });
      },
      onSuccess: () => {
        addToast({
          title: "Update event success",
          color: "success",
        });

        queryClient.invalidateQueries({ queryKey: ["Event"] });
      },
    });

  const handleUpdateEvent = (data: IEvent) => mutateUpdateEvent(data);

  const handleUpdateEventInformation = (dataForm: IEventForm) => {
    const { ...data } = dataForm;

    const payload: IEvent = {
      ...data,
      isFeatured: data.isFeatured === "true",
      isPublish: data.isPublish === "true",
      startDate: data.startDate ? formatDateStandard(data.startDate) : "",
      endDate: data.endDate ? formatDateStandard(data.endDate) : "",
      banner: data.banner,
    };

    mutateUpdateEvent(payload);
  };

  const handleUpdateEventLocation = (dataForm: IEventForm) => {
    const { address, region, latitude, longitude, ...data } = dataForm;

    const payload: IEvent = {
      isOnline: data.isOnline === "true",
      location: {
        address: address ? address : "",
        region: region ? region : "",
        coordinates: [Number(latitude), Number(longitude)],
      },
    };

    mutateUpdateEvent(payload);
  };

  return {
    dataEvent,

    handleUpdateEvent,
    handleUpdateEventInformation,
    handleUpdateEventLocation,
    isPendingUpdateEvent,
  };
};

export default useDetailEvent;

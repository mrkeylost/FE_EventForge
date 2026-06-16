import useChangeURL from "@/hooks/useChangeURL";
import eventServices from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useEvent = () => {
  const router = useRouter();

  const [selectedEvent, setSelectedEvent] = useState<Record<
    string,
    unknown
  > | null>(null);

  const { currentPage, currentLimit, currentSearch } = useChangeURL();

  const getEvents = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }

    const res = await eventServices.getEvents(params);
    return res.data;
  };

  const {
    data: dataEvent,
    isLoading: isLoadingEvent,
    isRefetching: isRefetchingEvent,
    refetch: refetchEvent,
  } = useQuery({
    queryKey: ["Event", currentPage, currentLimit, currentSearch],
    queryFn: () => getEvents(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataEvent,
    selectedEvent,
    setSelectedEvent,

    isLoadingEvent,
    isRefetchingEvent,
    refetchEvent,
  };
};

export default useEvent;

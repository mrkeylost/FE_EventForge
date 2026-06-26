import ticketServices from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useTicket = () => {
  const { query, isReady } = useRouter();

  const [selectedTicket, setSelectedTicket] = useState<Record<
    string,
    unknown
  > | null>(null);

  const getTicketByEvent = async (id: string) => {
    const res = await ticketServices.getTicketbyEvent(id);

    return res.data.data;
  };

  const {
    data: dataTicket,
    isLoading: isLoadingTicket,
    isRefetching: isRefetchingTicket,
  } = useQuery({
    queryKey: ["Ticket", query.id],
    queryFn: () => getTicketByEvent(`${query.id}`),
    enabled: isReady,
  });

  return {
    dataTicket,
    selectedTicket,
    setSelectedTicket,

    isLoadingTicket,
    isRefetchingTicket,
  };
};

export default useTicket;

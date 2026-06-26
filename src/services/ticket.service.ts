import endpoint from "@/constant/endpoint.constants";
import { ITicket } from "@/types/ticket";
import api from "@/utils/axios";

const ticketServices = {
  getTickets: (params?: string) => api.get(`${endpoint.TICKET}?${params}`),
  createTicket: (payload: ITicket) => api.post(`${endpoint.TICKET}`, payload),
  getTicketById: (id: string) => api.get(`${endpoint.TICKET}/${id}`),
  updateTicket: (id: string, payload: ITicket) =>
    api.put(`${endpoint.TICKET}/${id}`, payload),
  deleteTicket: (id: string) => api.delete(`${endpoint.TICKET}/${id}`),
  getTicketbyEvent: (eventId: string) =>
    api.get(`${endpoint.TICKET}/${eventId}/event`),
};

export default ticketServices;

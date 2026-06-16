import endpoint from "@/constant/endpoint.constants";
import { IEvent } from "@/types/event";
import api from "@/utils/axios";

const eventServices = {
  getEvents: (params?: string) => api.get(`${endpoint.EVENT}?${params}`),
  createEvent: (payload: IEvent) => api.post(`${endpoint.EVENT}`, payload),
  getEventById: (id: string) => api.get(`${endpoint.EVENT}/${id}`),
  updateEvent: (id: string, payload: IEvent) =>
    api.put(`${endpoint.EVENT}/${id}`, payload),
  deleteEvent: (id: string) => api.delete(`${endpoint.EVENT}/${id}`),
  getEventbySlug: (slug: string) => api.get(`${endpoint.EVENT}/${slug}`),
  searchLocationNyRegency: (name: string) =>
    api.get(`${endpoint.REGION}/city-search?name=${name}`),
};

export default eventServices;

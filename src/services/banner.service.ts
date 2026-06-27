import endpoint from "@/constant/endpoint.constants";
import { IBanner } from "@/types/banner";
import api from "@/utils/axios";

const bannerServices = {
  getBanners: (params?: string) => api.get(`${endpoint.BANNER}?${params}`),
  createBanner: (payload: IBanner) => api.post(`${endpoint.BANNER}`, payload),
  getBannerById: (id: string) => api.get(`${endpoint.BANNER}/${id}`),
  updateBanner: (id: string, payload: IBanner) =>
    api.put(`${endpoint.BANNER}/${id}`, payload),
  deleteBanner: (id: string) => api.delete(`${endpoint.BANNER}/${id}`),
};

export default bannerServices;

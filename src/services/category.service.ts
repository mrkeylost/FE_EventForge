import endpoint from "@/constant/commons/endpoint.constants";
import { ICategory } from "@/types/category";
import api from "@/utils/axios";

const categoryServices = {
  getCategories: (params?: string) => api.get(`${endpoint.CATEGORY}?${params}`),
  createCategory: (payload: ICategory) =>
    api.post(`${endpoint.CATEGORY}`, payload),
  getCategoryById: (id: string) => api.get(`${endpoint.CATEGORY}/${id}`),
  updateCategory: (id: string, payload: ICategory) =>
    api.put(`${endpoint.CATEGORY}?${id}`, payload),
  deleteCategory: (id: string) => api.delete(`${endpoint.CATEGORY}?${id}`),
};

export default categoryServices;

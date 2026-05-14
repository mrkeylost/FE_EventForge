import endpoint from "@/constant/endpoint.constants";
import { IFileUrl } from "@/types/file";
import api from "@/utils/axios";

const formDataHeader = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const mediaServices = {
  uploadSingleFile: (payload: FormData) =>
    api.post(`${endpoint.UPLOAD}/upload-single`, payload, formDataHeader),
  removeFIle: (payload: IFileUrl) =>
    api.delete(`${endpoint.UPLOAD}/remove`, { data: payload }),
};

export default mediaServices;

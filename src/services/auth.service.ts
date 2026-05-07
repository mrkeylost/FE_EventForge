import api from "@/utils/axios";
import endpoint from "../constant/commons/endpoint.constants";
import { IActivation, ILogin, IRegister } from "@/types/auth";

const authServices = {
  register: (payload: IRegister) =>
    api.post(`${endpoint.AUTH}/register`, payload),
  activation: (payload: IActivation) =>
    api.post(`${endpoint.AUTH}/activation`, payload),
  login: (payload: ILogin) => api.post(`${endpoint.AUTH}/login`, payload),
  getProfileWithToken: (token: string) =>
    api.get(`${endpoint.AUTH}/check-auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default authServices;

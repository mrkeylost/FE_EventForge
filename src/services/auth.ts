import api from "@/utils/axios";
import endpoint from "./endpoint.constant";
import { IRegister } from "@/types/auth";

const authServices = {
  register: (payload: IRegister) =>
    api.post(`${endpoint.AUTH}/register`, payload),
};

export default authServices;

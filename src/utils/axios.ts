import { env } from "@/config/env";
import { SessionExtended } from "@/types/auth";
import axios from "axios";
import { getSession } from "next-auth/react";

const headers = {
  "Content-Type": "application/json",
};

const api = axios.create({
  baseURL: env.API_URL,
  headers,
  timeout: 60 * 1000,
});

api.interceptors.request.use(
  async (req) => {
    const session: SessionExtended | null = await getSession();
    if (session && session.accessToken) {
      req.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return req;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error),
);

export default api;

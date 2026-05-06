import { env } from "@/pages/config/env";
import axios from "axios";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

interface CustomSession extends Session {
  accessToken?: string;
}

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
    const session: CustomSession | null = await getSession();
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

const API_URL: string = process.env.NEXT_PUBLIC_API_URL || "";
const AUTH_SECRET: string = process.env.NEXTAUTH_SECRET || "";

export const env = {
  API_URL,
  AUTH_SECRET,
};

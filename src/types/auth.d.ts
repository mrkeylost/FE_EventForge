import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

export interface IRegister {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILogin {
  identifier: string;
  password: string;
}

export interface IActivation {
  code: string;
}

export interface UserExtended extends User {
  accessToken?: string;
  role?: string;
}

export interface SessionExtended extends Session {
  accessToken?: string;
}

export interface JWTExtended extends JWT {
  user?: UserExtended;
}

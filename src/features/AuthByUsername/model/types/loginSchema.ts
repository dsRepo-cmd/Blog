import { User } from "@/entities/User";
import { ValidateAuthError } from "../const/const";

export interface LoginSchema {
  id: string;
  username: string;
  code: string;
  confirmCode: string;
  email: string;
  password: string;
  isLoading: boolean;
  isConfirm: boolean;
  token: string;
  validateErrors?: ValidateAuthErrors;
}

export interface Session {
  token: string;
  user: User;
}
export interface ValidateAuthErrors {
  data?: ValidateAuthError;
  email?: ValidateAuthError;
  password?: ValidateAuthError;
  code?: ValidateAuthError;
}

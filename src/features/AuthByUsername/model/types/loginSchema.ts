import { ValidateAuthError } from "../const/const";

export interface LoginSchema {
  username: string;
  email: string;
  password: string;
  isLoading: boolean;
  validateErrors?: ValidateAuthErrors;
}

export interface ValidateAuthErrors {
  data?: ValidateAuthError;
  email?: ValidateAuthError;
  password?: ValidateAuthError;
}

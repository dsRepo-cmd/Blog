import { ValidateAuthError, ValidateAuthErrorType } from "../const/const";

export interface LoginSchema {
  username: string;
  email: string;
  password: string;
  isLoading: boolean;
  validateErrors?: ValidateAuthErrors[];
}

export interface ValidateAuthErrors {
  type: ValidateAuthErrorType;
  error?: ValidateAuthError;
}

export interface FilteredAuthError {
  passwordError?: string;
  dataError?: string;
  emailError?: string;
}

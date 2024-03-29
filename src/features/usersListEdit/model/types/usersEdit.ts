import { UserRole } from "@/entities/User";
import { ValidateUserEditError } from "../consts/consts";

export interface UserEditSchema {
  data?: UsersEdit[];
  form?: UsersEdit[];
  isLoading: boolean;
  error?: string;
  readonly: boolean;
  validateErrors?: ValidateUserEditErrors;
}

export interface ValidateUserEditErrors {
  email?: ValidateUserEditError;
  username?: ValidateUserEditError;
  avatar?: ValidateUserEditError;
  roles?: ValidateUserEditError;
  features?: ValidateUserEditError;
  jsonSettings?: ValidateUserEditError;
  data?: ValidateUserEditError;
}

export interface UsersEdit {
  id: string;
  email: string;
  username?: string;
  avatar?: string;
  roles?: UserRole[];
}

import { Profile } from "@/entities/Profile";
import { ValidateProfileError } from "../consts/consts";

export interface ProfileSchema {
  data?: Profile;
  form?: Profile;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
  validateErrors?: ValidateProfileErrors;
}

export interface ValidateProfileErrors {
  firstname?: ValidateProfileError;
  lastname?: ValidateProfileError;
  city?: ValidateProfileError;
  age?: ValidateProfileError;
  username?: ValidateProfileError;
  avatar?: ValidateProfileError;
  currency?: ValidateProfileError;
  country?: ValidateProfileError;
  data?: ValidateProfileError;
  email?: ValidateProfileError;
}

import { Profile } from "@/entities/Profile";
import {
  ValidateProfileError,
  ValidateProfileErrorType,
} from "../consts/consts";

export interface ProfileSchema {
  data?: Profile;
  form?: Profile;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
  validateErrors?: ValidateProfileErrors[];
}

export interface ValidateProfileErrors {
  type: ValidateProfileErrorType;
  error?: ValidateProfileError;
}

export interface FilteredError {
  firstError?: string;
  lastnameError?: string;
  emailError?: string;
  ageError?: string;
  usernameError?: string;
  avatarError?: string;
  currencyError?: string;
  countryError?: string;
  dataError?: string;
}

import { User } from "@/entities/User";
import { ValidateAuthErrors } from "../../types/loginSchema";
import {
  REG_EXP_EMAIL,
  REG_EXP_PASSWORD,
  ValidateAuthError,
  ValidateAuthErrorType,
  loginByUsernameProps,
} from "../../const/const";

export const validateAuthData = (authData?: loginByUsernameProps) => {
  const errors: ValidateAuthErrors[] = [];

  if (!authData) {
    errors.push({
      type: ValidateAuthErrorType.DATA,
      error: ValidateAuthError.NO_DATA,
    });
  }

  if (authData) {
    const { email = "", password = "" } = authData;

    if (!REG_EXP_PASSWORD.test(password)) {
      errors.push({
        type: ValidateAuthErrorType.PASSWORD,
        error: ValidateAuthError.INCORRECT_PASSWORD,
      });
    }

    if (!REG_EXP_EMAIL.test(email)) {
      errors.push({
        type: ValidateAuthErrorType.EMAIL,
        error: ValidateAuthError.INCORRECT_EMAIL,
      });
    }
  }

  return errors;
};

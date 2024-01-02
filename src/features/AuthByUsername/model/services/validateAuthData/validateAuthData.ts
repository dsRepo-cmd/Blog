import { ValidateAuthErrors } from "../../types/loginSchema";
import {
  REG_EXP_EMAIL,
  REG_EXP_PASSWORD,
  ValidateAuthError,
  loginByUsernameProps,
} from "../../const/const";

export const validateAuthData = (authData?: loginByUsernameProps) => {
  const errors: ValidateAuthErrors = {};

  if (!authData) {
    errors.data = ValidateAuthError.NO_DATA;
  }

  if (authData) {
    const { email = "", password = "" } = authData;

    if (!REG_EXP_PASSWORD.test(password)) {
      errors.password = ValidateAuthError.INCORRECT_PASSWORD;
    }

    if (!REG_EXP_EMAIL.test(email)) {
      errors.email = ValidateAuthError.INCORRECT_EMAIL;
    }
  }

  return errors;
};

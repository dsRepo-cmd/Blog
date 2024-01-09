import { ValidateAuthErrors } from "../../types/loginSchema";
import {
  REG_EXP_CODE,
  REG_EXP_EMAIL,
  ValidateAuthError,
} from "../../const/const";

export interface validateCodeConfirmDataProps {
  email: string;
  code: string;
}

export const validateCodeConfirmData = (
  authData?: validateCodeConfirmDataProps
) => {
  const errors: ValidateAuthErrors = {};

  if (!authData) {
    errors.data = ValidateAuthError.NO_DATA;
  }

  if (authData) {
    const { email = "", code = "" } = authData;

    console.log(code, email);
    if (!REG_EXP_EMAIL.test(email)) {
      errors.email = ValidateAuthError.INCORRECT_EMAIL;
    }

    if (!REG_EXP_CODE.test(code)) {
      errors.code = ValidateAuthError.INCORRECT_CODE;
    }
  }

  return errors;
};

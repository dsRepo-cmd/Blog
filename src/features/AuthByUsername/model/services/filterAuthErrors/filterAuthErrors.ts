import { ValidateAuthErrorType } from "../../const/const";
import { FilteredAuthError, ValidateAuthErrors } from "../../types/loginSchema";

export function filterAuthErrors(
  errors: ValidateAuthErrors[]
): FilteredAuthError {
  const filteredError: FilteredAuthError = {
    emailError: "",
    passwordError: "",
    dataError: "",
  };

  errors.forEach((err) => {
    const { type, error } = err;
    if (error !== undefined) {
      switch (type) {
        case ValidateAuthErrorType.EMAIL:
          filteredError.emailError = error;
          break;
        case ValidateAuthErrorType.PASSWORD:
          filteredError.passwordError = error;
          break;
        case ValidateAuthErrorType.DATA:
          filteredError.dataError = error;
          break;
        default:
          break;
      }
    }
  });
  return filteredError;
}

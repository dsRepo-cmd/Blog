import { ValidateProfileErrorType } from "../../consts/consts";
import {
  FilteredError,
  ValidateProfileErrors,
} from "../../types/editableProfileCardSchema";

export function filterProfileErrors(
  errors: ValidateProfileErrors[]
): FilteredError {
  const filteredError: FilteredError = {};

  errors.forEach((err) => {
    const { type, error } = err;
    switch (type) {
      case ValidateProfileErrorType.COUNTRY:
        filteredError.countryError = error;
        break;
      case ValidateProfileErrorType.FIRSTNAME:
        filteredError.firstError = error;
        break;
      case ValidateProfileErrorType.LASTNAME:
        filteredError.lastnameError = error;
        break;
      case ValidateProfileErrorType.EMAIL:
        filteredError.emailError = error;
        break;
      case ValidateProfileErrorType.AGE:
        filteredError.ageError = error;
        break;
      case ValidateProfileErrorType.USERNAME:
        filteredError.usernameError = error;
        break;
      case ValidateProfileErrorType.AVATAR:
        filteredError.avatarError = error;
        break;
      case ValidateProfileErrorType.CURRENCY:
        filteredError.currencyError = error;
        break;
      case ValidateProfileErrorType.COUNTRY:
        filteredError.countryError = error;
        break;
      case ValidateProfileErrorType.DATA:
        filteredError.dataError = error;
        break;

      default:
        break;
    }
  });

  return filteredError;
}

import { Profile } from "@/entities/Profile";
import {
  REG_EXP_EMAIL,
  ValidateProfileError,
  ValidateProfileErrorType,
} from "../../consts/consts";
import { ValidateProfileErrors } from "../../types/editableProfileCardSchema";

export const validateProfileData = (profile?: Profile) => {
  const errors: ValidateProfileErrors[] = [];

  if (!profile) {
    errors.push({
      type: ValidateProfileErrorType.DATA,
      error: ValidateProfileError.NO_DATA,
    });
  }

  if (profile) {
    const {
      first = "",
      lastname = "",
      age = 0,
      username = "",
      email = "",
    } = profile;

    if (first?.length < 1) {
      errors.push({
        type: ValidateProfileErrorType.FIRSTNAME,
        error: ValidateProfileError.INCORRECT_FIRSTNAME,
      });
    }

    if (lastname?.length < 1) {
      errors.push({
        type: ValidateProfileErrorType.LASTNAME,
        error: ValidateProfileError.INCORRECT_LASTNAME,
      });
    }

    if (age < 0 && age > 150) {
      errors.push({
        type: ValidateProfileErrorType.LASTNAME,
        error: ValidateProfileError.INCORRECT_LASTNAME,
      });
    }

    if (username?.length < 1) {
      errors.push({
        type: ValidateProfileErrorType.LASTNAME,
        error: ValidateProfileError.INCORRECT_LASTNAME,
      });
    }

    if (!REG_EXP_EMAIL.test(email)) {
      errors.push({
        type: ValidateProfileErrorType.EMAIL,
        error: ValidateProfileError.INCORRECT_EMAIL,
      });
    }
  }

  return errors;
};

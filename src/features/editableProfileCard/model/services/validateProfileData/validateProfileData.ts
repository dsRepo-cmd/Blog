import { Profile } from "@/entities/Profile";
import { REG_EXP_EMAIL, ValidateProfileError } from "../../consts/consts";
import { ValidateProfileErrors } from "../../types/editableProfileCardSchema";

export const validateProfileData = (profile?: Profile) => {
  const errors: ValidateProfileErrors = {};

  if (!profile) {
    errors.data = ValidateProfileError.NO_DATA;
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
      errors.firstname = ValidateProfileError.INCORRECT_FIRSTNAME;
    }

    if (lastname?.length < 1) {
      errors.lastname = ValidateProfileError.INCORRECT_LASTNAME;
    }

    if (age < 0 && age > 150) {
      errors.age = ValidateProfileError.INCORRECT_AGE;
    }

    if (username?.length < 1) {
      errors.username = ValidateProfileError.INCORRECT_USERNAME;
    }

    if (!REG_EXP_EMAIL.test(email)) {
      errors.email = ValidateProfileError.INCORRECT_EMAIL;
    }
  }

  return errors;
};

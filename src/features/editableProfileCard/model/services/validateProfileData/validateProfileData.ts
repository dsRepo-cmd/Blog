import { Profile } from "@/entities/Profile";
import { REG_EXP_EMAIL, ValidateProfileError } from "../../consts/consts";
import { ValidateProfileErrors } from "../../types/editableProfileCardSchema";

export const validateProfileData = (profile?: Profile) => {
  const errors: ValidateProfileErrors = {};

  if (!profile) {
    errors.data = ValidateProfileError.NO_DATA;
  }

  if (profile) {
    const { age = 0, user } = profile;

    if (age < 0 && age > 150) {
      errors.age = ValidateProfileError.INCORRECT_AGE;
    }

    if (user && user.username && user.username.length < 1) {
      errors.username = ValidateProfileError.INCORRECT_USERNAME;
    }

    if (user && user.email && !REG_EXP_EMAIL.test(user.email)) {
      errors.email = ValidateProfileError.INCORRECT_EMAIL;
    }
  }

  return errors;
};

export enum ValidateAuthError {
  INCORRECT_EMAIL = "INCORRECT_EMAIL",
  INCORRECT_PASSWORD = "INCORRECT_PASSWORD",
  INCORRECT_CODE = "INCORRECT_CODE",
  NO_DATA = "NO_DATA",
  SERVER_ERROR = "Wrong email or password",
}

export const REG_EXP_EMAIL: RegExp = new RegExp(
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/
);

export const REG_EXP_PASSWORD: RegExp = new RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
);

export const REG_EXP_CODE: RegExp = new RegExp(/^\d{4}$/);

export enum ValidateAuthError {
  INCORRECT_EMAIL = "INCORRECT_EMAIL",
  INCORRECT_PASSWORD = "INCORRECT_PASSWORD",
  NO_DATA = "NO_DATA",
  SERVER_ERROR = "Wrong email or password",
}

export interface loginByUsernameProps {
  email: string;
  password: string;
}

export const REG_EXP_EMAIL: RegExp = new RegExp(
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/
);

export const REG_EXP_PASSWORD: RegExp = new RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
);

import { FC, lazy } from "react";
import { SignInFormProps } from "./SignInForm";

export const SignInFormAsync = lazy<FC<SignInFormProps>>(
  () => import("./SignInForm")
);

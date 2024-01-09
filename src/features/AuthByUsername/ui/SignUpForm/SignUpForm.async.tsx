import { FC, lazy } from "react";
import { SignUpFormProps } from "./SignUpForm";

export const SignUpFormAsync = lazy<FC<SignUpFormProps>>(
  () => import("./SignUpForm")
);

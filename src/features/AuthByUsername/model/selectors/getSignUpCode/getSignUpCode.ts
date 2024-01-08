import { StateSchema } from "@/app/providers/StoreProvider";

export const getSignUpCode = (state: StateSchema) =>
  state?.loginForm?.code || "";

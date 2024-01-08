import { StateSchema } from "@/app/providers/StoreProvider";

export const getConfirmCode = (state: StateSchema) =>
  state?.loginForm?.confirmCode || "";

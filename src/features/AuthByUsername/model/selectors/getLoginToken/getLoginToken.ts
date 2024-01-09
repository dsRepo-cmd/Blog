import { StateSchema } from "@/app/providers/StoreProvider";

export const getLoginToken = (state: StateSchema) =>
  state?.loginForm?.token || "";

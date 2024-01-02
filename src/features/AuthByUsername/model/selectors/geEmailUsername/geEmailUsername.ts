import { StateSchema } from "@/app/providers/StoreProvider";

export const getEmailUsername = (state: StateSchema) =>
  state?.loginForm?.email || "";

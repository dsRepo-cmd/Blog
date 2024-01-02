import { StateSchema } from "@/app/providers/StoreProvider";

export const getUserAuthData = (state: StateSchema) => {
  return state.user.authData;
};

export const getUserId = (state: StateSchema) => {
  return state.user.authData?.id;
};

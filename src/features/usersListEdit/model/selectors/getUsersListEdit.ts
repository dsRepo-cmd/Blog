import { StateSchema } from "@/app/providers/StoreProvider";

export const getUsersEditData = (state: StateSchema) => state.usersEdit?.data;

export const getUsersEditForm = (state: StateSchema) => state.usersEdit?.form;

export const getUsersEditIsLoading = (state: StateSchema) =>
  state.usersEdit?.isLoading;

export const getUsersEditValidateErrors = (state: StateSchema) =>
  state.usersEdit?.validateErrors;

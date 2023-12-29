import { StateSchema } from "@/app/providers/StoreProvider";

export const getArticleEditForm = (state: StateSchema) =>
  state.articleEdit?.formdata;

export const getArticleEditError = (state: StateSchema) =>
  state.articleEdit?.error;

export const getArticleEditIsLoading = (state: StateSchema) =>
  state.articleEdit?.isLoading;

export const getArticleEditValidateErrors = (state: StateSchema) =>
  state.articleEdit?.validateErrors;

export const getArticleEditData = (state: StateSchema) =>
  state.articleEdit?.data;

export const getArticleEditReadonly = (state: StateSchema) =>
  state.articleEdit?.readonly;

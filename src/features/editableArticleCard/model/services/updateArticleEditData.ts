import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { ArticleEdit } from "@/entities/Article";
import {
  ValidateArticleEditError,
  ValidateArticleEditErrorType,
  ValidateArticleEditErrors,
} from "../consts/consts";
import { getArticleEditForm } from "../selectors/getArticleEdit";
import { validateArticleEditData } from "./validateArticleEditData";

export const updateArticleEditData = createAsyncThunk<
  ArticleEdit,
  void,
  ThunkConfig<ValidateArticleEditErrors[]>
>("article/updateArticleEditData", async (_, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;

  const formData = getArticleEditForm(getState());

  const errors = validateArticleEditData(formData);

  if (errors.length) {
    console.log("errors", errors, "formData", formData);
    return rejectWithValue(errors);
  }

  try {
    const response = await extra.api.put<ArticleEdit>(
      "/articles/" + formData?.id,
      formData
    );

    return response.data;
  } catch (e) {
    console.log(e);

    return rejectWithValue([
      {
        type: ValidateArticleEditErrorType.SERVER,
        error: ValidateArticleEditError.SERVER_ERROR,
      },
    ]);
  }
});

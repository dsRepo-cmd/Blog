import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { ArticleEdit } from "@/entities/Article";
import {
  ValidateArticleEditError,
  ValidateArticleEditErrorType,
  ValidateArticleEditErrors,
} from "../consts/consts";

export const deleteArticle = createAsyncThunk<
  ArticleEdit,
  string,
  ThunkConfig<ValidateArticleEditErrors[]>
>("article/updateArticleEditData", async (articleId, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;

  // const errors = validateArticleEditData(formData);

  // if (errors.length) {
  //   return rejectWithValue(errors);
  // }
  try {
    const response = await extra.api.delete<ArticleEdit>(
      "/articles/" + articleId
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
